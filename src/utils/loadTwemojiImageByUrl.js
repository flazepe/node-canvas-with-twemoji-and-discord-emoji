const CACHED_TWEMOJI_IMAGES = new Map(),
	{ loadImage } = require("canvas");

module.exports = url =>
	new Promise(async (resolve, reject) => {
		if (CACHED_TWEMOJI_IMAGES.has(url)) return resolve(CACHED_TWEMOJI_IMAGES.get(url));

		try {
			const image = await loadImage(url);
			if (url.startsWith("https://cdn.jsdelivr.net")) CACHED_TWEMOJI_IMAGES.set(url, image);

			resolve(image);
		} catch (error) {
			reject(error);
		}
	});
