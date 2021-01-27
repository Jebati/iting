import { Component, OnInit } from '@angular/core';
import { Category, CategoryField } from 'src/app/entities/categories.entity';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-good-create',
  templateUrl: './good-create.component.html',
  styleUrls: ['./good-create.component.scss'],
})
export class GoodCreateComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public categories: any;
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    count: [0],
    fields: this.fb.group({}),
  });

  public get fields(): FormGroup {
    return <FormGroup>this.form.controls.fields;
  }

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.db
        .object('/categories')
        .valueChanges()
        .pipe(take(1))
        .subscribe((categories: any) => {
          if (categories) this.categories = categories;
          else {
            alert('Для добавления товара требуются категории');
            this.router.navigate(['/categories']);
          }
        })
    );
  }

  addField(key = '') {
    this.fields.addControl(key, this.fb.control('', [Validators.required]));
  }

  categoryChange() {
    const category = this.form.value.category;
    for (let field in this.fields.controls) this.fields.removeControl(field);
    if (this.categories[category])
      this.categories[category].forEach(({ key }) => this.addField(key));
  }

  addGood() {
    const value = this.form.value;
    const good = this.db.object(`/goods/${value.category}/${value.name}`);

    good
      .valueChanges()
      .pipe(take(1))
      .subscribe((result) => {
        if (
          result === null ||
          confirm('Данный товар уже существует. Применить изменения к нему?')
        ) {
          good.set(value);
          this.router.navigate(['/goods']);
        }
      });
  }
}
