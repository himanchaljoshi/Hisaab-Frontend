import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '../category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseDialogComponent, ExpenseDialogData } from '../add-expense-dialog/add-expense-dialog.component';
import { ExpenseService, Expense } from '../expense.service';


@Component({
  selector: 'app-personal-expenses',
  templateUrl: './personal-expenses.component.html',
  styleUrls: ['./personal-expenses.component.css'],
})
export class PersonalExpensesComponent implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';
  selectedCategory: Category | null = null;
  categoryExpenses: Expense[] = [];

  constructor(
    private categoryService: CategoryService, 
    public dialog: MatDialog,
    private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  selectCategory(category: Category): void {
    const categoryId = category.categoryId ? category.categoryId : 0; 
    this.selectedCategory = category;
    this.expenseService.getExpensesByCategory(categoryId).subscribe((expenses: Expense[]) => {
      this.categoryExpenses = expenses;
    });
  }

  addCategory(): void {
    if (this.newCategoryName.trim()) {
      const newCategory: Category = { categoryName: this.newCategoryName.trim() };
      this.categoryService.addCategory(newCategory).subscribe((category: Category) => {
        this.categories.push(category);
        this.newCategoryName = '';
      });
    }else {
      alert('Please enter a category name');
    }
  }

  addExpense(): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '250px',
      data: { description: '', amount: 0, categoryId: 0 },
    });
  
    dialogRef.afterClosed().subscribe((result: ExpenseDialogData) => {
      if (result) {
        const newExpense: Expense = {
          description: result.description,
          amount: result.amount,
          categoryId: result.categoryId,
        };
        this.expenseService.addExpense(newExpense).subscribe((expense: Expense) => {
          if (this.selectedCategory) {
            this.selectCategory(this.selectedCategory);
          }
        });
      }
    });
  }
  

  totalExpense(): void {
    this.expenseService.getTotalExpenses().subscribe((totalExpenses: number) => {
      // Display the total expenses, e.g. show an alert or update a variable in the component
      alert('Your Total Expense of the month is: ' + totalExpenses);
    });
  }
}


