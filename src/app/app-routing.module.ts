import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'employee/:id', component: EmployeeDetailsComponent },
  { path: '**', redirectTo : '' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
