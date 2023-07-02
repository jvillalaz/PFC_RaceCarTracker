import { KartWsService } from './../shared/services/kart-ws.service';
import { Round } from './../shared/models/round-model';
import { RoundService } from './../shared/services/round.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarService } from '../shared/services/car.service';
import { Championship, ChampionshipService } from '../shared/services/championship.service';
import { Car } from '../shared/models/car-model';


export interface Lap {
  time?: string,
  round?: string,
  car?: string,
}

@Component({
  selector: 'app-panel-show',
  templateUrl: './panel-show.component.html',
  styleUrls: ['./panel-show.component.scss']
})
export class PanelShowComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  public currentCar: any;
  championships: Championship[] = [];
  public rounds: Round[] = [];
  public cars: Car[] = [];
  selected: any;
  laps: Lap[] = [];

  constructor(
    private carService: CarService,
    private championshipService: ChampionshipService,
    private roundService: RoundService,
    private kartWsService: KartWsService,
  ) { }

  ngOnInit(): void {
    this.getCurrentCar();
    this.getChampionships();
    this.getCars();
    this.wsConnect();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  getCurrentCar(): void {
    this.carService
      .getCurrentCarTrack()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (ans: any) => {
          this.currentCar = ans;
          console.log(this.currentCar);
        },
        (error) => {
          alert('Não há car na pista!');
        }
      );
  }

  getCarsByRound(event: any): void {
    this.carService
      .getCurrentCarTrack()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (ans: any) => {
          this.currentCar = ans;
          console.log(this.currentCar);
        },
        (error) => {
          alert('Não há car na pista!');
        }
      );
  }

  getCars(): void {
    this.carService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (ans: any) => {
          this.cars = ans;
          console.log(this.cars);
        },
        (error) => {
          alert('não foi possivel obter os carros!');
        }
      );
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
          alert('Não foi possível obter os campeonatos.');
        }
      );
  }

  getRoundByChampionship(event: any) {
    console.log(event);

    this.roundService
      .getRoundsByChampionship(event)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (ans: any) => {
          this.rounds = ans;
          console.log(this.championships);
        },
        (error) => {
          alert('Não foi possível obter os baterias.');
        }
      );
  }

  sendCarToTrack(event: any) {
    // console.log(this.selected);

    this.roundService
      .sendCarTrack({ car: event, round: this.selected })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (ans: any) => {
          console.log(ans);
          this.getCurrentCar();
        },
        (error) => {
          alert('Não foi possível enviar carro para a pista.');
        }
      );
  }

  wsConnect() {
    this.laps = [];
    this.kartWsService.listen('toWebsite')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: { action: string, payload: Lap }) => {
        console.log(data);
        this.laps.push(data.payload as Lap);
      });
  }

  emit() {
    this.kartWsService.emit('registerLap', { time: 'fasdfasdfasdf' });
  }
}


// {
//   action: 'toW',
//   payload:
// }
