const path = require('path');

module.exports = {
	reactStrictMode: true,
	output: 'export',
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};
