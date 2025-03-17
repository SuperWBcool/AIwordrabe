const canvas = document.getElementById('clothingCanvas');
const ctx = canvas.getContext('2d');
let clothingImage = new Image();
let angle = 0;
let scale = 1;
let posX = canvas.width / 2;
let posY = canvas.height / 2;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let lastDist = 0; // 用来存储上次鼠标距离，用于缩放计算

const imageUpload = document.getElementById('imageUpload');

// 1. 上传图片
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      clothingImage.src = e.target.result;
      clothingImage.onload = function() {
        drawClothing();
      };
    };
    reader.readAsDataURL(file);
  }
});

// 2. 绘制衣服图像
function drawClothing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  // 旋转、缩放、平移
  ctx.translate(posX, posY);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.drawImage(clothingImage, -clothingImage.width / 2, -clothingImage.height / 2);

  ctx.restore();
}

// 3. 监听鼠标事件来进行缩放操作
canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.offsetX;
  dragStartY = e.offsetY;
  lastDist = 0; // 重新初始化
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const dx = e.offsetX - dragStartX;
  const dy = e.offsetY - dragStartY;
  
  // 计算拖拽的距离
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (lastDist) {
    const scaleChange = dist - lastDist; // 距离差值
    scale += scaleChange * 0.01; // 根据鼠标拖动的距离调整缩放
    scale = Math.max(0.1, Math.min(scale, 3)); // 限制缩放比例范围
    drawClothing(); // 更新绘制
  }

  lastDist = dist; // 更新上次拖拽的距离
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

// 初始画布状态
drawClothing();
