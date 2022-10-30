import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './categories/components/category/category.component';
import { ClientComponent } from './clients/components/client/client.component';
import { MemberComponent } from './members/components/member/member.component';
import { ProjectComponent } from './projects/components/project/project.component';
import { FilterHeaderComponent } from './reports/components/filter-header/filter-header.component';

const routes: Routes = [
  {path:'categories',component:CategoryComponent},
  {path:'clients',component:ClientComponent},
  {path:'projects',component:ProjectComponent},
  {path:'members',component:MemberComponent},
  {path:'reports',component:FilterHeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
