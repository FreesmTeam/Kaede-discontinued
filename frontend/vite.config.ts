import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line
// @ts-ignore
import { resolve } from 'path';
// eslint-disable-next-line
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            // eslint-disable-next-line
            // @ts-ignore
            '@': resolve(__dirname, 'src'),
        },
    },
});
