import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  @ViewChild('modalConfirmacion') modalConfirmacion;
  private modalRef: NgbModalRef;

  titulo: string;
  
  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal(titulo: string): Promise<any> {

    this.titulo = titulo

    this.modalRef = this._modalService.open(this.modalConfirmacion, { size: "lg", ariaLabelledBy: 'modal-basic-title' })

    //Deja escuchando al componente que llamo la modal, así cuando se cierre retorna los valores
    return this.modalRef.result;
  }

  closeModal(valor: boolean) {

    this.modalRef.close({valor : valor});

  }

}
