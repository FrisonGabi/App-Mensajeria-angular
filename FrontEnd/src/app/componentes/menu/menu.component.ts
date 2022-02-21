import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogged:any;

  constructor() { 

    this.userLogged = localStorage.getItem("user");
  }

  ngOnInit(): void {

    


  }

}
