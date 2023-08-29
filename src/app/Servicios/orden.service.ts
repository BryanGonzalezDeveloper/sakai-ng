import { Injectable } from '@angular/core';
import{HttpClient} from "@angular/common/http"; 
import { environment } from 'src/environments/environment';
import { CrearOrden, RespuestaCrearOrden } from '../Modelos/Orden';
@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  url:string=environment.apiUrl;
  constructor(private http:HttpClient) { }
  CrearOrden(orden:CrearOrden){
    return this.http.post<RespuestaCrearOrden>(`${this.url}/api/v1/Orden`,orden);
  }
}
