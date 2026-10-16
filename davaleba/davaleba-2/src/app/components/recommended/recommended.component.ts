import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

interface RecommendedProduct {
  id: number;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-[1200px] mx-auto px-4 mt-7">
      <h3 class="text-xl font-bold text-[#1C1C1C] mb-4">
        Recommended items
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div
          *ngFor="let item of products"
          (click)="onAdd(item)"
          class="bg-white border border-[#DEE2E7] rounded-lg p-3.5 flex flex-col justify-between hover:shadow-md hover:border-[#0D6EFD]/40 transition-all group cursor-pointer"
          title="Click to add to cart"
        >
          <!-- Product Image Container -->
          <div class="w-full h-44 flex items-center justify-center p-2 overflow-hidden bg-white">
            <img
              [src]="item.image"
              [alt]="item.description"
              class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Product Details -->
          <div class="mt-3 flex flex-col">
            <span class="text-base font-bold text-[#1C1C1C]">
              \${{ item.price.toFixed(2) }}
            </span>
            <p class="text-xs text-[#505050] line-clamp-2 mt-1 leading-relaxed">
              {{ item.description }}
            </p>
            
            <button
              type="button"
              class="mt-3 w-full py-1.5 text-xs font-semibold text-[#0D6EFD] bg-blue-50/70 hover:bg-[#0D6EFD] hover:text-white rounded-md transition-colors opacity-0 group-hover:opacity-100"
            >
              + Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class RecommendedComponent {
  readonly cartService = inject(CartService);

  products: RecommendedProduct[] = [
    {
      id: 101,
      price: 10.30,
      description: 'T-shirts with multiple colors, for men',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 102,
      price: 10.30,
      description: 'Jeans shorts for men blue color',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 103,
      price: 12.50,
      description: 'Brown winter coat medium size',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 104,
      price: 34.00,
      description: 'Jeans bag for travel for men',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 105,
      price: 99.00,
      description: 'Leather wallet',
      image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 106,
      price: 9.99,
      description: 'Denim shorts denim blue',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 107,
      price: 8.99,
      description: 'Headset for gaming with mic',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 108,
      price: 49.00,
      description: 'Water proof travel backpack',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 109,
      price: 19.95,
      description: 'White leather shoes casual look',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 110,
      price: 80.00,
      description: 'Travel bag for school for men',
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&auto=format&fit=crop&q=80'
    }
  ];

  onAdd(item: RecommendedProduct): void {
    this.cartService.addItem({
      id: item.id,
      name: item.description,
      price: item.price,
      image: item.image,
      category: 'Recommended'
    });
  }
}
