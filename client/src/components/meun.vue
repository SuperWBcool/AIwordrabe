<template>
  <div class="menuC">
    <div class="iconfont icon-gengduo icon" @click="isOpen = !isOpen">
    </div>
    <div class="menuC_list" v-show="isOpen">
      <div class="menuC_list_unit" v-for="(item, index) in menuList" @click='toPath(item.path)'
        :style="{ animationDelay: 0.1*index+'s' }">
        {{ item }}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['menuList'],
  data () {
    return {
      isOpen: false
    }
  },
  methods:{
    toPath(path){
      this.isOpen = !this.isOpen;
      this.$router.push(path);      
    }
  }
}

</script>

<style scoped lang="less">
.menuC {
  position: relative;
  // background-color:aqua ;
  &_list {
    // width: 100%;
    font: 100 14px 微软雅黑;
    position: absolute;
    // background-color: aqua;
    right: 0;
    &_unit {
      width: 50px;
      padding: 5px;
      border: 1px solid #b2bec3;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
      background-color: #dfe6e9;
      
      animation: fade-in-top 0.1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
      cursor: pointer;
    }
  }
}

@keyframes fade-in-top {
  0% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
    opacity: 0;
  }

  50% {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
    opacity: 0.5;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>