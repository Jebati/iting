import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Good } from 'src/app/entities/goods.entity';

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
