import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { CrearProductos, EditarProductos, ObtenerProductos } from '../Modelos/Producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:string=environment.apiUrl;
  constructor(private http:HttpClient) { }
  ObtenerProductos(){
    return this.http.get<ObtenerProductos[]>(`${this.url}/api/v1/Producto`);
  }
  ObtenerProductosPorNombre(nombre:string){ 
    return this.http.get<ObtenerProductos[]>(`${this.url}/api/v1/Producto/PorNombre/${nombre}`);
  }

  CrearProducto(producto:CrearProductos)
  {
    return this.http.post(`${this.url}/api/v1/Producto`,producto);
  }
  EditarProducto(producto:EditarProductos){
    return this.http.put(`${this.url}/api/v1/Producto`,producto);
  }

  EliminarProducto(idProducto:number){
    return this.http.delete(`${this.url}/api/v1/Producto/${idProducto}`);
  }
}
