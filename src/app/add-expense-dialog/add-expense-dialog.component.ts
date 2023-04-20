// add-expense-dialog.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, CategoryService } from '../category.service';
import { ExpenseService, Expense } from '../expense.service';

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
    private expenseService: ExpenseService // Inject the ExpenseService here
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addExpense(): void {
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
