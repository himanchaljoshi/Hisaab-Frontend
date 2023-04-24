import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from '../groups.service';

export interface AddGroupExpenseDialogData {
  members: Member[];
}

@Component({
  selector: 'app-add-group-expense-dialog',
  templateUrl: './add-group-expense-dialog.component.html',
  styleUrls: ['./add-group-expense-dialog.component.css']
})
export class AddGroupExpenseDialogComponent {
  description = '';
  amount = 0;
  paidBy: number | undefined;
  selectedMembers: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddGroupExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddGroupExpenseDialogData
  ) { }

  get members() {
    return this.data.members;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAddExpense(): void {
    if (this.description && this.amount && this.paidBy && this.selectedMembers.length) {
      this.dialogRef.close({
        description: this.description,
        amount: this.amount,
        paidBy: this.paidBy,
        participants: this.selectedMembers
      });
    } else {
      alert('Please fill in all fields and select at least one participant.');
    }
  }
}
