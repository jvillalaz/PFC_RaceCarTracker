import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CarService } from "../shared/services/car.service";
import { CategoryService } from "../shared/services/category.service";
import { Championship, ChampionshipService } from "../shared/services/championship.service";
import { RoundService } from "../shared/services/round.service";

@Component({
  selector: "app-round-form",
  templateUrl: "./round-form.component.html",
  styleUrls: ["./round-form.component.scss"],
})
export class RoundFormComponent
  implements OnInit, OnDestroy, AfterContentChecked {
  private unsubscribe$ = new Subject<void>();
  roundForm!: FormGroup;
  championshipForm!: FormGroup;

  pageTitle: string = "Cadastro de bateria";
  championships: Championship[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private championshipService: ChampionshipService,
    private roundService: RoundService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getChampionships();
    this.buildRoundForm();
    this.buildChampionshipForm();
  }

  ngAfterContentChecked() {
    // this.setPageTitle();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submitForm() {
    this.createRound();
  }

  submitChampioshipForm() {
    this.createChampioship();
  }

  private setCurrentAction() {
    // if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    // else this.currentAction = "edit";
  }

  private buildRoundForm() {
    this.roundForm = this.formBuilder.group({
      name: [null],
      championship: [null],
    });
  }

  private buildChampionshipForm() {
    this.championshipForm = this.formBuilder.group({
      name: [null],
    });
  }

  getChampionships() {
    this.championshipService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (ans: any) => {
          this.championships = ans;
          console.log(this.championships);
        },
        (error) => {
          alert("Não foi possível obter os campeonatos.");
        }
      );
  }

  private createRound() {
    const newRound = {

      "name": this.roundForm.get("name")?.value,
      "championship": this.roundForm.get("championship")?.value,
    }
    this.roundService
      .create(newRound)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (car) => {
          this.toastrService.success(`${car.name} foi cadastrado!`, "Sucesso");
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar bateria ${this.roundForm.get("name")?.value}!`,
            "Erro"
          );
          console.log(errorResp);
          this.toastrService.danger(
            errorResp.error.description,
            errorResp.error.error
          );
        }
      );
  }

  private createChampioship() {
    const newChampioship = {

      "name": this.championshipForm.get("name")?.value,
    }
    this.championshipService
      .create(newChampioship)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (car) => {
          this.toastrService.success(`${car.name} foi cadastrado!`, "Sucesso");
          this.getChampionships();

        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar campeonato ${this.roundForm.get("name")?.value}!`,
            "Erro"
          );
          console.log(errorResp);
          this.toastrService.danger(
            errorResp.error.description,
            errorResp.error.error
          );
        }
      );
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
