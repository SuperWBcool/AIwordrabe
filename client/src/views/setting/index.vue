<template>
  <div style="width: 100%; height: 100%; background-color: rgba(45, 52, 54,0.4);position: absolute;top: 0;z-index: 2001;">
    <div class="option fade-in" ref="option">
      <div class="option_title">请选择分类</div>

      <div class="option_main ">
        <div class="option_main_selectBox" />
        <div class="option_main_show" ref="show">
          <div class="option_main_show_container" ref="main">
            <div class="option_main_show_container_unit"></div>
            <div class="option_main_show_container_unit" ref="ss1" v-for="i in data">{{ i }}</div>
            <div class="option_main_show_container_unit"></div>
          </div>
        </div>
      </div>

      <div class="option_tool">
        <div style="display: flex;">
          <div class="option_tool_unit" style="background-color: #dfe6e9;" @click="close">取消</div>
          <div class="option_tool_unit" style="background-color: #2d3436; color: white;">确认</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props:['data'],
  data(){
    return {
      index:0
    }
  },
  methods: {
    close () {
      this.$refs['option'].classList.remove('fade-in');
      this.$refs['option'].classList.add('fade-out');
      setTimeout(() => {
        this.$emit('c',this.data[this.index]);
      }, 600)
    }
  },
  mounted () {
    let sd = this.$refs['show'];
    let index = 0;
    let scrollTimer;

    sd.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        if (Math.abs((Math.ceil(sd.scrollTop) % 40)) > 30) index = Math.abs(Math.ceil(sd.scrollTop / 40))
        else index = Math.abs(Math.ceil(sd.scrollTop / 40)) - 1 >= 0 ? index = Math.abs(Math.ceil(sd.scrollTop / 40)) - 1 : 0
        this.$refs['main'].style.transition = "transform 0.3s ease-out";
        this.$refs['main'].style.transform = `translateY(${Math.ceil(sd.scrollTop) - 40 * index}px)`;
        this.index = index;
      }, 100);
    });

  }

}
</script>

<style scoped lang="less">
.fade-in {
  animation: fade-in-bottom 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.fade-out {
  animation: rotate-out-center 0.4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both
}

.option {
  width: 100%;
  position: fixed;
  bottom: 0px;
  background-color: white;
  border-radius: 20px 20px 0 0;

  &_title {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font: 700 18px 微软雅黑;
  }

  &_main {
    width: 100%;
    height: 120px;
    position: relative;

    &_selectBox {
      width: 100%;
      height: 40px;
      border-top: 1px solid #dde3e5;
      border-bottom: 1px solid #dde3e5;
      position: absolute;
      top: calc(50% - 20px);
    }

    &_show {
      width: 100%;
      height: 120px;
      overflow: auto;
      position: relative;

      &_container {
        &_unit {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  &_tool {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-evenly;

    &_unit {
      background-color: antiquewhite;
      padding: 10px 40px;
      border-radius: 10px;
    }
  }
}

@keyframes fade-in-bottom {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}


@keyframes rotate-out-center {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100%);
  }
}
</style>