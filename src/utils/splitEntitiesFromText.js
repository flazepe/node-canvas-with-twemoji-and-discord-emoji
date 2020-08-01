const { parse } = require('twemoji-parser');

/*
 * Split Text
 * ex) 
 *  '君👼の味方🤝だよ'
 *  > ['君', TwemojiObj(👼), 'の味方', TwemojiObj(🤝), 'だよ']
 */
 
function matchDiscordEmojis(text) { return text.match(/<?(a:|:)\w*:(\d{17}|\d{18})>/); }

function parseDiscordEmojis(entities) {
  const newArray = [];
  
  for (const entity of entities) {
	if (typeof entity === "string") {
	  const words = entity.replace(/<?(a:|:)\w*:(\d{17}|\d{18})>/, " $& ").split(/\s+/);
	  
	  words.map(word => matchDiscordEmojis(word)
		? newArray.push({ url: `https://cdn.discordapp.com/emojis/${matchDiscordEmojis(word)[2]}.png` })
		: newArray.push(word)
	  );
	}
	
	else newArray.push(entity);
  }
  
  return newArray;
}

module.exports = function splitEntitiesFromText (text) {
  const twemojiEntities = parse(text, { assetType: 'svg' });

  let unparsedText = text;
  let lastTwemojiIndice = 0;
  const textEntities = [];
  
  twemojiEntities.forEach((twemoji) => {
    textEntities.push(
      unparsedText.slice(0, twemoji.indices[0] - lastTwemojiIndice)
    );

    textEntities.push(twemoji);

    unparsedText = unparsedText.slice(twemoji.indices[1] - lastTwemojiIndice);
    lastTwemojiIndice = twemoji.indices[1];
  });

  textEntities.push(unparsedText);

  return parseDiscordEmojis(textEntities);
}
