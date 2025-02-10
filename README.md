# node-canvas-with-twemoji-and-discord-emoji

A fork of [node-canvas-with-twemoji](https://github.com/cagpie/node-canvas-with-twemoji) by [cagpie](https://github.com/cagpie) with Discord emoji support.

## Installation

```sh
$ npm install node-canvas-with-twemoji-and-discord-emoji
```

[npm](https://www.npmjs.com/package/node-canvas-with-twemoji-and-discord-emoji)

## Quick Example

```js
const { createCanvas } = require("canvas");
const { fillTextWithTwemoji } = require("node-canvas-with-twemoji-and-discord-emoji");

async function main() {
	const canvas = createCanvas(200, 200),
		ctx = ctx.getContext("2d");

	ctx.fillStyle = "#000000";
	ctx.font = "30px Arial";
	await fillTextWithTwemoji(context, "emoji 😉 discord emoji <:id:name>", 100, 100);
}

main();
```

## Dependencies

-   node-canvas [GitHub](https://github.com/Automattic/node-canvas)
-   @twemoji/parser [GitHub](https://github.com/jdecked/twemoji)

## Licence

### node-canvas-with-twemoji

Copyright (c) 2020-2021 cagpie / Shun Kobayashi <cagpie@gmail.com>

Code licensed under the MIT License: http://opensource.org/licenses/MIT
