import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { GoodsComponent } from './components/goods/goods.component';
import { GoodCreateComponent } from './components/good-create/good-create.component';
import { GoodEditComponent } from './components/good-edit/good-edit.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { GoodIntakeComponent } from './components/good-intake/good-intake.component';
import { DatePipe } from '@angular/common';
import { GoodOuttakeComponent } from './components/good-outtake/good-outtake.component';
import { GoodStatisticsComponent } from './components/good-statistics/good-statistics.component';
import { AuthComponent } from './components/auth/auth.component';
import { MatMenuModule } from '@angular/material/menu';

import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    GoodCreateComponent,
    GoodEditComponent,
    CategoriesComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    GoodIntakeComponent,
    GoodOuttakeComponent,
    GoodStatisticsComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, undefined, {
      toastMessageOnAuthSuccess: false,
      toastMessageOnAuthError: false,
    }),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
