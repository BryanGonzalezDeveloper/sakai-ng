export interface GenerarInventario {
    fecha:      Date|string;
    materiales: Materiales[];
}

export interface Materiales {
    materialId: number;
    cantidad:   number;
}
