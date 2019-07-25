import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

declare var firebase;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' }
    ]
  };

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private navCtrl: NavController) { 
    this.loginForm = fb.group({
      email: ['',Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'),Validators.required])],
      password: ['',Validators.compose([Validators.minLength(8),Validators.required])]
    });
  }

  ngOnInit() {
  }


  async login(value){
    
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    // firebase.auth().signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(user =>{
      this.authService.loginUser(value).then(res => {
      this.errorMessage = "";
      this.navCtrl.navigateRoot('feed');
    },error => {
      loading.dismiss();
      this.showPopup("Login Error!", "Incorrect Email or Password!");
    });
    
  }

  // signup(){
  //   this.router.navigate(['/register']);
  // }

  async showPopup(title: string, text:string){
    const alert = await this.alertCtrl.create({
      header: title,
      // subHeader: 'Subtitle',
      message: text,
      buttons: ['Cancel']
    });

    await alert.present();
  }
}
