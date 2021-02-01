import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Good } from 'src/app/entities/goods.entity';
import * as c3 from 'c3';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-good-statistics',
  templateUrl: './good-statistics.component.html',
  styleUrls: ['./good-statistics.component.scss'],
})
export class GoodStatisticsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GoodStatisticsComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public good: Good,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    const dates = this.getDates();

    this.db
      .object(`statistics/${this.good.category}/${this.good.name}`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((result) => {
        const { retIntake, retOuttake, retCounts } = this.getDataByDays(
          dates,
          result
        );

        c3.generate({
          size: {
            width: 1000,
          },
          color: {
            pattern: ['#ffd740', '#f44336', '#673ab7'],
          },
          bindto: '#chart',
          data: {
            x: 'x',
            columns: [
              ['x', ...dates],
              ['Поступления', ...retIntake],
              ['Отгрузки', ...retOuttake],
              ['Общее количество', ...retCounts],
            ],
            type: 'bar',
            types: {
              'Общее количество': 'spline',
            },
          },
          axis: {
            x: {
              label: 'Дата',
              type: 'timeseries',
              tick: {
                fit: true,
                format: '%d.%m',
                culling: {
                  max: 31,
                },
              },
            },
            y: {
              center: 0,
              label: 'Количество',
              tick: {
                format: (d) => (Number.isInteger(d) ? d : ''),
              },
            },
          },
        });
      });
  }

  getDates() {
    const date = new Date();
    const dates = [];

    date.setDate(date.getDate() - 31);

    for (let i = 0; i < 31; i++) {
      date.setDate(date.getDate() + 1);
      dates.push(this.datePipe.transform(date, 'yyyy-MM-dd'));
    }
    return dates;
  }

  getDataByDays(dates: string[], data) {
    const intake = [];
    const outtake = [];
    const counts = [];

    let lastCount = 0;

    for (let day in data) {
      for (let even in data[day]) {
        const event = data[day][even];
        const date = this.datePipe.transform(event.date, 'yyyy-MM-dd');

        if (counts[date] == undefined) counts[date] = lastCount;
        if (event.type) {
          if (outtake[date] === undefined) outtake[date] = 0;
          outtake[date] += event.count;
          counts[date] -= event.count;
        } else {
          if (intake[date] === undefined) intake[date] = 0;
          intake[date] += event.count;
          counts[date] += event.count;
        }
        lastCount = counts[date];
      }
    }

    const retIntake = [];
    const retOuttake = [];
    const retCounts = [];

    let retLastCount = 0;

    for (const date of dates) {
      retIntake.push(intake[date] === undefined ? 0 : intake[date]);
      retOuttake.push(outtake[date] === undefined ? 0 : outtake[date]);

      if (counts[date] === undefined) {
        retCounts.push(retLastCount);
      } else {
        retCounts.push(counts[date]);
        retLastCount = counts[date];
      }
    }

    return { retIntake, retOuttake, retCounts };
  }
}
