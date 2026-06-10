/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          black: '#050505',
          dark: '#0a0a0f',
          card: '#0d0d1a',
          border: '#1a1a2e',
          cyan: '#00f5ff',
          blue: '#0080ff',
          violet: '#8b5cf6',
          pink: '#d946ef',
          glow: '#00c8ff',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.8), 0 0 80px rgba(0, 245, 255, 0.3)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'forge-gradient': 'linear-gradient(135deg, #00f5ff 0%, #0080ff 50%, #8b5cf6 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(13,13,26,0.9) 0%, rgba(26,26,46,0.6) 100%)',
        'hero-radial': 'radial-gradient(ellipse at center, rgba(0,128,255,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
