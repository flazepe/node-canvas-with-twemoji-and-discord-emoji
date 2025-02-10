const splitEntitiesFromText = require("./utils/splitEntitiesFromText"),
	getFontSizeByCssFont = require("./utils/getFontSizeByCssFont");

module.exports = (ctx, text, { emojiSideMarginPercent = 0.1 } = {}) => {
	const textEntities = splitEntitiesFromText(text),
		fontSize = getFontSizeByCssFont(ctx.font),
		emojiSideMargin = fontSize * emojiSideMarginPercent;

	let width = 0;

	for (let i = 0; i < textEntities.length; i++) {
		const entity = textEntities[i];
		if (typeof entity === "string") {
			// Common text case
			width += ctx.measureText(entity).width;
		} else {
			// Emoji case
			width += fontSize + emojiSideMargin * 2;
		}
	}

	const { alphabeticBaseline } = ctx.measureText("");

	return { width, alphabeticBaseline };
};
