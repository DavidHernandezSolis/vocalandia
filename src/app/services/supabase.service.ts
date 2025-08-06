
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.prod';


type Topic = {
  title: string;
  description: string;
  file: File;
  order_index?: number;
  isActive?: boolean; // Opcional
};

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private sessionKey = 'sessionUser';

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          autoRefreshToken: false,
        },
      }
    );
  }

  async loginWithNameAndRole({ name, age, role_id }: any) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('name', name?.trim()?.toUpperCase())
      .eq('age', age)
      .eq('role_id', role_id)
      .maybeSingle();

    if (error) {
      throw error;
    }
    if (data) {
      this.saveSession(data);
    }
    return data
  }

  saveSession(user: any) {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  }

  getSession() {
    const user = localStorage.getItem(this.sessionKey);
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem(this.sessionKey);
  }

  isLoggedIn(): boolean {
    return !!this.getSession();
  }


  /**
   * 
   * @param SERVICIOS PARA EL REGISTRO DE USUASRIOS 
   * @returns 
   */

  async validExistUser({ name, age, role_id }: any): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('name', name?.trim()?.toUpperCase())
      .eq('age', age)
      .eq('role_id', role_id)
      .maybeSingle();

    if (error) {
      throw error;
    }
    console.log({ data });
    return !!data?.name;
  }

  async registerUser(user: { name: string; age: number; role_id: number }): Promise<boolean> {
    const { name, age, role_id } = user;
    const { data, error } = await this.supabase
      .from('users')
      .insert({
        name: name.trim().toUpperCase(),
        age,
        role_id,
      },)
      .select()
      .single();

    if (error) throw error;
    return !!data?.id;
  }


  async getRoles(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('roles')
      .select('*');

    if (error) throw error;
    return data || [];
  }


  async registerPatient(user: { name: string; age: number; role_id: number }): Promise<boolean> {
    const { name, age, role_id } = user;

    // validar si ya existe 
    const { data: dataExiste, error: errorExiste } = await this.supabase
      .from('users')
      .select('*')
      .eq('name', name?.trim()?.toUpperCase())
      .eq('age', age)
      .eq('role_id', role_id)
      .maybeSingle();

    if (errorExiste) {
      throw errorExiste;
    }
    if (dataExiste?.name) {
      console.info('El paciente ya existe');
      return true;
    }
    const { data, error } = await this.supabase
      .from('users')
      .insert({
        name: name.trim().toUpperCase(),
        age,
        role_id,
      },)
      .select()
      .single();

    if (error) throw error;
    const therapistId = this.getSession()?.id
    const patientId = data?.id;
    const { error: relationError, data: dataPatient } = await this.supabase
      .from('therapist_patient')
      .insert([
        {
          therapist_id: therapistId,
          patient_id: patientId,
          assignment_date: new Date().toISOString(), // opcional, se pone por defecto
        },
      ]);

    if (relationError) {
      throw relationError;
    }
    return !!data?.id
  }


  async getPatients(): Promise<any[]> {
    const therapistId = this.getSession()?.id;
    const { data, error } = await this.supabase
      .from('therapist_patient')
      .select('patient_id')
      .eq('therapist_id', therapistId);

    if (error) throw error;
    const patientIds = data?.map((item: any) => item.patient_id) || [];
    const { data: patients, error: patientsError } = await this.supabase
      .from('users')
      .select('*')
      .in('id', patientIds);

    if (patientsError) throw patientsError;
    return patients || [];
  }



  // Crear nuevo tema
  async createTopic({ title, description, file, order_index, isActive = true }: Topic): Promise<any> {
    // const url = await this.uploadImage(file);
    const compressedFile = await this.compressImage(file);
    const url = await this.uploadImage(compressedFile);
    console.log({ url });

    const { data, error } = await this.supabase
      .from('activity_topics')
      .insert([{
        title,
        description,
        is_active: isActive,
        image_url: url
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private async compressImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const MAX_WIDTH = 800;
          const scale = MAX_WIDTH / img.width;
          const canvas = document.createElement('canvas');
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject('No se pudo obtener contexto de canvas');
            return;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject('No se pudo crear el blob');
            }
          }, 'image/jpeg', 0.7); // Calidad 70%
        };
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }



  async uploadImage(file: File): Promise<string> {
    const path = `activity_topics/${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase.storage
      .from('vocalandiaimages')
      .upload(path, file, { upsert: true });
    if (error) throw error;
    const { publicUrl } = this.supabase.storage
      .from('vocalandiaimages')
      .getPublicUrl(path).data;

    return publicUrl;
  }


  async listTopics(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('activity_topics')
      .select('*')
      .order('order_index');

    if (error) throw error;
    return data || [];
  }



}
