/**
 * 开发配置
 */
const app = require('express')();
const Bundler = require('parcel-bundler');

var base=require('./base');
base={
	...base,
	contentHash:false,
};

(async function() {
	const port=8080
	// Initializes a bundler using the entrypoint location and options provided
	const bundler = new Bundler(base.entryFiles, base);

	// Run the bundler, this returns the main bundle
	// Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
	// const bundle = await bundler.bundle();
	bundler.on('bundled', (bundle) => {
		// bundler contains all assets and bundles, see documentation for details
		console.log('bundled event')
	});
	// Call this to start bundling
	// bundler.bundle();

	// Let express use the bundler middleware, this will let Parcel handle every request over your express server
	app.use(bundler.middleware());

	// Listen on port 8080
	console.log('parcel watch on port '+port)
	app.listen(port);
})();
