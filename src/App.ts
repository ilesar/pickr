import {Game} from "./Game";
import {MixinHelper} from "./helpers/MixinHelper";
import {ActivableMixin} from "./mixins/ActivableMixin";
import {HideableMixin} from "./mixins/HideableMixin";
import {Gradient} from "./models/Gradient";
import {StartButton} from "./models/StartButton";
import {Task} from "./models/Task";
import {BaseScene} from "./scenes/BaseScene";

(async () => {
    MixinHelper.applyMixins(StartButton, [HideableMixin]);
    MixinHelper.applyMixins(BaseScene, [HideableMixin]);
    MixinHelper.applyMixins(Gradient, [ActivableMixin]);
    MixinHelper.applyMixins(Task, [HideableMixin]);

    const game = new Game();
    await game.init();
})();
