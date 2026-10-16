import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

interface ProductCard {
  title: string;
  priceText: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-[1200px] mx-auto px-4 mt-5">
      <div class="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-2xs">
        
        <!-- Left Vertical Banner -->
        <div class="relative lg:w-[280px] shrink-0 min-h-[220px] lg:min-h-full overflow-hidden p-6 flex flex-col justify-start bg-[#E4EEF8]">
          <!-- Background Image -->
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80"
            alt="Consumer electronics and gadgets banner"
            class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-85"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

          <!-- Banner Content -->
          <div class="relative z-10 max-w-[180px]">
            <h3 class="text-xl font-bold text-[#1C1C1C] leading-snug">
              Consumer electronics and gadgets
            </h3>
            <button
              type="button"
              (click)="cartService.showToast('Connecting with Electronics suppliers...')"
              class="mt-4 bg-white hover:bg-slate-50 text-[#1C1C1C] font-semibold text-xs px-4 py-2 rounded-md shadow-sm transition-all cursor-pointer"
            >
              Source now
            </button>
          </div>
        </div>

        <!-- Right 8-Item Grid -->
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DEE2E7] border-t lg:border-t-0 border-[#DEE2E7]">
          
          <div
            *ngFor="let item of items; let i = index"
            (click)="onAddItem(item)"
            class="p-4 flex items-center justify-between gap-2 hover:bg-slate-50/80 transition-colors group cursor-pointer border-b border-[#DEE2E7] last:border-b-0"
            title="Click to add to cart"
          >
            <!-- Left Info -->
            <div class="flex flex-col justify-between h-full">
              <div>
                <h4 class="text-sm font-medium text-[#1C1C1C] group-hover:text-[#0D6EFD] transition-colors leading-tight">
                  {{ item.title }}
                </h4>
                <p class="text-xs text-[#8B96A5] mt-1.5">
                  {{ item.priceText }}
                </p>
              </div>
              <span class="text-[11px] text-[#0D6EFD] opacity-0 group-hover:opacity-100 transition-opacity font-medium mt-2">
                + Add to cart
              </span>
            </div>

            <!-- Right Image -->
            <div class="w-18 h-18 shrink-0 flex items-center justify-center p-1">
              <img
                [src]="item.image"
                [alt]="item.title"
                class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class ElectronicsComponent {
  readonly cartService = inject(CartService);

  items: ProductCard[] = [
    {
      title: 'Smart watches',
      priceText: 'From USD 19',
      price: 19.00,
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Cameras',
      priceText: 'From USD 89',
      price: 89.00,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Headphones',
      priceText: 'From USD 10',
      price: 10.00,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Smart watches',
      priceText: 'From USD 90',
      price: 90.00,
      image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Gaming set',
      priceText: 'From USD 35',
      price: 35.00,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Laptops & PC',
      priceText: 'From USD 340',
      price: 340.00,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Smartphones',
      priceText: 'From USD 19',
      price: 19.00,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Electric kettle',
      priceText: 'From USD 240',
      price: 240.00,
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&auto=format&fit=crop&q=80'
    }
  ];

  onAddItem(item: ProductCard): void {
    this.cartService.addItem({
      name: item.title,
      price: item.price,
      image: item.image,
      category: 'Electronics'
    });
  }
}
