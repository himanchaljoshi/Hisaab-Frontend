// add-expense-dialog.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, CategoryService } from '../category.service';
import { NotificationsService } from '../notifications.service';

export interface ExpenseDialogData {
  description: string;
  amount: number;
  categoryId: number;
}

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.css'],
})
export class AddExpenseDialogComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseDialogData,
    private categoryService: CategoryService,
    private notificationService: NotificationsService  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addExpense(): void {
    const category = this.categories.find(c => c.categoryId === this.data.categoryId);
    const categoryName = category ? category.categoryName : 'Unknown';
    this.notificationService.addNotification(`You added an expense to category '${categoryName}': ${this.data.description} (${this.data.amount})`); 
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
