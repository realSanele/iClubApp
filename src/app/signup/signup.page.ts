import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

declare var firebase;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  
  constructor(private fb: FormBuilder, private navCtrl: NavController) { 
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

  signup(){
    firebase.auth().createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password).then(result =>{
      console.log("Done!!");
    });
    // this.navCtrl.navigateRoot('feed');
  }

}
