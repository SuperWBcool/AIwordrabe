const clothesMatchModel = require('../models/clothesMatchModel')

class clothesMatchController {
  // 添加衣服搭配
  async addClothesMatch (req, res) {
    await clothesMatchModel.add({
      username: 'test1',
      imgUrl: req.imageName,
    });

    return res.send({
      code: 1,
      msg: '衣物搭配添加成功'
    });
  } catch (error) {
    console.log('衣物搭配添加失败：', error);
    return res.send({
      code: 0,
      msg: '衣物搭配添加失败',
    });
  }

  //获取用户衣服搭配
  async getClothesMatch (req, res) {
    let { username } = req.userInf

    let clothesMatchData = await clothesMatchModel.getClothesMatch(username);
    // console.log(clothesMatchData);
    clothesMatchData = clothesMatchData.map((item)=>{
      item.data = null;
      return item
    })
    return res.send({
      code: 1,
      msg: '衣物搭配获取成功',
      data: clothesMatchData
    });
  } catch (error) {
    console.log('衣物搭配获取失败', error);
    return res.send({
      code: 0,
      msg: '衣物搭配获取失败',
    });
  }

  // 获取衣服搭配适用的场景类型
  async getAllClothesMatchType (req, res) {
    try {
      const clothesMatchList = await clothesMatchModel.getClothesMatchType();

      return res.send({
        code: 1,
        data: clothesMatchList,
        message: '获取衣物搭配类型成功'
      });
    } catch (error) {
      console.error('获取衣物搭配类型成功', error);
      return res.status(500).json({
        message: '获取衣物搭配类型成功',
        error: error.message,
      });
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
  async getClothesById (req, res) {
    const { id } = req.params;
    try {
      const clothes = await Wardrobe.findByPk(id);
      if (!clothes) {
        return res.status(404).json({
          message: '衣物未找到',
        });
      }
      return res.status(200).json({
        message: '获取衣物成功',
        data: clothes,
      });
    } catch (error) {
      console.error('获取衣物出错：', error);
      return res.status(500).json({
        message: '获取衣物失败',
        error: error.message,
      });
    }
  }
  async updateClothes (req, res) {
    const { id } = req.params;
    try {
      const clothes = await Wardrobe.findByPk(id);
      if (!clothes) {
        return res.status(404).json({
          message: '衣物未找到',
        });
      }

      const updatedData = {
        name: req.body.name || clothes.name,
        imageUrl: req.file ? req.file.path : clothes.imageUrl,
        season: req.body.season || clothes.season,
        type: req.body.type || clothes.type,
        color: req.body.color || clothes.color,
        occasion: req.body.occasion || clothes.occasion,
        material: req.body.material || clothes.material,
        style: req.body.style || clothes.style,
        description: req.body.description || clothes.description,
      };

      await clothes.update(updatedData);

      return res.status(200).json({
        message: '衣物更新成功',
        data: clothes,
      });
    } catch (error) {
      console.error('更新衣物出错：', error);
      return res.status(500).json({
        message: '更新衣物失败',
        error: error.message,
      });
    }
  }
}

module.exports = new clothesMatchController();

