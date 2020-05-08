import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Helper/service.service';
import { ToastrService } from 'ngx-toastr';
import { Factura } from 'src/app/-models/-models.module';

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturasComponent implements OnInit {

  titulo: string = "Lista de facturas";
  facturas: Factura [];

  constructor(private sService: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.sService.get("api/Facturas").subscribe((facturas: any) => {

      console.log("Facturas", facturas);

      this.facturas = facturas;

    }, (error) => {
      console.log("Error", error);
      this.toastr.error(error);
    });
  }

}
