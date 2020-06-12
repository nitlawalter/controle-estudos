import { DisciplinaListComponent } from './components/disciplina-list/disciplina-list.component';
import { AssuntoComponent } from './components/assunto/assunto.component';
import { TopicoComponent } from './components/topico/topico.component';
import { QuestaoComponent } from './components/questao/questao.component';
import { HomeComponent } from './components/home/home.component';
import { DisciplinaComponent } from './components/disciplina/disciplina.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'disciplina', component: DisciplinaComponent},
  { path: 'disciplina/:id', component: DisciplinaComponent},
  { path: 'disciplina-list', component: DisciplinaListComponent},
  { path: 'assunto', component: AssuntoComponent},
  { path: 'topico', component: TopicoComponent},
  { path: 'questao', component: QuestaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
