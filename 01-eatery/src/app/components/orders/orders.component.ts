import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public appName: string = 'Eatery Premium';
  products = [
    { name: 'Chips', price: 4 },
    { name: 'Burger', price: 1 },
    { name: 'Chicken', price: 3 },
    { name: 'Fish', price: 6 },
    { name: 'Nuguets', price: 5 },
    { name: 'Ice cream', price: 9 },
    { name: 'Dessert', price: 2 },
    { name: 'Sauces', price: 1 },
    { name: 'Coffe', price: 2 },
  ];
  totalOrder = 0;
  tempOrder = [];
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
  }

  onAdd(product: any) {
    console.log(product);
    this.totalOrder += product.price;
    this.tempOrder.push(product.name);
  }
  removeItemTempOrder(order) {
    const index = this.tempOrder.indexOf(order);
    const product = this.products.find( p => p.name === order );
    if ( product ) {
      this.totalOrder -= product.price;
    }
    if (index > -1) { 
      this.tempOrder.splice(index, 1);
    }
    console.log(this.totalOrder);
  }

  onSubmit() {

    this.orderService.myForm.value.order = this.tempOrder;
    const data = this.orderService.myForm.value;
    data.totalOrder = this.totalOrder;
    this.orderService.createOrder(data);
    this.tempOrder = [];
    this.totalOrder = 0;

    this.orderService.myForm.reset();
    console.log(data);
  }
}
