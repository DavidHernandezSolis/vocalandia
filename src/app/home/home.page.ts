import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DataLocalService } from "../services/data-local.service";
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
import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';


const back_colors = [
  // Rosa suave - cálido y acogedor
  'linear-gradient(135deg, #ffb3ba 0%, #ffdfba 100%)',

  // Azul cielo suave - tranquilo y concentración
  'linear-gradient(135deg, #bae1ff 0%, #baffc9 100%)',

  // Verde menta - relajante y natural
  'linear-gradient(135deg, #c8f7c5 0%, #a8e6cf 100%)',

  // Lavanda suave - calma y creatividad
  'linear-gradient(135deg, #e8d5ff 0%, #d4e6f1 100%)',

  // Melocotón cremoso - calidez y comodidad
  'linear-gradient(135deg, #ffe5b4 0%, #ffcccc 100%)',

  // Amarillo mantequilla - alegría sin saturación
  'linear-gradient(135deg, #fff2cc 0%, #f0f8d8 100%)',

  // Turquesa pastel - frescura y claridad mental
  'linear-gradient(135deg, #b8e6e1 0%, #c3e8ff 100%)',

  // Rosa polvo - suave y no invasivo
  'linear-gradient(135deg, #f5d5d0 0%, #f2e7d5 100%)',

  // Lila cremoso - imaginación y tranquilidad
  'linear-gradient(135deg, #e6d7ff 0%, #f0e6ff 100%)',

  // Verde agua - equilibrio y concentración
  'linear-gradient(135deg, #d0f0c0 0%, #e8f5e8 100%)'
];

// const practiceOptions = [
//   {
//     id: 'vowels',
//     title: 'Vocales',
//     description: 'Ejercicios de respiración y sonidos básicos',
//     icon: 'AE',
//     image: 'assets/images/vowels.png',
//     iconClass: 'vowels-icon',
//     color: 'danger'
//   },
//   {
//     id: 'abecedario',
//     title: 'Abecedario',
//     description: 'Ejercicios con el abecedario',
//     icon: 'ABC',
//     iconClass: 'vowels-icon',
//     color: 'blue'
//   },
//   {
//     id: 'syllables',
//     title: 'Sílabas',
//     description: 'Combinaciones de sonidos y ritmo',
//     icon: 'PA-MA',
//     iconClass: 'syllables-icon',
//     color: 'primary'
//   },
//   {
//     id: 'words',
//     title: 'Palabras',
//     description: 'Práctica de palabras completas',
//     icon: 'MAMÁ',
//     iconClass: 'words-icon',
//     color: 'medium'
//   },
//   {
//     id: 'numbers',
//     title: 'Numeros',
//     description: 'Práctica de numeros',
//     icon: '1-2-3',
//     // iconClass: 'words-icon',
//     color: 'medium'
//   }
// ];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [AppHeaderComponent, IonContent, IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
  ],
})
export class HomePage implements OnInit {
  practiceOptions: any = [];

  constructor(
    private platform: Platform,
    private router: Router,
    private dataLocalService: DataLocalService
  ) { }

  ngOnInit(): void {
    this.dataLocalService.obtenerTemas().subscribe(data => {
      this.practiceOptions = data;
      // console.log(data);

      // data.map((item: any) => ({
      //   ...item,
      //   color: item.color || 'primary', // Asignar un color por defecto si no se especifica
      //   iconClass: item.iconClass || 'default-icon' // Asignar una clase por defecto si no se especifica
      // }));
    });
    // this.dataLocalService.getData('example').subscribe(response => {
    //   this.data = response;
    // });
  }

  getBackgroundColor(index: number): string {
    // Algoritmo para evitar colores consecutivos
    const colorIndex = (index * 3 + 1) % back_colors.length;
    return back_colors[colorIndex];
  }

  onOptionSelected(option: any) {
    console.log('Opción seleccionada:', option);
    // Navegar enviando datos en el state
    this.router.navigate(['/adventure', option.id], {
      state: {
        title: option.title,
        description: option.description,
        icon: option.icon,
        color: option.color,
        ruta : option.ruta,
        tema: option.id
      }
    });
  }
}
