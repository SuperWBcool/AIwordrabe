<template>
  <div class="diyClothesView">

    <div class="diyClothesView_top">
      <div class="icon"></div>
      <span>我的衣柜</span>
      <div class="iconfont icon-return icon" @click="back"></div>
    </div>

    <!-- 添加图片 -->
    <div class="diyClothesView_addImg">
      <div class="diyClothesView_addImg_parentType">
        <div :class="{ diyClothesView_addImg_parentType_unit: true, select: index == currentClothesType['parent'] }"
          v-for="(item, index) in type" @click="changeParentType(index)">
          {{ item.type }}
        </div>
      </div>
      <!-- <div class="iconfont icon icon-fanhui" @click='back'></div> -->
      <div class="diyClothesView_addImg_sonType">
        <div class="diyClothesView_addImg_sonType_unit" v-for="i in type[currentClothesType['parent']]['list']"
          @click=openClothesList(i);>
          {{ i }}
        </div>
      </div>

    </div>
    <!-- 对应类型图片列表 -->
    <!-- <div class="diyClothesView_addImg_typeClothesList">
      <div class="diyClothesView_addImg_typeClothesList_unit" v-for="(item, index) in clothesList[currentClothesType]"
        @click="addImg(item)">
        <imageShow :item="item" :index="index" type="clothes" />
      </div>
    </div> -->
    <!-- 画布区 -->
    <div class="diyClothesView_main">
      <diyCanvas v-for="(item, index) in imgLevelInf['imgPostion']" :key="item.id" :style="{ zIndex: item.zIndex }"
        :ref="item.id"></diyCanvas>
    </div>

    <div class="diyClothesView_imgLevel" ref="imgLevel">
      <div class="diyClothesView_imgLevel_title">已添加的衣服:</div>
      <div class="diyClothesView_imgLevel_list">
        <div class="diyClothesView_imgLevel_list_unit" v-for="item in imgLevelInf['imgPostion']" :key="item.id"
          @click="console1(item.id)">
          <img :src="item.imgData" alt="">
        </div>
      </div>
      <el-button style="margin: 10px;" type="info" plain @click="saveCanvas">保存搭配</el-button>
    </div>
    <div v-show="isOpen" class="diyClothesView_clothesList" @click="this.isOpen = false">
      <div class="diyClothesView_clothesList_main" @click.stop>
        <div class="diyClothesView_clothesList_main_unit" v-for="(item,index) in (clothesList[currentClothesType['son']]?clothesList[currentClothesType['son']]['list']:[])"
           @click="addImg(item)"
        >
          <imageShow :item="item" :index="index" type="clothes"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import diyCanvas from './components/diyCanvas.vue';
import { mapState } from 'vuex';
import { sendClothesMatch } from '../../api/clothesMatch';
import imageShow from '../../components/imageShow.vue';
import { type } from '../../db/type';

export default {
  data () {
    return {
      type,
      isOpen: false,          //控制选择衣服列表界面开关
      currentClothesType: {
        parent: 0,
        son: []
      }
    }
  },
  components: {
    diyCanvas,
    imageShow
  },
  computed: {
    ...mapState('match', ['imgLevelInf', 'i2']),
    ...mapState('clothes', ['clothesList', 'clothesType']),

  },
  methods: {
    back () {
      this.$router.back();
    },
    // 选择衣服大类时触发
    changeParentType (index) {
      this.currentClothesType.parent = index;
    },
    // 选择具体衣服时触发
    openClothesList (type) {
      this.isOpen = !this.isOpen;
      this.currentClothesType.son = type;
    },
    // 添加图片到图层时触发
    addImg (i) {
      //添加图片到列表
      this.$store.dispatch('match/addImgLevelInf', {
        imgData: i.data,
        id: new Date().getTime(),
        zIndex: this.imgLevelInf['imgPostion'].lentgth + 1
      });
      //将
      this.isOpen = !this.isOpen;
    },
    console1 (id) {
      let index = this.i2.indexOf(id);
      this.i2.splice(index, 1);
      this.i2.push(id);
      this.i2.forEach((item, index) => {
        this.imgLevelInf['imgPostion'].forEach((i) => {
          if (i.id == item) {
            i.zIndex = index + 1;
          }
        })
      })
    },
    async saveCanvas () {
      const outputCanvas = document.createElement("canvas");
      const ctx = outputCanvas.getContext("2d");
      outputCanvas.width = this.imgLevelInf['canvasInf'].width;
      outputCanvas.height = this.imgLevelInf['canvasInf'].height;
      this.imgLevelInf['imgPostion'].forEach((item) => {
        ctx.drawImage(this.$refs[item.id][0].$el, 0, 0);
      });
      const image = outputCanvas.toDataURL("image/png");


      function base64ToBlob (base64) {
        const byteString = atob(base64.split(",")[1]); // 解码 Base64
        const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]; // 获取 MIME 类型
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([uint8Array], { type: mimeString });
      }

      const blob = base64ToBlob(image);
      const formData = new FormData();

      formData.append("clothesimage", blob, "canvas-image.png");

      let res = await sendClothesMatch(formData);
      console.log(res);

    }
  },

}
</script>

<style scoped lang="less">
.diyClothesView {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  &_top {
    width: 100%;
    height: 50px;
    padding: 10px 20px;
    font: 600 17px 微软雅黑;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 5px 1px #dfe6e9;
  }

  &_addImg {
    width: 100%;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;

    &_parentType {
      width: 100%;
      display: flex;
      // justify-content: space-evenly;

      &_unit {
        width: 13vw;
        height: 40px;
        font: 500 13px 微软雅黑;
        // background-color:azure;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &_sonType {
      width: 100%;
      display: flex;
      overflow: auto;

      &_unit {
        width: 13vw;
        height: 40px;
        font: 500 13px 微软雅黑;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }


    &_typeClothesList {
      width: 100%;
      position: absolute;
      top: calc(40px);
      background-color: #e4e7eb;
      z-index: 199;
      display: flex;

      &_unit {
        width: 10vw;
        height: 10vw;
        margin: 0 5px;
      }
    }
  }

  &_main {
    flex-grow: 1;
    // width: 100%;
    // height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #efeff2;
  }

  &_imgLevel {
    width: 100%;

    &_title {
      padding: 10px;
      font: 600 16px 微软雅黑;
    }

    &_list {
      width: 100%;
      display: flex;

      &_unit {
        width: 100px;
        height: 100px;
        background-color: #636e72;
        margin-left: 10px;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }

  &_clothesList {
    width: 100%;
    height: 100%;
    background-color: rgba(149, 165, 166,0.5);
    position: absolute;
    right: 0;

    &_main {
      width: 150px;
      height: 100%;
      float: right;
      padding: 10px;
      background-color: white;
      overflow: auto;

      &_unit{
        width: 100%;
        height: 130px;
        margin-bottom: 10px;
        background-color: rgba(149, 165, 166,1.0);
      }
    }
  }
}

::-webkit-scrollbar {
  width: 0px;
  /* 纵向滚动条宽度 */
  height: 0px;
  /* 横向滚动条高度 */
}

.select {
  color: #2980b9;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>