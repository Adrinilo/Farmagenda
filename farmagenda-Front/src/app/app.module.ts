import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroHome, heroClipboardDocumentList, heroCalendarDays, heroDocumentText } from '@ng-icons/heroicons/outline';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { ProspectoComponent } from './prospecto/prospecto.component';
import { CalendarioComponent } from './calendario/calendario.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tratamientos', component: TratamientosComponent },
  { path: 'prospectos', component: ProspectoComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'login', component: HomeComponent }
];

const icons = { 
  heroHome,
  heroClipboardDocumentList,
  heroDocumentText,
  heroCalendarDays,
  heroUserCircleSolid
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TratamientosComponent,
    ProspectoComponent,
    CalendarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgIconsModule.withIcons(icons),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
