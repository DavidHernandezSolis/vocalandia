import { Component, OnInit } from '@angular/core';
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
  IonAlert
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, addOutline, saveOutline, logInOutline, logOutOutline, personAddOutline } from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';

addIcons({ 
  personCircleOutline, 
  addOutline, 
  saveOutline, 
  logInOutline, 
  logOutOutline, 
  personAddOutline 
});

interface Usuario {
  id?: string;
  name: string;
  age: number;
  tutor: string;
  terapeuta: string;
  calificacion: number;
  comentarios: string;
  fechaRegistro?: Date;
}

interface PracticeData {
  id: string;
  name: string;
  image?: string;
  audio?: string;
  description?: string;
}

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
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
    IonAlert
  ]
})
export class ConfigPage implements OnInit {
  // Validaciones de plataforma
  isCapacitor: boolean = false;
  isMobile: boolean = false;
  isWebMobile: boolean = false;
  
  // Estado de autenticación
  isLoggedIn: boolean = true;
  currentUser: Usuario | null = null;
  
  // Formularios
  loginForm: Usuario = {
    name: '',
    age: 0,
    tutor: '',
    terapeuta: '',
    calificacion: 0,
    comentarios: ''
  };
  
  newUser: Usuario = {
    name: '',
    age: 0,
    tutor: '',
    terapeuta: '',
    calificacion: 0,
    comentarios: ''
  };
  
  // Lista de usuarios registrados
  registeredUsers: Usuario[] = [];
  
  // Opciones de práctica
  practiceOptions = [
    {
      id: 'vowels',
      title: 'Vocales',
      description: 'Ejercicios de respiración y sonidos básicos',
      icon: 'AE',
      image: 'assets/images/vowels.png',
      iconClass: 'vowels-icon',
      color: 'danger'
    },
    {
      id: 'abecedario',
      title: 'Abecedario',
      description: 'Ejercicios con el abecedario',
      icon: 'ABC',
      iconClass: 'vowels-icon',
      color: 'blue'
    },
    {
      id: 'syllables',
      title: 'Sílabas',
      description: 'Combinaciones de sonidos y ritmo',
      icon: 'PA-MA',
      iconClass: 'syllables-icon',
      color: 'primary'
    },
    {
      id: 'words',
      title: 'Palabras',
      description: 'Práctica de palabras completas',
      icon: 'MAMÁ',
      iconClass: 'words-icon',
      color: 'medium'
    },
    {
      id: 'numbers',
      title: 'Números',
      description: 'Práctica de números',
      icon: '1-2-3',
      iconClass: 'numbers-icon',
      color: 'tertiary'
    }
  ];
  
  // Datos de práctica para cada categoría
  practiceData: { [key: string]: PracticeData[] } = {
    vowels: [],
    abecedario: [],
    syllables: [],
    words: [],
    numbers: []
  };
  
  // Formulario para nuevos datos de práctica
  newPracticeItem: PracticeData = {
    id: '',
    name: '',
    image: '',
    audio: '',
    description: ''
  };
  
  selectedPracticeCategory: string = '';
  
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
    
    // Cargar datos del localStorage si existen
    this.loadData();
    this.initializeTestUsers();
  }


private initializeTestUsers() {
  if (this.registeredUsers.length === 0) {
    this.registeredUsers = [
      {
        id: '1',
        name: 'Ana García',
        age: 8,
        tutor: 'María García',
        terapeuta: 'Dr. López',
        calificacion: 85,
        comentarios: 'Progreso excelente',
        fechaRegistro: new Date()
      },
      {
        id: '2', 
        name: 'Carlos Ruiz',
        age: 6,
        tutor: 'Pedro Ruiz',
        terapeuta: 'Dra. Martínez',
        calificacion: 70,
        comentarios: 'Necesita más práctica con vocales',
        fechaRegistro: new Date()
      }
    ];
    this.saveData();
  }
}
  
  ngOnInit() {
  }
  
  // Métodos de autenticación
  async login() {
    const user = this.registeredUsers.find(u => 
      u.name.toLowerCase() === this.loginForm.name.toLowerCase() && 
      u.age === this.loginForm.age
    );
    
    if (user) {
      this.isLoggedIn = true;
      this.currentUser = user;
      this.saveData();
      
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `¡Bienvenido ${user.name}!`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario no encontrado. Verifica tu nombre y edad.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  
  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.loginForm = {
      name: '',
      age: 0,
      tutor: '',
      terapeuta: '',
      calificacion: 0,
      comentarios: ''
    };
    this.saveData();
  }
  
  // Métodos de gestión de usuarios
  async registerUser() {
    if (!this.newUser.name || this.newUser.age <= 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor completa al menos el nombre y la edad.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    // Verificar si el usuario ya existe
    const existingUser = this.registeredUsers.find(u => 
      u.name.toLowerCase() === this.newUser.name.toLowerCase() && 
      u.age === this.newUser.age
    );
    
    if (existingUser) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ya existe un usuario con ese nombre y edad.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    const user: Usuario = {
      ...this.newUser,
      id: Date.now().toString(),
      fechaRegistro: new Date()
    };
    
    this.registeredUsers.push(user);
    this.saveData();
    
    // Limpiar formulario
    this.newUser = {
      name: '',
      age: 0,
      tutor: '',
      terapeuta: '',
      calificacion: 0,
      comentarios: ''
    };
    
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Usuario registrado correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async updateCurrentUser() {
    if (this.currentUser) {
      const index = this.registeredUsers.findIndex(u => u.id === this.currentUser?.id);
      if (index !== -1) {
        this.registeredUsers[index] = { ...this.currentUser };
        this.saveData();
        
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Datos actualizados correctamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }
  
  // Métodos de gestión de datos de práctica
  async addPracticeData() {
    if (!this.selectedPracticeCategory || !this.newPracticeItem.name) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Selecciona una categoría e ingresa un nombre.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    const item: PracticeData = {
      ...this.newPracticeItem,
      id: Date.now().toString()
    };
    
    this.practiceData[this.selectedPracticeCategory].push(item);
    this.saveData();
    
    // Limpiar formulario
    this.newPracticeItem = {
      id: '',
      name: '',
      image: '',
      audio: '',
      description: ''
    };
    
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Elemento agregado correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async deletePracticeData(category: string, itemId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar este elemento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.practiceData[category] = this.practiceData[category].filter(item => item.id !== itemId);
            this.saveData();
          }
        }
      ]
    });
    await alert.present();
  }
  
  // Métodos de almacenamiento
  saveData() {
    const data = {
      isLoggedIn: this.isLoggedIn,
      currentUser: this.currentUser,
      registeredUsers: this.registeredUsers,
      practiceData: this.practiceData
    };
    localStorage.setItem('appConfigData', JSON.stringify(data));
  }
  
  loadData() {
    const savedData = localStorage.getItem('appConfigData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        this.isLoggedIn = data.isLoggedIn || false;
        this.currentUser = data.currentUser || null;
        this.registeredUsers = data.registeredUsers || [];
        this.practiceData = data.practiceData || {
          vowels: [],
          abecedario: [],
          syllables: [],
          words: [],
          numbers: []
        };
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  }
  
  // Método para manejar archivos (placeholder)
  onFileSelected(event: any, type: 'image' | 'audio') {
    const file = event.target.files[0];
    if (file) {
      // Aquí podrías implementar la lógica para subir archivos
      // Por ahora, solo guardamos el nombre del archivo
      if (type === 'image') {
        this.newPracticeItem.image = file.name;
      } else {
        this.newPracticeItem.audio = file.name;
      }
    }
  }
  
  getPracticeDataCount(category: string): number {
    return this.practiceData[category]?.length || 0;
  }
}