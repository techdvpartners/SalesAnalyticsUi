import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {
  MatSelectModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule, MatGridListModule, MatSnackBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SaleNavComponent } from './sale-nav/sale-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './dailogs/add-user/add-user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { HTTPListener, HTTPStatus } from './service/interceptor/inerceptor.service';
import { SaleService } from './service/sale.service';
import { AuthService } from './service/auth.service';
import { NgProgressModule } from '@ngx-progressbar/core';

import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { LoaderComponent } from './loader/loader.component';
import { InterceptorService } from './service/interceptor.service';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { GridModule } from '@progress/kendo-angular-grid';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { ReportIssueComponent } from './dailogs/report-issue/report-issue.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SaleNavComponent,
    DashboardComponent,
    HomeComponent,
    AddUserComponent,
    LoaderComponent,
    ReportIssueComponent,
   
  ],
  imports: [
    
    
    ReactiveFormsModule ,
    FormsModule ,  
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    LayoutModule, 
    MatSidenavModule, 
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    MatSnackBarModule,
    NgProgressModule.forRoot({
      spinnerPosition: 'right',
      color: '#f71cff',
      thick: true
    }),
    NgProgressHttpModule.forRoot(),
    PDFExportModule,
    GridModule,
    ExcelExportModule
  ],
  providers: [
   
    SaleService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    }
   
  
   
  ],
  bootstrap: [AppComponent],
  entryComponents:[AddUserComponent, ReportIssueComponent]
})
export class AppModule { }
