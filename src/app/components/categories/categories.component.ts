import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/entities/categories.entity';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public categories: Category[];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.subscription.add(
      this.db
        .object('categories')
        .valueChanges()
        .subscribe((categories: Category[]) => {
          this.categories = categories || [];
          console.log(this.categories)
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
