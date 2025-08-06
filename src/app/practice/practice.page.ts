import { Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
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
import { personCircleOutline, playOutline, micOutline, pauseOutline, expandOutline } from 'ionicons/icons';
import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';
import { TextToSpeechService } from 'src/app/services/text-to-voz.service';

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

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
  standalone: true,
  imports: [AppHeaderComponent, IonContent, IonButton, IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    CommonModule,
    FormsModule,
  ],
})
export class PracticePage implements OnInit, AfterViewInit {
  optionId: string = '';
  selectedOption: any = null;
  title: string = '';

  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  // Validaciones de plataforma
  isCapacitor: boolean = false;
  isMobile: boolean = false;
  isWebMobile: boolean = false;

  // Control de video
  isPlaying: boolean = false;

  practiceOptions: any = {
    img: {
      name: null,
      sonido: null,
      img: null,
    },
    video: {
      name: null,
      video: null,
    },
  }

  get practiceOptionsArray() {
    return Object.keys(this.practiceOptions).map(key => ({
      id: key,
      ...this.practiceOptions[key]
    }));
  }

  // Datos de ejemplo

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private tts: TextToSpeechService
  ) {
    addIcons({ personCircleOutline, playOutline, micOutline, pauseOutline, expandOutline });

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
      console.log('Datos recibidos -----------------------:', this.selectedOption);
      // Cargar contenido del tema
      this.practiceOptions.img.name = this.selectedOption.caracter;
      // this.practiceOptions.img.sonido = this.selectedOption.sonido;
      this.practiceOptions.img.img = 'assets/img/' + this.selectedOption.tema + '/' + this.selectedOption.caracter + '.jpeg';
      this.practiceOptions.video.name = this.selectedOption.caracter;
      this.practiceOptions.video.video = 'assets/video/' + this.selectedOption.tema + '/' + this.selectedOption.caracter + '.mp4';
      console.log('Opciones de práctica:', this.practiceOptions);
    }
  }



  ngAfterViewInit() {
    // Ya están accesibles los videos
    console.log('Videos disponibles:', this.videoPlayers.length);
  }


  getBackgroundColor(index: number): string {
    // Algoritmo para evitar colores consecutivos
    const colorIndex = (index * 3 + 1) % adventure_colors.length;
    return adventure_colors[colorIndex];
  }

  onOptionSelected(option: any) {
    console.log('Opción seleccionada:', option);
    // Navegar enviando datos en el state
    this.router.navigate(['/practice-detail', option.id], {
      state: {
        title: option.id,
      }
    });
  }

  playSound(option: any) {
    console.log('Reproduciendo sonido para:', option.name);
    // Aquí implementarías la reproducción del audio
    // Ejemplo: new Audio(option.sonido || 'assets/sounds/' + option.name.toLowerCase() + '.mp3').play();

    // Simulación de reproducción
    const audio = new Audio();
    audio.src = option.sonido || `assets/sounds/${option.name.toLowerCase()}.mp3`;
    audio.play().catch(error => {
      console.error('Error reproduciendo audio:', error);
      // Mostrar mensaje al usuario si no hay sonido disponible
    });
  }

  recordSound(option: any) {
    console.log('Iniciando grabación para:', option.name);
    // Aquí implementarías la grabación de audio
    // Podrias usar MediaRecorder API o un plugin de Capacitor

    // Por ahora, simulamos el proceso
    alert(`¡Ahora repite la letra "${option.name}"! 🎤`);

    // Ejemplo de implementación futura:
    // 1. Iniciar grabación
    // 2. Mostrar indicador visual
    // 3. Detener después de X segundos
    // 4. Comparar con audio original (opcional)
  }

  toggleVideo(videoElement: HTMLVideoElement) {
    if (videoElement.paused) {
      videoElement.play();
      this.isPlaying = true;
    } else {
      videoElement.pause();
      this.isPlaying = false;
    }
  }

  toggleFullscreen(videoElement: HTMLVideoElement) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoElement.requestFullscreen().catch(err => {
        console.error('Error al activar fullscreen:', err);
      });
    }
  }

  // playVideo(option: any) {
  //   console.log('Reproduciendo video:', option.name);
  //   // El video se reproduce usando los controles nativos
  //   // Aquí puedes agregar lógica adicional como tracking, etc.
  // }

  playVideo(option: any) {
    console.log('Reproduciendo video:', option.id);

    // Buscar el video correspondiente al option.id
    const videoRef = this.videoPlayers.find(
      ref => ref.nativeElement.getAttribute('data-id') === option.id
    );
    console.log('Video encontrado:', videoRef);


    if (videoRef) {
      // Pausar todos los demás
      // this.pauseAllVideosExcept(videoRef.nativeElement);

      // Reproducir este
      videoRef.nativeElement.play().catch(err => {
        console.error('Error al reproducir video:', err);
      });
    } else {
      console.warn('Video no encontrado para:', option);
    }
  }


  // reproducirTexto(texto: string, velocidad: number = 0.8) {
  //   const utterance = new SpeechSynthesisUtterance(texto);
  //   utterance.lang = 'es-MX'; // Español de México
  //   utterance.rate = velocidad;
  //   speechSynthesis.speak(utterance);
  // }

    reproducirLetra(texto: string, velocidad: number = 0.8) {
    // this.tts.speak(this.letra, 1.0); // velocidad normal
    this.tts.speak(texto, 0.8); // velocidad más lenta
  }

  reproducirPalabra(texto: string, velocidad: number = 0.8) {
    this.tts.speak(texto, 0.8); // velocidad más lenta
  }

}
