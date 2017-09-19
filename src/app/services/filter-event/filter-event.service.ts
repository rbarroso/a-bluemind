import { Injectable } from '@angular/core';
import { Observer } from '../../models/observer.interface';


@Injectable()
export class FilterEventService {

  private observers: Observer[] = [];

  constructor() { }

  register(observer: any) {
    if (this.observers.indexOf(observer) == -1 ){
      this.observers.push(observer);
    }
  }

  unregister(observer: any) {
    let index = this.observers.indexOf(observer);
    if (index != -1) {
      this.observers.splice(index,1);
    }
  }

  publish(message?: any) {
    for (let observer of this.observers) {
      observer.onEvent(message);
    }
  }
}
