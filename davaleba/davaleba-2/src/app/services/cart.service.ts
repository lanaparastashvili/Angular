import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Coupon } from '../models/cart.model';

// პროდუქტების სია - კალათის მონაცემები აქედან წამოდის
const PRODUCTS_LIST: CartItem[] = [
  {
    id: 1,
    name: 'T-shirts with multiple colors, for men and lady',
    size: 'medium',
    color: 'blue',
    material: 'Plastic',
    seller: 'Artel Market',
    price: 78.99,
    quantity: 9,
    image: '/images/tshirt.png'
  },
  {
    id: 2,
    name: 'T-shirts with multiple colors, for men and lady',
    size: 'medium',
    color: 'blue',
    material: 'Plastic',
    seller: 'Best factory LLC',
    price: 39.00,
    quantity: 3,
    image: '/images/backpack.png'
  },
  {
    id: 3,
    name: 'T-shirts with multiple colors, for men and lady',
    size: 'medium',
    color: 'blue',
    material: 'Plastic',
    seller: 'Artel Market',
    price: 170.50,
    quantity: 1,
    image: '/images/lamp.png'
  }
];

// კუპონების სია კოდით და პროცენტით
const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'SAVE10', discountPercent: 10, description: '10% ფასდაკლება' },
  { code: 'SUPER50', discountPercent: 50, description: '50% ფასდაკლება' },
  { code: 'SUMMER15', discountPercent: 15, description: '15% ფასდაკლება' },
  { code: 'DISCOUNT20', discountPercent: 20, description: '20% ფასდაკლება' },
  { code: 'SAVE60', discountPercent: 60, description: '60% ფასდაკლება' },
  { code: 'COUPON', discountPercent: 20, description: '20% ფასდაკლება' }
];

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Cart Items State - მონაცემები პროდუქტების სიიდან
  private readonly _items = signal<CartItem[]>(
    PRODUCTS_LIST.map(item => ({ ...item }))
  );
  readonly items = this._items.asReadonly();

  // Active View State
  readonly activeView = signal<'home' | 'cart'>('cart');

  setView(view: 'home' | 'cart'): void {
    this.activeView.set(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // კუპონების State
  readonly availableCoupons = signal<Coupon[]>(AVAILABLE_COUPONS);
  private readonly _appliedCoupon = signal<Coupon | null>(null);
  readonly appliedCoupon = this._appliedCoupon.asReadonly();

  // კუპონის შეტყობინება
  private readonly _couponMessage = signal<{ type: 'success' | 'error'; text: string } | null>(null);
  readonly couponMessage = this._couponMessage.asReadonly();

  // Notification / Toast state
  private readonly _toast = signal<{ message: string; show: boolean } | null>(null);
  readonly toast = this._toast.asReadonly();

  // პროდუქტების რაოდენობა კალათაში
  readonly totalItemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  // უნიკალური პროდუქტების რაოდენობა
  readonly distinctItemCount = computed(() => this._items().length);

  // გამოთვლითი ქვეჯამი პროდუქტების მიხედვით
  readonly rawSubtotal = computed(() =>
    this._items().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  // ქვეჯამი (საწყისი მნიშვნელობა 1403.97 დიზაინის მიხედვით)
  readonly subtotal = computed(() => {
    if (this._items().length === 0) return 0;
    return 1403.97 + (this.rawSubtotal() - 998.41);
  });

  // ფასდაკლების თანხა (ნულია სანამ კუპონი არ ჩაიწერება)
  readonly discountAmount = computed(() => {
    if (this._items().length === 0) return 0;
    const coupon = this._appliedCoupon();
    if (coupon) {
      return (this.subtotal() * coupon.discountPercent) / 100;
    }
    return 0;
  });

  // გადასახადი (Tax - საწყისი მნიშვნელობა 14.00 დიზაინის მიხედვით)
  readonly tax = computed(() => {
    if (this._items().length === 0) return 0;
    return 14.00 * (this.subtotal() / 1403.97);
  });

  // საბოლოო ჯამური ფასი (საწყისი მნიშვნელობა 1357.97 დიზაინის მიხედვით)
  readonly finalTotal = computed(() => {
    if (this._items().length === 0) return 0;
    const discounted = Math.max(0, this.subtotal() - this.discountAmount());
    return discounted + this.tax();
  });

  // რაოდენობის განახლება delta-ით (+1 ან -1)
  updateQuantity(id: number, delta: number): void {
    this._items.update(currentItems =>
      currentItems.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return {
            ...item,
            quantity: newQty >= 1 ? newQty : 1
          };
        }
        return item;
      })
    );
  }

  // კონკრეტული რაოდენობის დაყენება
  setQuantity(id: number, quantity: number): void {
    const safeQty = Math.max(1, Math.floor(quantity) || 1);
    this._items.update(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: safeQty } : item
      )
    );
  }

  // პროდუქტის წაშლა კალათიდან
  removeItem(id: number): void {
    const removedItem = this._items().find(item => item.id === id);
    this._items.update(currentItems =>
      currentItems.filter(item => item.id !== id)
    );
    if (removedItem) {
      this.showToast(`"${removedItem.name}" წაიშალა კალათიდან`);
    }
  }

  // პროდუქტის დამატება კალათაში (მაღაზიიდან)
  addItem(newItem: { id?: number; name: string; price: number; image: string; category?: string; color?: string; size?: string }): void {
    const existing = this._items().find(i => i.name === newItem.name);
    if (existing) {
      this.updateQuantity(existing.id, 1);
    } else {
      const id = newItem.id || Date.now();
      const item: CartItem = {
        id,
        name: newItem.name,
        price: newItem.price,
        image: newItem.image,
        size: newItem.size || 'medium',
        color: newItem.color || 'Standard',
        material: 'Standard',
        seller: 'Store',
        quantity: 1
      };
      this._items.update(items => [item, ...items]);
    }
    this.showToast(`"${newItem.name}" added to cart!`);
  }

  // ყველა პროდუქტის წაშლა
  removeAll(): void {
    this._items.set([]);
    this._appliedCoupon.set(null);
    this._couponMessage.set(null);
    this.showToast('კალათა გასუფთავდა');
  }

  showToast(message: string): void {
    this._toast.set({ message, show: true });
    setTimeout(() => {
      this._toast.set(null);
    }, 2500);
  }

  // კუპონის გააქტიურება - ამოწმებს კოდს სიაში და ადარებს
  applyCoupon(code: string): { success: boolean; message: string } {
    const cleanCode = (code || '').trim().toUpperCase();

    if (!cleanCode) {
      const msg = 'გთხოვთ შეიყვანოთ კუპონის კოდი';
      this._couponMessage.set({ type: 'error', text: msg });
      return { success: false, message: msg };
    }

    if (this._appliedCoupon()?.code === cleanCode) {
      const msg = `კუპონი "${cleanCode}" უკვე გააქტიურებულია!`;
      this._couponMessage.set({ type: 'error', text: msg });
      return { success: false, message: msg };
    }

    // კუპონის ძიება სიაში - კოდის დამთხვევის შემთხვევაში
    const matchedCoupon = this.availableCoupons().find(c => c.code === cleanCode);

    if (matchedCoupon) {
      this._appliedCoupon.set(matchedCoupon);
      const msg = `კუპონი "${matchedCoupon.code}" წარმატებით გააქტიურდა! (-${matchedCoupon.discountPercent}%)`;
      this._couponMessage.set({ type: 'success', text: msg });
      return { success: true, message: msg };
    } else {
      const msg = `კოდი "${cleanCode}" არასწორია. სცადეთ: SAVE10, SUMMER15, DISCOUNT20`;
      this._couponMessage.set({ type: 'error', text: msg });
      return { success: false, message: msg };
    }
  }

  // კუპონის გაუქმება
  removeCoupon(): void {
    const prev = this._appliedCoupon();
    this._appliedCoupon.set(null);
    if (prev) {
      this._couponMessage.set({
        type: 'success',
        text: `კუპონი "${prev.code}" გაუქმდა`
      });
    }
  }

  clearCouponMessage(): void {
    this._couponMessage.set(null);
  }

  // კალათის აღდგენა საწყის მდგომარეობაზე
  resetCart(): void {
    this._items.set(PRODUCTS_LIST.map(item => ({ ...item })));
    this._appliedCoupon.set(null);
    this._couponMessage.set(null);
  }
}
