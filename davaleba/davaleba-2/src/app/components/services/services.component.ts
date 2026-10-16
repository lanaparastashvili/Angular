import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

interface ServiceItem {
  title: string;
  image: string;
  iconType: 'search' | 'palette' | 'plane' | 'shield';
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-[1200px] mx-auto px-4 mt-7">
      <h3 class="text-xl font-bold text-[#1C1C1C] mb-4">
        Our extra services
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          *ngFor="let s of services"
          (click)="cartService.showToast('Service selected: ' + s.title)"
          class="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden shadow-2xs hover:shadow-md transition-all group cursor-pointer"
        >
          <!-- Top Photo with subtle dark overlay -->
          <div class="relative h-32 w-full overflow-hidden bg-slate-100">
            <img
              [src]="s.image"
              [alt]="s.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-black/10"></div>
          </div>

          <!-- Circular Floating Icon Badge -->
          <div class="relative px-4">
            <div class="w-13 h-13 rounded-full bg-[#D1E7FF] border-2 border-white flex items-center justify-center text-[#1C1C1C] shadow-sm -mt-6.5 ml-auto relative z-10">
              <!-- Search Icon -->
              <svg *ngIf="s.iconType === 'search'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#1C1C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>

              <!-- Palette / Customize Icon -->
              <svg *ngIf="s.iconType === 'palette'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#1C1C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>

              <!-- Plane / Shipping Icon -->
              <svg *ngIf="s.iconType === 'plane'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#1C1C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>

              <!-- Shield / Monitoring Icon -->
              <svg *ngIf="s.iconType === 'shield'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#1C1C1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>

          <!-- Bottom Card Content -->
          <div class="p-4 pt-1">
            <h4 class="text-sm font-semibold text-[#1C1C1C] leading-snug max-w-[190px]">
              {{ s.title }}
            </h4>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {
  readonly cartService = inject(CartService);

  services: ServiceItem[] = [
    {
      title: 'Source from Industry Hubs',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80',
      iconType: 'search'
    },
    {
      title: 'Customize Your Products',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=80',
      iconType: 'palette'
    },
    {
      title: 'Fast, reliable shipping by ocean or air',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&auto=format&fit=crop&q=80',
      iconType: 'plane'
    },
    {
      title: 'Product monitoring and inspection',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
      iconType: 'shield'
    }
  ];
}
