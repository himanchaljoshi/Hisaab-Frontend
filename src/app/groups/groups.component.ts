import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';



import { Router } from '@angular/router';
import { GroupsService, Group } from '../groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];
  name: string = '';
  notificationsService: NotificationsService;
  

  constructor(
    private router: Router, 
    notificationsService: NotificationsService, 
    private groupsService: GroupsService) { 
    this.notificationsService = notificationsService;
  }
    ngOnInit() {
      this.groupsService.getGroups().subscribe((groups: Group[]) => {
        this.groups = groups;
      });
    }

    addGroup(): void {
      if (this.name.trim()) {
        const newGroup: Group = { groupName: this.name.trim() }; // Change 'name' to 'groupName'
        this.groupsService.addGroup(newGroup).subscribe((group: Group) => {
          this.groups.push(group);
          this.name = '';
          this.notificationsService.addNotification(`New group created with the name ${group.groupName}`);
        });
      } else {
        alert('Please enter a group name.');
      }
    }

  onGroupClick(group: Group): void {
    this.router.navigate(['/groups', group.groupId]);
  }

}


