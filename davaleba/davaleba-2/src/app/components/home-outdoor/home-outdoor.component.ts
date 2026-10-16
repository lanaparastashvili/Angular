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
  selector: 'app-home-outdoor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-[1200px] mx-auto px-4 mt-5">
      <div class="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-2xs">
        
        <!-- Left Vertical Banner -->
        <div class="relative lg:w-[280px] shrink-0 min-h-[220px] lg:min-h-full overflow-hidden p-6 flex flex-col justify-start bg-[#FBEFE3]">
          <!-- Background Image -->
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80"
            alt="Home and outdoor banner"
            class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-85"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

          <!-- Banner Overlay Content -->
          <div class="relative z-10 max-w-[140px]">
            <h3 class="text-xl font-bold text-[#1C1C1C] leading-snug">
              Home and outdoor
            </h3>
            <button
              type="button"
              (click)="cartService.showToast('Exploring Home & Outdoor suppliers...')"
              class="mt-4 bg-white hover:bg-slate-50 text-[#1C1C1C] font-semibold text-xs px-4 py-2 rounded-md shadow-sm transition-all cursor-pointer"
            >
              Source now
            </button>
          </div>
        </div>

        <!-- Right 8-Item Grid (4 cols x 2 rows) -->
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
export class HomeOutdoorComponent {
  readonly cartService = inject(CartService);

  items: ProductCard[] = [
    {
      title: 'Soft chairs',
      priceText: 'From USD 19',
      price: 19.00,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Sofa & chair',
      priceText: 'From USD 19',
      price: 19.00,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Kitchen dishes',
      priceText: 'From USD 19',
      price: 19.00,
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Smart watches',
      priceText: 'From USD 19',
      price: 19.00,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Kitchen mixer',
      priceText: 'From USD 100',
      price: 100.00,
      image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Blenders',
      priceText: 'From USD 39',
      price: 39.00,
      image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Home appliance',
      priceText: 'From USD 19',
      price: 19.00,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&auto=format&fit=crop&q=80'
    },
    {
      title: 'Coffee maker',
      priceText: 'From USD 10',
      price: 10.00,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&auto=format&fit=crop&q=80'
    }
  ];

  onAddItem(item: ProductCard): void {
    this.cartService.addItem({
      name: item.title,
      price: item.price,
      image: item.image,
      category: 'Home & Outdoor'
    });
  }
}
