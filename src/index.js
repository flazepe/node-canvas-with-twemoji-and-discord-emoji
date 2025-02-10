const drawTextWithTwemoji = require("./drawTextWithTwemoji"),
	measureText = require("./measureText");

exports.fillTextWithTwemoji = async (context, text, x, y, options = {}) => drawTextWithTwemoji(context, "fill", text, x, y, options);
exports.strokeTextWithTwemoji = async (context, text, x, y, options = {}) => drawTextWithTwemoji(context, "stroke", text, x, y, options);
exports.measureText = (context, text, options = {}) => measureText(context, text, options);
