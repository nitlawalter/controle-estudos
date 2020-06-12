import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { DisciplinaComponent } from './components/disciplina/disciplina.component';
import { HomeComponent } from './components/home/home.component';
import { AssuntoComponent } from './components/assunto/assunto.component';
import { TopicoComponent } from './components/topico/topico.component';
import { QuestaoComponent } from './components/questao/questao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDebugComponent } from './shared/form-debug/form-debug.component';
import { InputComponent } from './shared/input/input.component';
import { DisciplinaListComponent } from './components/disciplina-list/disciplina-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DisciplinaComponent,
    HomeComponent,
    AssuntoComponent,
    TopicoComponent,
    QuestaoComponent,
    FormDebugComponent,
    InputComponent,
    DisciplinaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
