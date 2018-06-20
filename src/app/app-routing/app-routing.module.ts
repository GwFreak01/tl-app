import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {LoginComponent} from '../auth/login/login.component';
import {NavigationComponent} from '../navigation/navigation.component';
import {EventsComponent} from '../events/events.component';
import {CompaniesComponent} from '../companies/companies.component';
import {UserSettingsComponent} from '../user-settings/user-settings.component';
import {AnalyticsComponent} from '../analytics/analytics.component';
import {LogoutComponent} from '../auth/logout/logout.component';
import {NewCompanyComponent} from '../new-company/new-company.component';
import {CreateUserComponent} from '../auth/create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'companies',
    component: CompaniesComponent
  },
  {
    path: 'edit/:companyId',
    component: NewCompanyComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
  {
    path: 'user-settings',
    component: UserSettingsComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),

  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
