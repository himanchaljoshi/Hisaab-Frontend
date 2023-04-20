import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../app/login/login.component';

import { SignupComponent } from '../app/signup/signup.component';

import { DashboardComponent } from '../app/dashboard/dashboard.component';

import { LoginSignupComponent } from '../app/login-signup/login-signup.component';

import { GroupsComponent } from './groups/groups.component';

import { PersonalExpensesComponent } from './personal-expenses/personal-expenses.component';

import { NotificationsComponent } from './notifications/notifications.component';

import { SettingsComponent } from './settings/settings.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';


const routes: Routes = [
  { path: 'login-signup', component: LoginSignupComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'groups', component: GroupsComponent},
  { path: 'personal-expenses', component: PersonalExpensesComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'groups/:groupId', component: GroupDetailComponent }, 
  { path: '', redirectTo: 'login-signup', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

