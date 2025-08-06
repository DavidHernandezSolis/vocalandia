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
  IonAlert
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, addOutline, saveOutline, logInOutline, logOutOutline, personAddOutline } from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';

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


  private supabase = inject(SupabaseService);

  // Validaciones de plataforma
  isCapacitor: boolean = false;
  isMobile: boolean = false;
  isWebMobile: boolean = false;

  // Estado de autenticación
  isSignin: boolean = true;
  roles: any[] = [];
  selectedRole: number | null = null;
  // Formularios
  loginForm: any = {
    name: '',
    role_id: null,
    age: 0
  };
  user: any = null;
  isLoggedIn: boolean = false;


  newUser: any = {
    name: '',
    age: 0,
    role_id: null,
  };




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


  async ngOnInit() {
    try {
      this.roles = await this.supabase.getRoles();
      console.log('Roles:', this.roles);
      this.isLoggedIn = this.supabase.isLoggedIn();
      console.log('Is logged in:', this.isLoggedIn);
      if (this.isLoggedIn) {
        this.user = this.supabase.getSession();
        console.log('User:', this.user);
        this.listpatients();
      }
      this.generateChallenge();
    } catch (error) {
      console.error('Error al cargar roles:', error);
    }

    // const { data, error } = await this.supabase.getUsers();
    // if (error) {
    //   console.error('Error fetching users:', error);
    // } else {
    //   console.log('Users:', data);
    //   this.user = data;
    // }
  }



  /**
   *  GENERAR DESAFIO MATEMATICO PARA MOSTRAR LA CONFIRMACION A ADULTOS 
   */
  challenge = { question: '', answer: 0 };
  showChallenge = false;
  userAnswer: number | null = null;
  // allowAccess = true; //true para dev
  allowAccess = false;

  generateChallenge() {
    const a = Math.floor(Math.random() * 8 + 2); // de 2 a 9
    const b = Math.floor(Math.random() * 8 + 2);
    const isMultiplication = Math.random() > 0.5;

    this.challenge.question = isMultiplication
      ? `¿Cuánto es ${a} × ${b}?`
      : `¿Cuánto es ${a} + ${b}?`;
    this.challenge.answer = isMultiplication ? a * b : a + b;

    this.showChallenge = true;
    this.userAnswer = null;
  }


  async validateChallenge() {
    this.showChallenge = false; //DEV
    this.allowAccess = true; //DEV
    return
    if (this.userAnswer === this.challenge.answer) {
      this.showChallenge = false;
      this.allowAccess = true;
      console.log('Respuesta correcta.', this.user, this.isLoggedIn);

    } else {
      console.log('Respuesta incorrecta. Solo un adulto puede continuar.', this.userAnswer, this.challenge.answer,);

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Respuesta incorrecta. Solo un adulto puede continuar.',
        buttons: ['OK']
      });
      await alert.present();
      this.generateChallenge(); // cambia el reto
    }
  }


  loginsUser() {
    this.isSignin = !this.isSignin;
  }

  /**
   * INICIO DE SESION
   */
  async login() {
    if (!this.loginForm.name || !this.loginForm.role_id || !this.loginForm.age) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingresa tu nombre completo y rol. Por ejemplo "Nombre ApellidoPaterno ApellidoMaterno".',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    const user = await this.supabase.loginWithNameAndRole({ name: this.loginForm.name, role_id: this.loginForm.role_id, age: this.loginForm.age });

    if (user) {
      this.isLoggedIn = true;
      this.user = user;
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: `¡Bienvenido ${user.name}!`,
        buttons: ['OK']
      });
      await alert.present();
      this.listpatients();
      return;
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario no encontrado. Volver a intentar o registrarse.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  /**
   * REGISTRO DE NUEVOS USUARIOS
   */

  async registerUser() {
    if (!this.newUser.name || !this.newUser.age || !this.newUser.role_id) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor completa los datos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const existingUser = await this.supabase.validExistUser({ name: this.newUser.name, role_id: this.newUser.role_id, age: this.newUser.age });
    if (existingUser) {
      this.isSignin = false;
      this.loginForm = { ...this.loginForm, ...this.newUser };
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ya existe un usuario, se direcciona a inicio de sesión',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    const registered = await this.supabase.registerUser({ name: this.newUser.name, role_id: this.newUser.role_id, age: this.newUser.age });
    console.log({ registered });
    if (registered) {
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se ha registrados el usuario con exito, ya puedes iniciar sesion',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }



  }


  /**
   * REGISTRO DE pacientes 
   */
  child = {
    name: '',
    age: null as number | null
  };


  async onStartTherapy() {
    if (!this.child.name || !this.child.age) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor completa los datos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  }

  async registerChild() {
    // buscar el id de Tutor en this.roles
    const tutorRole = this.roles.find(role => role.name?.toLowerCase() === 'tutor');
    if (this.child.age === null) return;
    const registered = await this.supabase.registerPatient({ name: this.child.name, role_id: tutorRole?.id, age: this.child.age });
    console.log({ registered });
    if (registered) {
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se ha registrado el paciente con exito',
        buttons: ['OK']
      });
      await alert.present();
      this.child = {
        name: '',
        age: null
      }
      this.listpatients();
      return;
    }
  }


  listPatientsByTutor = [] as any[];
  async listpatients() {
    const patients = await this.supabase.getPatients();
    console.log({ patients });
    this.listPatientsByTutor = patients;
  }



  /**
   * CERRAR SESION  
   */
  logout() {
    this.isLoggedIn = false;
    this.loginForm = {
      name: '',
      role_id: null,
      age: 0
    };
    this.user = null;
    this.newUser = {
      name: '',
      age: 0,
      role_id: null,
    };
    this.supabase.logout();
  }



  //  onOptionSelected(option: any) {
  //   console.log('Opción seleccionada:', option);
  //   // Navegar enviando datos en el state
  //   this.router.navigate(['/config-topics/:uuid', option.id], {
  //     state: {
  //       title: option.title,
  //     }
  //   });
  // }


  congifTopics() {
    this.router.navigate(['/config-topics']);
  }


  // currentUser: Usuario | null = null;




  // // Lista de usuarios registrados
  // registeredUsers: Usuario[] = [];

  // // Opciones de práctica
  // practiceOptions = [
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
  //     title: 'Números',
  //     description: 'Práctica de números',
  //     icon: '1-2-3',
  //     iconClass: 'numbers-icon',
  //     color: 'tertiary'
  //   }
  // ];

  // // Datos de práctica para cada categoría
  // practiceData: { [key: string]: PracticeData[] } = {
  //   vowels: [],
  //   abecedario: [],
  //   syllables: [],
  //   words: [],
  //   numbers: []
  // };

  // // Formulario para nuevos datos de práctica
  // newPracticeItem: PracticeData = {
  //   id: '',
  //   name: '',
  //   image: '',
  //   audio: '',
  //   description: ''
  // };

  // selectedPracticeCategory: string = '';




  // private initializeTestUsers() {
  //   if (this.registeredUsers.length === 0) {
  //     this.registeredUsers = [
  //       {
  //         id: '1',
  //         name: 'Ana García',
  //         age: 8,
  //         tutor: 'María García',
  //         terapeuta: 'Dr. López',
  //         calificacion: 85,
  //         comentarios: 'Progreso excelente',
  //         fechaRegistro: new Date()
  //       },
  //       {
  //         id: '2',
  //         name: 'Carlos Ruiz',
  //         age: 6,
  //         tutor: 'Pedro Ruiz',
  //         terapeuta: 'Dra. Martínez',
  //         calificacion: 70,
  //         comentarios: 'Necesita más práctica con vocales',
  //         fechaRegistro: new Date()
  //       }
  //     ];
  //     this.saveData();
  //   }
  // }




  // // Métodos de gestión de usuarios


  // async updateCurrentUser() {
  //   if (this.currentUser) {
  //     const index = this.registeredUsers.findIndex(u => u.id === this.currentUser?.id);
  //     if (index !== -1) {
  //       this.registeredUsers[index] = { ...this.currentUser };
  //       this.saveData();

  //       const alert = await this.alertController.create({
  //         header: 'Éxito',
  //         message: 'Datos actualizados correctamente.',
  //         buttons: ['OK']
  //       });
  //       await alert.present();
  //     }
  //   }
  // }

  // // Métodos de gestión de datos de práctica
  // async addPracticeData() {
  //   if (!this.selectedPracticeCategory || !this.newPracticeItem.name) {
  //     const alert = await this.alertController.create({
  //       header: 'Error',
  //       message: 'Selecciona una categoría e ingresa un nombre.',
  //       buttons: ['OK']
  //     });
  //     await alert.present();
  //     return;
  //   }

  //   const item: PracticeData = {
  //     ...this.newPracticeItem,
  //     id: Date.now().toString()
  //   };

  //   this.practiceData[this.selectedPracticeCategory].push(item);
  //   this.saveData();

  //   // Limpiar formulario
  //   this.newPracticeItem = {
  //     id: '',
  //     name: '',
  //     image: '',
  //     audio: '',
  //     description: ''
  //   };

  //   const alert = await this.alertController.create({
  //     header: 'Éxito',
  //     message: 'Elemento agregado correctamente.',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }

  // async deletePracticeData(category: string, itemId: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirmar',
  //     message: '¿Estás seguro de que quieres eliminar este elemento?',
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Eliminar',
  //         handler: () => {
  //           this.practiceData[category] = this.practiceData[category].filter(item => item.id !== itemId);
  //           this.saveData();
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // // Métodos de almacenamiento
  // saveData() {
  //   const data = {
  //     isLoggedIn: this.isLoggedIn,
  //     currentUser: this.currentUser,
  //     registeredUsers: this.registeredUsers,
  //     practiceData: this.practiceData
  //   };
  //   localStorage.setItem('appConfigData', JSON.stringify(data));
  // }

  // loadData() {
  //   const savedData = localStorage.getItem('appConfigData');
  //   if (savedData) {
  //     try {
  //       const data = JSON.parse(savedData);
  //       this.isLoggedIn = data.isLoggedIn || false;
  //       this.currentUser = data.currentUser || null;
  //       this.registeredUsers = data.registeredUsers || [];
  //       this.practiceData = data.practiceData || {
  //         vowels: [],
  //         abecedario: [],
  //         syllables: [],
  //         words: [],
  //         numbers: []
  //       };
  //     } catch (error) {
  //       console.error('Error loading data:', error);
  //     }
  //   }
  // }

  // // Método para manejar archivos (placeholder)
  // onFileSelected(event: any, type: 'image' | 'audio') {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // Aquí podrías implementar la lógica para subir archivos
  //     // Por ahora, solo guardamos el nombre del archivo
  //     if (type === 'image') {
  //       this.newPracticeItem.image = file.name;
  //     } else {
  //       this.newPracticeItem.audio = file.name;
  //     }
  //   }
  // }

  // getPracticeDataCount(category: string): number {
  //   return this.practiceData[category]?.length || 0;
  // }



}