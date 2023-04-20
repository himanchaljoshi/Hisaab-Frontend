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
          this.notificationsService.addNotification('New group created.');
        });
      } else {
        alert('Please enter a group name.');
      }
    }

  onGroupClick(group: Group): void {
    this.router.navigate(['/groups', group.groupId]);
  }

  addMember(): void {
    // perform action to add member to group
    this.notificationsService.addNotification('New member added to group.');
  }

  deleteMember(): void{
    this.notificationsService.addNotification('New member added to group.');
  }

  addExpense(): void {
    // perform action to add expense to group
    this.notificationsService.addNotification('New expense added to group.');
  }
}


