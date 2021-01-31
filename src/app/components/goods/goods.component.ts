import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/entities/categories.entity';
import { Good } from 'src/app/entities/goods.entity';
import { GoodIntakeComponent } from '../good-intake/good-intake.component';
import { GoodOuttakeComponent } from '../good-outtake/good-outtake.component';
import { GoodStatisticsComponent } from '../good-statistics/good-statistics.component';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
})
export class GoodsComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public goods = [];

  constructor(
    private db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.db
        .object('goods')
        .valueChanges()
        .subscribe((categories: any) => {
          this.goods = [];
          for (let category in categories)
            for (let good in categories[category])
              this.goods.push(categories[category][good]);
        })
    );
  }

  openInTake(good: Good) {
    this.dialog.open(GoodIntakeComponent, { data: good });
  }

  openOutTake(good: Good) {
    this.dialog.open(GoodOuttakeComponent, { data: good });
  }

  statistics(good: Good) {
    this.dialog.open(GoodStatisticsComponent, { data: good });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
