import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/Servicios/material.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CrearEditarMaterial, ObtenerMaterial } from 'src/app/Modelos/Material';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.scss'],
  providers: [MessageService]
})
export class ListadoProductoComponent implements OnInit {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: ObtenerMaterial[] = [];

  product: ObtenerMaterial = {
    id: 0,
    nombre: '',
    precio: 0,
    stockActual: 0,
    imagen: ''
  };

  selectedProducts: ObtenerMaterial[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private productService: MaterialService, private messageService: MessageService,private route:ActivatedRoute) { }

  productId:number=0;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId=params['id'];
      if(this.productId){
        this.productService.ObtenerMaterialPorProducto(this.productId).subscribe(data => this.products = data);
      }
    });

      this.cols = [
          { field: 'id', header: 'id' },
          { field: 'nombre', header: 'nombre' },
          { field: 'precio', header: 'precio' },
          { field: 'stockActual', header: 'stockActual' }
         
      ];

  }
isEdit:boolean=false;
  openNew() {
      this.product = {
        id: 0,
        nombre: '',
        precio: 0,
        stockActual: 0,
        imagen: ''
      };
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: ObtenerMaterial) {
      this.product = { ...product };
      this.productDialog = true;
      this.isEdit=true;
  }

  deleteProduct(product: ObtenerMaterial) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }



  confirmDelete(id:number) {
      this.productService.EliminarMaterial(id).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Eliminar', detail: 'Material Eliminado', life: 3000 });
        this.productService.ObtenerMateriales().subscribe(data => this.products = data);
        this.deleteProductDialog = false;
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  crearProd:CrearEditarMaterial={
    nombre:'',
    precio:0  ,
    stockActual:0,
    imagen:''
  }
 
  saveProduct(producto: CrearEditarMaterial) {
      this.submitted = true;
      this.crearProd.nombre=producto.nombre;  
      this.crearProd.precio=producto.precio;
      this.crearProd.stockActual=producto.stockActual;  
      this.crearProd.imagen=producto.imagen;
      if(this.isEdit){
       
        this.productService.EditarMaterial(this.crearProd,this.product.id).subscribe(data => {
          this.productService.ObtenerMateriales().subscribe(data => this.products = data);
          this.isEdit=false;
          this.productDialog = false;
        },err=>{
          this.isEdit=false;
        this.productDialog = false;});
        this.isEdit=false;
      }
      else{
        this.productService.CrearMaterial(this.crearProd).subscribe(data => {
          this.productService.ObtenerMateriales().subscribe(data => this.products = data);
          this.productDialog = false;
        },err=>{
          console.log(err);
          this.productDialog = false;
        });
      }
      
  }

  findIndexById(id: string|number): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id == id) {
              index = i;
              break;
          }
      }

      return index;
  }

 
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
