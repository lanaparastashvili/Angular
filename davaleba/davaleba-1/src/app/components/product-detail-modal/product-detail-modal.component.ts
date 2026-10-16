import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-detail-modal',
  standalone: false,
  template: `
    <div class="modal-backdrop" *ngIf="product" (click)="close()">
      <div class="modal-dialog" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="modal-header">
          <div class="header-title-box">
            <span class="sku-tag">{{ product.sku }}</span>
            <h2 class="modal-title">{{ product.name }}</h2>
          </div>
          <button class="close-btn" (click)="close()" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div *ngIf="!confirmingDelete; else confirmDeleteBlock" class="detail-grid">
            <div class="detail-image-box">
              <product-image [product]="product"></product-image>
            </div>

            <div class="detail-content">
              <div class="info-group">
                <label>კატეგორიის იერარქია (Department)</label>
                <product-department [product]="product"></product-department>
              </div>

              <div class="info-group">
                <label>ფასი (Price)</label>
                <price-display [price]="product.price"></price-display>
              </div>

              <div class="info-group">
                <label>SKU კოდი</label>
                <code class="sku-code">{{ product.sku }}</code>
              </div>
            </div>
          </div>

          <ng-template #confirmDeleteBlock>
            <div class="confirm-delete-box">
              <div class="warning-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3>წაშლის დადასტურება</h3>
              <p>ნამდვილად გსურთ პროდუქტის <strong>"{{ product.name }}"</strong> წაშლა?</p>
              <p class="sub-warning">ეს ქმედება შეუქცევადია.</p>
            </div>
          </ng-template>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <ng-container *ngIf="!confirmingDelete">
            <button class="btn btn-outline-danger" (click)="startDeleteConfirm()" type="button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              წაშლა
            </button>
            
            <button class="btn btn-primary" (click)="onEdit()" type="button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              რედაქტირება
            </button>
          </ng-container>

          <ng-container *ngIf="confirmingDelete">
            <button class="btn btn-secondary" (click)="cancelDeleteConfirm()" type="button">
              გაუქმება
            </button>
            <button class="btn btn-danger" (click)="executeDelete()" type="button">
              დიახ, წაშლა
            </button>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.2s ease-out;
    }

    .modal-dialog {
      background: #ffffff;
      border-radius: 24px;
      width: 100%;
      max-width: 540px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .sku-tag {
      font-size: 0.75rem;
      font-weight: 700;
      color: #6366f1;
      background: rgba(99, 102, 241, 0.1);
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 0.35rem;
    }

    .modal-title {
      margin: 0;
      font-size: 1.35rem;
      font-weight: 700;
      color: #0f172a;
    }

    .close-btn {
      border: none;
      background: #f1f5f9;
      color: #64748b;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .close-btn:hover {
      background: #e2e8f0;
      color: #0f172a;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .detail-grid {
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
    }

    .detail-image-box {
      flex-shrink: 0;
    }

    ::ng-deep .detail-image-box product-image .product-image-wrapper {
      width: 120px !important;
      height: 120px !important;
      border-radius: 16px !important;
    }

    .detail-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .info-group label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      margin-bottom: 0.35rem;
    }

    .sku-code {
      font-family: monospace;
      font-size: 0.95rem;
      background: #f8fafc;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      color: #334155;
    }

    .confirm-delete-box {
      text-align: center;
      padding: 1rem 0;
    }

    .warning-icon-box {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #fef2f2;
      color: #ef4444;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .confirm-delete-box h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .confirm-delete-box p {
      margin: 0;
      color: #475569;
      font-size: 0.95rem;
    }

    .confirm-delete-box .sub-warning {
      margin-top: 0.25rem;
      font-size: 0.8rem;
      color: #94a3b8;
    }

    .modal-footer {
      padding: 1.25rem 1.5rem;
      background: #f8fafc;
      border-top: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 1.25rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-secondary {
      background: #e2e8f0;
      color: #475569;
    }

    .btn-secondary:hover {
      background: #cbd5e1;
    }

    .btn-primary {
      background: #6366f1;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    .btn-primary:hover {
      background: #4f46e5;
    }

    .btn-danger {
      background: #ef4444;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }

    .btn-danger:hover {
      background: #dc2626;
    }

    .btn-outline-danger {
      background: #fff;
      color: #ef4444;
      border: 1px solid #fca5a5;
    }

    .btn-outline-danger:hover {
      background: #fef2f2;
      border-color: #ef4444;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ProductDetailModalComponent {
  @Input() product: Product | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onEditProduct = new EventEmitter<Product>();
  @Output() onDeleteProduct = new EventEmitter<Product>();

  confirmingDelete: boolean = false;

  close(): void {
    this.confirmingDelete = false;
    this.onClose.emit();
  }

  onEdit(): void {
    if (this.product) {
      this.onEditProduct.emit(this.product);
    }
  }

  startDeleteConfirm(): void {
    this.confirmingDelete = true;
  }

  cancelDeleteConfirm(): void {
    this.confirmingDelete = false;
  }

  executeDelete(): void {
    if (this.product) {
      this.onDeleteProduct.emit(this.product);
    }
  }
}
