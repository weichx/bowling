//a basic event emitter implementation
class EventEmitter {

    constructor() {
        this.listeners = {};
    }

    on(eventName, handler, once) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push({
            fn: handler,
            once: once
        });
    }

    once(eventName, handler) {
        this.on(eventName, handler, true);
    }

    emit(eventName, ...args) {
        var listeners = this.listeners[eventName] || [];
        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            listener.fn.apply(null, args);
            if (listener.once) {
                this.listeners[eventName].splice(i, 1);
                i--;
            }
        }

    }

    remove(eventName, handler) {
        var listeners = this.listeners[eventName];
        if (!listeners) return;
        var index = listeners.indexOf(handler);
        index !== -1 && listeners.splice(index, 1);
    }

    off(eventName, handler) {
        this.remove(eventName, handler);
    }

    removeAllListeners() {
        this.listeners = {};
    }

    removeAll(eventName) {
        this.listeners[eventName] = [];
    }

}

module.exports = EventEmitter;