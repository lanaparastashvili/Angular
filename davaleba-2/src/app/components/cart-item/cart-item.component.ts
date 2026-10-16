import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="py-5 px-4 border-b border-[#DEE2E7] last:border-b-0">
      <div class="flex items-start gap-4">

        <!-- პროდუქტის სურათი -->
        <div class="w-[80px] h-[80px] rounded-md overflow-hidden border border-[#DEE2E7] shrink-0 bg-[#F7F8F9] flex items-center justify-center p-1.5">
          <img
            [src]="item.image"
            [alt]="item.name"
            class="max-w-full max-h-full object-contain"
          />
        </div>

        <!-- პროდუქტის ინფორმაცია და ფასი -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-4">
            <!-- მარცხენა: სახელი, დეტალები და ღილაკები -->
            <div class="flex-1">
              <h3 class="text-base font-medium text-[#1C1C1C] leading-snug">
                {{ item.name }}
              </h3>
              <p class="text-sm text-[#8B96A5] mt-1">
                Size: {{ item.size }}, Color: {{ item.color }},  Material: {{ item.material }}
              </p>
              <p class="text-sm text-[#8B96A5]">
                Seller: {{ item.seller }}
              </p>

              <!-- მოქმედებების ღილაკები -->
              <div class="flex items-center gap-2 mt-4">
                <!-- წაშლის ღილაკი -->
                <button
                  type="button"
                  (click)="onRemove()"
                  class="text-sm font-medium text-[#FA3434] hover:text-red-700 transition-colors cursor-pointer border border-[#DEE2E7] rounded-md px-3 py-1.5 shadow-xs"
                >
                  Remove
                </button>

                <!-- Save for later ღილაკი -->
                <button
                  type="button"
                  class="text-sm font-medium text-[#0D6EFD] hover:text-blue-700 transition-colors cursor-pointer border border-[#DEE2E7] rounded-md px-3 py-1.5 shadow-xs"
                >
                  Save for later
                </button>
              </div>
            </div>

            <!-- მარჯვენა: ფასი და რაოდენობა ფასის ქვეშ -->
            <div class="flex flex-col items-end shrink-0 gap-3">
              <!-- ფასი -->
              <span class="text-base font-semibold text-[#1C1C1C]">
                \${{ item.price | number:'1.2-2' }}
              </span>

              <!-- რაოდენობის არჩევა (Qty dropdown) - ფასის დაბლა -->
              <div class="relative">
                <select
                  [ngModel]="item.quantity"
                  (ngModelChange)="onQuantitySelect($event)"
                  class="appearance-none bg-white border border-[#DEE2E7] rounded-md pl-3 pr-8 py-1.5 text-sm text-[#1C1C1C] cursor-pointer focus:outline-none focus:border-[#0D6EFD]"
                >
                  <option *ngFor="let q of quantityOptions" [ngValue]="q">
                    Qty: {{ q }}
                  </option>
                </select>
                <svg class="w-3.5 h-3.5 text-[#8B96A5] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;
  private readonly cartService = inject(CartService);

  // რაოდენობის ვარიანტები 1-დან 10-მდე
  quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // რაოდენობის ცვლილებისას ნახლდება ფასი
  onQuantitySelect(val: number): void {
    if (val && val >= 1) {
      this.cartService.setQuantity(this.item.id, val);
    }
  }

  // პროდუქტის წაშლა
  onRemove(): void {
    this.cartService.removeItem(this.item.id);
  }
}
