/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      colors: {
        // LG CreateBoard 스타일 - 밝은 베이지/오프화이트
        surface: '#faf9f7',
        surfaceAlt: '#f5f4f1',
        accent: '#c8102e', // LG 스타일 레드 CTA
        // NEXO 메인 디자인 - 파란색 계열
        nexoBlue: '#1e3a5f',
        nexoBlueLight: '#2563eb',
      },
    },
  },
  plugins: [],
}
