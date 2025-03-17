<template>
  <div class="add-clothes-container">
    <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="handleFileChange" />
    <el-button type="primary" class="add-button" @click="triggerFileInput">
      <el-icon class="add-icon">
        <Plus />
      </el-icon>
      <span>添加衣物</span>
    </el-button>
  </div>
</template>

<script>
import {  Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

export default {
  components:{
    Plus
  },
  methods: {
    // 点击添加按钮时触发
    triggerFileInput () {
      this.$refs.fileInput.click();
    },
    // 读取完文件列表时触发
    async handleFileChange (event) {
      const file = event.target.files[0];
      //如果文件读取失败
      if (!file) return;

      //验证文件是否为图片类型
      if (!file.type.startsWith('image/')) {
        ElMessage.error('请上传图片文件！');
        return;
      }

      // 验证文件大小（限制为 5MB）
      if (file.size / 1024 / 1024 > 5) {
        ElMessage.error('图片大小不能超过 5MB');
        return;
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const formData = new FormData();
          formData.append('clothesimage', file);
          // 读取到图片信息后保存并跳转到上传图片界面
          this.$store.dispatch('clothes/setClothesImage', { id: new Date().getTime(), url: e.target.result,data:formData })
          this.$router.push('upload');
          //发送到后端进行AI分析
          // this.$store.dispatch('clothes/getAnalysisData', formData);
          // 清除读取文件列表
          this.$refs.fileInput.value = '';
        } catch (error) {
          console.error('读取文件出错：', error);
          ElMessage.error('读取文件出错');
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
</script>

<style scoped>
.add-clothes-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.add-button {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.add-button:hover {
  transform: scale(1.1);
}

.add-icon {
  font-size: 50px;
  margin-bottom: 10px;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {

  span {
    display: none;
  }

  .add-button {
    width: 150px;
    height: 150px;
  }
}
</style>