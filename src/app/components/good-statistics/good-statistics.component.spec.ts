import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodStatisticsComponent } from './good-statistics.component';

describe('GoodStatisticsComponent', () => {
  let component: GoodStatisticsComponent;
  let fixture: ComponentFixture<GoodStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
