import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private url = "http://localhost:3000/api/users/:user/messages"
  constructor(private http: HttpClient) { }



  mensajeService(msgForm:any){
    return this.http.post(this.url,msgForm);
  }
}
