import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-[1200px] mx-auto px-4 mt-5">
      <div class="bg-white border border-[#DEE2E7] rounded-lg p-3.5 shadow-2xs">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
          
          <!-- Left Categories Sidebar (3 cols) -->
          <div class="hidden lg:block lg:col-span-3">
            <ul class="space-y-0.5 text-sm">
              <li *ngFor="let cat of categories; let i = index">
                <a
                  href="javascript:void(0)"
                  (click)="selectCategory(cat)"
                  [class]="cat === activeCategory 
                    ? 'block px-3 py-2 rounded-md bg-[#E5F1FF] text-[#1C1C1C] font-semibold transition-colors' 
                    : 'block px-3 py-2 rounded-md text-[#505050] hover:bg-[#F7FAFC] hover:text-[#1C1C1C] font-normal transition-colors'"
                >
                  {{ cat }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Center Banner (6 cols) -->
          <div class="md:col-span-8 lg:col-span-6 flex">
            <div class="relative w-full rounded-lg overflow-hidden bg-gradient-to-r from-[#C2EBE2] via-[#CFEFE8] to-[#DEF4EF] p-7 sm:p-9 flex flex-col justify-between min-h-[360px] border border-[#DEE2E7]/40 shadow-xs group">
              <!-- Background Decor Image -->
              <div class="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none flex items-center justify-end overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80"
                  alt="Electronic items"
                  class="w-full h-full object-cover object-center mix-blend-multiply opacity-85 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <!-- Banner Text Content -->
              <div class="relative z-10 max-w-[260px] sm:max-w-[280px]">
                <p class="text-lg sm:text-xl text-[#1C1C1C] font-normal leading-tight">
                  Latest trending
                </p>
                <h2 class="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#1C1C1C] leading-tight tracking-tight mt-1 mb-5">
                  Electronic items
                </h2>
                <button
                  type="button"
                  (click)="onLearnMore()"
                  class="inline-block bg-white text-[#1C1C1C] hover:bg-slate-50 font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  Learn more
                </button>
              </div>

              <!-- Bottom subtle badge -->
              <div class="relative z-10 pt-4">
                <span class="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md font-medium shadow-2xs">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Verified Suppliers
                </span>
              </div>
            </div>
          </div>

          <!-- Right Column Cards (3 cols) -->
          <div class="md:col-span-4 lg:col-span-3 flex flex-col justify-between gap-2.5">
            
            <!-- User Welcome Card -->
            <div class="bg-[#E3F0FF] rounded-lg p-3.5 border border-[#DEE2E7]/40 flex flex-col justify-between">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-11 h-11 rounded-full bg-[#C7E1FF] text-[#0D6EFD] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-[#1C1C1C] leading-tight">Hi, user</p>
                  <p class="text-xs text-[#505050]">let's get started</p>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <button
                  type="button"
                  (click)="cartService.showToast('Redirecting to Registration...')"
                  class="w-full bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white text-xs font-semibold py-2 rounded-md transition-colors cursor-pointer"
                >
                  Join now
                </button>
                <button
                  type="button"
                  (click)="cartService.showToast('Redirecting to Login...')"
                  class="w-full bg-white hover:bg-slate-50 text-[#0D6EFD] border border-[#DEE2E7] text-xs font-semibold py-2 rounded-md transition-colors cursor-pointer"
                >
                  Log in
                </button>
              </div>
            </div>

            <!-- Orange Promo Card -->
            <div class="bg-[#F38332] rounded-lg p-4 text-white flex items-center justify-between shadow-xs hover:brightness-105 transition-all cursor-pointer"
                 (click)="cartService.showToast('Applied US $10 coupon to your account!')">
              <p class="text-sm font-medium leading-snug max-w-[180px]">
                Get US $10 off with a new supplier
              </p>
            </div>

            <!-- Teal Promo Card -->
            <div class="bg-[#55BDC3] rounded-lg p-4 text-white flex items-center justify-between shadow-xs hover:brightness-105 transition-all cursor-pointer"
                 (click)="cartService.showToast('Opening quotation preferences...')">
              <p class="text-sm font-medium leading-snug max-w-[180px]">
                Send quotes with supplier preferences
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly cartService = inject(CartService);

  categories: string[] = [
    'Automobiles',
    'Clothes and wear',
    'Home interiors',
    'Computer and tech',
    'Tools, equipments',
    'Sports and outdoor',
    'Animal and pets',
    'Machinery tools',
    'More category'
  ];

  activeCategory = 'Automobiles';

  selectCategory(cat: string): void {
    this.activeCategory = cat;
    this.cartService.showToast(`Selected category: ${cat}`);
  }

  onLearnMore(): void {
    this.cartService.showToast('Exploring trending electronic items...');
  }
}
