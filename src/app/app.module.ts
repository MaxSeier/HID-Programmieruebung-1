import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './dashboard/data/data.component';
import { AddDataComponent } from './dashboard/add-data/add-data.component';
import { HeaderComponent } from './header/header.component';
import { PaginationPipe } from './dashboard/data/pagination.pipe';
import { ButtonComponent } from './dashboard/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { InfoPageComponent } from './info-page/info-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddDataComponent,
    DataComponent,
    HeaderComponent,
    PaginationPipe,
    ButtonComponent,
    InfoPageComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
