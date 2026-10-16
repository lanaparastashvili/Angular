import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-image',
  standalone: false,
  template: `
    <div class="product-image-wrapper">
      <img
        *ngIf="product && product.imageUrl && !imageError"
        [src]="product.imageUrl"
        [alt]="product.name"
        class="product-img"
        (error)="onImageError()"
      />
      <div *ngIf="!product || !product.imageUrl || imageError" class="product-img-fallback">
        <svg class="fallback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span class="fallback-text">{{ product ? product.name.substring(0, 2).toUpperCase() : 'PR' }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .product-image-wrapper {
      width: 76px;
      height: 76px;
      border-radius: 12px;
      overflow: hidden;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      position: relative;
      flex-shrink: 0;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2);
    }

    .product-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-image-wrapper:hover .product-img {
      transform: scale(1.08);
    }

    .product-img-fallback {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
      color: #4338ca;
    }

    .fallback-icon {
      width: 24px;
      height: 24px;
      opacity: 0.8;
    }

    .fallback-text {
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      margin-top: 2px;
    }
  `]
})
export class ProductImageComponent {
  @Input() product!: Product;
  imageError: boolean = false;

  onImageError(): void {
    this.imageError = true;
  }
}
