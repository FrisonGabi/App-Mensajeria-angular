import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = "http://localhost:3000/api/users"
  constructor(private http:HttpClient) {
    
   }


  usuariosService(){
    let header = new HttpHeaders()
      .set("Type-content", "application/json")
    return this.http.get(this.url, {
      headers:header
    })

  }

}
