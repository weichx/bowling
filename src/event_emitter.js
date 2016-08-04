class EventEmitter {

    constructor() {
        this.listeners = {};
        this.subscribers = [];
    }

    addEventSubscriber(subscriber) {
        if (!subscriber || typeof subscriber !== "object") return null;

        this.subscribers.push(subscriber);
        return () => {
            return this.removeEventSubscriber(subscriber);
        };
    }

    removeEventSubscriber(subscriber) {
        var idx = this.subscribers.indexOf(subscriber);
        if (idx !== -1) this.subscribers.splice(idx, 1);
        return idx !== -1;
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
        for (i = 0; i < this.subscribers.length; i++) {
            var handler = this.subscribers[i];
            if (typeof handler[eventName] === "function") {
                handler[eventName].apply(handler, args);
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