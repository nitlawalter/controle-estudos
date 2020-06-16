import { RevisaoComponent } from './components/revisao/revisao.component';
import { RevisaoAssuntoComponent } from './components/revisao-assunto/revisao-assunto.component';
import { RevisaoDisciplinaComponent } from './components/revisao-disciplina/revisao-disciplina.component';
import { DisciplinaListComponent } from './components/disciplina-list/disciplina-list.component';
import { AssuntoListComponent } from './components/assunto-list/assunto-list.component';
import { TopicoListComponent } from './components/topico-list/topico-list.component';
import { QuestaoListComponent } from './components/questao-list/questao-list.component';
import { EstatisticaListComponent } from './components/estatistica-list/estatistica-list.component';
import { AssuntoComponent } from './components/assunto/assunto.component';
import { TopicoComponent } from './components/topico/topico.component';
import { QuestaoComponent } from './components/questao/questao.component';
import { HomeComponent } from './components/home/home.component';
import { DisciplinaComponent } from './components/disciplina/disciplina.component';
import { EstatisticaComponent } from './components/estatistica/estatistica.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'disciplina', component: DisciplinaComponent},
  { path: 'disciplina/:id', component: DisciplinaComponent},
  { path: 'disciplina-list', component: DisciplinaListComponent},
  { path: 'assunto', component: AssuntoComponent},
  { path: 'assunto/:id', component: AssuntoComponent},
  { path: 'assunto-list', component: AssuntoListComponent},
  { path: 'topico', component: TopicoComponent},
  { path: 'topico/:id', component: TopicoComponent},
  { path: 'topico-list', component: TopicoListComponent},
  { path: 'questao', component: QuestaoComponent},
  { path: 'questao/:id', component: QuestaoComponent},
  { path: 'questao-list', component: QuestaoListComponent},
  { path: 'estatistica', component: EstatisticaComponent},
  { path: 'estatistica/:id', component: EstatisticaComponent},
  { path: 'estatistica-list', component: EstatisticaListComponent},
  { path: 'revisao-disciplina', component: RevisaoDisciplinaComponent},
  { path: 'revisao-assunto/:id', component: RevisaoAssuntoComponent},
  { path: 'revisao/:id', component: RevisaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
