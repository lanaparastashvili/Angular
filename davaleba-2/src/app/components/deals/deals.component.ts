import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

interface DealProduct {
  name: string;
  discount: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-[1200px] mx-auto px-4 mt-5">
      <div class="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-2xs">
        
        <!-- Left Timer Box -->
        <div class="p-5 lg:w-[280px] shrink-0 border-b lg:border-b-0 lg:border-r border-[#DEE2E7] flex flex-col justify-between bg-white">
          <div>
            <h3 class="text-xl font-bold text-[#1C1C1C] leading-snug">Deals and offers</h3>
            <p class="text-sm text-[#8B96A5] mt-1">Hygiene equipments</p>
          </div>

          <!-- Countdown Blocks -->
          <div class="flex items-center gap-2 mt-5 lg:mt-0">
            <!-- Days -->
            <div class="bg-[#606060] text-white rounded-md w-12 py-1.5 text-center flex flex-col items-center justify-center shadow-xs">
              <span class="text-base font-bold leading-tight">{{ pad(days) }}</span>
              <span class="text-[11px] text-white/80 leading-tight">Days</span>
            </div>
            <!-- Hours -->
            <div class="bg-[#606060] text-white rounded-md w-12 py-1.5 text-center flex flex-col items-center justify-center shadow-xs">
              <span class="text-base font-bold leading-tight">{{ pad(hours) }}</span>
              <span class="text-[11px] text-white/80 leading-tight">Hour</span>
            </div>
            <!-- Minutes -->
            <div class="bg-[#606060] text-white rounded-md w-12 py-1.5 text-center flex flex-col items-center justify-center shadow-xs">
              <span class="text-base font-bold leading-tight">{{ pad(minutes) }}</span>
              <span class="text-[11px] text-white/80 leading-tight">Min</span>
            </div>
            <!-- Seconds -->
            <div class="bg-[#606060] text-white rounded-md w-12 py-1.5 text-center flex flex-col items-center justify-center shadow-xs">
              <span class="text-base font-bold leading-tight">{{ pad(seconds) }}</span>
              <span class="text-[11px] text-white/80 leading-tight">Sec</span>
            </div>
          </div>
        </div>

        <!-- Right 5 Deal Items -->
        <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#DEE2E7]">
          <div
            *ngFor="let deal of deals"
            (click)="onAddDeal(deal)"
            class="p-4 flex flex-col items-center justify-between text-center group cursor-pointer hover:bg-slate-50/80 transition-all"
            title="Click to add deal to cart"
          >
            <!-- Product Image -->
            <div class="w-full h-32 flex items-center justify-center p-2 overflow-hidden">
              <img
                [src]="deal.image"
                [alt]="deal.name"
                class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Title & Badge -->
            <div class="mt-2 flex flex-col items-center">
              <p class="text-sm text-[#1C1C1C] font-normal group-hover:text-[#0D6EFD] transition-colors line-clamp-1">
                {{ deal.name }}
              </p>
              <span class="inline-block bg-[#FFE3E3] text-[#EB001B] font-semibold text-xs px-3.5 py-0.5 rounded-full mt-2">
                {{ deal.discount }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class DealsComponent implements OnInit, OnDestroy {
  readonly cartService = inject(CartService);

  days = 4;
  hours = 13;
  minutes = 34;
  seconds = 56;

  private timerInterval: any;

  deals: DealProduct[] = [
    {
      name: 'Smart watches',
      discount: '-25%',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80',
      price: 22.00
    },
    {
      name: 'Laptops',
      discount: '-15%',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80',
      price: 499.00
    },
    {
      name: 'GoPro cameras',
      discount: '-40%',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&auto=format&fit=crop&q=80',
      price: 189.00
    },
    {
      name: 'Headphones',
      discount: '-25%',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80',
      price: 45.00
    },
    {
      name: 'Canon cameras',
      discount: '-25%',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=80',
      price: 89.00
    }
  ];

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.seconds = 59;
        if (this.minutes > 0) {
          this.minutes--;
        } else {
          this.minutes = 59;
          if (this.hours > 0) {
            this.hours--;
          } else {
            this.hours = 23;
            if (this.days > 0) {
              this.days--;
            }
          }
        }
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  onAddDeal(deal: DealProduct): void {
    this.cartService.addItem({
      name: deal.name,
      price: deal.price,
      image: deal.image,
      category: 'Deals & Offers'
    });
  }
}
