import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rawPlugin from 'vite-plugin-raw';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), rawPlugin({
    match: /\.py$/, // 配置支持的文件类型
  }),
  ],
})

