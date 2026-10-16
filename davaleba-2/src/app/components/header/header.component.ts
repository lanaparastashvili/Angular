import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white border-b border-[#DEE2E7]">
      <div class="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">

        <!-- Logo Image -->
        <a
          href="javascript:void(0)"
          (click)="goToHome()"
          class="flex items-center cursor-pointer select-none"
        >
          <img
            src="/images/brand.png"
            alt="Brand"
            class="h-9 object-contain"
          />
        </a>

        <!-- Header Actions: Profile, Message, Orders, My cart -->
        <div class="flex items-center gap-6 sm:gap-7">
          <!-- Profile -->
          <a
            href="javascript:void(0)"
            class="flex items-center justify-center cursor-pointer hover:opacity-75 transition-opacity"
            title="Profile"
          >
            <img
              src="/images/profile.png"
              alt="Profile"
              class="h-10 object-contain"
            />
          </a>

          <!-- Message -->
          <a
            href="javascript:void(0)"
            class="flex items-center justify-center cursor-pointer hover:opacity-75 transition-opacity"
            title="Message"
          >
            <img
              src="/images/message.png"
              alt="Message"
              class="h-10 object-contain"
            />
          </a>

          <!-- Orders -->
          <a
            href="javascript:void(0)"
            class="flex items-center justify-center cursor-pointer hover:opacity-75 transition-opacity"
            title="Orders"
          >
            <img
              src="/images/orders.png"
              alt="Orders"
              class="h-10 object-contain"
            />
          </a>

          <!-- My cart -->
          <button
            type="button"
            (click)="goToCart()"
            class="flex items-center justify-center cursor-pointer hover:opacity-75 transition-opacity"
            title="My cart"
          >
            <img
              src="/images/mycart.png"
              alt="My cart"
              class="h-10 object-contain"
            />
          </button>
        </div>

      </div>
    </header>
  `
})
export class HeaderComponent {
  readonly cartService = inject(CartService);

  goToHome(): void {
    this.cartService.setView('home');
  }

  goToCart(): void {
    this.cartService.setView('cart');
  }
}
