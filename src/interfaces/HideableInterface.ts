export interface HideableInterface {
    show(): Promise<void>;
    hide(): Promise<void>;
}
