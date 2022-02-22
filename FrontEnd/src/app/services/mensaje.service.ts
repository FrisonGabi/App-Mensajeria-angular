import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private url = "http://localhost:3000/api/users/:user/messages"
  private url2 = `http://localhost:3000/api/users/${localStorage.getItem("user")}/messages/inbox`
  private url3 = `http://localhost:3000/api/users/${localStorage.getItem("user")}/messages/sent`
  constructor(private http: HttpClient) { }



  mensajeService(msgForm:any){
    return this.http.post(this.url,msgForm);
  }


  mensajeRecibido(){

    let header = new HttpHeaders()
    .set("Type-content", "application/json")
     return this.http.get(this.url2, {
      headers:header
  })

  }

  mensajeEnviado(){

    let header = new HttpHeaders()
    .set("Type-content", "application/json")
     return this.http.get(this.url3, {
      headers:header
  })

  }

}
