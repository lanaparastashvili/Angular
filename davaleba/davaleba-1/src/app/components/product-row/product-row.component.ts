import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-row',
  standalone: false,
  template: `
    <div class="product-row-card" *ngIf="product">
      <!-- Left: Image -->
      <product-image [product]="product" class="row-image-col"></product-image>

      <!-- Center: Main details (Name, SKU, Department) -->
      <div class="row-info-col">
        <div class="row-header">
          <span class="sku-badge">{{ product.sku }}</span>
          <h3 class="product-name">{{ product.name }}</h3>
        </div>
        
        <div class="row-dept">
          <product-department [product]="product"></product-department>
        </div>
      </div>

      <!-- Right: Price & Quick Action -->
      <div class="row-price-col">
        <price-display [price]="product.price"></price-display>
        
        <button class="select-indicator-btn" (click)="onSelect($event)" type="button">
          <span *ngIf="isSelected">არჩეულია</span>
          <span *ngIf="!isSelected">ნახვა</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 0.85rem;
    }

    .product-row-card {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1rem 1.25rem;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      position: relative;
    }

    .product-row-card:hover {
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.08);
    }

    :host(.selected) .product-row-card,
    .product-row-card.is-selected {
      border-color: #6366f1;
      background: #f5f3ff;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25), 0 8px 20px -4px rgba(99, 102, 241, 0.15);
    }

    .row-image-col {
      flex-shrink: 0;
    }

    .row-info-col {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .row-header {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      flex-wrap: wrap;
    }

    .sku-badge {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6366f1;
      background: rgba(99, 102, 241, 0.08);
      padding: 0.15rem 0.5rem;
      border-radius: 6px;
    }

    .product-name {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .row-dept {
      margin-top: 0.1rem;
    }

    .row-price-col {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .select-indicator-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      border: none;
      background: transparent;
      color: #64748b;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .product-row-card:hover .select-indicator-btn {
      color: #6366f1;
      background: rgba(99, 102, 241, 0.08);
    }

    :host(.selected) .select-indicator-btn {
      color: #6366f1;
      font-weight: 700;
    }

    @media (max-width: 640px) {
      .product-row-card {
        flex-direction: column;
        align-items: stretch;
      }
      .row-price-col {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: 1px stroke #f1f5f9;
        padding-top: 0.5rem;
      }
    }
  `]
})
export class ProductRowComponent {
  @Input() product!: Product;
  @Input() @HostBinding('class.selected') isSelected: boolean = false;
  @Output() onProductSelected = new EventEmitter<Product>();

  onSelect(event: MouseEvent): void {
    event.stopPropagation();
    this.onProductSelected.emit(this.product);
  }
}
