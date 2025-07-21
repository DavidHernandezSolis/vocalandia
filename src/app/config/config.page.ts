import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon,
  IonLabel,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
IonCardHeader,
IonCardTitle,
IonCardSubtitle,
IonItem,
IonList

 } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';
import {  Platform } from '@ionic/angular';


addIcons({ personCircleOutline });
@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonIcon,
    IonLabel,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle
    , IonItem,
    IonList
  ]
})
export class ConfigPage implements OnInit {
  // Validaciones de plataforma
  isCapacitor: boolean = false;
  isMobile: boolean = false;
  isWebMobile: boolean = false;

  isLogin: boolean = false;

  usuario:any={
    nombre: "David",
    edad: 22,
    tutor : '',
    terapeuta : '',
    calificacion : 0,
    comentarios : ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
  ) {
    // Validar plataformas
    this.isCapacitor = this.platform.is('capacitor');
    this.isWebMobile = this.platform.is('mobile');
    this.isMobile = this.isMobile || this.isCapacitor;
  }

  ngOnInit() {
  }

}
