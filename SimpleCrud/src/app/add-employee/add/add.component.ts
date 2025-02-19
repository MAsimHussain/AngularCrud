import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  imports: [RouterLink,ReactiveFormsModule, FormsModule,NgxSpinnerModule,CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  employeeId:number = 0;
private readonly routr = inject(Router);
  ngOnInit(): void {
   var empId = this.route.snapshot.paramMap.get("id");
   this.employeeId= +empId!;
      if(this.employeeId != 0){
        this.GetEmployeeById(this.employeeId);

      }

  }


  formContract!: FormGroup;


  constructor
  (
    private fb:FormBuilder,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
    private router:Router


  ){
    this.InitiateForm();
  }
 
   services= inject(EmployeeService);

  InitiateForm(){
    this.formContract = this.fb.group({
      id:[0],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required]
    })
  }



  AddEmployee(){
    this.formContract.markAllAsTouched()
    this.spinner.show();

    if(this.formContract.valid){
      this.services.AddEmployee(this.formContract.value).subscribe((res:any)=>{
        if(res.statusCode == 200){

          this.toastr.success(res.detail);
            this.spinner.hide();

            this.formContract.reset();
            this.router.navigateByUrl("/employees")

        }
        else{
          this.toastr.success(res.detail);
          this.spinner.hide();


        }
      }),((error:any)=>{
        console.log(error)
        this.toastr.success("Internal server error.");
        this.spinner.hide();
      })
    }
    

    
    this.spinner.hide();

  }

  GetEmployeeById(id:Number){

    this.services.GetEmployeeById(id).subscribe((res:any)=>{
             
      this.formContract.reset({
        id:res.id,
        firstName:res.firstName,
        lastName:res.lastName,
        email:res.email
      });


      
    }),((error:any)=>{
      console.log(error)
    })
  }

  UpdateEmployee(){
    debugger;
    this.formContract.markAllAsTouched()

    this.spinner.show();
if(this.formContract.valid){
  let data = this.formContract.value;

  this.services.UpdateEmployee(data).subscribe((res:any)=>{
    if(res.statusCode== 200){
      this.toastr.success(res.detail);
      this.formContract.reset();
      this.spinner.hide();
     this.router.navigateByUrl("/employees");
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
