import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { GoodCreateComponent } from './components/good-create/good-create.component';
import { GoodEditComponent } from './components/good-edit/good-edit.component';
import { GoodsComponent } from './components/goods/goods.component';

import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToCategories = () =>
  redirectUnauthorizedTo(['/categories']);
const redirectUnauthorizedToGoods = () => redirectUnauthorizedTo(['/goods']);

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'category',
    children: [
      {
        path: 'create',
        component: CategoryCreateComponent,
        ...canActivate(redirectUnauthorizedToCategories),
      },
      {
        path: 'edit/:categoryName',
        component: CategoryEditComponent,
        ...canActivate(redirectUnauthorizedToCategories),
      },
      { path: '**', redirectTo: 'categories', pathMatch: 'prefix' },
    ],
  },
  {
    path: 'goods',
    component: GoodsComponent,
  },
  {
    path: 'good',
    children: [
      {
        path: 'create',
        component: GoodCreateComponent,
        ...canActivate(redirectUnauthorizedToGoods),
      },
      {
        path: 'edit/:categoryName/:goodName',
        component: GoodEditComponent,
        ...canActivate(redirectUnauthorizedToGoods),
      },
      { path: '**', redirectTo: 'goods', pathMatch: 'prefix' },
    ],
  },
  { path: '**', redirectTo: 'goods', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
