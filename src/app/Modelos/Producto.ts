export interface ObtenerProductos {
    precio: number;
    nombre: string;
    id:     number;
}

export interface CrearProductos {
    precio: number;
    nombre: string;
}

export interface EditarProductos {
    precio:  number;
    nombre:  string;
    estatus: string;
}
