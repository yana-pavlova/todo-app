module.exports = {
	reactStrictMode: true,
	trailingSlash: true,
	async rewrites() {
		return [
			{
				source: '/tasks/:id',
				destination: '/tasks/[id]',
			},
		];
	},
	async exportPathMap() {
		const paths = {};
		paths['/'] = { page: '/' };
		
		for (let i = 1; i <= 200; i++) {
			paths[`/tasks/${i}`] = {
				page: '/tasks/[id]',
				query: { id: i.toString() },
			};
		}
		
		return paths;
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};
