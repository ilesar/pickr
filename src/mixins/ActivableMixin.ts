
export class ActivableMixin {
    private _wrapper: any;
    private _lock: boolean;

    public activate(): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            this._lock = true;

            if (this._wrapper.classList.contains(HideableMixinModifier.Active)) {
                // console.log(`Already activated ${this.constructor.name}`);
                this._lock = false;
                resolve();
            }

            this._wrapper.removeEventListener(HideableMixinEvent.TransitionEnded, (event: any) => {/**/});
            this._wrapper.addEventListener(HideableMixinEvent.TransitionEnded, () => {
                // console.log(`Just activated ${this.constructor.name}`);
                this._lock = false;
                resolve();
            });

            this._wrapper.classList.add(HideableMixinModifier.Active);
            // console.log(`Activating ${this.constructor.name}...`);
        });
    }

    public deactivate(): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            this._lock = true;

            if (!this._wrapper.classList.contains(HideableMixinModifier.Active)) {
                this._lock = false;
                resolve();
            }

            this._wrapper.removeEventListener(HideableMixinEvent.TransitionEnded, (event: any) => {/**/});
            this._wrapper.addEventListener(HideableMixinEvent.TransitionEnded, () => {
                this._lock = false;
                resolve();
            });

            this._wrapper.classList.remove(HideableMixinModifier.Active);
        });
    }
}

enum HideableMixinModifier {
    Active = "active",
}

enum HideableMixinEvent {
    TransitionEnded = "transitionend",
}
