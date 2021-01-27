import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Good } from 'src/app/entities/goods.entity';

@Component({
  selector: 'app-good-outtake',
  templateUrl: './good-outtake.component.html',
  styleUrls: ['./good-outtake.component.scss'],
})
export class GoodOuttakeComponent {

  form: FormGroup = this.fb.group({
    count: [1, [Validators.required, Validators.min(1), Validators.max(this.good.count)]],
    date: [this.datePipe.transform(new Date(), "yyyy-MM-ddTHH:mm"), [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<GoodOuttakeComponent>,
    @Inject(MAT_DIALOG_DATA) public good: Good,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private db: AngularFireDatabase
  ) {}

  outTake() {
    const value = this.form.value;
    const count = this.db.object(`goods/${this.good.category}/${this.good.name}/count`);
    count.valueChanges().pipe(take(1)).subscribe((result: number) => count.set(result - value.count));

    this.db.list(`statistics/${this.good.category}/${this.good.name}`).push({ ...value, type: 1 });

    this.dialogRef.close();
  }
}
