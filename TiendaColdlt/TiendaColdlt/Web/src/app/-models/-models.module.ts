export interface Producto {
  IdProducto?: number;
  Nombre: string;
  Codigo: string;
  Valor: number;
  Items?: Item[];
}

export interface Factura {
  IdFactura?: number;
  Cliente: string;
  ValorTotal: number;
  Items?: Item[];
}

export interface Item {
  IdItem?: number;
  IdProducto: number;
  IdFactura?: number;
  Cantidad: number;
  ValorTotal: number;
  Producto?: Producto;
  Factura?: Factura;
}


//Propiedades de la modal formulario
export interface ModalFormulario {
  Label: string;
  Input: Input;
  Propiedad: string; 
}

export interface Input {
  Type: string;
  Required?: boolean;
  MessageError?: string;  
  Message?: string
}