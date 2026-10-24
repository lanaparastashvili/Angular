import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // შეკვეთების ობიექტების სია (2 ქულა)
  private orders: Order[] = [
    { id: 1, teamMember: 'Robert Fox', loading: 'High', billable: '120 hrs', efficiency: '95%' },
    { id: 2, teamMember: 'Darlene Robertson', loading: 'Low', billable: '210 hrs', efficiency: '50%' },
    { id: 3, teamMember: 'Theresa Webb', loading: 'Medium', billable: '85 hrs', efficiency: '75%' },
    { id: 4, teamMember: 'Kristin Watson', loading: 'Medium', billable: '100 hrs', efficiency: '80%' },
    { id: 5, teamMember: 'Cody Fisher', loading: 'High', billable: '350 hrs', efficiency: '98%' },
    { id: 6, teamMember: 'Jane Cooper', loading: 'Low', billable: '50 hrs', efficiency: '60%' },
    { id: 7, teamMember: 'Jerome Bell', loading: 'Low', billable: '75 hrs', efficiency: '55%' },
    { id: 8, teamMember: 'Jenny Wilson', loading: 'High', billable: '190 hrs', efficiency: '80%' },
    { id: 9, teamMember: 'Darrell Steward', loading: 'Medium', billable: '110 hrs', efficiency: '70%' },
    { id: 10, teamMember: 'Savannah Nguyen', loading: 'Low', billable: '90 hrs', efficiency: '60%' }
  ];

  constructor() {}

  // მონაცემების წამოღების მეთოდი (1 ქულა)
  getOrders(): Order[] {
    return this.orders;
  }
}
