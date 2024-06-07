import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';
import { ProspectoComponent } from './components/prospecto/prospecto.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroHome, heroClipboardDocumentList, heroCalendarDays, heroDocumentText } from '@ng-icons/heroicons/outline';
import { heroUserCircleSolid, heroCogSolid, heroPencilSquareSolid, heroArrowTopRightOnSquareSolid } from '@ng-icons/heroicons/solid';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegisterPacienteComponent } from './components/register-paciente/register-paciente.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './components/dialogs/confirmdialog/confirmdialog.component';
import { OptionsDialogComponent } from './components/dialogs/optionsdialog/optionsdialog.component';
import { ProspectoMostrarComponent } from './components/prospectomostrar/prospectomostrar.component';
import { FormmedComponent } from './components/formmed/formmed.component';
import { WindowService } from './services/window.service';
import {MatFormFieldModule} from '@angular/material/form-field';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tratamientos', component: TratamientosComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'prospectos', component: ProspectoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'prospectos/:nregistro', component: ProspectoMostrarComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'calendario', component: CalendarioComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'perfil', component: PerfilComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'registerPaciente', component: RegisterPacienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'updatePaciente', component: RegisterPacienteComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

const icons = { 
  heroHome,
  heroClipboardDocumentList,
  heroDocumentText,
  heroCalendarDays,
  heroUserCircleSolid,
  heroCogSolid,
  heroPencilSquareSolid,
  heroArrowTopRightOnSquareSolid
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TratamientosComponent,
    ProspectoComponent,
    CalendarioComponent,
    PerfilComponent,
    RegisterComponent,
    LoginComponent,
    RegisterPacienteComponent,
    ConfirmDialogComponent,
    OptionsDialogComponent,
    ProspectoMostrarComponent,
    FormmedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgIconsModule.withIcons(icons),
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [
    provideAnimationsAsync(),
    WindowService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
