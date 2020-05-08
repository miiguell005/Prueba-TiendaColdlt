import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Helper/service.service';
import { ToastrService } from 'ngx-toastr';
import { Factura, Producto } from 'src/app/-models/-models.module';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {

  filtroProductos: any;
  titulo: string = "Comprar";
  factura: Factura;
  listaProductos: Producto[];
  listaProductosCopy: Producto[];
  botnGuardarOprimido = false;

  constructor(private sService: ServiceService, private toastr: ToastrService) { this.inicializarFactura(); }

  ngOnInit() {
    this.sService.get("api/productos").subscribe((p: any) => {

      this.listaProductosCopy = p.Productos;
      this.listaProductos = p.Productos;

    }, (error) => {
      console.log("Error", error);
    })
  }

  /**
   * Realiza el filtro de los productos
   * @param filtro 
   */
  filtrarProductos(filtro: string) {
    this.listaProductos = this.listaProductosCopy.filter(p => {
      return p.Codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        p.Nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        p.Valor.toString().toLowerCase().includes(filtro.toLowerCase());
    });
  }

  /**
   * Reinicia el valor a todos los objetos
   */
  inicializarFactura() {
    this.factura = {
      Cliente: "",
      ValorTotal: 0,
      Items: []
    }

    this.listaProductos = this.listaProductosCopy;
    this.filtroProductos = null;

    this.botnGuardarOprimido = false;
  }

  /**
   * Agrega un producto a la factura
   * @param productoDto 
   */
  agregarProducto(productoDto: Producto) {

    let item = this.factura ? this.factura.Items.find(i => { return i.IdProducto == productoDto.IdProducto }) : null;

    //Si no se ha agregado el prefuto a la factura
    if (!item) {
      item = {
        Cantidad: 1,
        IdProducto: productoDto.IdProducto,
        ValorTotal: productoDto.Valor,
        Producto: productoDto
      }

      //Agrega el producto
      this.factura.Items.push(item);
    }

    //Agrega un producto mas al item, actualiza le valor total
    else {
      item.Cantidad++;
      item.ValorTotal = item.Cantidad * item.Producto.Valor;
    }

    this.actualizarValorTotal();
  }


  eliminarProducto(productoDto: Producto) {

    let item = this.factura.Items.find(i => { return i.IdProducto == productoDto.IdProducto });

    //No se encontró el producto
    if (!item)
      return;

    else {
      //Si hay más de 1 producto, quita solo uno
      if (item.Cantidad > 1) {
        item.Cantidad--;
        item.ValorTotal = item.Cantidad * item.Producto.Valor;
      }

      //Elimina el item de la factura
      else
        this.factura.Items = this.factura.Items.filter(i => { return i.IdProducto != productoDto.IdProducto; });
    }

    this.actualizarValorTotal();
  }


  /**
   * Actualiza el valor total a la factura
   */
  actualizarValorTotal() {

    let valorTotal = 0;

    this.factura.Items.forEach(i => { valorTotal += i.ValorTotal; });

    this.factura.ValorTotal = valorTotal;
  }


  /**
   * Termina la compra y crea la factura
   */
  crearFactura() {

    this.botnGuardarOprimido = true;

    if (!this.factura.Cliente)
      return

    this.sService.post("api/facturas", this.factura).subscribe((factura: any) => {

      this.toastr.success("Se ha creado la factura");
      this.inicializarFactura();

    }, (error) => {
      console.log(error)
    })
  }

}
