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
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,

} from '@angular/material';
import {RouterModule,
  Routes
} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesComponent } from './companies/companies.component';
import { EventsComponent } from './events/events.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule} from '@angular/forms';
import { CompanyListComponent } from './company-list/company-list.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import { NewEventComponent } from './new-event/new-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import {ErrorInterceptor} from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {AuthService} from './auth/auth.service';
import {CompaniesService} from './services/companies/companies.service';
import {EventsService} from './services/events/events.service';
import {EmailsService} from './services/emails/emails.service';
import { CompanyRegistrationModalComponent } from './modals/company-registration-modal/company-registration-modal.component';
import { NewCompanyRegistrationModalComponent } from './modals/new-company-registration-modal/new-company-registration-modal.component';
import { CompanyReportModalComponent } from './modals/company-report-modal/company-report-modal.component';
import { CompanyDeleteModalComponent } from './modals/company-delete-modal/company-delete-modal.component';



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
    CreateUserComponent,
    NewEventComponent,
    EventListComponent,
    EditCompanyComponent,
    EditEventComponent,
    ErrorComponent,
    CompanyRegistrationModalComponent,
    NewCompanyRegistrationModalComponent,
    CompanyReportModalComponent,
    CompanyDeleteModalComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialModule,
    // RouterModule.forRoot(appRoutes),
    FormsModule,
    // ReactiveFormsModule,
    // FormGroup,
    // FormBuilder,
    // Validators
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, CompanyRegistrationModalComponent, CompanyReportModalComponent]
})
export class AppModule { }
