import { Component, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon]
})
export class AppHeaderComponent {
  @Input() title: string = '';
  @Input() showBackButton: boolean = true;
  @Input() showUserIcon: boolean = true;
  @Input() showTitleOnMobile: boolean = true;
  @Input() backButtonHref: string = '/home';
  @Input() backButtonText: string = 'Atrás';

  isWebMobile: boolean = false;

  constructor(private platform: Platform, private router: Router) {
    addIcons({ personCircleOutline });
    
    // Detectar plataforma
    const isCapacitor = this.platform.is('capacitor');
    const isMobile = this.platform.is('mobile');
    this.isWebMobile = isMobile && !isCapacitor;
  }

  onUserIconClick() {
    console.log('User icon clicked');
    // ir a la pantalla de perfil config 
    this.router.navigate(['/config']);
  }
}
