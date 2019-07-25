import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private navCtrl: NavController, private loadingCtrl: LoadingController, private alertCtrl: AlertController) { 
    this.signupForm = fb.group({
      city: ['',Validators.compose([Validators.pattern('^([a-zA-Z\u0080-\u024F]+(?:. |-| |\'))*[a-zA-Z\u0080-\u024F]*$'),Validators.required])],
      email: ['',Validators.compose([Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'),Validators.required])],
      username: ['',Validators.compose([Validators.pattern(''),Validators.required])],
      password: ['',Validators.compose([Validators.minLength(8),Validators.required])],
      // confirmPassword: ['',Validators.compose([Validators.minLength(8),Validators.required])]
    });
  }

  ngOnInit() {
  }

  async signUp(value) {

    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    console.log(value);
    var databaseKey;
    var uid;
    this.authService.registerUser(value).then(res => {
       console.log(res);
       this.errorMessage = "";

      uid = res.user.uid;

      databaseKey = firebase.database().ref('/iclubApp_users/' + (res.user.uid)).set(
        {
          email: value.email,
          city: value.city,
          username: value.username,
          // role: "user"
        }
      ).then(result =>{
        this.navCtrl.navigateRoot('feed');
      });
    },
      error => {
        loading.dismiss();
        // this.navCtrl.setRoot("RegisterPage");
        console.log(error.message)
        this.showPopup("Sign-up Error!", "The email address is already in use by another account. Please provide different email address.");
      }).catch(err => {
        loading.dismiss();
        // this.navCtrl.setRoot("RegisterPage");
        this.showPopup("Sign-up Error!", "Please fill in all the fields");
      });
  }

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
