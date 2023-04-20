import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }

  getNotifications(): Observable<string[]> {
    return this.notifications$.asObservable();
  }

  addNotification(notification: string): void {
    const notifications = this.notifications$.getValue();
    notifications.push(notification);
    this.notifications$.next(notifications);
  }

  clearNotifications(): void {
    this.notifications$.next([]);
  }

}
