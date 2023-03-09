import { GenericService } from './../../../services/generic.service';
import { IClient } from '../../../interfaces/client.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rememberMe: boolean = false;
  loginForm: FormGroup = {} as FormGroup;

  constructor(
    private _authService: AuthService,
    private _genericService: GenericService,
    private _fb: FormBuilder,
    private _router: Router,
    private _loadingController: LoadingController,
  ) {

    let localStoragePasswordSaved = localStorage.getItem('savedPassword');

    if(localStoragePasswordSaved){
      this.rememberMe = true;
    }
    else{
      this.rememberMe = false;
    }
   }

  ngOnInit() {
    this.initForm();
    console.log(this.rememberMe);
    console.log(this.loginForm.value);
    this.getToken();
  }

  initForm(){
    this.loginForm = this._fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  getToken(){
    this._genericService.obterToken().subscribe({
      next: (result) => {
        const access_token = result.access_token;
        localStorage.setItem('access_token', access_token);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  async onSubmit() {
    if (!this.loginForm.valid) {
      this._genericService.showAlert('error', 'Existem campos em branco ou inválidos');
      return;
    }
    console.log('formulario valido')

    const loading = await this._loadingController.create({
      message: 'Autenticando...'
    });
    await loading.present();

    this._authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .pipe(
      tap((res) => {
        const userData = res.body;
        console.log(res, 'resposta');
        console.log(userData, 'user data que e a resposta.body')
        localStorage.setItem('codigoMotorista', userData.codigo);
        localStorage.setItem('nomeMotorista', userData.nome);
        localStorage.setItem('codigoLoja', userData.codigoLoja);
      }),
    )
    .subscribe({
      next: () => {
        this._genericService.showAlert('success', 'Login realizado com sucesso');
        this._router.navigateByUrl('/home');
        loading.dismiss();
      },
      error: (err) => {
        console.log(err);
        loading.dismiss();
        this._genericService.showAlert('error', 'Usuário ou senha inválidos')

      }
    });
  }

  savePassword() {
    console.log(this.rememberMe);
    if (this.rememberMe) {
      localStorage.setItem('password', this.loginForm.value.password);
    } else {
      localStorage.removeItem('password');
    }
  }

  onForgotPassword(){}

}
