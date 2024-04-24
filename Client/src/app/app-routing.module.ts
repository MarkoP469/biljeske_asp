import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiljeskeComponent } from './biljeske/biljeske.component';
import { BiljeskaComponent } from './biljeska/biljeska.component';

const routes: Routes = [
  {path: '', component: BiljeskeComponent},
  {path: 'biljeska/:id', component: BiljeskaComponent},
  {path: '**', component: BiljeskeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
