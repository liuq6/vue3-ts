import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './src/mock/source', // 解析，路径可根据实际变动
      localEnabled: true, // 此处可以手动设置为true，也可以根据官方文档格式
    }),
    mockDevServerPlugin(),
    DefineOptions(),
  ],
  server: {
    port: 8088,
    proxy: {
      // '^/mall-admin': 'http://120.24.64.5:8088/',
      '^/api': {
        target: 'http://example.com',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "@/assets/css/variable.scss";',
      },
    },
  },
})
