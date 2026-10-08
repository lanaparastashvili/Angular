import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-department',
  standalone: false,
  template: `
    <div class="product-department-container" *ngIf="product && product.department">
      <span *ngFor="let dept of product.department; let last = last" class="dept-wrapper">
        <span class="dept-badge">{{ dept }}</span>
        <span *ngIf="!last" class="dept-separator">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </span>
      </span>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .product-department-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.35rem;
    }

    .dept-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    .dept-badge {
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748b;
      background: #f1f5f9;
      padding: 0.2rem 0.55rem;
      border-radius: 6px;
      letter-spacing: 0.02em;
      transition: all 0.2s ease;
    }

    .dept-badge:hover {
      background: #e2e8f0;
      color: #334155;
    }

    .dept-separator {
      display: inline-flex;
      align-items: center;
      color: #cbd5e1;
    }

    :host-context(.dark) .dept-badge {
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
    }

    :host-context(.dark) .dept-separator {
      color: #475569;
    }
  `]
})
export class ProductDepartmentComponent {
  @Input() product!: Product;
}
