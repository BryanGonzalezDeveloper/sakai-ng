export interface CrearOrden {
    productoId: number;
    cantidad:   number;
}


export interface RespuestaCrearOrden {
    productoId:       number;
    nombreProducto:   string;
    materialFaltante: MaterialFaltante[];
}

export interface MaterialFaltante {
    materialId:       number;
    cantidadFaltante: number;
    costo:            number;
    nombreMaterial:   string;
}
