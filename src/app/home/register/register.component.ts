import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public serial = '';

  constructor(private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {}

  validarChaveSerial(chave: string) {
    console.log(chave);
    let chaveSemEspaco = chave.replace(/[\s-]/g, ''); // Remove espaços e traços

    const chaveEmpresa = `${chaveSemEspaco[15]}${chaveSemEspaco[8]}${chaveSemEspaco[6]}${chaveSemEspaco[0]}`;
    const chaveLoja = `${chaveSemEspaco[12]}${chaveSemEspaco[9]}${chaveSemEspaco[7]}${chaveSemEspaco[1]}`;
    const chaveGrupoLojas = `${chaveSemEspaco[2]}${chaveSemEspaco[13]}${chaveSemEspaco[5]}${chaveSemEspaco[11]}`;

    return {chaveEmpresa, chaveLoja, chaveGrupoLojas};
  }

  registrar() {
    if(this.serial.length < 16){
      this.erroRegistro('');
      return false;
    }

    let chaves = this.validarChaveSerial(this.serial);
    console.log(chaves);
    if(!chaves)
    {
      this.erroRegistro('');
        return false;
    }

      let codigoEmpresa = parseInt(chaves.chaveEmpresa).toString();
      let codigoLoja = parseInt(chaves.chaveLoja).toString();

      localStorage.setItem('codigoLoja', codigoLoja)
      localStorage.setItem('codigoEmpresa', codigoEmpresa);

      this.router.navigate(['/home/login']);
      return true;
  };



  async erroRegistro(texto: string) {
    const alert = await this.alertCtrl.create({
      header: 'Aviso',
      subHeader: 'Número serial inválido',
      message: texto != '' ? texto : 'Certifique-se de que o número digitado está correto',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
  }
}
