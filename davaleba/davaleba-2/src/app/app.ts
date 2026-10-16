import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CartItemComponent,
    OrderSummaryComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly cartService = inject(CartService);

  resetCart(): void {
    this.cartService.resetCart();
  }

  removeAll(): void {
    this.cartService.removeAll();
  }

  goToHome(): void {
    this.cartService.setView('home');
  }

  goToCart(): void {
    this.cartService.setView('cart');
  }
}
