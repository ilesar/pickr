export class MixinHelper {
    public static applyMixins(object: any, mixins: any[]) {
        mixins.forEach((mixin: any) => {
            Object.getOwnPropertyNames(mixin.prototype).forEach((propertyName) => {
                object.prototype[propertyName] = mixin.prototype[propertyName];
            });
        });
    }

}
