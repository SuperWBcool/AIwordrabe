import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    //vue脚手架为我们构建好了web服务器以及代理服务器的环境
    // host:'192.168.220.227',
    host: "0.0.0.0", 
    port: 8080,  // 启动该项目的web端口
    // proxy: {
    //   "/api": {
    //     target: "http://8.138.155.188:8080/api/v2",
    //     // rewrite: (path) => path.replace("/api", ""),
    //   },
    // },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
