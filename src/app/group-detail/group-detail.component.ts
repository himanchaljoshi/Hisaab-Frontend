import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService, Group, Member, GroupExpense} from '../groups.service';
import { NotificationsService } from '../notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupExpenseDialogComponent, AddGroupExpenseDialogData } from '../add-group-expense-dialog/add-group-expense-dialog.component';




@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  newGroupName: string = '';
  group: Group | undefined;
  members!: Member[];
  expenses: GroupExpense[] = [];
  newExpense: GroupExpense = {
    description: '', amount: 0,
    id: 0
    
  };

  constructor(
    private route: ActivatedRoute, 
    private groupsService: GroupsService, 
    private router: Router,
    private notificationService: NotificationsService,
    private dialog: MatDialog,

    ) { }

    ngOnInit(): void {
      const groupId = Number(this.route.snapshot.paramMap.get('groupId'));
      this.groupsService.getGroup(groupId).subscribe((group: Group) => {
        this.group = group;
      });
    
      // Retrieve members from localStorage
      const storageKey = `group-${groupId}-members`;
      const existingMembersStr = localStorage.getItem(storageKey);
      this.members = existingMembersStr ? JSON.parse(existingMembersStr) : [];
    
      this.groupsService.getGroupExpensesByGroupId(groupId).subscribe((expenses: GroupExpense[]) => {
        this.expenses = expenses;
      });

      // Retrieve expenses from localStorage
  const expensesStorageKey = `group-${groupId}-expenses`;
  const existingExpensesStr = localStorage.getItem(expensesStorageKey);
  this.expenses = existingExpensesStr ? JSON.parse(existingExpensesStr) : [];

    }
    
    generateOwedStatement(expense: GroupExpense): string {
      if (expense.owedBy && expense.paidBy) {
        const owedByName = this.members.find(member => member.id === parseInt(expense.owedBy ?? ''))?.name || 'unknown';
        const paidByName = this.members.find(member => member.id === parseInt(expense.paidBy ?? ''))?.name || 'unknown';
        const statement = `${owedByName} owes ${expense.amount} to ${paidByName}`;
        console.log(statement);
        return statement;
      } else {
        return '';
      }
    }
    
    

    getMemberNameById(id: number): string {
      const member = this.members.find(m => m.id === id);
      return member ? member.name : '';
    }
    
    addExpense(): void {
      if (this.group) {
        const dialogRef = this.dialog.open(AddGroupExpenseDialogComponent, {
          width: '500px',
          data: {
            members: this.members
          }
        });
    
        dialogRef.afterClosed().subscribe((result: any) => {
          if (result) {
            const newExpense: GroupExpense = {
              description: result.description,
              amount: result.amount,
              id: 0
            };
            this.groupsService.addGroupExpense(this.group!.groupId!, newExpense, result.paidBy, result.participants).subscribe(() => {
              // Update the expenses array with the expenses from the local storage
              const expensesStorageKey = `group-${this.group!.groupId}-expenses`;
              const existingExpensesStr = localStorage.getItem(expensesStorageKey);
              this.expenses = existingExpensesStr ? JSON.parse(existingExpensesStr) : [];
    
              // Update the members array with the balances from the local storage
              const membersStorageKey = `group-${this.group!.groupId}-members`;
              const existingMembersStr = localStorage.getItem(membersStorageKey);
              this.members = existingMembersStr ? JSON.parse(existingMembersStr) : [];
            });
          }
        });
      }
    }
    
    
  deleteExpense(expense: GroupExpense): void {
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
      const oldGroupName = this.group.groupName;
      this.group.groupName = this.newGroupName;
      this.groupsService.editGroup(this.group.groupId!, this.group).subscribe(() => {
        console.log(`Group with ID ${this.group?.groupId} updated successfully`);
        this.notificationService.addNotification(`You changed the group name from ${oldGroupName} to ${this.newGroupName}`);
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
  
  addMembers(): void {
    const usernamesStr = prompt("Enter the usernames of the members you want to add (comma-separated):");
    if (usernamesStr && this.group) {
      const usernames = usernamesStr.split(',').map(username => username.trim());
      this.groupsService.addGroupMembers(this.group.groupId!, usernames).subscribe(
        (members: Member[]) => {
          // Filter only valid member objects
          const validMembers = members.filter(member => typeof member === 'object' && member !== null);
          this.members.push(...validMembers);
  
          // Save members to localStorage
          const storageKey = `group-${this.group?.groupId}-members`;
          const existingMembersStr = localStorage.getItem(storageKey);
          const existingMembers = existingMembersStr ? JSON.parse(existingMembersStr) : [];
          localStorage.setItem(storageKey, JSON.stringify([...existingMembers, ...validMembers]));
  
          this.notificationService.addNotification(`You added new members to the group '${this.group?.groupName}': ${usernames}`);
        },
        (error: any) => {
          alert(error.message);
        }
      );
    }
  }
}


