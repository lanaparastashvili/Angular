import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">

      <!-- კუპონის სექცია -->
      <div class="bg-white rounded-md border border-[#DEE2E7] p-4">
        <p class="text-sm font-medium text-[#505050] mb-2">Have a coupon?</p>
        <div class="flex">
          <input
            type="text"
            [(ngModel)]="couponCodeInput"
            (keyup.enter)="onApplyCoupon()"
            placeholder="Add coupon"
            class="flex-1 px-3 py-2 text-sm bg-white border border-[#DEE2E7] border-r-0 rounded-l-md focus:outline-none focus:border-[#0D6EFD] placeholder:text-[#8B96A5]"
          />
          <button
            type="button"
            (click)="onApplyCoupon()"
            class="px-5 py-2 text-sm font-medium text-[#0D6EFD] bg-white border border-[#DEE2E7] border-l-0 rounded-r-md hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>

        <!-- კუპონის შეტყობინება -->
        <div
          *ngIf="cartService.couponMessage() as msg"
          [ngClass]="msg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'"
          class="mt-3 p-2.5 rounded-md border text-xs flex items-center justify-between"
        >
          <div class="flex items-center gap-1.5">
            <svg *ngIf="msg.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg *ngIf="msg.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ msg.text }}</span>
          </div>
          <button (click)="cartService.clearCouponMessage()" class="text-slate-400 hover:text-slate-600 cursor-pointer ml-2">✕</button>
        </div>

        <!-- აქტიური კუპონის ბანერი -->
        <div
          *ngIf="cartService.appliedCoupon() as applied"
          class="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-md flex items-center justify-between text-xs"
        >
          <span class="font-semibold text-emerald-700">{{ applied.code }} (-{{ applied.discountPercent }}%)</span>
          <button
            type="button"
            (click)="onRemoveCoupon()"
            class="text-rose-500 hover:text-rose-700 font-medium cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- ფასების სექცია -->
      <div class="bg-white rounded-md border border-[#DEE2E7] p-4">
        <div class="space-y-3 text-sm">

          <!-- Subtotal -->
          <div class="flex items-center justify-between text-[#505050]">
            <span>Subtotal:</span>
            <span class="font-semibold text-[#1C1C1C]">\${{ cartService.subtotal() | number:'1.2-2' }}</span>
          </div>

          <!-- Discount -->
          <div class="flex items-center justify-between text-[#FA3434]">
            <span>Discount:</span>
            <span class="font-semibold">
              - \${{ cartService.discountAmount() | number:'1.2-2' }}
            </span>
          </div>

          <!-- Tax -->
          <div class="flex items-center justify-between text-[#00B517]">
            <span>Tax:</span>
            <span class="font-semibold">
              + \${{ cartService.tax() | number:'1.2-2' }}
            </span>
          </div>

          <!-- ხაზი -->
          <div class="border-t border-[#DEE2E7] pt-3">
            <div class="flex items-center justify-between">
              <span class="text-base font-bold text-[#1C1C1C]">Total:</span>
              <span class="text-xl font-bold text-[#1C1C1C]">
                \${{ cartService.finalTotal() | number:'1.2-2' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Checkout ღილაკი -->
        <button
          type="button"
          [disabled]="cartService.distinctItemCount() === 0"
          class="mt-5 w-full py-3 bg-[#00B517] hover:bg-[#009b13] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium text-base rounded-md transition-colors cursor-pointer flex items-center justify-center shadow-xs"
        >
          Checkout
        </button>

        <!-- გადახდის იკონები -->
        <div class="flex items-center justify-center gap-2 mt-4">
          <img src="/images/amex.svg" alt="American Express" class="h-[22px] w-[34px] object-contain" />
          <img src="/images/mastercard.svg" alt="Mastercard" class="h-[22px] w-[34px] object-contain" />
          <img src="/images/paypal.svg" alt="PayPal" class="h-[22px] w-[34px] object-contain" />
          <img src="/images/visa.svg" alt="Visa" class="h-[22px] w-[34px] object-contain" />
          <img src="/images/applepay.svg" alt="Apple Pay" class="h-[22px] w-[34px] object-contain" />
        </div>
      </div>

    </div>
  `
})
export class OrderSummaryComponent {
  readonly cartService = inject(CartService);
  couponCodeInput: string = '';

  // კუპონის გააქტიურება
  onApplyCoupon(): void {
    if (this.couponCodeInput.trim()) {
      const res = this.cartService.applyCoupon(this.couponCodeInput);
      if (res.success) {
        this.couponCodeInput = '';
      }
    }
  }

  // კუპონის გაუქმება
  onRemoveCoupon(): void {
    this.cartService.removeCoupon();
  }
}
