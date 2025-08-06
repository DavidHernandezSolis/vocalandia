// src/app/services/text-to-speech.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  availableVoices: SpeechSynthesisVoice[] = [];
  isMobile: boolean = false;

  constructor(private platform: Platform) {
    this.isMobile = this.platform.is('hybrid');

    if (!this.isMobile && 'speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = () => {
        this.availableVoices = speechSynthesis.getVoices();
      };
    }
  }

  async speak(text: string, rate: number = 0.7) {
    if (this.isMobile) {
      // 📱 Capacitor plugin para Android/iOS
      await TextToSpeech.speak({
        text: text,
        lang: 'es-MX',
        rate: rate,
      });
    } else {
      // 🖥 Web
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.rate = rate;

      // Buscar voz femenina en español
      const femaleVoice = this.availableVoices.find(
        voice =>
          voice.lang.startsWith('es') &&
          (voice.name.toLowerCase().includes('google') ||
           voice.name.toLowerCase().includes('female') ||
           voice.name.toLowerCase().includes('sabina')) &&
          !voice.name.toLowerCase().includes('male')
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else {
        console.warn('No se encontró voz femenina en español');
        utterance.voice = speechSynthesis.getVoices()[0];
      }

      speechSynthesis.speak(utterance);
    }
  }
}
