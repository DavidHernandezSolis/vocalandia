
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.prod';

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



  getUsers() {
    return this.supabase
      .from('users')
      .select('*');
  }
}
