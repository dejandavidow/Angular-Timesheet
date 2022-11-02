import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationtabsComponent } from './navigationtabs/navigationtabs.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CategoryComponent } from './categories/components/category/category.component';
import { ClientComponent } from './clients/components/client/client.component';
import { AddCategoryComponent } from './categories/components/add-category/add-category.component';
import { CategoryListComponent } from './categories/components/category-list/category-list.component';
import { OneCategoryComponent } from './categories/components/one-category/one-category.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReactiveFormsModule} from '@angular/forms';
import { FilterbarComponent } from './filterbar/filterbar.component'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddClientComponent } from './clients/components/add-client/add-client.component';
import { ClientListComponent } from './clients/components/client-list/client-list.component';
import { OneClientComponent } from './clients/components/one-client/one-client.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProjectComponent } from './projects/components/project/project.component';
import { AddProjectComponent } from './projects/components/add-project/add-project.component';
import { ProjectListComponent } from './projects/components/project-list/project-list.component';
import { OneProjectComponent } from './projects/components/one-project/one-project.component'; 
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { AddMemberComponent } from './members/components/add-member/add-member.component';
import { MemberListComponent } from './members/components/member-list/member-list.component';
import { MemberComponent } from './members/components/member/member.component';
import { OneMemberComponent } from './members/components/one-member/one-member.component';
import { FilterHeaderComponent } from './reports/components/filter-header/filter-header.component';
import { ReportsListComponent } from './reports/components/reports-list/reports-list.component';
import { TimesheetsComponent } from './timesheets/componenets/timesheets/timesheets.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
registerLocaleData(en);
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { AddTimesheetComponent } from './timesheets/componenets/add-timesheet/add-timesheet.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationtabsComponent,
    CategoryComponent,
    ClientComponent,
    AddCategoryComponent,
    CategoryListComponent,
    OneCategoryComponent,
    FilterbarComponent,
    AddClientComponent,
    ClientListComponent,
    OneClientComponent,
    ProjectComponent,
    AddProjectComponent,
    ProjectListComponent,
    OneProjectComponent,
    AddMemberComponent,
    MemberListComponent,
    MemberComponent,
    OneMemberComponent,
    FilterHeaderComponent,
    ReportsListComponent,
    TimesheetsComponent,
    AddTimesheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTabsModule,
    NzButtonModule,
    NzCollapseModule,
    NzInputModule,
    NzFormModule,
    NzTypographyModule,
    NzPaginationModule,
    NzMessageModule,
    NzSpinModule,
    NzTableModule,
    NzModalModule,
    ReactiveFormsModule,
    NzIconModule,
    NzSelectModule,
    NzRadioModule,
    NzCalendarModule,
    NzDatePickerModule,
    NzBadgeModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
