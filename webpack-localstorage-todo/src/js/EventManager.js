export class EventManager {
  constructor() {}

  setController(controller) {
    this.controller = controller;
  }

  fireEvent(eventName, eventParams) {
    if (this.controller[eventName]) {
      this.controller[eventName](eventParams);
    } else {
      console.error("event not found", eventName, eventParams);
    }
  }
}

export const eventManager = new EventManager();
