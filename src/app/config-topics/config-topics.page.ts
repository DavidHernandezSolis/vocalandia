import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonIcon,
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
  IonList,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonAlert,
  IonListHeader,
  IonThumbnail
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, addOutline, saveOutline, logInOutline, logOutOutline, personAddOutline, createOutline, informationCircleOutline } from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';

addIcons({
  personCircleOutline,
  addOutline,
  saveOutline,
  logInOutline,
  logOutOutline,
  personAddOutline,
  createOutline,
  informationCircleOutline
});

@Component({
  selector: 'app-config-topics',
  templateUrl: './config-topics.page.html',
  styleUrls: ['./config-topics.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButtons,
    IonIcon,
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
    IonList,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonAccordion,
    IonAccordionGroup,
    IonBadge,
    IonAlert,
    IonListHeader,
    IonThumbnail
  ]
})
export class ConfigTopicsPage implements OnInit {



  private supabase = inject(SupabaseService);

  // Validaciones de plataforma
  isCapacitor: boolean = false;
  isMobile: boolean = false;
  isWebMobile: boolean = false;

  // 
  // optionId: string = '';
  // selectedOption: any = null;
  title: string = 'Temas y actividades';
  topicsList: any[] = [];
  topic = {
    title: '',
    description: '',
    image_url: '',
    order_index: this.topicsList.length + 1
  };
  imageFile: File | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private alertController: AlertController
  ) {
    // Validar plataformas
    this.isCapacitor = this.platform.is('capacitor');
    this.isWebMobile = this.platform.is('mobile');
    this.isMobile = this.isWebMobile || this.isCapacitor;


    // validar session


  }

  ngOnInit() {
    this.loadTopics();
    // this.optionId = this.route.snapshot.paramMap.get('uuid') || '';
    // // Obtener los datos enviados desde home
    // const navigation = this.router.getCurrentNavigation();
    // if (navigation?.extras.state) {
    //   this.selectedOption = navigation.extras.state;
    //   this.title = this.selectedOption.title
    //   console.log('Datos recibidos:', this.selectedOption);
    // }
  }


  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }


  async submitTopic() {
    this.loading = true;
    try {
      if (!this.imageFile || !this.topic.title || !this.topic.description) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Por favor, selecciona una imagen. y agrega todos los datos',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
      const { error: uploadError } = await this.supabase.createTopic({
        title: this.topic.title,
        description: this.topic.description,
        file: this.imageFile,
        order_index: this.topic.order_index
      }); // supabase.storage.from('imagenes').upload(filePath, this.imageFile, { upsert: true });
      if (uploadError) throw uploadError;
      this.topic = { title: '', description: '', image_url: '', order_index: this.topicsList.length + 1 };
      this.imageFile = null;
      await this.loadTopics();
    } catch (err) {
      console.error('Error al guardar topic:', err);
    } finally {
      this.loading = false;
    }
  }


  async loadTopics() {
    const topics = await this.supabase.listTopics(); //.from('activity_topics').select('*').order('title');
    console.log('Topics:', topics);
    
    if (topics) {
      this.topicsList = topics;
    }
  }


  selectTopic(topic: any) {
   console.log(topic);
   
  }

  viewDetails(topic: any) {
    console.log(topic);
    
  }

}
