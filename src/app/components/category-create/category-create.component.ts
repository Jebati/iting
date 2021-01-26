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
    this.db
      .list('categories', (ref) =>
        ref.orderByChild('name').equalTo(this.form.value.name)
      )
      .snapshotChanges()
      .subscribe((categories) => {
        if (categories.length) {
          if(confirm("Данная категория уже существует. Применить изменения к ней?")) {
            this.db.list('categories').set(categories[0].key, this.form.value);
          }
        } else this.db.list('categories').push(this.form.value);
      });
  }
}
