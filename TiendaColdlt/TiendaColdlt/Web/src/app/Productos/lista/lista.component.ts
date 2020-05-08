import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/-models/-models.module';
import { ServiceService } from 'src/app/Helper/service.service';
import { ToastrService } from 'ngx-toastr';
import { ModalsComponent } from 'src/app/components/modals/modals.component';
import { ModalConfirmacionComponent } from 'src/app/components/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {


  @ViewChild(ModalsComponent) modal: ModalsComponent;
  @ViewChild(ModalConfirmacionComponent) modalConfirmacion: ModalConfirmacionComponent;

  cargando = false;
  filtro: any = {
    Cantidad: 10,
    Pagina:1,
    codigo: null,
    nombre:null
  }

  cantidadProductos;

  titulo: string = "Lista de productos";
  
  private productos: Producto[];

  constructor(private sService: ServiceService, private toastr: ToastrService) { }

  a(){
    this.ngOnInit();
  }

  ngOnInit() {

    this.cargando = true;
    this.sService.get("api/productos", this.filtro).subscribe((result: any) => {

      this.cargando = false;
      this.productos = result.Productos;
      this.cantidadProductos = result.Cantidad;

    }, (error) => {
      this.cargando = false;
      console.log("Error", error);
      this.toastr.error(error);
    });
  }

  /**
   * Crea un nuevo producto   
   */
  crearProducto() {

    this.modal.openModal("Crear producto", [
      { Label: "Nombre", Propiedad: "Nombre", Input: { Type: "text", Required: true, MessageError: "El nombre es obligatorio" } },
      { Label: "Código", Propiedad: "Codigo", Input: { Type: "text", Required: true, MessageError: "El código es obligatorio" } },
      { Label: "Valor", Propiedad: "Valor", Input: { Type: "number", Required: true, MessageError: "El valor es obligatorio" } },
    ], {}).then((producto: any) => {

      this.sService.post(`api/productos`, producto).subscribe((p: Producto) => {

        this.productos.push(p);

        this.toastr.success("Se ha creado el producto");
        this.ngOnInit();

      },(error) => {
        console.log("error", error);
      });
    }).catch((ex) => {
      
    });

  }

  /**
   * Edita un prodicto
   */
  editarProducto(producto: Producto) {

    this.modal.openModal("Editar producto", [
      { Label: "Nombre", Propiedad: "Nombre", Input: { Type: "text", Required: true, MessageError: "El nombre es obligatorio" } },
      { Label: "Código", Propiedad: "Codigo", Input: { Type: "text", Required: true, MessageError: "El código es obligatorio" } },
      { Label: "Valor", Propiedad: "Valor", Input: { Type: "number", Required: true, MessageError: "El valor es obligatorio" } },
    ], this.sService.copiarObjeto(producto)).then((productoDto: any) => {

      this.sService.put(`api/productos/${productoDto.IdProducto}`, productoDto).subscribe((pDto: Producto) => {

        producto.Codigo = pDto.Codigo;
        producto.Nombre = pDto.Nombre;
        producto.Valor = pDto.Valor;

        this.toastr.success("Se ha editado el producto");

      }, (error) => {
        console.log("Error", error);        
        this.toastr.error(error);
      });

    });
  }

  /**
   * Elimina el producto seleccionado
   * @param producto 
   */
  EliminarProducto(producto: Producto) {

    this.modalConfirmacion.openModal("¿Esta seguro de eliminar el producto " + producto.Nombre + "?")
      .then((result: any) => {

        //Si se acepto eliminar el producto, éste sera eliminado
        if (result.valor)
          this.sService.delete(`api/productos/${producto.IdProducto}`).subscribe((p: Producto) => {

            //Realiza un filtro para sacar el producto de la lista
            this.productos = this.productos.filter(_p => { return _p.IdProducto != p.IdProducto });

            this.toastr.success("El producto" + producto.Nombre + " ha sido eliminado");

          }, (error) => {
            console.log("Error", error);
            this.toastr.error(error);
          })
      }).catch((ex) => {
      
      });;
  }
}
