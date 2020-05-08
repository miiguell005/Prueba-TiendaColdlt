import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalsComponent } from 'src/app/components/modals/modals.component';
import { ListaComponent } from 'src/app/Productos/lista/lista.component';
import { ModalConfirmacionComponent } from 'src/app/components/modal-confirmacion/modal-confirmacion.component';
import { ComprarComponent } from 'src/app/Factura/comprar/comprar.component';
import { ListaFacturasComponent } from 'src/app/Factura/lista-facturas/lista-facturas.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    ModalsComponent,
    ModalConfirmacionComponent,
    ListaComponent,
    
    ListaFacturasComponent,
    ComprarComponent,
  ],
  entryComponents: [
    ModalsComponent,
    ModalConfirmacionComponent
  ],
})

export class AdminLayoutModule { }
