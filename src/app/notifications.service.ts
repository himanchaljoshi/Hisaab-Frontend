import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.getNotificationsFromStorage());

  constructor() { }

  getNotifications(): Observable<string[]> {
    return this.notifications$.asObservable();
  }

  addNotification(notification: string): void {
    const notifications = this.notifications$.getValue();
    notifications.push(notification);
    this.notifications$.next(notifications);
    this.saveNotificationsToStorage(notifications);
  }

  deleteNotification(index: number): void {
    const notifications = this.notifications$.getValue();
    notifications.splice(index, 1);
    this.notifications$.next(notifications);
    this.saveNotificationsToStorage(notifications);
  }

  private getNotificationsFromStorage(): string[] {
    const notificationsString = localStorage.getItem('notifications');
    return notificationsString ? JSON.parse(notificationsString) : [];
  }

  private saveNotificationsToStorage(notifications: string[]): void {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }

}
