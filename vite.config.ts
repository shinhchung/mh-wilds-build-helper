import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
  },
  base: '/mh-wilds-build-helper/',
  define: {
    __DEV__: JSON.stringify(false),
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
