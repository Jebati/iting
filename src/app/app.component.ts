import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthComponent } from './components/auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items: Observable<any[]>;

  constructor(public auth: AngularFireAuth, private router: Router, public dialog: MatDialog) {}

  login() {
    this.dialog.open(AuthComponent);
  }
  logout() {
    this.auth.signOut();
    this.router.navigate(['/goods']);
  }
}
