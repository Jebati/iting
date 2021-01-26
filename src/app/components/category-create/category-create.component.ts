import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/entities/categories.entity';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/internal/operators';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  public category: Category;
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    fields: this.fb.array([]),
  });

  public get fields(): FormArray {
    return <FormArray>this.form.controls.fields;
  }

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {}

  ngOnInit(): void {}

  addField() {
    this.fields.push(
      this.fb.group({
        key: ['', [Validators.required]],
        type: ['0'],
      })
    );
  }

  removeField(i: number) {
    this.fields.removeAt(i);
  }

  addCategory() {
    const category = this.db.object('/categories/' + this.form.value.name);
    category
      .valueChanges()
      .pipe(take(1))
      .subscribe((result) => {
        if (result === null || confirm('Данная категория уже существует. Применить изменения к ней?')) {
          category.set(this.form.value.fields.length ? this.form.value.fields : '');
        }
      });
  }
}
