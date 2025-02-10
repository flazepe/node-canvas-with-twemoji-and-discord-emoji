const DEFAULT_HEIGHT = 16;

// Get font size by cssFont and Return size in px.
module.exports = cssFont => {
	if (typeof cssFont !== "string") return DEFAULT_HEIGHT;

	const sizeFamily = cssFont.match(/([0-9.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)/);
	if (sizeFamily.length !== 3) return DEFAULT_HEIGHT;

	switch (sizeFamily[2]) {
		case "pt":
			return Number(sizeFamily[1]) / 0.75;
		case "pc":
			return Number(sizeFamily[1]) * 16;
		case "in":
			return Number(sizeFamily[1]) * 96;
		case "cm":
			return Number(sizeFamily[1]) * (96.0 / 2.54);
		case "mm":
			return Number(sizeFamily[1]) * (96.0 / 25.4);
		case "%":
			return Number(sizeFamily[1]) * (DEFAULT_HEIGHT / 100 / 0.75);
		case "em":
		case "rem":
			return Number(sizeFamily[1]) * (DEFAULT_HEIGHT / 0.75);
		case "q":
			return Number(sizeFamily[1]) * (96 / 25.4 / 4);
		case "px":
		default:
			return Number(sizeFamily[1]);
	}
};
