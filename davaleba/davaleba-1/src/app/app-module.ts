import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { PriceDisplayComponent } from './components/price-display/price-display.component';
import { ProductDepartmentComponent } from './components/product-department/product-department.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { ProductRowComponent } from './components/product-row/product-row.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailModalComponent } from './components/product-detail-modal/product-detail-modal.component';
import { ProductFormModalComponent } from './components/product-form-modal/product-form-modal.component';

@NgModule({
  declarations: [
    App,
    PriceDisplayComponent,
    ProductDepartmentComponent,
    ProductImageComponent,
    ProductRowComponent,
    ProductsListComponent,
    ProductDetailModalComponent,
    ProductFormModalComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
