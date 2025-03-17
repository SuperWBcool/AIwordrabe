const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");


// 将图片转换为base64
const multiModalPrompt = PromptTemplate.fromTemplate(`
  分析以下图像并回答问题：
  图像: {image}
  问题: {question}
`);

async function createModel (params) {
  try {
    let model = await new ChatOpenAI({
      apiKey: process.env.OPENAIAPIKEY,
      model: 'gpt-4o',
      configuration: {
        baseURL: 'https://api.gptsapi.net/v1'
      }
      // 'gpt-3.5-turbo'
      // temperature: temtemperature ? temperature : 1
    })
    return model;
  } catch (err) {
    console.log(err.message);
  }
}


module.exports = {
  createModel
};