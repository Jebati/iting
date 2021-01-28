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
    /*c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['Поступление', 30, 200, 100, 400, 150, 250],
          ['Отгрузка', 50, 20, 10, 40, 15, 25],
        ],
      },
    });*/
    c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          [
            'x',
            '2013-01-01',
            '2013-01-02',
            '2013-01-03',
            '2013-01-04',
            '2013-01-05',
            '2013-01-06',
          ],
          ['Поступления', 30, 200, 100, 400, 150, 250],
          ['Отгрузки', 130, 340, 200, 500, 250, 350],
        ],
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d',
          },
        },
      },
    });

    this.db
      .list(`statistics/${this.good.category}/${this.good.name}`, (ref) =>
        ref.orderByKey().startAt(String(Date.now() - 2764800000))
      )
      .valueChanges()
      .pipe(take(1))
      .subscribe((result) => {
        console.log(result);
      });
  }
}
