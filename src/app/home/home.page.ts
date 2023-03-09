import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(private router: Router) {
    let codigoEmpresa = parseInt(localStorage.getItem('codigoEmpresa') || '0').toString();
    console.log(codigoEmpresa, 'homepage');

    if(codigoEmpresa){
      this.router.navigate(['/home/login']);
    }else{
      this.router.navigate(['/home/register']);
    }
  }

}
