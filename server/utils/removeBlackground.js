const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const API_KEY = process.env.ZUOTANGAPIKEY;

async function main (imgUrl) {
  try {
    const taskId = await createTask(imgUrl);
    const result = await polling(() => getTaskResult(taskId));
    // console.log(result);
    const response = await axios({
      method: 'get',
      url: result.data.image,
      responseType: 'stream', // 使用 stream 类型处理大文件
    });

    const writer = fs.createWriteStream(imgUrl);
    response.data.pipe(writer);

    writer.on('finish', () => {
      console.log('图片下载并替换成功！');
    });

    writer.on('error', (err) => {
      console.error('下载图片错误');
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

// polling 函数，用于轮询任务进度
const polling = async (fn, delay = 1000, timeout = 30000) => {
  if (!fn) {
    throw new Error('fn is required');
  }
  try {
    const result = await fn();
    return result;
  } catch (error) {
    if (timeout <= 0) {
      throw new Error('timeout');
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    return polling(fn, delay, timeout - delay);
  }
};

// 创建任务，发送文件进行图像分割
function createTask (imgUrl) {
  const formData = new FormData();
  formData.append('image_file', fs.createReadStream(imgUrl));

  return axios.post('https://techsz.aoscdn.com/api/tasks/visual/segmentation', formData, {
    headers: {
      'X-API-KEY': API_KEY,
      ...formData.getHeaders(),
    },
  })
    .then(response => response.data.data.task_id)
    .catch(error => {
      throw error.response ? error.response.data : error;
    });
}

// 获取任务的结果
function getTaskResult (taskId) {
  return axios.get(`https://techsz.aoscdn.com/api/tasks/visual/segmentation/${taskId}`, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  })
    .then(response => {
      const { progress, state } = response.data.data;
      if (state < 0) {
        throw new Error('Task failed');
      }
      if (progress >= 100) {
        return response.data;
      }
      throw new Error('Task not complete yet');
    })
    .catch(error => {
      throw error.response ? error.response.data : error;
    });
}

module.exports = {
  main
}