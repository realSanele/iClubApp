import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  map: any;
  constructor(private geolocation : Geolocation) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.loadMap(resp.coords.latitude, resp.coords.longitude);
      // console.log("lat = "+resp.coords.latitude+" long = "+resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getLocation(){
    
  }

  loadMap(latitude:number, longitude:number){
    var uluru = {lat: latitude, lng : longitude};
    this.map = new google.maps.Map(document.getElementById('map'), {
      // center: {lat: latitude, lng: longitude},
      center: uluru,
      disableDefaultUI: true,
      zoom: 10
    });

    var marker = new google.maps.Marker({position: uluru, map: this.map});
  }

}
