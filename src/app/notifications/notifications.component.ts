import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<string[]> = new Observable<string[]>();

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.notifications$ = this.notificationsService.getNotifications();
  }
  
  deleteNotification(index: number): void {
    this.notificationsService.deleteNotification(index);
  }
}
