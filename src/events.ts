type Callback = {
  id: number;
  eventName: string;
  caller: any;
  callback: Function;
};

class Events {
  callbacks = [] as Array<Callback>;
  nextId = 0;

  // Emit
  emit(eventName: string, value: any) {
    this.callbacks.forEach((cb) => {
      if (cb.eventName === eventName) {
        cb.callback(value);
      }
    });
  }

  // Subscribe
  on(eventName: string, caller: any, callback: Function) {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });
    return this.nextId;
  }
  // Unsubscribe
  off(id: number) {
    this.callbacks = this.callbacks.filter((cb) => cb.id !== id);
  }

  unsubscribe(caller: any) {
    this.callbacks = this.callbacks.filter((cb) => cb.caller !== caller);
  }
}

export const events = new Events();
