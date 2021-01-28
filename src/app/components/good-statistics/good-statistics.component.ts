import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Good } from 'src/app/entities/goods.entity';
import * as c3 from 'c3';

@Component({
  selector: 'app-good-statistics',
  templateUrl: './good-statistics.component.html',
  styleUrls: ['./good-statistics.component.scss'],
})
export class GoodStatisticsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GoodStatisticsComponent>,
    @Inject(MAT_DIALOG_DATA) public good: Good,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['Поступление', 30, 200, 100, 400, 150, 250],
          ['Отгрузка', 50, 20, 10, 40, 15, 25],
        ],
      },
    });

    this.db
      .list(`statistics/${this.good.category}/${this.good.name}`, (ref) =>
        ref.orderByChild('date').startAt(Date.now() - 2764800000)
      )
      .valueChanges()
      .pipe(take(1))
      .subscribe((result) => {
        console.log(result);
      });
  }
}
