import { CarService } from "./../shared/services/car.service";
import { Category } from "./../shared/models/category-model";
import { CategoryService } from "./../shared/services/category.service";
import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-car-form",
  templateUrl: "./car-form.component.html",
  styleUrls: ["./car-form.component.scss"],
})
export class CarFormComponent
  implements OnInit, OnDestroy, AfterContentChecked
{
  private unsubscribe$ = new Subject<void>();
  carForm!: FormGroup;
  pageTitle: string = "Cadastro de carro";
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private carService: CarService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.buildCarForm();
  }

  ngAfterContentChecked() {
    // this.setPageTitle();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submitForm() {
    this.createCar();
  }

  private setCurrentAction() {
    // if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    // else this.currentAction = "edit";
  }

  private buildCarForm() {
    this.carForm = this.formBuilder.group({
      model: [null],
      name: [null],
      owner: [null],
      plate: [null],
      category: [null],
    });
  }

  getCategories() {
    this.categoryService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (ans: any) => {
          this.categories = ans;
          console.log(this.categories);
        },
        (error) => {
          alert("Não foi possível obter as categorias.");
        }
      );
  }

  private createCar() {
    const newCar = {
      name: this.carForm.get("name")?.value,
      model: this.carForm.get("model")?.value,
      owner: this.carForm.get("owner")?.value,
      plate: this.carForm.get("plate")?.value,
      category: this.carForm.get("category")?.value,
    };

    this.carService
      .create(newCar)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (car) => {
          // this.submittingForm = false;
          this.toastrService.success(`${car.name} foi cadastrado!`, "Sucesso");
        },
        (errorResp) => {
          this.toastrService.danger(
            `Falha ao cadastrar ${this.carForm.get("name")?.value}!`,
            "Erro"
          );

          console.log(errorResp);

          this.toastrService.danger(
            errorResp.error.description,
            errorResp.error.error
          );

          // this.submittingForm = false;
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
