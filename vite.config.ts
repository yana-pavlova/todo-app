import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
	const isGitHubPages = process.env.VITE_GH_PAGES === 'true';
	const isProduction = mode === 'production';
	return {
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		css: {
			modules: {
				localsConvention: 'camelCase',
			},
		},
		test: {
			globals: true,
			environment: 'happy-dom',
			setupFiles: './src/test/setup.ts',
			include: ['src/**/*.{test,spec}.{ts,tsx}'],
		},
		base: isGitHubPages ? '/todo-app/' : '/',
	};
});
