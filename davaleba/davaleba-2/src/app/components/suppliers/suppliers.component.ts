import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

interface SupplierRegion {
  name: string;
  domain: string;
  code: string;
}

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-[1200px] mx-auto px-4 mt-7">
      <h3 class="text-xl font-bold text-[#1C1C1C] mb-4">
        Suppliers by region
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-6">
        <div
          *ngFor="let s of regions"
          (click)="cartService.showToast('Selected suppliers from: ' + s.name)"
          class="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity"
        >
          <!-- Flag Image -->
          <div class="w-7 h-5 rounded-xs overflow-hidden shadow-2xs shrink-0 flex items-center justify-center border border-slate-200/60">
            <img
              [src]="'https://flagcdn.com/28x21/' + s.code + '.png'"
              [alt]="s.name"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="flex flex-col">
            <span class="text-sm font-medium text-[#1C1C1C] group-hover:text-[#0D6EFD] transition-colors leading-tight">
              {{ s.name }}
            </span>
            <span class="text-xs text-[#8B96A5] leading-tight mt-0.5">
              {{ s.domain }}
            </span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SuppliersComponent {
  readonly cartService = inject(CartService);

  regions: SupplierRegion[] = [
    { name: 'Arabic Emirates', domain: 'shopname.ae', code: 'ae' },
    { name: 'Australia', domain: 'shopname.ae', code: 'au' },
    { name: 'United States', domain: 'shopname.ae', code: 'us' },
    { name: 'Russia', domain: 'shopname.ru', code: 'ru' },
    { name: 'Italy', domain: 'shopname.it', code: 'it' },
    { name: 'Denmark', domain: 'denmark.com.dk', code: 'dk' },
    { name: 'France', domain: 'shopname.com.fr', code: 'fr' },
    { name: 'Arabic Emirates', domain: 'shopname.ae', code: 'ae' },
    { name: 'China', domain: 'shopname.cn', code: 'cn' },
    { name: 'Great Britain', domain: 'shopname.co.uk', code: 'gb' }
  ];
}
