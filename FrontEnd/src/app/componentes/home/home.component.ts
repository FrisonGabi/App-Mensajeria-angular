import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  userLogged:any
  public usuarios: Array<any> = []
  public mensajesRecibidos: Array<any> = []
  public mensajesEnviados: Array<any> = []

  constructor(
    private router :Router,
    private mensajeService:MensajeService,
    private usuariosService :UsuariosService
  ) { 

    this.userLogged = localStorage.getItem("user");
    this.getUsers()
    this.getMsgInbox()
    this.getMsgSent()
  }
  msgForm = new FormGroup({
    usuarioOrigen: new FormControl({value:localStorage.getItem("user"),disabled:false}),
    usuarioDestino: new FormControl(Validators.required),
    mensaje: new FormControl, 
    
  })

  ngOnInit(): void {
  }

  sendMsg(){
    this.mensajeService.mensajeService(this.msgForm.value).subscribe((result:any)=>{
      console.log(result)
    })      
    this.msgForm.reset()
    window.location.reload()
  }

  getUsers(){
    
    this.usuariosService.usuariosService().subscribe((result:any) =>{
      console.log(result)
      this.usuarios = result
      
    })
  }

  getMsgInbox(){
    this.mensajeService.mensajeRecibido().subscribe((result:any)=>{
      console.log(result)
      this.mensajesRecibidos = result;
    })

  }
  getMsgSent(){
    this.mensajeService.mensajeEnviado().subscribe((result:any)=>{
      console.log(result)
      this.mensajesEnviados = result;
    })

  }

  showDiv = {
    enviar : false,
    recibidos : false,
    enviados : false
  }

  logOut(){   
    localStorage.clear()
  }

}
