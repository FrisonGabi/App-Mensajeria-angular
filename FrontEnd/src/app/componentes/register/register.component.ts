import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  
  form = new FormGroup({

    user: new FormControl,
    lastName: new FormControl ,
    name: new FormControl ,
    country: new FormControl ,
    state: new FormControl ,
    password: new FormControl 
  })
  
  constructor(private http:HttpClient, private formBuilder:FormBuilder){
    
  }

  ngOnInit(): void {

 
}

   addUser(){
     
      console.log(this.form.value)
      this.http.post('http://localhost:3000/api/users',this.form.value).subscribe((result)=>{
        console.log(result)
        this.form.reset();
      })

  }

}
