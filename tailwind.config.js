/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Vite 的 HTML 入口文件
    './src/**/*.{js,ts,jsx,tsx}', // 包含所有可能使用 Tailwind 的文件
  ],
  theme: {
    extend: {}, // 你可以在这里扩展默认配置
  },
  plugins: [],
};
