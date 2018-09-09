import {ColorHelper} from "../helpers/ColorHelper";
import {GameEvents} from "../enum/GameEvents";
import {Color} from "./Color";
import {MousePositionInterface} from "../interfaces/MousePositionInterface";
import {MouseEvents} from "../enum/MouseEvents";
import {Selectors} from "../enum/Selectors";

export class Gradient {
    private _canvas: any;
    private _context: any;

    public constructor() {
        this._canvas = <HTMLCanvasElement> document.getElementById(Selectors.Canvas);
        this._context = this._canvas.getContext("2d");

        this.initEvents();
    }

    public activate(): void {
        this._canvas.classList.add("active");
    }

    public deactivate(): void {
        this._canvas.classList.remove("active");
    }

    private initEvents(): void {
        this._canvas.addEventListener(MouseEvents.Click, (event: any) => {
            this.onMouseClick(event);
        });
    }

    private onMouseClick(event: any): void {
        const mousePos = this.getMousePos(event);
        const mouseColor = this.getMouseColor(mousePos.x, mousePos.y);

        document.dispatchEvent(new CustomEvent(GameEvents.ColorPicked, {detail: mouseColor}));
    }

    private getMouseColor(x: any, y: any): string {
        const p = this._context.getImageData(x, y, 1, 1).data;
        return "#" + ("000000" + ColorHelper.rgbToHex(p[0], p[1], p[2])).slice(-6);
    }

    private getMousePos(e: any): MousePositionInterface {
        const rect = this._canvas.getBoundingClientRect();

        return {
            x: (e.clientX - rect.left) / (rect.width / this._canvas.width),
            y: (e.clientY - rect.top) / (rect.height / this._canvas.height),
        };
    }

    public draw(color: Color): void {
        this.addPoint(`rgba(${color.gradientColors[1]},1)`, `rgba(${color.gradientColors[0]},0)`, 0,150,1,0,150,200);
        this.addPoint(`rgba(${color.gradientColors[2]},1)`, `rgba(${color.gradientColors[1]},0)`, 150,150,1,150,150,200);
        this.addPoint(`rgba(${color.gradientColors[0]},1)`, `rgba(${color.gradientColors[2]},0)`, 75,0,1,75,0,200);
    }

    private addPoint(primaryColor: string, secondaryColor: string, ...gradientData: number[]): void {
        const radialGradient = this._context.createRadialGradient(...gradientData);
        radialGradient.addColorStop(0, primaryColor);
        radialGradient.addColorStop(1, secondaryColor);

        this._context.fillStyle = radialGradient;
        this._context.fillRect(0,0,150,150);
    }
}