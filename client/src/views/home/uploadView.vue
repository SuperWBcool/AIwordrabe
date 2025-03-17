<template>
  <div class="uploadView">
    <!-- 顶部信息栏 -->
    <div class="uploadView_top">
      <div class="icon uploadView_top_save" @click="send">保存</div>
      <span>上传衣服</span>
      <div class="iconfont icon-return icon" style=" width: 50px;" @click="backIndex()"></div>
    </div>

    <div class="uploadView_main">
      <div class="uploadView_image">
        <img :src="clothesImage.url" alt="">
      </div>
      <div class="uploadView_AI">
        <div style="font:600 17px 微软雅黑;margin-bottom: 10px">AI分析</div>
        <div style="font:400 14px 微软雅黑;color:#2c3e50;flex-grow: 1;" v-loading="isLoading">{{ analysisData.describe }}
        </div>
      </div>
      <div v-show="isShow" style="font:100 12px 微软雅黑;margin-top: 5px;">
        是否使用AI分析的结果？
        <el-button style="padding: 4px; font:100 12px 微软雅黑" @click="useAIData">是</el-button>
      </div>
      <!-- 填写衣服信息 -->
      <div class="uploadView_option">
        <div class="uploadView_option_unit" v-for="(v, k) in imgInf" @click="changeOption(k, v.list)">
          <span class="uploadView_option_unit_title">{{ v.name }}</span>
          <div class="uploadView_option_unit_title_right">
            <span style="margin-right: 10px; color: #bdc3c7;">{{ v.data }}</span>
            <div class="iconfont icon-kuozhan1"></div>
          </div>
        </div>

        <div class="uploadView_option_descripe">
          <p>描述</p>
          <el-input v-model="descripe" :rows="4" type="textarea" placeholder="请输入内容..." />
        </div>
        <el-switch v-model="isRemoveBlack" size="large" inactive-text="是否使用自动抠图" />
      </div>

    </div>
    <selectV v-if="isOpen" @c="get" :data="currentOption.list" :isShow="currentOption.isType" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { sendImage } from '../../api/clothes';
import { ElMessage } from 'element-plus';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import selectV from '../../components/selectV.vue';
import { color, type } from '../../db/type';

export default {
  data () {
    return {
      // 图片信息
      imgInf: {
        type: {
          name: '类型',
          list: type,
          data: ''
        },
        season: {
          name: '季节',
          list: ['春', '秋', '夏', '冬'],
          data: ''
        },
        color: {
          name: '颜色',
          list: color,
          data: ''
        },
      },
      descripe:'',            // 衣服备注信息    
      // 填写信息时选择填写的哪一个信息
      currentOption: {
        option: '',
        list: [],
        isType: false         // 当选择为衣服类型的信息时将选项框为父子级
      },
      isRemoveBlack: true,    // 是否使用抠图
      isOpen: false,
             
    }
  },
  components: {
    ArrowLeftBold,
    selectV
  },
  computed: {
    ...mapState('clothes', ['clothesImage', 'isShow', 'analysisData', 'clothesType', 'isLoading'])
  },
  methods: {
    // 关闭选项框时触发
    get (e) {
      // 将选中的信息写入并关闭弹窗
      this.imgInf[this.currentOption.option].data = e;
      this.isOpen = false;
    },
    // 填写信息时触发
    changeOption (index, data) {
      // 判断当前填写信息是否为类型，如果是将选项框父子级开关打开
      if (index == 'type') this.currentOption.isType = true;
      else this.currentOption.isType = false;
      // 设置当前填写选项信息
      this.currentOption.option = index;
      this.currentOption.list = data;
      this.isOpen = true
    },
    // 点击返回按钮时触发
    backIndex () {
      // 将AI分析结果清除
      this.$store.state.clothes.analysisData = { describe: '' };
      // 将选择上传的图片信息清除
      this.$store.dispatch('clothes/setClothesImage', { id: '', url: '', data: '' })
      // 跳转回首页
      this.$router.push('/');
    },
    // 获取到 AI分析结果时触发
    useAIData () {
      [this.descripe, this.imgInf.type.data, this.imgInf.season.data, this.imgInf.color.data] = [this.analysisData.describe, this.analysisData.type, this.analysisData.season, this.analysisData.color]
    },
    // 点击保存按钮时触发
    async send () {
      try {
        // 如果类型栏没有填写信息则不能发送
        if (this.imgInf.type.data) {
          let res = await sendImage(this.clothesImage.data, {
            type: this.imgInf.type.data,
            color: this.imgInf.color.data,
            season: this.imgInf.season.data,
            describe: this.descripe,
            isRemoveBlack: this.isRemoveBlack
          })
          console.log(res);
          if (res.code) {
            this.$router.push('/');
            ElMessage.success('上传成功');
          }
        }
        else ElMessage.error('请选择类型');
      } catch (err) {
        console.log(err)
      }
    },

  }
}
</script>


<style scoped lang="less">
.uploadView {
  width: 100%;
  height: 100%;

  &_top {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    font: 600 17px 微软雅黑;
    position: fixed;
    background-color: #f5f7fa;
    // background-color: #f5f7fa;
    &_save {
      color: white;
      background-color: red;
      font-size: 12px;
      width: 50px;
      border-radius: 10px;
    }

  }

  &_main {
    width: 100%;
    padding: 60px 20px 20px 20px;
  }

  &_image {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
  }

  &_option {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;

    &_unit {
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

        &_right {
          display: flex;
          align-items: center;
        }
      }
    }

    &_descripe{
      font: 400 18px 微软雅黑;
      width: 100%;
      background-color: #ffffff;
      padding: 15px 15px;
      border-radius: 10px;
    }
  }

  &_AI {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    height: 150px;
    overflow: auto;
    border-radius: 5px;
    background-color: white;
    display: flex;
    flex-direction: column;
  }

  &_bottom {
    width: 100%;
    margin: 20px 0;
    display: flex;
    justify-content: space-around;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  p {
    font: 400 18px 微软雅黑;
    margin-bottom: 5px;
  }
}
</style>