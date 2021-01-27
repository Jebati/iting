import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Good } from 'src/app/entities/goods.entity';

@Component({
  selector: 'app-good-intake',
  templateUrl: './good-intake.component.html',
  styleUrls: ['./good-intake.component.scss'],
})
export class GoodIntakeComponent {

  form: FormGroup = this.fb.group({
    count: [1, [Validators.required, Validators.min(1)]],
    date: [this.datePipe.transform(new Date(), "yyyy-MM-ddTHH:mm"), [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<GoodIntakeComponent>,
    @Inject(MAT_DIALOG_DATA) public good: Good,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private db: AngularFireDatabase
  ) {}

  inTake() {
    const count = this.db.object(`goods/${this.good.category}/${this.good.name}/count`);
    count.valueChanges().pipe(take(1)).subscribe(result => count.set(result + this.form.value.count));
    this.dialogRef.close();
  }
}
