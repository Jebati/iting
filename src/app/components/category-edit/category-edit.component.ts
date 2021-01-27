import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, CategoryField } from 'src/app/entities/categories.entity';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private category: AngularFireObject<unknown>;
  private categoryName: string;
  public form: FormGroup = this.fb.group({
    name: [{ value: null, disabled: true }, [Validators.required]],
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
      route.params.pipe(take(1)).subscribe(({ categoryName }) => {
        this.categoryName = categoryName;
      })
    );
  }

  ngOnInit(): void {
    this.category = this.db.object('/categories/' + this.categoryName);
    this.subscription.add(
      this.category
        .valueChanges()
        .pipe(take(1))
        .subscribe((result: CategoryField[]) => {
          if (result === null) this.router.navigate(['/categories']);
          else {
            if (result)
              result.forEach(({ key, type }) => this.addField(key, type));
            this.form.patchValue({ name: this.categoryName });
          }
        })
    );
  }

  addField(key = '', type = 'number') {
    this.fields.push(
      this.fb.group({
        key: [key, [Validators.required]],
        type: [type],
      })
    );
    if (!key) this.form.markAsDirty();
  }

  removeField(i: number) {
    this.fields.removeAt(i);
    this.form.markAsDirty();
  }

  saveCategory() {
    this.category.set(
      this.form.value.fields.length ? this.form.value.fields : ''
    );
    this.form.markAsPristine();
  }

  deleteCategory() {
    if (
      confirm(
        `Вы уверены, что хотите удалить категорию "${this.categoryName}"?`
      )
    ) {
      this.category.remove();
      this.router.navigate(['/categories']);
    }
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
