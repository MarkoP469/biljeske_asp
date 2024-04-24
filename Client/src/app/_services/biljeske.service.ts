import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Biljeska } from '../_modeli/biljeska';

@Injectable({
  providedIn: 'root'
})
export class BiljeskeService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  dohvatiSveBiljeske(){
    return this.http.get<Biljeska[]>(this.baseUrl + 'biljeske');
  }

  dohvatiBiljeskuPoId(id: any){
    return this.http.get<Biljeska>(this.baseUrl + 'biljeske/' + id);
  }

  spremiNovuBiljesku(model: any){
    return this.http.post(this.baseUrl + 'biljeske', model);
  }

  obrisiBiljesku(id: number){
    return this.http.delete(this.baseUrl + 'biljeske/'+id);
  }

  azurirajBiljesku(model: any){
    return this.http.put(this.baseUrl + 'biljeske/'+ model.id, model);
  }
}
