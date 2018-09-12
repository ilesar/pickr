import {GameEvents} from "../enum/GameEvents";

export class HideableMixin {
    private _wrapper: any;

    public hide(): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            if (this._wrapper.classList.contains(HideableMixinModifier.Hidden)) {
                // console.log(`Already hidden ${this.constructor.name}`);
                resolve();
            }

            this._wrapper.removeEventListener(HideableMixinEvent.TransitionEnded, (event: any) => {/**/});
            this._wrapper.addEventListener(HideableMixinEvent.TransitionEnded, () => {
                // console.log(`Just hidden ${this.constructor.name}`);
                resolve();
            });

            this._wrapper.classList.add(HideableMixinModifier.Hidden);
            // console.log(`Hiding ${this.constructor.name}...`);
        });
    }

    public show(): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            if (!this._wrapper.classList.contains(HideableMixinModifier.Hidden)) {
                resolve();
            }

            this._wrapper.removeEventListener(GameEvents.ColorPicked, (event: any) => {/**/});
            this._wrapper.addEventListener(HideableMixinEvent.TransitionEnded, () => {
                resolve();
            });

            this._wrapper.classList.remove(HideableMixinModifier.Hidden);
        });
    }
}

enum HideableMixinModifier {
    Hidden = "hidden",
}

enum HideableMixinEvent {
    TransitionEnded = "transitionend",
}
