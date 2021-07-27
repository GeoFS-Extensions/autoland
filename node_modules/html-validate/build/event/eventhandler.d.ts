/** @hidden */
export declare type EventCallback = (event: string, data: any) => void;
export declare class EventHandler {
    listeners: {
        [event: string]: EventCallback[];
    };
    constructor();
    /**
     * Add an event listener.
     *
     * @param event {string} - Event names (comma separated) or '*' for any event.
     * @param callback {function} - Called any time even triggers.
     * @return deregistration function.
     */
    on(event: string, callback: EventCallback): () => void;
    /**
     * Add a onetime event listener. The listener will automatically be removed
     * after being triggered once.
     *
     * @param event {string} - Event names (comma separated) or '*' for any event.
     * @param callback {function} - Called any time even triggers.
     * @return deregistration function.
     */
    once(event: string, callback: EventCallback): () => void;
    /**
     * Trigger event causing all listeners to be called.
     *
     * @param event {string} - Event name.
     * @param [data] {any} - Event data.
     */
    trigger(event: string, data: any): void;
}
export default EventHandler;
