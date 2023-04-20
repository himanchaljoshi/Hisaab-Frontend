import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService, Group, Member, Expense} from '../groups.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  newGroupName: string = '';
  group: Group | undefined;
  members!: Member[];
  expenses!: Expense[];
  newExpense: Expense = {
    description: '', amount: 0,
    id: 0
  };

  constructor(private route: ActivatedRoute, private groupsService: GroupsService, private router: Router) { }

  ngOnInit(): void {
    const groupId = Number(this.route.snapshot.paramMap.get('groupId'));
    this.groupsService.getGroup(groupId).subscribe((group: Group) => {
      this.group = group;
    });

    this.groupsService.getMembersForGroup(groupId).subscribe((members: Member[]) => {
      console.log('Fetched members:', members); // Add this line
      this.members = members;
    });

    this.groupsService.getGroupExpensesByGroupId(groupId).subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
    });
  }

  addExpense(): void {
    if (this.group) {
      this.groupsService.addExpenseToGroup(this.group.groupId!, this.newExpense).subscribe((expense: Expense) => {
        this.expenses.push(expense);
        this.newExpense = { description: '', amount: 0, id: 0 };
      });
    }
  }

  deleteExpense(expense: Expense): void {
    if (this.group) {
      this.groupsService.deleteExpenseFromGroup(this.group.groupId!, expense.id).subscribe(() => {
        this.expenses = this.expenses.filter(e => e !== expense);
      });
    }
  }

  deleteMember(member: Member): void {
    if (this.group) {
      this.groupsService.deleteMemberFromGroup(this.group.groupId!, member.id).subscribe(() => {
        this.members = this.members.filter(m => m !== member);
      });
    }
  }

  showTotalExpenses(): void {
    // Implement the show total expenses functionality
  }

  editGroup(): void {
    if (this.group?.groupName) {
      // Update the group name with the new value
      this.group.groupName = this.newGroupName;
      this.groupsService.editGroup(this.group.groupId!, this.group).subscribe(() => {
        console.log(`Group with ID ${this.group?.groupId} updated successfully`);
      });
    }
  }

  deleteGroup(): void {
    const confirmed = window.confirm(`Are you sure you want to delete the group '${this.group?.groupName}'?`);
    if (confirmed) {
      this.groupsService.deleteGroup(this.group?.groupId!).subscribe(() => {
        console.log(`Group with ID ${this.group?.groupId} deleted successfully`);
        this.router.navigateByUrl("/groups")
      });
    }
  }

// group-detail.component.ts
addMembers(): void {
  const usernamesStr = prompt("Enter the usernames of the members you want to add (comma-separated):");
  if (usernamesStr && this.group) {
    const usernames = usernamesStr.split(',').map(username => username.trim());
    this.groupsService.addGroupMembers(this.group.groupId!, usernames).subscribe(
      (members: Member[]) => {
        this.members.push(...members);
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }
}


}


