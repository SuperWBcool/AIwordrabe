const chatAI = require('../utils/model.js');
const { z } = require('zod');
const { StructuredOutputParser } = require("@langchain/core/output_parsers");
const { RunnableSequence } = require("@langchain/core/runnables");
const fs = require("fs");
const removeBlack = require("../utils/removeBlackground.js");

const axios = require('axios');

const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

class wardrobeController {
  async clothesAnalysis (req, res) {
    try {
      //读取图片base64格式
      const encodeImageToBase64 = (imagePath) => {
        const imageBuffer = fs.readFileSync(imagePath);
        return imageBuffer.toString("base64");
      };
      console.log(req.imageUrl);
      let base64Image = encodeImageToBase64(req.imageUrl);
      
      //调取大模型接口
      let model = await chatAI.createModel();
      //结构化大模型输出
      const zodSchema = z.object({
        describe: z.string().describe("关于衣服的总描述"),
        type: z.string().describe("衣服的类型"),
        color: z.string().describe("衣服的颜色"),
        season: z.string().describe("衣服适合的季节"),
      });
      //返回json格式
      const parser = StructuredOutputParser.fromZodSchema(zodSchema);
      const message = new HumanMessage({
        content: [
          { type: "text", text: `帮我分析下面的图片中图片的信息,要求分析出图片中的衣服是什么分类,是什么季节，是什么颜色，按照季节：秋季，衣服类型：裤子，颜色：米色，描述：。。。 按照 JSON 格式返回数据：${parser.getFormatInstructions()}` },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
        ],
      });

      const chain = RunnableSequence.from([
        model,
        parser
      ]);
      const response = await chain.invoke([message]);

      //返回结果
      res.send({
        code: 1,
        data: {
          results: response,
          id: req.query.id
        },
        msg: '数据分析成功'
      })
    } catch (error) {
      console.log(error);
    }
  }
  //去除图片背景
  async removeBlack (req, res, next) {
    if(req.query.isRemoveBlack) removeBlack.main(req.imageUrl);
    next();
  }
}

module.exports = new wardrobeController();
