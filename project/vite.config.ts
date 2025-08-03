import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'import.meta.env.VITE_API_AUTH_LOGIN': JSON.stringify('http://localhost:5000/api/auth/login'),
    'import.meta.env.VITE_API_AUTH_VERIFY_OTP': JSON.stringify('http://localhost:5000/api/auth/verify-otp'),
  },
});

