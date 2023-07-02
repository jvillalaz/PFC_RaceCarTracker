import { PanelShowComponent } from './panel-show/panel-show.component';
import { ChampionshipFormComponent } from "./championship-form/championship-form.component";
import { RoundFormComponent } from "./round-form/round-form.component";
import { CarFormComponent } from "./car-form/car-form.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    // redirectTo: 'home',
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "car-form",
        component: CarFormComponent,
      },
      {
        path: "round-form",
        component: RoundFormComponent,
      },
      {
        path: "panel",
        component: PanelShowComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
