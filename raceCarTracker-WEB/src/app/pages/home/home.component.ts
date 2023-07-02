import { CarService } from "./../shared/services/car.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbSortDirection,
  NbSortRequest,
  NbThemeService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { Subject } from "rxjs";
import { Car } from "../shared/models/car-model";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
];

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource: Car[] = [];
  pageTitle: string = "Carros";

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Car>,
    private carService: CarService
  ) {
    // this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  customColumn = "name";
  defaultColumns = ["size", "kind", "items"];
  allColumns = [this.customColumn, ...this.defaultColumns];

  // dataSource: NbTreeGridDataSource<Car>;

  sortColumn!: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  private data: Car[] = [];

  ngOnInit(): void {
    this.getCars();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCars(): void {
    this.carService
      .getAll()
      .pipe()
      .subscribe((ans) => {
        console.log(ans);
        this.dataSource = ans;
      });
  }

  updateSort(sortRequest: any): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }
}
