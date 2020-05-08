import { Routes } from '@angular/router';

import { ListaComponent } from '../../Productos/lista/lista.component';
import { ListaFacturasComponent } from 'src/app/Factura/lista-facturas/lista-facturas.component';
import { ComprarComponent } from 'src/app/Factura/comprar/comprar.component';

export const AdminLayoutRoutes: Routes = [

  { path: 'Productos', component: ListaComponent },
  { path: 'listaFacturas', component: ListaFacturasComponent },
  { path: 'comprar', component: ComprarComponent }
];
