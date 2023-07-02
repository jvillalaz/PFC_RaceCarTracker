import { NgModule, Provider } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { HomeComponent } from "./home/home.component";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbThemeModule,
  NbToastrModule,
  NbTooltipModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { CarFormComponent } from "./car-form/car-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoundFormComponent } from './round-form/round-form.component';
import { ChampionshipFormComponent } from './championship-form/championship-form.component';
import { PanelShowComponent } from './panel-show/panel-show.component';

@NgModule({
  declarations: [PagesComponent, HomeComponent, CarFormComponent, RoundFormComponent, ChampionshipFormComponent, PanelShowComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTooltipModule,
    NbButtonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbTreeGridModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    NbSelectModule,
    NbToastrModule.forRoot(),
  ],
  // providers: [NbThemeModule.forRoot().providers as Provider],
})
export class PagesModule {}
