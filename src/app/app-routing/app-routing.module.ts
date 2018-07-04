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
import {AuthGuard} from '../auth/auth.guard';
import {EditCompanyComponent} from '../edit-company/edit-company.component';
import {EditEventComponent} from '../edit-event/edit-event.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-company/:companyId',
    component: EditCompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-event/:eventId',
    component: EditEventComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'edit',
  //   component: EditComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-settings',
    component: UserSettingsComponent,
    canActivate: [AuthGuard],
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
    component: CreateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-company',
    component: NewCompanyComponent,
    // canActivate: [AuthGuard],
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
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule { }
