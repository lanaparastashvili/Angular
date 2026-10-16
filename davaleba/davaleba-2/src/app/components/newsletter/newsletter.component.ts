import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="bg-[#EFF2F4] py-10 mt-10">
      <div class="max-w-[1200px] mx-auto px-4 text-center">
        
        <h3 class="text-xl font-bold text-[#1C1C1C]">
          Subscribe on our newsletter
        </h3>
        <p class="text-sm text-[#606060] mt-1 mb-5 max-w-md mx-auto">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>

        <form (submit)="onSubscribe($event)" class="flex items-center justify-center gap-2 max-w-md mx-auto">
          <!-- Input with Mail Icon -->
          <div class="relative flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#8B96A5] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="Email"
              class="w-full bg-white border border-[#DEE2E7] rounded-md pl-9 pr-3 py-2 text-sm text-[#1C1C1C] placeholder:text-[#8B96A5] outline-none focus:border-[#0D6EFD] transition-colors"
            />
          </div>

          <!-- Subscribe Button -->
          <button
            type="submit"
            class="bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white px-5 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  `
})
export class NewsletterComponent {
  readonly cartService = inject(CartService);
  email = '';

  onSubscribe(event: Event): void {
    event.preventDefault();
    if (!this.email.trim() || !this.email.includes('@')) {
      this.cartService.showToast('Please enter a valid email address!');
      return;
    }

    this.cartService.showToast(`Subscribed successfully with ${this.email}!`);
    this.email = '';
  }
}
