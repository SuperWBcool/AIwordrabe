<template>
  <div class="clothesDetailView">
    <!-- 顶部信息栏 -->
    <div class="clothesDetailView_title">
      <div class="iconfont icon-return icon" @click="back()"></div>
      <span>衣服信息</span>
      <meunV :menuList="[1,2,3]"/>
    </div>
    <!-- 图片展示区 -->
    <div class="clothesDetailView_img">
      <img :src="currentClohtesInf.details.data" alt="">
    </div>
    <!-- 图片信息 -->
    <div class='clothesDetailView_inf'>
      <div class="clothesDetailView_inf_type" @click="openSelect('type')">
        <span class="clothesDetailView_inf_type_title">分类</span>
        <div class="clothesDetailView_inf_type_select">
          <span class="clothesDetailView_inf_type_select_option">{{ currentClohtesInf['details']['type'] }}</span>
          <div class="iconfont icon-kuozhan1"></div>
        </div>
      </div>

      <div class="clothesDetailView_inf_type" @click="openSelect('color')">
        <span class="clothesDetailView_inf_type_title">颜色</span>
        <div class="clothesDetailView_inf_type_select">
          <span class="clothesDetailView_inf_type_select_option">{{ currentClohtesInf['details']['color'] }}</span>
          <div class="iconfont icon-kuozhan1"></div>
        </div>
      </div>

      <div class="clothesDetailView_inf_type" @click="openSelect('season')">
        <span class="clothesDetailView_inf_type_title">季节</span>
        <div class="clothesDetailView_inf_type_select">
          <span class="clothesDetailView_inf_type_select_option">{{ currentClohtesInf['details']['season'] }}</span>
          <div class="iconfont icon-kuozhan1"></div>
        </div>
      </div>

      <div class="clothesDetailView_inf_descripe">
        <p>描述</p>
        <el-input v-model="currentClohtesInf['details']['description']" :rows="4" type="textarea" placeholder="请输入内容..." @blur="isUpdate=true"/>
      </div>

    </div>
  </div>

  <selectV v-if="isOpen" :data="selectInf.list" :isShow="selectInf.isType" @c="get" />
</template>

<script>
import { mapState } from 'vuex';
import selectV from '../../components/selectV.vue';
import { color, type, season } from '../../db/type';
import { updateClothes } from '../../api/clothes';
import { ElMessage } from 'element-plus';
import meunV from '../../components/meun.vue';
export default {
  data () {
    return {
      selectInf: {
        isType: false,
        list: []
      },
      isOpen: false,         // 控制选项组件弹出
      isUpdate: false,       // 用户是否更新衣服信息
      inf: {
        type,
        color,
        season,
        descripe: ''
      },
      currentOption: ''
    }
  },
  components: {
    selectV,
    meunV
  },
  computed: {
    ...mapState('clothes', ['currentClohtesInf'])
  },
  methods: {
    // 挑选衣服信息时触发
    openSelect (type) {
      if (type == 'type') this.selectInf.isType = true;
      else this.selectInf.isType = false;

      this.currentOption = type;
      this.selectInf.list = this.inf[type];
      this.isOpen = true;
    },
    get (e) {
      if (e) {
        let a = {};
        a[this['currentOption']] = e;
        this.$store.dispatch('clothes/changeCurrentClothesInf', {
          details: a
        });
        this.isUpdate = true;
      }
      this.isOpen = false;
    },
    async back () {
      try {
        if (this.isUpdate) {
          let res = await updateClothes(this.currentClohtesInf.details);
          console.log(res);
          ElMessage.success('保存成功');
          await this.$store.dispatch('clothes/getClothes',{start:true});
        }
        this.$router.back();
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped lang="less">
.clothesDetailView {
  width: 100%;
  background-color: #f5f7fa;

  &_title {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    position: fixed;
    padding: 10px 20px;
    font: 600 17px 微软雅黑;
  }

  &_img {
    width: 100%;
    height: 400px;
    padding-top: 50px;
  }

  &_inf {
    width: 100%;
    padding: 10px 15px;
    margin-top: 10px;

    &_type {
      width: 100%;
      height: 50px;
      border-radius: 10px;
      padding: 5px 15px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      &_title {
        font: 400 18px 微软雅黑;
      }

      &_select {
        display: flex;
        align-items: center;

        &_option {
          margin-right: 10px;
          color: #bdc3c7;
        }
      }
    }

    &_descripe {
      font: 400 18px 微软雅黑;
      width: 100%;
      background-color: #ffffff;
      padding: 15px 15px;
      border-radius: 10px;
    }
  }
}

p {
  font: 400 18px 微软雅黑;
  margin-bottom: 5px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>