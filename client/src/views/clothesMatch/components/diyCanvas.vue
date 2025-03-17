<template>
  <canvas ref="myCanvas1" class="clothesMatchIndex_main_myCanvas1"></canvas>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('match', ['imgLevelInf'])
  },
  methods: {
    draw (imgPath) {
      let canvas1 = this.$refs['myCanvas1'];
      let ctx1 = canvas1.getContext('2d');
      canvas1.width = 300;
      canvas1.height = 400;
      let imgposition = { width: 100, height: 200, x: 50, y: 50 };

      let img1 = new Image();
      img1.crossOrigin = "anonymous";
      img1.src = imgPath;
      img1.onload = function () {
        ctx1.drawImage(img1, imgposition.x, imgposition.y, imgposition.width, imgposition.height);
      };
      img1.onerror = function (err) {
        console.log(err)
      };
      canvas1.ontouchstart = function (e) {
        let touch = e.touches[0] || e.changedTouches[0];
        let target = e.target.getBoundingClientRect();
        e.offsetX = touch.clientX - target.left;
        e.offsetY = touch.clientY - target.top;

        //如果触摸位置在图片中则拖拽移动
        if (e.offsetX > imgposition.x && e.offsetX < (imgposition.x + imgposition.width) && e.offsetY > imgposition.y && e.offsetY < (imgposition.y + imgposition.height)) {
          ctx1.strokeStyle = 'black'; // 边框颜色
          ctx1.lineWidth = 1; // 边框宽度
          ctx1.strokeRect(imgposition.x, imgposition.y, imgposition.width, imgposition.height); // 绘制边框

          let oldMouseX = e.offsetX;
          let oldMouseY = e.offsetY;
          canvas1.ontouchmove = function (e) {
            let touch = e.touches[0] || e.changedTouches[0];
            let target = e.target.getBoundingClientRect();
            e.offsetX = touch.clientX - target.left;
            e.offsetY = touch.clientY - target.top;
            
            //清除画布
            imgposition.x += e.offsetX - oldMouseX;
            imgposition.y += e.offsetY - oldMouseY;

            oldMouseX = e.offsetX;
            oldMouseY = e.offsetY;
            ctx1.clearRect(0,0,300,400);
            
            ctx1.drawImage(img1, imgposition.x, imgposition.y, imgposition.width, imgposition.height);
          }
        }
        else if (e.offsetX <= (imgposition.x + imgposition.width + 5) && e.offsetX > (imgposition.x + imgposition.width) && e.offsetY <= (imgposition.y + imgposition.height + 5) && e.offsetY >= (imgposition.y + imgposition.height)) {
          console.log('放大');
          canvas1.ontouchmove = function (e) {
            let touch = e.touches[0] || e.changedTouches[0];
            let target = e.target.getBoundingClientRect();
            e.offsetX = touch.clientX - target.left;
            e.offsetY = touch.clientY - target.top;

            ctx1.clearRect(0,0,300,400);
            imgposition.width = (e.offsetX - imgposition.x); // 放大比例
            imgposition.height = (e.offsetY - imgposition.y); // 放大比例
            ctx1.drawImage(img1, imgposition.x, imgposition.y, imgposition.width, imgposition.height);
          }
        }
      }

      canvas1.onmouseup = function () {
        canvas1.onmousemove = null;
      }
      canvas1.onmouseout = function () {
        canvas1.onmousemove = null;
      }
    }
  },
  mounted () {
    this.draw(this.imgLevelInf.imgPostion[this.imgLevelInf.imgPostion.length - 1].imgData);
  }
}
</script>

<style scoped lang="less">
.clothesMatchIndex {
  width: 100%;
  height: 100%;

  &_main {
    width: 100%;
    // border: 1px solid;
    position: relative;

    &_myCanvas1 {
      position: absolute;
    }
  }
}
</style>