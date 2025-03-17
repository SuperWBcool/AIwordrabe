<template>
  <div style="width: 100%; height: 100%; background-color: rgba(45, 52, 54,0.4);position: fixed;top: 0;z-index: 2001;">
    <div class="option fade-in" ref="option">
      <div class="option_title">请选择分类</div>
      <div style="display: flex;">

        <div class="option_main_unti1" v-if="isShow">
          <div class="option_main_unti1_t1" v-for="i in data" @click="fn(i.list)">
            {{ i.type }}
          </div>
        </div>

        <div class="option_main">
          <div class="option_main_selectBox" />
          <div class="option_main_show" ref="show">
            <div class="option_main_show_container" ref="main">
              <div class="option_main_show_container_unit"></div>
              <div class="option_main_show_container_unit" ref="ss1" v-for="i in isShow ? list : data">{{ i }}</div>
              <div class="option_main_show_container_unit"></div>
            </div>
          </div>
        </div>
      </div>


      <div class="option_tool">
        <div style="display: flex;">
          <div class="option_tool_unit" style="background-color: #dfe6e9;" @click="close">取消</div>
          <div class="option_tool_unit" style="background-color: #2d3436; color: white;" @click="save">确认</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['data', 'isShow'],  // isShow 为是否有父子级选择框列表开关
  data () {
    return {
      index: 0,   // 当前子级选中的选项
      list: []     // 当前子级选择框的数据，只有存在父子级的时候才会使用
    }
  },
  methods: {
    // 点击父级选项框选项时候触发
    fn (list) {
      // 选中父级选项对应的子级选项
      this.list = list;
    },
    // 点击取消按钮时触发
    close () {
      // 触发退出动画
      this.$refs['option'].classList.remove('fade-in');
      this.$refs['option'].classList.add('fade-out');
      // 在动画结束时销毁组件
      setTimeout(() => {
        this.$emit('c');
      }, 200)
    },
    // 点击确定按钮时触发
    save () {
      this.$refs['option'].classList.remove('fade-in');
      this.$refs['option'].classList.add('fade-out');

      setTimeout(() => {
        // 如果是父子级的选项框，则在list中取得数据，若不是直接在data中取得数据并返回选中的数据
        if (this.isShow) this.$emit('c', this.list[this.index]);
        else this.$emit('c', this.data[this.index]);
      }, 200)
    }
  },
  mounted () {
    // 判断是否为父子级选项框，如果是则默认选择到第一个
    if (this.isShow) this.list = this.data[0]['list']
    // 获取子级选择框
    let sd = this.$refs['show'];
    let index = 0;
    let scrollTimer;
    // 监听子级选项框的滚动事件
    sd.addEventListener("scroll", () => {
      // 在滚轮停止的时候做出事件处理，否则清除定时器
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        // 计算当前滚动条的滚动数值，判断当前选项框选中的选项
        if (Math.abs((Math.ceil(sd.scrollTop) % 40)) > 30) index = Math.abs(Math.ceil(sd.scrollTop / 40));
        else index = Math.abs(Math.ceil(sd.scrollTop / 40)) - 1 >= 0 ? index = Math.abs(Math.ceil(sd.scrollTop / 40)) - 1 : 0
        // 计算出当前选项索引之后则触发过渡动画
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
  animation: fade-in-bottom 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.fade-out {
  animation: rotate-out-center 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both
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
    // padding: 20px;
    position: relative;

    &_unti1 {
      width: 70px;
      height: 120px;
      overflow: auto;
      box-shadow: 3px 0px 2px -2px #bdc3c7;

      &_t1 {
        width: 100%;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font: 500 14px 微软雅黑;

      }
    }

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

::-webkit-scrollbar {
  width: 0px;
  /* 纵向滚动条宽度 */
  height: 0px;
  /* 横向滚动条高度 */
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