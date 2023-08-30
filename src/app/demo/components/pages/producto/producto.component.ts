import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { MessageService } from 'primeng/api';
import { CrearProductos, EditarProductos, ObtenerProductos } from 'src/app/Modelos/Producto';
import { ProductoService } from 'src/app/Servicios/producto.service';
import { CrearOrden, MaterialFaltante } from 'src/app/Modelos/Orden';
import { OrdenService } from 'src/app/Servicios/orden.service';
import { GenerarInventario } from 'src/app/Modelos/Inventario';
import { InventarioService } from 'src/app/Servicios/inventario.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [MessageService]
})
export class ProductoComponent implements OnInit{
  inventario:GenerarInventario={
    materiales:[]
  }
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;
  orderProductDialog: boolean = false;  
  faltanteDialog: boolean = false;  
  order:CrearOrden={
    productoId:0,
    cantidad:0  
  }
  products: ObtenerProductos[] = [];
  materialFaltante:MaterialFaltante[]=[]; 
  product: ObtenerProductos = {
    id: 0,
    nombre: '',
    precio: 0
  };

  selectedProducts: ObtenerProductos[] = [];

  submitted: boolean = false;

  cols: any[] = [];
  col2: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private inventarioService:InventarioService,private orderService:OrdenService,private productService: ProductoService, private messageService: MessageService) { }
  
  ngOnInit() {
      this.productService.ObtenerProductos().subscribe(data => this.products = data);

      this.cols = [
          { field: 'id', header: 'id' },
          { field: 'nombre', header: 'nombre' },
          { field: 'precio', header: 'precio' },
         
      ];

  }
isEdit:boolean=false;
  openNew() {
      this.product = {
        id: 0,
        nombre: '',
        precio: 0
      };
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: ObtenerProductos) {
      this.product = { ...product };
      this.productDialog = true;
      this.isEdit=true;
  }

  deleteProduct(product: ObtenerProductos) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }



  confirmDelete(id:number) {
      this.productService.EliminarProducto(id).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Eliminar', detail: 'Producto Eliminado', life: 3000 });
        this.productService.ObtenerProductos().subscribe(data => this.products = data);
        this.deleteProductDialog = false;
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.orderProductDialog=false;
      this.faltanteDialog=false;  
      this.submitted = false;
  }

  crearProd:CrearProductos={
    nombre:'',
    precio:0  
  }
  EditarProd:EditarProductos={
    nombre:'',
    precio:0  ,
    estatus:''
  }
  saveProduct(producto: CrearProductos) {
      this.submitted = true;
      this.crearProd.nombre=producto.nombre;  
      this.crearProd.precio=producto.precio;
      if(this.isEdit){
        this.EditarProd.nombre=producto.nombre;
        this.EditarProd.precio=producto.precio; 
        this.EditarProd.estatus='';
        this.productService.EditarProducto(this.EditarProd,this.product.id).subscribe(data => {
          this.productService.ObtenerProductos().subscribe(data => this.products = data);
          this.isEdit=false;
          this.productDialog = false;
        },err=>{
          this.isEdit=false;
        this.productDialog = false;});
        this.isEdit=false;
      }
      else{
        this.productService.CrearProducto(this.crearProd).subscribe(data => {
          this.productService.ObtenerProductos().subscribe(data => this.products = data);
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

  listProduct(id:number){
  }
  createOrder(productId:number){
    this.orderProductDialog = true;
    this.order.productoId=productId;
  }
  saveOrder(){
    this.orderService.CrearOrden(this.order).subscribe(data => {
      // this.messageService.add({ severity: 'success', summary: 'Orden', detail: 'Orden Creada', life: 3000 });
      this.orderProductDialog = false;
      if(data.materialFaltante.length>0){
        this.messageService.add({ severity: 'warn', summary: 'Orden', detail: 'Material Faltante', life: 3000 });
        this.materialFaltante=data.materialFaltante;
        this.cols = [
          { field: 'materialId', header: 'materialId' },
          { field: 'nombreMaterial', header: 'nombreMaterial' },
          { field: 'cantidadFaltante', header: 'cantidadFaltante' },
          { field: 'costo', header: 'costo' },
      ];

        this.faltanteDialog=true;
      }
    },err=>{
      this.orderProductDialog = false;
    });
  }

  generarInventario(){
    this.materialFaltante.forEach(m=>this.inventario.materiales.push({materialId:m.materialId,cantidad:m.cantidadFaltante})); 
    this.inventarioService.generarInventario(this.inventario).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Inventario', detail: 'Inventario Generado, pedido realizado', life: 3000 });
      this.faltanteDialog = false;
    });
  
  }
}
