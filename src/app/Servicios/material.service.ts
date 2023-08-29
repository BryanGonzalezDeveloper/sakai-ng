import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";  
import { environment } from 'src/environments/environment';
import { CrearEditarMaterial, ObtenerMaterial } from '../Modelos/Material';
@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  url:string=environment.apiUrl
  constructor(private http:HttpClient) { }

  ObtenerMateriales(){
    return this.http.get<ObtenerMaterial[]>(`${this.url}/api/v1/Material`);
  }
  ObtenerMaterialPorProducto(idProducto:number){
    return this.http.get<ObtenerMaterial[]>(`${this.url}/api/v1/Material/PorProducto/${idProducto}`);
  }

  CrearMaterial(material:CrearEditarMaterial){
    return this.http.post(`${this.url}/api/v1/Material`,material);
  }
  EditarMaterial(material:CrearEditarMaterial){
    return this.http.put(`${this.url}/api/v1/Material`,material);
  }

  EliminarMaterial(idMaterial:number){
    return this.http.delete(`${this.url}/api/v1/Material/${idMaterial}`);
  }   
}
