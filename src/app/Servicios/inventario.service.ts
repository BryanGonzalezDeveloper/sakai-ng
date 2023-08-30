import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { GenerarInventario } from '../Modelos/Inventario';
@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  url:string=environment.apiUrl;
  constructor(private http:HttpClient) { }

  generarInventario(inventario:GenerarInventario){
    return this.http.post(`${this.url}/api/v1/Inventario`,inventario);
  }
}
