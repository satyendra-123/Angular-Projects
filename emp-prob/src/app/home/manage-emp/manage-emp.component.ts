import { Emp } from './../modal/emp.modal';
import { EmpService } from './../service/emp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'manage-emp',
  templateUrl: './manage-emp.component.html',
  styleUrls: ['./manage-emp.component.css']
})
export class ManageEmpComponent implements OnInit {

  error: boolean
  errMsg: string
  empData: Emp[]
  constructor(private empSvc: EmpService) { }

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees(){
    this.error = false
    this.empSvc.getEmp().then(res=>{
      if(!res || res.length == 0){
        this.error = true
        this.errMsg = 'No Data available in mongo db as of now'
      }else{
          this.empData = res
      }
    }).catch(error=>{
        this.errMsg = error
    })
  }
}
