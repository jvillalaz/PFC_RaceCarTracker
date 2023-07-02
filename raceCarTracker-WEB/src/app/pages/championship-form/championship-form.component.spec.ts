import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipFormComponent } from './championship-form.component';

describe('ChampionshipFormComponent', () => {
  let component: ChampionshipFormComponent;
  let fixture: ComponentFixture<ChampionshipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionshipFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionshipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
