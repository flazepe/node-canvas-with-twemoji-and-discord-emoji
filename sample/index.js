const EXPRESS_PORT = 8080,
	express = require("express"),
	{ createCanvas } = require("canvas"),
	{ fillTextWithTwemoji } = require("../src"),
	app = express();

app.get("/", async (req, res) => {
	const canvas = createCanvas(200, 500);
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, 200, 500);

	ctx.fillStyle = "#000";
	ctx.font = "30px serif";
	await fillTextWithTwemoji(ctx, "test <:hmm:792092150883942450> test ✨️", 10, 50);

	ctx.fillStyle = "#888";
	ctx.font = "18px serif";
	ctx.textAlign = "left";
	await fillTextWithTwemoji(ctx, "<:hmm:792092150883942450> left aligned 😳", 10, 100, { maxWidth: 100 });

	ctx.textAlign = "center";
	await fillTextWithTwemoji(ctx, "我々 <:hmm:792092150883942450> は宇宙人👽だ", 100, 150, { maxWidth: 100 });

	ctx.textAlign = "right";
	await fillTextWithTwemoji(ctx, "<:hmm:792092150883942450> right aligned 😳", 190, 200, { maxWidth: 100 });

	ctx.textAlign = "left";
	await fillTextWithTwemoji(ctx, "<:hmm:792092150883942450> left 😳", 10, 250);

	ctx.textAlign = "center";
	await fillTextWithTwemoji(ctx, "<:hmm:792092150883942450> center 😳", 100, 300);

	ctx.textAlign = "right";
	await fillTextWithTwemoji(ctx, "<:hmm:792092150883942450> right 😳", 190, 350);

	if (req.query.text) await fillTextWithTwemoji(ctx, req.query.text, 190, 400);

	res.set("content-type", "image/png");
	return res.send(canvas.toBuffer());
});

app.listen(EXPRESS_PORT, () => console.log(`Listening on port ${EXPRESS_PORT}.`));
