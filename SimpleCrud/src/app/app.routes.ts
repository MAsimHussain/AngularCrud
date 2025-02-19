import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AddComponent } from './add-employee/add/add.component';

export const routes: Routes = [

    {
        path:"employees",
        component:EmployeesComponent
    },
    {
        path:"add",
        component:AddComponent
    },
    
    {
        path:"add/:id",
        component:AddComponent
    }
];
