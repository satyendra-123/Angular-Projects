import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Emp } from '../modal/emp.modal';


@Injectable()
export class EmpService{
    constructor(private http: HttpClient){
    }

    addEmp(emp: Emp): Promise<any>{
        console.log('emp '+JSON.stringify(emp))

        return this.http.post('/api/emp', emp).toPromise()
    }

    getEmp():Promise<Emp[]>{
        return this.http.get<Emp[]>('/api/emp').toPromise();
    }
}