const wardModel = require('../models/wardrobeModel')

class wardrobeController {
  // 上传衣服
  async addClothes (req, res) {
    try {
      console.log(req.query);
      await wardModel.create({ ...req.query, userId: 1, username: 'test1', imageUrl: req.imageName, id: new Date().getSeconds() });

      return res.send({
        code: 1,
        msg: '衣物添加成功'
      });
    } catch (error) {
      console.error('更新衣物出错：', error);
      return res.send({
        code: 0,
        msg: '衣物添加失败'
      });
    }
  }
  // 更新衣服信息
  async updateClothesInf (req, res) {
    try {
      console.log(req.body);

      await wardModel.update({
        id: req.body.id,
        season: req.body.season,
        type: req.body.type,
        color: req.body.color,
        describe: req.body.description
      });

      return res.send({
        code: 1,
        msg: '衣物更新信息成功'
      });
    } catch (error) {
      console.error('更新衣物出错：', error);
      return res.send({
        code: 0,
        msg: '衣物更新失败'
      });
    }
  }

  // 获取用户衣服数据
  async getAllClothes (req, res) {
    try {
      let data = {};
      let array = [];

      if (req.query.start) {
        array = [
          "T恤", "衬衫", "卫衣", "毛衣", "背心", "POLO衫", "西装外套", "风衣", "夹克", "牛仔外套", "羽绒服", "皮衣", "针织开衫",
          "牛仔裤", "休闲裤", "运动裤", "西装裤", "短裤", "打底裤", "工装裤", "阔腿裤",
          "连衣裙", "短裙", "长裙", "半身裙", "吊带裙", "旗袍", "百褶裙",
          "内衣", "文胸", "背心", "吊带", "打底衫",
          "围巾", "手套", "帽子", "袜子"
        ]
        req.query.index = 1;
      }
      else array.push(req.query.type);

      for (let i = 0; i <= array.length - 1; i++) {
        let clothesList = await wardModel.getClothes(1, req.query.index, array[i]);
        let a = so(clothesList, req.query.index);
        Object.assign(data, a);
      }

      // 结构化sql结果
      function so (list, index) {
        let ob = {
        }

        list.forEach(function (item) {
          item.data = null;
          if (ob.hasOwnProperty(item.type)) {
            ob[item.type]['list'].push(item);
          } else {
            ob[item.type] = {};
            ob[item.type]['list'] = [];
            ob[item.type]['index'] = index;
            if (list.length < 8) ob[item.type]['end'] = true;
            else ob[item.type]['end'] = false;
            ob[item.type]['list'].push(item);
          }
        })

        return ob
      }

      return res.send({
        code: 1,
        msg: '获取衣物列表成功',
        data
      });
    } catch (error) {
      console.log('获取衣物列表出错：', error);

      return res.send({
        code: 0,
        msg: '获取衣物列表失败'
      });
    }
  }
  async getClothesById (req, res) {
    try {
      console.log(req.userInf, req.query.id);
      let clothesData = await wardModel.getClothesById(req.userInf.id, req.query.id);
      console.log(clothesData);

      return res.send({
        code: 1,
        msg: '获取对应衣服信息成功',
        data: clothesData[0]
      })
    } catch (err) {
      console.log('获取对应衣服信息失败', err);
      return res.send({
        code: 0,
        msg: '获取对应衣服信息失败',
        data: clothesData
      })
    }


  }
  // 删除衣物记录
  async deleteClothes (req, res) {
    const { id } = req.params;
    try {
      const clothes = await Wardrobe.findByPk(id);
      if (!clothes) {
        return res.status(404).json({
          message: '衣物未找到',
        });
      }

      await clothes.destroy();
      return res.status(200).json({
        message: '衣物删除成功',
      });
    } catch (error) {
      console.error('删除衣物出错：', error);
      return res.status(500).json({
        message: '删除衣物失败',
        error: error.message,
      });
    }
  }


  //获取用户衣服类型
  async getAllClothesTypeByUser (req, res) {
    try {
      let { id: userId } = req.userInf;
      // console.log(req.userInf);
      let clothesTypeList = await wardModel.getClothesByUser(userId);

      for (let i in clothesTypeList) {
        clothesTypeList[i] = clothesTypeList[i].map(function (item) {
          return item[i];
        })
      };

      return res.send({
        code: 1,
        msg: '获取衣物类型成功',
        data: clothesTypeList,
      });
    } catch (error) {
      console.log('获取衣物类型失败', error.message);
      return res.send({
        code: 0,
        msg: '获取衣物类型失败'
      });
    }
  }

  // 获取衣服类型
  async getClothesType (req, res) {
    try {
      let clothesTypeList = await wardModel.getClothesType();

      clothesTypeList = clothesTypeList.map((item) => {
        return item.type
      })
      return res.send({
        code: 1,
        msg: '获取衣服类型成功',
        data: clothesTypeList
      })
    } catch (err) {
      console.log('获取衣服类型出差', err.message);
      return res.send({
        code: 0,
        msg: '获取衣服类型失败'
      })
    }
  }

}

module.exports = new wardrobeController();

