<template>
  <div class="homeView">
    <!-- 主要内容区 -->
    <div class="homeView_main">
      <router-view></router-view>
    </div>

    <div class="homeView_nav">
      <div class="homeView_nav_unit" :style="{ color: currentRouter == i.id ? '#0984e3' : 'black' }" v-for="i in routes"
        @click="changeRouter(i.path, i.id)">
        <div :class="['iconfont', i.icon, 'hIcon']" />
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      currentRouter: 0,       // 当前选中路由
      routes: [               // 路由路径
        {
          id: 0,
          path: '/home',
          icon: 'icon-zhuye'
        },
        {
          id: 1,
          path: '/home/wardrobe',
          icon: 'icon-yigui'
        },
        {
          id: 2,
          path: '/home/clothesMatch',
          icon: 'icon-xiyi'
        },
        {
          id: 3,
          path: '/home/setting',
          icon: 'icon-shezhi'
        }
      ]
    }
  },
  computed: {
    ...mapState('clothes', ['clothesType', 'clothesList', 'currentClohtesInf'])
  },
  methods: {
    // 跳转路由时触发
    changeRouter (path, id) {
      this.$router.push(path);
      this.currentRouter = id;
    }
  }
}
</script>

<style scoped lang="less">
.homeView {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &_main {
    flex: 1;
    background-color: #f5f7fa;
    overflow: auto;
    position: relative;
  }

  &_nav {
    height: 50px;
    display: flex;
    justify-content: space-around;
    flex-shrink: 0;
    background-color: white;
  

    &_unit {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
}

.hIcon {
  font-size: 20px;
  font-weight: 700;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  span {
    display: none;
  }
}
</style>