
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';



@Injectable({
    providedIn: 'root',
})
export class DataLocalService {


    constructor(private http: HttpClient) { }

    obtenerTemas(): Observable<any[]> {
        // LEE DESDE LOCAL, NO NECESITA INTERNET
        return this.http.get<any[]>('assets/data/topics.json');
    }

    obtenerContenidoDeTema(ruta: string): Observable<any> {
        return this.http.get<any>(ruta);
    }
    // getCaracterAbecedario(letra: string): Observable<any> {
    //     return this.http.get<any[]>('assets/data/topics.json').pipe(
    //         map(data => data.find(c => c.caracter.toLowerCase() === letra.toLowerCase()))
    //     );
    // }


    // obtenerImgSubtema(caracter: string): Observable<any> {
    //     return this.http.get<any>('assets/data/img/' + caracter + '.jpeg', { responseType: 'blob' });
    // }
}
