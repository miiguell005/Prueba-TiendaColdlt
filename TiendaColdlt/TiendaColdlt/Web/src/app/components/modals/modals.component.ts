import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormulario } from 'src/app/-models/-models.module';


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {

  @ViewChild('modalFormulario') modalFormulario;
  private modalRef: NgbModalRef;

  titulo: string;
  formulario: ModalFormulario[];
  valor: any;
  botonGuardarOprimido: boolean = false;

  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }

  /**
   * Abre la modal
   * @param titulo 
   * @param formulario 
   * @param valor 
   */
  openModal(titulo: string, formulario: ModalFormulario[], valor: any): Promise<any> {

    this.titulo = null;
    this.formulario = null;
    this.valor = null;
    this.botonGuardarOprimido = false;

    this.titulo = titulo
    this.formulario = formulario;
    this.valor = valor;

    this.modalRef = this._modalService.open(this.modalFormulario, { size: "lg", ariaLabelledBy: 'modal-basic-title' })

    //Realiza la primera validación del formulario
    this.formulario.forEach(f => this.validarFormulario(f));

    //Deja escuchando al componente que llamo la modal, así cuando se cierre retorna los valores
    return this.modalRef.result;
  }

  /**
   * Valida los campos del formulario
   * @param f 
   */
  validarFormulario(f: ModalFormulario) {

    f.Input.Message = null;

    if (f.Input.Required && !this.valor[f.Propiedad])
      f.Input.Message = f.Label + " es obligatorio";

  }

  dismiss() {
    this.modalRef.dismiss();
  }

  /**
   * Cierra la modal
   */
  closeModal() {

    this.botonGuardarOprimido = true;

    //console.log("Mensaje", this.formulario.find(f => { return f.Input.Message }));

    if (this.formulario.find(f => { return f.Input.Message == null }) == null)
     return;

    this.botonGuardarOprimido = false;

    this.modalRef.close(this.valor);

  }

}
