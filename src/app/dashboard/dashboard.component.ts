import { Component, OnInit } from '@angular/core';
import { MembersService } from '../members.service';
import { Expense, ExpenseService } from '../expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  recentExpenses: Expense[] = [];

  constructor(
    private memberService: MembersService,
    private expenseService: ExpenseService,
  ) { }

  ngOnInit() {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    } else {
      // Handle the case when the user data is not available in local storage
      // For example, navigate back to the login page or show an error message
    }
  
    // Fetch user-specific data like groups and notifications
    // You can call your memberService methods here to get the required data

    // Fetch recent personal expenses
    this.expenseService.getRecentExpenses().subscribe((expenses: Expense[]) => {
      this.recentExpenses = expenses;
    });
  }
}
