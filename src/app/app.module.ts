import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatGridListModule, MatCardModule,
  MatMenuModule } from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesComponent } from './companies/companies.component';
import { EventsComponent } from './events/events.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
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

];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    CompaniesComponent,
    EventsComponent,
    AnalyticsComponent,
    UserSettingsComponent,
    LogoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
