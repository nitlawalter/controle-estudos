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
import { MetaComponent } from './components/meta/meta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaListComponent } from './components/meta-list/meta-list.component';
import { LoginComponent } from './components/security/login/login.component';
import { AuthGuard } from './components/security/auth.guard';


const routes: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'disciplina', component: DisciplinaComponent, canActivate: [AuthGuard]},
  { path: 'disciplina/:id', component: DisciplinaComponent, canActivate: [AuthGuard]},
  { path: 'disciplina-list', component: DisciplinaListComponent, canActivate: [AuthGuard]},
  { path: 'assunto', component: AssuntoComponent, canActivate: [AuthGuard]},
  { path: 'assunto/:id', component: AssuntoComponent, canActivate: [AuthGuard]},
  { path: 'assunto-list', component: AssuntoListComponent, canActivate: [AuthGuard]},
  { path: 'topico', component: TopicoComponent, canActivate: [AuthGuard]},
  { path: 'topico/:id', component: TopicoComponent, canActivate: [AuthGuard]},
  { path: 'topico-list', component: TopicoListComponent, canActivate: [AuthGuard]},
  { path: 'questao', component: QuestaoComponent, canActivate: [AuthGuard]},
  { path: 'questao/:id', component: QuestaoComponent, canActivate: [AuthGuard]},
  { path: 'questao-list', component: QuestaoListComponent, canActivate: [AuthGuard]},
  { path: 'estatistica', component: EstatisticaComponent, canActivate: [AuthGuard]},
  { path: 'estatistica/:id', component: EstatisticaComponent, canActivate: [AuthGuard]},
  { path: 'estatistica-list', component: EstatisticaListComponent, canActivate: [AuthGuard]},
  { path: 'revisao-disciplina', component: RevisaoDisciplinaComponent, canActivate: [AuthGuard]},
  { path: 'revisao-assunto/:id', component: RevisaoAssuntoComponent, canActivate: [AuthGuard]},
  { path: 'revisao/:id', component: RevisaoComponent, canActivate: [AuthGuard]},
  { path: 'meta', component: MetaComponent, canActivate: [AuthGuard]},
  { path: 'meta/:id', component: MetaComponent, canActivate: [AuthGuard]},
  { path: 'meta-list', component: MetaListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
