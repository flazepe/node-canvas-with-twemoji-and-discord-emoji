const DISCORD_EMOJI_PATTERN = /<a?:\w{2,32}:(\d{17,19})>/,
	{ parse } = require("@twemoji/parser");

/*
 * Split Text
 * ex)
 *  '君👼の味方🤝だよ'
 *  > ['君', TwemojiObj(👼), 'の味方', TwemojiObj(🤝), 'だよ']
 */
module.exports = text => {
	const twemojiEntities = parse(text, { assetType: "png" });

	let unparsedText = text,
		lastTwemojiIndice = 0;

	const textEntities = [];

	for (const twemoji of twemojiEntities) {
		textEntities.push(unparsedText.slice(0, twemoji.indices[0] - lastTwemojiIndice));
		if (twemoji.url) textEntities.push(twemoji);

		unparsedText = unparsedText.slice(twemoji.indices[1] - lastTwemojiIndice);
		lastTwemojiIndice = twemoji.indices[1];
	}

	textEntities.push(unparsedText);

	return parseDiscordEmojis(textEntities);
};

function parseDiscordEmojis(textEntities) {
	const newTextEntities = [];

	for (const entity of textEntities) {
		if (typeof entity === "string") {
			for (const word of entity.replace(new RegExp(DISCORD_EMOJI_PATTERN, "g"), "\u200b$&\u200b").split("\u200b")) {
				const match = word.match(DISCORD_EMOJI_PATTERN);
				newTextEntities.push(match ? { url: `https://cdn.discordapp.com/emojis/${match[1]}.png` } : word);
			}
		} else {
			newTextEntities.push(entity);
		}
	}

	return newTextEntities;
}
