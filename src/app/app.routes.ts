import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { NgModule } from '@angular/core';



export const routes: Routes = [
  { path: 'pessoas', component: PessoasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
