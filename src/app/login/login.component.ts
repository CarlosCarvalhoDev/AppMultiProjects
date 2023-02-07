import { IClient } from './../../interfaces/client.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  client: IClient = {} as IClient;
  loginForm: FormGroup = {} as FormGroup;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.initForm();

    this._authService.getClient().subscribe(client => {
      this.client = client;
    });
  }

  initForm(){
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async onSubmit() {
    if (this.loginForm.valid) {
        const loading = await this._loadingController.create({
            message: 'Por favor aguarde...'
        });
        await loading.present();
        this._authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
            res => {
                // Armazenar informações de autenticação
                localStorage.setItem('access_token', res.body.access_token);
                // Buscar configurações do cliente
                this._authService.getClient().subscribe(
                    client => {
                        this.client = client;
                        // Aplicar configurações dinamicamente
                        document.documentElement.style.setProperty('--primary-color', this.client.primaryColor);
                        document.documentElement.style.setProperty('--secondary-color', this.client.secondaryColor);
                        // navegar para a página inicial
                        this._router.navigateByUrl('/home');
                        loading.dismiss();
                    },
                    err => {
                        console.log(err);
                        loading.dismiss();
                    }
                );
            },
            err => {
                console.log(err);
                loading.dismiss();
            }
        );
    }
  }

  onForgotPassword(){}

}
