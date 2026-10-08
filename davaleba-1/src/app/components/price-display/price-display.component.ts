import { Component, Input } from '@angular/core';

@Component({
  selector: 'price-display',
  standalone: false,
  template: `
    <div class="price-display-box">
      <span class="currency-symbol">$</span>
      <span class="price-amount">{{ formattedPrice }}</span>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .price-display-box {
      display: inline-flex;
      align-items: baseline;
      gap: 2px;
      padding: 0.35rem 0.75rem;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 8px;
      font-weight: 700;
      color: #6366f1;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
      box-shadow: 0 2px 4px rgba(0,0,0,0.03);
    }

    .currency-symbol {
      font-size: 0.85em;
      opacity: 0.85;
      font-weight: 600;
    }

    .price-amount {
      font-family: 'Outfit', sans-serif, system-ui;
    }
  `]
})
export class PriceDisplayComponent {
  @Input() price: number = 0;

  get formattedPrice(): string {
    return this.price ? this.price.toFixed(2) : '0.00';
  }
}
