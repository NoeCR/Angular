import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { OrdersService } from '../../../services/orders.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  displayedColumns: string[] = ['orderNumber', 'customerName', 'order', 'totalOrder', 'completed', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(private orderService: OrdersService) {

  }
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // Get all orders
    this.getAllOrders();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllOrders() {
    this.orderService.getOrders().subscribe( res => {
      this.dataSource.data = res;
    });
  }

  onChangeStatus( order: any ) {
    order.completed = true;
    this.orderService.updateOrder(order);
  }

  onDelete( id: string ) {
    this.orderService.deleteOrder(id);
  }
}
