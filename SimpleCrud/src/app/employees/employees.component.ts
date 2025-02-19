import { Component, inject,  OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeModel } from '../model/employeeModel';
import { FormBuilder,  FormGroup, FormsModule,  Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {   NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-employees',
  standalone:true,
  imports:  [ReactiveFormsModule,NgxSpinnerModule,FormsModule,CommonModule, RouterLink ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
}) 
export class EmployeesComponent implements OnInit {
  ngOnInit(): void {
    this.GetEmployees();

  }
  formContract!:  FormGroup;
  
  constructor(private toastr: ToastrService, private spinner:NgxSpinnerService,
    private fb:FormBuilder
  ) {
    this.InitiateForm();
  }

  InitiateForm(){
     this.formContract = this.fb.group({
       id:[0],
       firstName:['',Validators.required],
       lastName:['',Validators.required],
       email:['',Validators.required]
     })
  }




   services= inject(EmployeeService);
   employeeModel:EmployeeModel[]=[];
   
   obj:EmployeeModel = new EmployeeModel;
   
   GetEmployees(){
        this.services.GetEmployees().subscribe((res:any)=>{
          this.employeeModel = res;
        })
   }

   AddEmployee(){
    debugger;
     if(this.formContract.valid){
      
          this.formContract.markAllAsTouched
          let data = this.formContract.value
      this.spinner.show();
      this.services.AddEmployee(data).subscribe((res:any)=>{
       
        if(res.statusCode== 200){
         this.toastr.success(res.detail);
         this.formContract.reset();
         this.spinner.hide();
         this.GetEmployees();
      //  this.router.navigateByUrl("/employees");
        }
        else{
          this.spinner.hide();
         this.toastr.error(res.detail);
 
        }
     }),((error:any)=>{
       this.spinner.hide();
       this.toastr.error("Internal Server Error.");
       console.log(error)
 
     })
    }

   }

   DeleteEmployee(id:number){

    if(confirm("Are you sure?")==true){
      this.spinner.show();
      this.services.DeleteEmployee(id).subscribe((res:any)=>{

        if(res.statusCode == 200){
        this.toastr.success(res.detail);
          this.GetEmployees();
        }else{
          this.spinner.show();
          alert(res.detail)
        }
        this.spinner.hide()
      }),((error:any)=>{
        this.spinner.hide()
        console.log(error)
      })

    }


   }

   GetValue(e:EmployeeModel){
  
    this.formContract = this.fb.group({
      id:e.id,
      firstName:e.firstName,
      lastName:e.lastName,
      email:e.email
    })
   }

   UpdateEmployee(){
    this.spinner.show();
if(this.formContract.valid){
  let data = this.formContract.value;

  this.services.UpdateEmployee(data).subscribe((res:any)=>{
    if(res.statusCode== 200){
      this.toastr.success(res.detail);
      this.formContract.reset();
      this.spinner.hide();
      this.GetEmployees();
   //  this.router.navigateByUrl("/employees");
     }
     else{
      this.toastr.error(res.detail);
      this.spinner.hide();

     }
  }),((error:any)=>{
    this.toastr.error("Internal Server Error.");
    console.log(error)
    this.spinner.hide();

  })
}
this.spinner.hide();

   }

}
