import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'products-list',
  standalone: false,
  template: `
    <div class="products-list-wrapper">
      <div *ngIf="productList && productList.length > 0; else emptyState">
        <product-row
          *ngFor="let p of productList"
          [product]="p"
          [isSelected]="isSelected(p)"
          (click)="clicked(p)"
          (onProductSelected)="clicked(p)"
        >
        </product-row>
      </div>

      <ng-template #emptyState>
        <div class="empty-list-card">
          <div class="empty-icon-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 8-9-4 3 4 9 4 9 4-9-4Z"></path>
              <path d="M3 8v10l9 4 9-4V8"></path>
              <path d="M12 12v10"></path>
            </svg>
          </div>
          <h4>პროდუქტები ვერ მოიძებნა</h4>
          <p>საძიებო ფილტრი ან სია ცარიელია</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .products-list-wrapper {
      width: 100%;
    }

    .empty-list-card {
      text-align: center;
      padding: 3rem 1.5rem;
      background: #ffffff;
      border: 2px dashed #e2e8f0;
      border-radius: 16px;
      color: #64748b;
    }

    .empty-icon-box {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #f1f5f9;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      margin-bottom: 1rem;
    }

    .empty-list-card h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1.1rem;
      color: #1e293b;
      font-weight: 600;
    }

    .empty-list-card p {
      margin: 0;
      font-size: 0.875rem;
    }
  `]
})
export class ProductsListComponent {
  @Input() productList: Product[] = [];
  @Input() selectedProduct: Product | null = null;
  @Output() onProductSelected = new EventEmitter<Product>();

  clicked(product: Product): void {
    this.onProductSelected.emit(product);
  }

  isSelected(product: Product): boolean {
    if (!product || !this.selectedProduct) {
      return false;
    }
    return product.sku === this.selectedProduct.sku;
  }
}
