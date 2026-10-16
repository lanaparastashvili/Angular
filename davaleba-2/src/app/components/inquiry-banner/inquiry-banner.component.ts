import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-inquiry-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="max-w-[1200px] mx-auto px-4 mt-5">
      <div class="relative rounded-lg overflow-hidden bg-gradient-to-r from-[#1B63DA] via-[#1E74EE] to-[#258BF9] p-6 sm:p-9 shadow-md">
        
        <!-- Warehouse Background Texture Overlay -->
        <div class="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80"
            alt="Warehouse"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left Text Content (7 cols) -->
          <div class="lg:col-span-7 text-white">
            <h3 class="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight max-w-md">
              An easy way to send requests to all suppliers
            </h3>
            <p class="text-white/85 text-sm sm:text-base mt-3 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>

          <!-- Right Quotation Form Card (5 cols) -->
          <div class="lg:col-span-5 flex justify-end">
            <div class="bg-white rounded-lg p-5 sm:p-6 shadow-xl w-full max-w-[440px]">
              <h4 class="text-lg font-bold text-[#1C1C1C] mb-4">
                Send quote to suppliers
              </h4>

              <form (submit)="onSubmit($event)" class="space-y-3.5">
                <div>
                  <input
                    type="text"
                    [(ngModel)]="itemName"
                    name="itemName"
                    placeholder="What item you need?"
                    class="w-full px-3.5 py-2 text-sm text-[#1C1C1C] placeholder:text-[#8B96A5] border border-[#DEE2E7] rounded-md outline-none focus:border-[#0D6EFD] transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    [(ngModel)]="details"
                    name="details"
                    rows="3"
                    placeholder="Type more details"
                    class="w-full px-3.5 py-2 text-sm text-[#1C1C1C] placeholder:text-[#8B96A5] border border-[#DEE2E7] rounded-md outline-none focus:border-[#0D6EFD] resize-none transition-colors"
                  ></textarea>
                </div>

                <div class="flex items-center gap-2.5">
                  <div class="w-1/2">
                    <input
                      type="number"
                      [(ngModel)]="quantity"
                      name="quantity"
                      placeholder="Quantity"
                      class="w-full px-3.5 py-2 text-sm text-[#1C1C1C] placeholder:text-[#8B96A5] border border-[#DEE2E7] rounded-md outline-none focus:border-[#0D6EFD] transition-colors"
                    />
                  </div>
                  <div class="w-1/2 relative">
                    <select
                      [(ngModel)]="unit"
                      name="unit"
                      class="w-full appearance-none bg-white px-3.5 py-2 text-sm text-[#1C1C1C] border border-[#DEE2E7] rounded-md outline-none focus:border-[#0D6EFD] cursor-pointer transition-colors pr-8"
                    >
                      <option value="Pcs">Pcs</option>
                      <option value="Kg">Kg</option>
                      <option value="Boxes">Boxes</option>
                      <option value="Ton">Ton</option>
                    </select>
                    <svg class="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  class="bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white font-semibold text-sm px-6 py-2.5 rounded-md transition-colors cursor-pointer shadow-xs"
                >
                  Send inquiry
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class InquiryBannerComponent {
  readonly cartService = inject(CartService);

  itemName = '';
  details = '';
  quantity: number | null = null;
  unit = 'Pcs';

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.itemName.trim()) {
      this.cartService.showToast('Please specify what item you need!');
      return;
    }

    this.cartService.showToast(`Inquiry sent to suppliers for: "${this.itemName}"!`);
    this.itemName = '';
    this.details = '';
    this.quantity = null;
  }
}
