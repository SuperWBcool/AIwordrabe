<template>
  <div class="clothesMatchView">
    <!-- 标题栏 -->
    <div class="clothesMatchView_top">
      <div class="icon"></div>
      <span>我的搭配</span>
      <div class="iconfont icon-shaixuan icon"></div>
    </div>
    <!-- 首页展示diy的列表 -->
    <div class="clothesMatchView_sort">
      <!-- 衣服搭配类型--全部 -->
      <div :class="{clothesMatchView_sort_unit:true, 'sa' : currentType == '全部'}">
        <div class="icon-quanbu iconfont clothesMatchView_sort_unit_icon" />
        <span class="clothesMatchView_sort_unit_title">全部</span>
      </div>
      <!-- 衣服搭配类型 -->
      <div :class="{clothesMatchView_sort_unit:true, 'sa' : currentType == i.type}"  v-for="i in type['list']" @click="t1(i.type)">
        <div :class="[i.icon, 'iconfont', 'clothesMatchView_sort_unit_icon']" />
        <span class="clothesMatchView_sort_unit_title">{{ i.type }}</span>
      </div>

    </div>
    <!-- 衣服搭配列表 -->
    <div class="clothesMatchView_main">
      <div class="clothesMatchView_main_list" v-for="(item, index) in clothesMatchList">
        <div class="clothesMatchView_main_list">
          <imageShow :index="index" type="match" :item="item" />
        </div>
      </div>
    </div>
  </div>
  <div class="clothesMatchView_add icon-tianjia1 iconfont" @click="toDiyCanvas"></div>
</template>

<script>
import { mapState } from 'vuex';
import imageShow from '../../components/imageShow.vue';

export default {
  data () {
    return {

    }
  },
  components: {
    imageShow
  },
  computed: {
    ...mapState('match', ['type', 'clothesMatchList', 'currentType'])
  },
  methods: {
    //跳转到衣服搭配界面
    toDiyCanvas () {
      this.$router.push('/home/diyCanvas');
    },
    t1 (type) {
      this.$store.dispatch('match/changeCurrentType',type);
    }
  },
  async created () {
    //跳转到衣服搭配页面获取衣服搭配适用类型
    if (!this.type.isAdd) {
      this.$store.dispatch('match/getType');
    }
  }
}

</script>

<style scoped lang="less">
.clothesMatchView {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &_top {
    width: 100%;
    height: 50px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: 600 17px 微软雅黑;
    background-color: white;
  }

  &_sort {
    width: 100%;
    height: 70px;
    display: flex;
    overflow: auto;
    background-color: white;

    &_unit {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 20px;

      &_icon {
        font-size: 20px;
      }

      &_title {
        margin-top: 2px;
        font: 500 10px 微软雅黑;
      }
    }
  }

  &_main {
    flex: 1;
    overflow: auto;
    padding: 20px;


    &_list {
      width: 100%;
      height: 250px;
      background-color: #e2e7ea;
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 3px 3px 3px -2px #b2bec3;
    }
  }

  &_sort::-webkit-scrollbar {
    width: 0px;
    /* 纵向滚动条宽度 */
    height: 0px;
    /* 横向滚动条高度 */
  }

  &_add{
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #9b59b6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #e2e7ea;
  }
}

.sa{
  color: #2980b9;
}
</style>