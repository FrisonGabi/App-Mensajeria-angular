import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  userLogged:any

  constructor(
    private router :Router,
    private mensajeService:MensajeService,
    
  ) { 
    this.userLogged = localStorage.getItem("user");

  }
  msgForm = new FormGroup({
    usuarioOrigen: new FormControl({value:localStorage.getItem("user"),disabled:false}),
    usuarioDestino: new FormControl,
    mensaje: new FormControl 
  })

  ngOnInit(): void {
  }

  sendMsg(){
    this.mensajeService.mensajeService(this.msgForm.value).subscribe((result:any)=>{
      console.log(result)
      this.msgForm.reset()
    })
  }


}
