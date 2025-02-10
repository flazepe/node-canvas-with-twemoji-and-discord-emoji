const splitEntitiesFromText = require("./utils/splitEntitiesFromText"),
	loadTwemojiImageByUrl = require("./utils/loadTwemojiImageByUrl"),
	getFontSizeByCssFont = require("./utils/getFontSizeByCssFont"),
	measureText = require("./measureText");

module.exports = async (ctx, fillType, text, x, y, { maxWidth = Infinity, emojiSideMarginPercent = 0.1, emojiTopMarginPercent = 0.1 } = {}) => {
	const textEntities = splitEntitiesFromText(text),
		fontSize = getFontSizeByCssFont(ctx.font),
		baseLine = ctx.measureText("").alphabeticBaseline,
		textAlign = ctx.textAlign,
		transform = ctx.currentTransform,
		emojiSideMargin = fontSize * emojiSideMarginPercent,
		emojiTopMargin = fontSize * emojiTopMarginPercent,
		textWidth = measureText(ctx, text, { emojiSideMarginPercent }).width;

	// Text align
	let textLeftMargin = 0;

	if (!["", "left", "start"].includes(textAlign)) {
		ctx.textAlign = "left";

		switch (textAlign) {
			case "center":
				textLeftMargin = -textWidth / 2;
				break;

			case "right":
			case "end":
				textLeftMargin = -textWidth;
				break;
		}
	}

	// Draw
	let width = 0;

	if (textWidth > maxWidth) {
		const scale = maxWidth / textWidth;
		ctx.setTransform(scale, 0, 0, 1, 0, 0);
		x = x / scale;
	}

	for (let i = 0; i < textEntities.length; i++) {
		const entity = textEntities[i];
		if (typeof entity === "string") {
			// Common text case
			if (fillType === "fill") {
				ctx.fillText(entity, textLeftMargin + x + width, y);
			} else {
				ctx.strokeText(entity, textLeftMargin + x + width, y);
			}

			width += ctx.measureText(entity).width;
		} else {
			// Emoji case
			const emoji = await loadTwemojiImageByUrl(entity.url);
			ctx.drawImage(emoji, textLeftMargin + x + width + emojiSideMargin, y + emojiTopMargin - fontSize - baseLine, fontSize, fontSize);
			width += fontSize + emojiSideMargin * 2;
		}
	}

	// Restore
	if (textAlign) ctx.textAlign = textAlign;

	ctx.setTransform(transform);
};
