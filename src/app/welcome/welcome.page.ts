import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { 
  IonContent, 
  IonImg, 
  IonButton, 
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  playCircleOutline, 
  informationCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonImg,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonText
  ],

})
export class WelcomePage implements OnInit {

  constructor(
    private platform: Platform,
    private router: Router) {
      const isCapacitor = this.platform.is('capacitor')
    // Registrar iconos que vamos a usar
    addIcons({ playCircleOutline, informationCircleOutline });
  }

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp() {
    try {
      // Ocultar splash screen nativo
      await SplashScreen.hide();
      
    } catch (error) {
      console.log('Error inicializando app:', error);
    }
  }

  startApp() {
    // Aquí puedes agregar lógica adicional como:
    // - Guardar que el usuario ya vio la bienvenida
    // - Verificar permisos
    // - Cargar datos iniciales
    
    console.log('Iniciando aplicación...');
    
    // Navegar a la página principal o home
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  // Método opcional para manejar el botón de atrás en Android
  ionViewWillEnter() {
    // Deshabilitar el botón de atrás en esta pantalla
    document.addEventListener('backbutton', this.onBackButton, false);
  }

  ionViewWillLeave() {
    document.removeEventListener('backbutton', this.onBackButton, false);
  }

  private onBackButton = (event: any) => {
    // Prevenir el comportamiento por defecto del botón atrás
    event.preventDefault();
    // Opcionalmente mostrar un diálogo de confirmación para salir
  }
}