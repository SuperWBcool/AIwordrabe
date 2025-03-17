<template>
  <div class="clothesManager">

    <div class="clothesManager_top">
      <div class="icon"></div>
      <span>我的衣柜</span>
      <div class="iconfont icon-shaixuan icon"></div>
    </div>

    <div class="clothesManager_main">
      <!-- 左侧衣服类型栏 -->
      <div class="clothesManager_main_left">
        <!-- <div class="clothesManager_main_left_unit"
          :style="{ backgroundColor: '全部' == currentClohtesInf['type']['parent'] ? '#b2bec3' : '#f0f3f4' }"
          @click="changeClothesType('全部')">
          全部
        </div> -->

        <div class="clothesManager_main_left_unit"
          :style="{ backgroundColor: index == currentClohtesInf['type']['parent'] ? '#b2bec3' : '#f0f3f4' }"
          v-for="(item, index) in type" @click="changeClothesParentType(index)">
          {{ item.type }}
        </div>
      </div>
      <div class="clothesManager_main_right">
        <!-- 衣服列表 -->
        <div class="clothesManager_main_right_sort">
          <div :class="{clothesManager_main_right_sort_unit:true,sa:currentClohtesInf.type.son == i}"
            v-for="i in type[currentClohtesInf['type']['parent']]['list']" @click="changeClothesSonType(i)">
            {{ i }}
          </div>
        </div>

        <div style="display: inline-block;" v-for="(item, index) in (clothesList[currentClohtesInf.type.son]?clothesList[currentClohtesInf.type.son]['list']:[])"
          :key="item.id" @click="toDetail(item,index)">
          <div class="clothesManager_main_right_image" :index="index">
            <imageShow :index="index" :item="item" type="clothes" />
          </div>
        </div>
        <div class="clothesManager_main_right_bottom">暂时没有更多了</div>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import imageShow from '../../components/imageShow.vue';
import { type } from '../../db/type.js';

export default {
  data () {
    return {
      isVisible: false, // 控制弹窗的显示与隐藏
      type
    };
  },
  components: {
    imageShow
  },
  computed: {
    ...mapState('clothes', ['clothesType', 'clothesList', 'currentClohtesInf'])
  },
  methods: {
    //跳转到衣服信息页面
    toDetail (item,index) {
      this.$store.dispatch('clothes/getClothesById', { id:item.id,index });
      this.$router.push('/home/details');
    },
    // 点击衣服大类改变当前信息
    async changeClothesParentType (type) {
      await this.$store.dispatch('clothes/changeCurrentClothesInf', {
        type: {
          parent: type,
          son: this.type[type]['list'][0]
        }
      });
    },
     // 点击衣服子类改变当前信息
     async changeClothesSonType (type) {
      await this.$store.dispatch('clothes/changeCurrentClothesInf', {
        type: {
          son: type
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.clothesManager {
  width: 100%;
  height: 100%;
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
    background-color: white;
    box-shadow: 0px 0px 5px 1px #dfe6e9;
  }

  &_main {
    flex: 1;
    display: flex;
    background-color: #f0f3f4;
    // padding-top: 10px; 

    &_left {
      width: 20vw;
      height: 100%;
      box-shadow: 14px -5px 4px -16px #636e72;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;

      &_unit {
        width: 100%;
        padding: 10px;
        background-color: #f0f3f4;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }
    }

    &_right {
      // flex: 1;
      width: calc(100% - 20vw);
      padding: 10px;

      &_sort {
        width: 100%;
        height: 50px;
        display: flex;
        overflow: auto;

        &_unit {
          flex-shrink: 0;
          height: 100%;
          margin-right: 20px;
          display: flex;
          align-items: center;
          font: 400 13px 微软雅黑;
        }
      }

      &_title {
        width: 100%;
        margin: 10px 0;
        font: 700 17px 微软雅黑;
      }

      &_image {
        width: 32vw;
        height: 32vw;
        margin: 2.5vw;
        background-color: #e0e6e9;
        box-shadow: 2px 2px 4px 0px #c0c7ca;
        flex-grow: 0;
        display: flex;
        justify-items: center;
        align-items: center;
      }

      &_bottom{
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font: 300 13px 微软雅黑;
        color: #95a5a6;
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
.sa{
  color: #2980b9;
}


.clothesManager_clothes_unit {
  width: 100%;
  height: 100px;
  background-color: rgba(236, 240, 241, 1.0);
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 10px;
}

.clothesManager_clothes_unit_fengelan {
  width: 100px;
  border: 3px solid #fdcb6e;
  border-radius: 20px;
}

.close {
  cursor: pointer;
  font-size: 24px;
  float: right;
}

button {
  margin-top: 20px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>