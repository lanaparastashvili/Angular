import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-form-modal',
  standalone: false,
  template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-dialog" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="modal-header">
          <div>
            <h2 class="modal-title">{{ isEdit ? 'პროდუქტის რედაქტირება' : 'ახალი პროდუქტის დამატება' }}</h2>
            <p class="modal-subtitle">შეიყვანეთ პროდუქტის მონაცემები</p>
          </div>
          <button class="close-btn" (click)="close()" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form (ngSubmit)="submitForm()">
          <div class="modal-body">
            <div class="form-group">
              <label>SKU კოდი *</label>
              <input
                type="text"
                class="form-control"
                placeholder="მაგ: SKU #NEATOJACKET"
                [(ngModel)]="sku"
                name="sku"
                required
              />
            </div>

            <div class="form-group">
              <label>პროდუქტის დასახელება (Name) *</label>
              <input
                type="text"
                class="form-control"
                placeholder="მაგ: Blue Jacket"
                [(ngModel)]="name"
                name="name"
                required
              />
            </div>

            <div class="form-group">
              <label>სურათის URL (Image URL)</label>
              <input
                type="url"
                class="form-control"
                placeholder="https://images.unsplash.com/..."
                [(ngModel)]="imageUrl"
                name="imageUrl"
              />
            </div>

            <div class="form-group">
              <label>კატეგორიები (Department) - მძიმით გამოყოფილი</label>
              <input
                type="text"
                class="form-control"
                placeholder="Women, Apparel, Jackets"
                [(ngModel)]="departmentStr"
                name="departmentStr"
              />
              <small class="form-hint">მაგ: Women > Apparel > Jackets (შეიყვანეთ მძიმით)</small>
            </div>

            <div class="form-group">
              <label>ფასი (Price) *</label>
              <div class="input-with-symbol">
                <span class="symbol">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  class="form-control with-padding"
                  placeholder="238.99"
                  [(ngModel)]="price"
                  name="price"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="close()" type="button">გაუქმება</button>
            <button class="btn btn-primary" type="submit" [disabled]="!sku || !name || price < 0">
              {{ isEdit ? 'შენახვა' : 'დამატება' }}
            </button>
          </div>
        </form>
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
      max-width: 500px;
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

    .modal-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
    }

    .modal-subtitle {
      margin: 0.2rem 0 0 0;
      font-size: 0.85rem;
      color: #64748b;
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
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
    }

    .form-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: #334155;
      margin-bottom: 0.35rem;
    }

    .form-control {
      width: 100%;
      padding: 0.65rem 0.85rem;
      border-radius: 10px;
      border: 1px solid #cbd5e1;
      font-size: 0.95rem;
      color: #0f172a;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }

    .form-control:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }

    .form-hint {
      display: block;
      font-size: 0.75rem;
      color: #94a3b8;
      margin-top: 0.25rem;
    }

    .input-with-symbol {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-with-symbol .symbol {
      position: absolute;
      left: 0.85rem;
      color: #64748b;
      font-weight: 600;
    }

    .form-control.with-padding {
      padding-left: 2rem;
    }

    .modal-footer {
      padding: 1.25rem 1.5rem;
      background: #f8fafc;
      border-top: 1px solid #f1f5f9;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .btn {
      padding: 0.65rem 1.25rem;
      border-radius: 10px;
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

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
export class ProductFormModalComponent implements OnInit, OnChanges {
  @Input() editProduct: Product | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSaveProduct = new EventEmitter<Product>();

  isEdit: boolean = false;
  sku: string = '';
  name: string = '';
  imageUrl: string = '';
  departmentStr: string = '';
  price: number = 0;

  ngOnInit(): void {
    this.populateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editProduct']) {
      this.populateData();
    }
  }

  private populateData(): void {
    if (this.editProduct) {
      this.isEdit = true;
      this.sku = this.editProduct.sku;
      this.name = this.editProduct.name;
      this.imageUrl = this.editProduct.imageUrl;
      this.departmentStr = (this.editProduct.department || []).join(', ');
      this.price = this.editProduct.price;
    } else {
      this.isEdit = false;
      this.sku = '';
      this.name = '';
      this.imageUrl = '';
      this.departmentStr = '';
      this.price = 0;
    }
  }

  close(): void {
    this.onClose.emit();
  }

  submitForm(): void {
    if (!this.sku || !this.name) return;

    const deptArray = this.departmentStr
      ? this.departmentStr.split(',').map((s) => s.trim()).filter(Boolean)
      : ['General'];

    const newProd = new Product(
      this.sku,
      this.name,
      this.imageUrl,
      deptArray,
      Number(this.price) || 0
    );

    this.onSaveProduct.emit(newProd);
  }
}
