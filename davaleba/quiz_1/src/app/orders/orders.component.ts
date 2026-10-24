import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';
import { Order } from './order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  // შეკვეთების სია კომპონენტში (1 ქულა)
  orders: Order[] = [];

  // სერვისის ინექცია
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // სერვისის მეთოდის გამოყენება კომპონენტში (1 ქულა)
    this.loadOrders();
  }

  loadOrders(): void {
    this.orders = this.orderService.getOrders();
  }
}
