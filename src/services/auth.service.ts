import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from 'src/interfaces/client.interface';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private _http: HttpClient) { }

  getClient(): Observable<IClient> {
    return this._http.get<IClient>('/api/client');
  }

  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>('/api/login', { email, password });
  }
}
