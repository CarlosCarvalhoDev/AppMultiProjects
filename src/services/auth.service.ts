import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from 'src/interfaces/client.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  codigoEmpresa = parseInt(localStorage.getItem('codigoEmpresa') || '0').toString();
  codigoLoja = parseInt(localStorage.getItem('codigoLoja') || '0').toString();

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  });

  constructor(private _http: HttpClient) { }

  login(login: string, password: string): Observable<HttpResponse<any>> {
    let url = `${environment.baseref}/api/cliente/login/${this.codigoEmpresa}/${login}/${password}`;
    console.log(url);
    return this._http.get<HttpResponse<any>>(url,{ headers: this.headers });
  }


}
