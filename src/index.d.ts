import { CanvasRenderingContext2D } from "canvas";

declare module "node-canvas-with-twemoji-and-discord-emoji" {
	export interface DrawOptions {
		maxWidth?: number;
		emojiSideMarginPercent?: number;
		emojiTopMarginPercent?: number;
	}

	export function fillTextWithTwemoji(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, options?: DrawOptions): Promise<void>;

	export function strokeTextWithTwemoji(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, options?: DrawOptions): Promise<void>;

	export function measureText(
		ctx: CanvasRenderingContext2D,
		text: string,
		options?: { emojiSideMarginPercent?: number }
	): { width: number; alphabeticBaseline: number };
}
