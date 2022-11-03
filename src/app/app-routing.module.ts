import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { CategoryComponent } from './categories/components/category/category.component';
import { ClientComponent } from './clients/components/client/client.component';
import { MemberComponent } from './members/components/member/member.component';
import { ProjectComponent } from './projects/components/project/project.component';
import { FilterHeaderComponent } from './reports/components/filter-header/filter-header.component';
import { AddTimesheetComponent } from './timesheets/componenets/add-timesheet/add-timesheet.component';
import { TimesheetsComponent } from './timesheets/componenets/timesheets/timesheets.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'categories',component:CategoryComponent,canActivate:[AuthGuard]},
  {path:'clients',component:ClientComponent,canActivate:[AuthGuard]},
  {path:'projects',component:ProjectComponent,canActivate:[AuthGuard]},
  {path:'members',component:MemberComponent,canActivate:[AuthGuard]},
  {path:'reports',component:FilterHeaderComponent,canActivate:[AuthGuard]},
  {path:'timesheets',component:TimesheetsComponent,canActivate:[AuthGuard]},
  {path:'add',component:AddTimesheetComponent,canActivate:[AuthGuard]},
  {path:'**',component:TimesheetsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
