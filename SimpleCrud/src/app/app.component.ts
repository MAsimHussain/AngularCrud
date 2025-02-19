import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,EmployeesComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SimpleCrud';
}
