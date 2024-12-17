module.exports = {
    globDirectory: 'dist/',
    globPatterns: [
        '**/*.{html,js,jsx,css,png,jpg,json,svg,gif,ico}', // Add jsx here
    ],
    globIgnores: [],
    swDest: 'dist/sw.js',
    runtimeCaching: [
		{
			urlPattern: ({ request }) => request.destination === 'document', // Cache HTML
			handler: 'NetworkFirst',  // First try to fetch from the network, fallback to cache
			options: {
				cacheName: 'html-cache',
			},
		},
		{
			urlPattern: ({ request }) =>
				request.destination === 'script' || request.destination === 'style', // Cache JS and CSS
			handler: 'StaleWhileRevalidate',
			options: {
				cacheName: 'assets-cache',
			},
		},
		{
			urlPattern: ({ request }) => request.destination === 'image', // Cache images
			handler: 'CacheFirst',
			options: {
				cacheName: 'image-cache',
				expiration: {
					maxEntries: 50,
					maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
				},
			},
		},
	],	
};
