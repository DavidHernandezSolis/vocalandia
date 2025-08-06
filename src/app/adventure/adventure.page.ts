import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton, IonIcon,
  IonLabel,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,

} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';
import { DataLocalService } from "../services/data-local.service";

const adventure_colors = [
  // Morado intenso - creatividad potente
  'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
  
  // Azul eléctrico - energía clara
  'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  
  // Morado real fuerte - elegancia llamativa
  'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
  
  // Azul cobalto intenso - fuerza estable
  'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
  
  // Lila vibrante - dulzura potente
  'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
  
  // Azul índigo fuerte - claridad profunda
  'linear-gradient(135deg, #4338ca 0%, #5b21b6 100%)',
  
  // Morado magenta intenso - energía visible
  'linear-gradient(135deg, #c026d3 0%, #a21caf 100%)',
  
  // Azul royal fuerte - libertad poderosa
  'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)'
];

const adventureOptions = [
  { id: 'option10', title: 'J' },
  { id: 'option11', title: 'K' },
  { id: 'option12', title: 'L' },
  { id: 'option13', title: 'M' },
  { id: 'option14', title: 'N' },
  { id: 'option15', title: 'O' },
  { id: 'option16', title: 'P' },
  { id: 'option17', title: 'Q' },
];

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.page.html',
  styleUrls: ['./adventure.page.scss'],
  standalone: true,
  imports: [AppHeaderComponent, IonContent, 
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class AdventurePage implements OnInit {
  optionId: string = '';
  selectedOption: any = null;
  title: string = '';
  tema : string = '';

  // Validaciones de plataforma
  isCapacitor: boolean = false;
  isMobile: boolean = false;
  isWebMobile: boolean = false;

  // Datos de ejemplo
  adventureOptions: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private dataLocalService: DataLocalService
  ) {
    addIcons({ personCircleOutline });

    // Validar plataformas
    this.isCapacitor = this.platform.is('capacitor');
    this.isWebMobile = this.platform.is('mobile');
    this.isMobile = this.isMobile || this.isCapacitor;

    console.log('Plataforma:', {
      isCapacitor: this.isCapacitor,
      isMobile: this.isMobile,
      isWebMobile: this.isWebMobile
    });
  }

  ngOnInit() {
    // Obtener el ID del parámetro de la ruta
    this.optionId = this.route.snapshot.paramMap.get('optionId') || '';

    // Obtener los datos enviados desde home
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.selectedOption = navigation.extras.state;
      this.title = this.selectedOption.title
      console.log('Datos recibidos:', this.selectedOption);
      // Cargar contenido del tema
      this.dataLocalService.obtenerContenidoDeTema(this.selectedOption.ruta).subscribe(data => {
        console.log('Contenido del tema:', data);
        this.adventureOptions = data;
      });
    }
  }
  getBackgroundColor(index: number): string {
    // Algoritmo para evitar colores consecutivos
    const colorIndex = (index * 3 + 1) % adventure_colors.length;
    return adventure_colors[colorIndex];
  }

  onOptionSelected(option: any) {
    console.log('Opción seleccionada:', option);
    // Navegar enviando datos en el state
    this.router.navigate(['/practice', option.caracter], {
      state: {
        title: option.caracter.toUpperCase(),
        // description: option.description,
        // icon: option.icon,
        caracter: option.caracter,
        palabra: option.palabra,
        tema:  this.selectedOption.tema,
        ...option
      }
    });
  }

}
