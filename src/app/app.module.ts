import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,

} from '@angular/material';
import {RouterModule,
  Routes
} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesComponent } from './companies/companies.component';
import { EventsComponent } from './events/events.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { CompanyListComponent } from './company-list/company-list.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import {AppRoutingModule} from './app-routing/app-routing.module';



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
    LoginComponent,
    CompanyListComponent,
    NewCompanyComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    // RouterModule.forRoot(appRoutes),
    FormsModule,
    // ReactiveFormsModule,
    // FormGroup,
    // FormBuilder,
    // Validators
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
