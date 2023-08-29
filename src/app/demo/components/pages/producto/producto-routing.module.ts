import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { ListadoProductoComponent } from '../listado-producto/listado-producto.component';



@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ProductoComponent },
		{ path: 'listado/:id', component: ListadoProductoComponent }
	])],
	exports: [RouterModule]
})
export class ProductoRoutingModule { }
