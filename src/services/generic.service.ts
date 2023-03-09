import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from 'src/interfaces/client.interface';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private _http: HttpClient, private _alertController: AlertController) { }


  //RESPONSAVEL POR BUSCAR UM TOKEN PRA PERMISSAO DE ACESSO USADO NO HEADER EM TODAS AS REQUISICOES.
  //E CHAMADA TODA VEZ QUE VAI A PAGINA DE LOGIN.
  obterToken():Observable<any>{
    let url = `${environment.baseref}/api/security/token`
    console.log(url);

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', '2')
      .set('username', 'Unilever')
      .set('password', 'ZAMdS9XoHxCZ51TRJB6+eg==');

    return this._http.post(url, body.toString(), { headers: headers });
  }


  //RECEBE UM TIPO COMO PARAMETRO 'error' OU 'success' E UMA MENSAGEM DO TIPO STRING
  //RETORNA UM ALERTA COM O TIPO DO ERRO E A MENSAGEM RECEBIDA.
  async showAlert(type: string, message: string) {
    const alert = await this._alertController.create({
      header: type === 'error' ? 'Erro' : 'Sucesso',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
