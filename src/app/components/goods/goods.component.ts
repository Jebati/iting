import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/entities/categories.entity';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
})
export class GoodsComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public categories;

  constructor(private db: AngularFireDatabase, public auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.subscription.add(
      this.db
        .object('goods')
        .valueChanges()
        .subscribe((categories) => {
          this.categories = categories || {};
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
