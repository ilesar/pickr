import {GameEvents} from "../enum/GameEvents";
import {MouseEvents} from "../enum/MouseEvents";
import {Selectors} from "../enum/Selectors";
import {MethodNotImplementedError} from "../errors/MethodNotImplementedError";
import {ColorHelper} from "../helpers/ColorHelper";
import {MousePositionInterface} from "../interfaces/MousePositionInterface";
import {Color} from "./Color";

export class Gradient {
    private _wrapper: any;
    private _context: any;
    private _currentColor: Color;
    private _lock: boolean = false;

    public constructor() {
        this._wrapper = document.getElementById(Selectors.Canvas) as HTMLCanvasElement;
        this._context = this._wrapper.getContext("2d");

        this.initEvents();
    }

    public async activate(): Promise<void> {
        throw new MethodNotImplementedError();
    }

    public async deactivate(): Promise<void> {
        throw new MethodNotImplementedError();
    }

    public draw(color: Color): number {
        this.addPoint(
            `rgba(${color.gradientColors[1]},1)`,
            `rgba(${color.gradientColors[0]},0)`,
            0, 150, 1, 0, 150, 200);
        this.addPoint(
            `rgba(${color.gradientColors[2]},1)`,
            `rgba(${color.gradientColors[1]},0)`,
            150, 150, 1, 150, 150, 200);
        this.addPoint(
            `rgba(${color.gradientColors[0]},1)`,
            `rgba(${color.gradientColors[2]},0)`,
            75, 0, 1, 75, 0, 200);
        this.addCircle();

        this._currentColor = color;
        return this.calculateEpsilon();
    }

    private initEvents(): void {
        this._wrapper.removeEventListener(MouseEvents.Click, () => {/**/});
        this._wrapper.addEventListener(MouseEvents.Click, (event: any) => {
            this.onMouseClick(event);
        });
    }

    private onMouseClick(event: any): void {
        if (this.isLocked()) {
            return;
        }

        this._lock = true;
        const mousePos = this.getMousePos(event);
        const mouseColor = this.getMouseColor(mousePos.x, mousePos.y);

        document.dispatchEvent(new CustomEvent(GameEvents.ColorPicked, {detail: mouseColor}));
    }

    private getMouseColor(x: any, y: any): string {
        const p = this._context.getImageData(x, y, 1, 1).data;
        return "#" + ("000000" + ColorHelper.rgbToHex(p[0], p[1], p[2])).slice(-6);
    }

    private getMousePos(e: any): MousePositionInterface {
        const rect = this._wrapper.getBoundingClientRect();

        return {
            x: (e.clientX - rect.left) / (rect.width / this._wrapper.width),
            y: (e.clientY - rect.top) / (rect.height / this._wrapper.height),
        };
    }

    private addPoint(primaryColor: string, secondaryColor: string, ...gradientData: number[]): void {
        const radialGradient = this._context.createRadialGradient(...gradientData);
        radialGradient.addColorStop(0, primaryColor);
        radialGradient.addColorStop(1, secondaryColor);

        this._context.fillStyle = radialGradient;
        this._context.fillRect(0, 0, 150, 150);
    }

    private addCircle() {
        this._context.beginPath();
        this._context.arc(100, 75, 1, 0, 2 * Math.PI);
        this._context.fill();
    }

    private isLocked(): boolean {
        return this._lock;
    }

    private calculateEpsilon(): number {
        let min: number = 255;
        for (let i = 0; i < this._wrapper.width; i++) {
            for (let j = 0; j < this._wrapper.height; j++) {
                const data = this._context.getImageData(i, j, 1, 1).data;
                const delta: number = this.calculateDistanceTo(data[0], data[1], data[2]);

                if (delta < min) {
                    min = delta;
                }
            }
        }

        return min;
    }

    private calculateDistanceTo(r: number, g: number, b: number): number {
        return ColorHelper.colorDiffHex(ColorHelper.rgbToHex(r, g, b), this._currentColor.hex);
    }
}
