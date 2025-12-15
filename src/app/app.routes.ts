import { Routes } from '@angular/router';
import { AircraftListComponent } from './components/aircraft-list/aircraft-list.component';
import { AircraftFormCreateComponent } from './components/aircraft-form-create/aircraft-form-create.component';

export const routes: Routes = [
  { path: '', component: AircraftListComponent },
  { path: 'create', component: AircraftFormCreateComponent },
  { path: '**', redirectTo: '' }
];
