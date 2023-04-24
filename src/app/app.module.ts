import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { SignupComponent } from '../app/signup/signup.component';
import { LoginComponent } from '../app/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { GroupsComponent } from './groups/groups.component';
import { MatButtonModule } from '@angular/material/button';
import { PersonalExpensesComponent } from './personal-expenses/personal-expenses.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { AddExpenseDialogComponent } from './add-expense-dialog/add-expense-dialog.component';
import { AddGroupExpenseDialogComponent } from './add-group-expense-dialog/add-group-expense-dialog.component';
import { MatRadioModule } from '@angular/material/radio';



const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent},
  { path: 'groups', component: GroupsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    LoginSignupComponent,
    GroupsComponent,
    PersonalExpensesComponent,
    NotificationsComponent,
    SettingsComponent,
    GroupDetailComponent,
    AddExpenseDialogComponent,
    AddGroupExpenseDialogComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule,
    MatRadioModule

    


  ],
 providers: [Router],
  bootstrap: [AppComponent],
  entryComponents: [AddExpenseDialogComponent],
})
export class AppModule { }

