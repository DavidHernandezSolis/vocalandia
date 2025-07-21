import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-practice-detail',
  templateUrl: './practice-detail.page.html',
  styleUrls: ['./practice-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PracticeDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
