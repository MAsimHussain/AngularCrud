import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../model/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  API_URL:string=    "https://localhost:44380/api/Employee/";

  headers= new HttpHeaders({
    'Content-Type':'application/json'
  })

   GetEmployees(){
   return this.http.get(this.API_URL+"Employees");

  }

  DeleteEmployee(id:number){
    
    return this.http.delete(this.API_URL+id);
  }

  AddEmployee(employee:EmployeeModel){
        const options = {headers:this.headers} 

    return this.http.post(this.API_URL, employee,options)
  }

  UpdateEmployee(employee:EmployeeModel){
    const options = {headers:this.headers} 

    return this.http.put(this.API_URL+employee.id, employee,options)
  }

  GetEmployeeById(id:Number){
    return this.http.get(this.API_URL+id);
  }
}
