import { Component, OnInit } from '@angular/core';
import { Category, CategoryField } from 'src/app/entities/categories.entity';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Good } from 'src/app/entities/goods.entity';

@Component({
  selector: 'app-good-edit',
  templateUrl: './good-edit.component.html',
  styleUrls: ['./good-edit.component.scss'],
})
export class GoodEditComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  private good: AngularFireObject<unknown>;
  private categoryName: string;
  private goodName: string;

  public categories: any;
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    count: [0],
    fields: this.fb.array([]),
  });

  public get fields(): FormArray {
    return <FormArray>this.form.controls.fields;
  }

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subscription.add(
      this.route.params
        .pipe(take(1))
        .subscribe(({ categoryName, goodName }) => {
          this.categoryName = categoryName;
          this.goodName = goodName;
        })
    );
  }

  ngOnInit(): void {
    this.good = this.db.object(`/goods/${this.categoryName}/${this.goodName}`);
    this.subscription.add(
      this.good
        .valueChanges()
        .pipe(take(1))
        .subscribe((result: Good) => {
          if (result === null) this.router.navigate(['/goods']);
          else {
            if (result.fields)
              for (let { key, type, value } of result.fields)
                this.addField(key, type, value);
            else result.fields = [];
            
            this.form.setValue(result);
            this.form.markAsPristine();
          }
        })
    );
  }

  addField(key, type, value = '') {
    this.fields.push(
      this.fb.group({
        key,
        type,
        value: this.fb.control(value, [Validators.required]),
      })
    );
  }

  saveGood() {
    this.good.set(this.form.value);
    this.form.markAsPristine();
  }

  deleteGood() {
    if (confirm(`Вы уверены, что хотите удалить товар "${this.goodName}"?`)) {
      this.good.remove();
      this.router.navigate(['/goods']);
    }
  }
}
