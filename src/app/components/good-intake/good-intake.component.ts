import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
export class GoodIntakeComponent implements OnInit {
  displayName: string;
  form: FormGroup = this.fb.group({
    src: ['', [Validators.required, Validators.minLength(1)]],
    count: [1, [Validators.required, Validators.min(1)]],
    date: [
      this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm'),
      [Validators.required],
    ],
  });

  constructor(
    public dialogRef: MatDialogRef<GoodIntakeComponent>,
    @Inject(MAT_DIALOG_DATA) public good: Good,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public auth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.auth.user.pipe(take(1)).subscribe(({ displayName }) => {
      this.displayName = displayName;
    });
  }

  inTake() {
    const value = this.form.value;
    const date = new Date(value.date);
    date.setHours(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setMilliseconds(0);

    const count = this.db.object(
      `goods/${this.good.category}/${this.good.name}/count`
    );
    count
      .valueChanges()
      .pipe(take(1))
      .subscribe((result) => count.set(result + value.count));

    this.db
      .list(
        `statistics/${this.good.category}/${this.good.name}/${date.getTime()}`
      )
      .push({ ...value, type: 0, dst: this.displayName });

    this.dialogRef.close();
  }
}
