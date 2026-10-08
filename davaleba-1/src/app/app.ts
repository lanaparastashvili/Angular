import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Main product inventory array (from Lecture 2)
  products: Product[];
  selectedProduct: Product | null = null;

  // Search & Filter controls
  searchTerm: string = '';
  selectedCategory: string = 'ALL';
  sortBy: string = 'DEFAULT';

  // Modal controls
  showDetailModal: boolean = false;
  showFormModal: boolean = false;
  editingProduct: Product | null = null;

  constructor() {
    this.products = [
      new Product(
        'SKU #NEATOJACKET',
        'Blue Jacket',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80',
        ['Women', 'Apparel', 'Jackets'],
        238.99
      ),
      new Product(
        'SKU #MYSHOES',
        'Black Running Shoes',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
        ['Men', 'Footwear', 'Sneakers'],
        109.99
      ),
      new Product(
        'SKU #NICEHAT',
        'A Winter Cap',
        'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&auto=format&fit=crop&q=80',
        ['Men', 'Accessories', 'Hats'],
        29.99
      ),
      new Product(
        'SKU #LTHRBAG',
        'Leather Backpack',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
        ['Accessories', 'Bags', 'Leather'],
        149.50
      ),
      new Product(
        'SKU #TECHWATCH',
        'Smart Fitness Watch',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
        ['Electronics', 'Wearables', 'Tech'],
        299.00
      ),
      new Product(
        'SKU #SUNGLASSES',
        'Classic Sunglasses',
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80',
        ['Accessories', 'Eyewear', 'Sunglasses'],
        89.90
      ),
    ];
  }

  // Filtered products list getter
  get filteredProducts(): Product[] {
    let result = [...this.products];

    // Search term filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term) ||
          p.department.some((d) => d.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (this.selectedCategory !== 'ALL') {
      result = result.filter((p) =>
        p.department.includes(this.selectedCategory)
      );
    }

    // Sort order
    if (this.sortBy === 'PRICE_LOW') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'PRICE_HIGH') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'NAME_ASC') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }

  // All distinct main categories
  get categories(): string[] {
    const set = new Set<string>();
    this.products.forEach((p) => {
      if (p.department && p.department.length > 0) {
        set.add(p.department[0]);
      }
    });
    return Array.from(set);
  }

  // Stats calculation
  get totalInventoryValue(): number {
    return this.products.reduce((acc, p) => acc + p.price, 0);
  }

  get averagePrice(): number {
    if (this.products.length === 0) return 0;
    return this.totalInventoryValue / this.products.length;
  }

  // Event handler when a product is clicked in ProductsList
  productWasSelected(product: Product): void {
    console.log('Product selected: ', product);
    this.selectedProduct = product;
    this.showDetailModal = true;
  }

  // Open Add Product Form
  openAddModal(): void {
    this.editingProduct = null;
    this.showFormModal = true;
  }

  // Open Edit Product Form
  openEditModal(product: Product): void {
    this.editingProduct = product;
    this.showDetailModal = false;
    this.showFormModal = true;
  }

  // Save Product (Create or Update)
  saveProduct(product: Product): void {
    const existingIndex = this.products.findIndex(
      (p) => p.sku === product.sku
    );

    if (existingIndex >= 0) {
      // Update existing
      this.products[existingIndex] = product;
    } else {
      // Create new
      this.products.unshift(product);
    }

    this.selectedProduct = product;
    this.showFormModal = false;
  }

  // Delete Product
  deleteProduct(product: Product): void {
    if (!product) return;

    this.products = this.products.filter((p) => p.sku !== product.sku);

    if (this.selectedProduct && this.selectedProduct.sku === product.sku) {
      this.selectedProduct = null;
    }

    this.showDetailModal = false;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.editingProduct = null;
  }
}
