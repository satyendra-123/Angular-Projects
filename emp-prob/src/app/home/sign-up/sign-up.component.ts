import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Emp } from '../modal/emp.modal';
import { EmpService } from '../service/emp.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private empSvc: EmpService) { }

  signUpForm: FormGroup

  msg: string = ''
  success: boolean = false
  error: boolean = false

  ngOnInit() {
    this.createForm()
  }

  createForm(){
      this.signUpForm = new FormGroup({
          'email' : new FormControl('', [Validators.required, Validators.email]),
          'phone' : new FormControl('', [Validators.required, Validators.maxLength(10)]),
          'fname' : new FormControl('', Validators.required),
          'lname' : new FormControl('', Validators.required),
          'gender' : new FormControl('other', Validators.required),
          'dob' : new FormControl('', Validators.required),
          'password': new FormControl('', Validators.required)
      })
  }

  reset(){
    this.signUpForm.reset()
  }

  onSubmit(){
      if(this.signUpForm.invalid){
        return
      }else{
         this.empSvc.addEmp(this.prepareDataForServer()).then(res=>{
           if(res && res.success){
              this.msg = res.summaryMessage
              this.success = true
           }
         }).catch(error=>{
             console.log('error '+error)
         })
      }
  }

  prepareDataForServer(): Emp{
      let fm = this.signUpForm.value
      let emp = new Emp()
      emp.email = fm.email
      emp.fname = fm.fname
      emp.lname = fm.lname
      emp.gender = fm.gender
      emp.dob = fm.dob
      emp.password = fm.password
      emp.phone = fm.phone
      return emp
  }
}
