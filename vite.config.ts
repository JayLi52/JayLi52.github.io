import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rawPlugin from 'vite-plugin-raw';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), rawPlugin({
    match: /\.py$/, // 配置支持的文件类型
  }),

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置 @ 指向 src
    },
  },
  base: '/dist/'
})

