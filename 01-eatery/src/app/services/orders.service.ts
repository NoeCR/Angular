import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersCollection: AngularFirestoreCollection<any>;
  orders: Observable<any[]>;
  lastNumber: string;

  constructor(private readonly afs: AngularFirestore) {
    this.ordersCollection = afs.collection<any>('orders');
    this.orders = this.ordersCollection.snapshotChanges().pipe(map(
      actions => actions.map( a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    ));
    this.getLastNumber();
  }

  myForm = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    order: new FormControl(''),
    completed: new FormControl(false),
  });

  async getLastNumber()  {
    await this.orders.subscribe(async res => {
      res.sort(this.orderNumbers);
      console.log(res[res.length - 1 ] );
      this.lastNumber = String(Number(res[res.length - 1 ].orderNumber) + 1);
      // tslint:disable-next-line: no-string-literal
      this.myForm.controls['orderNumber'].setValue(this.lastNumber);
      this.myForm.controls['completed'].setValue(false);
      // this.myForm.controls['orderNumber'].disable();
    });
  }

  orderNumbers(a , b) {
    const nA = Number(a.orderNumber);
    const nB = Number(b.orderNumber);

    let compare = 0;
    if ( nA === nB) {
      compare = 1;
    } else if ( nA < nB) {
      compare = -1;
    }
    return compare;
  }
  getOrders() {
    return this.orders;
  }
  updateOrder( order: any ) {
    return this.ordersCollection.doc(order.id).update(order);
  }
  deleteOrder( id: string ) {
    return this.ordersCollection.doc(id).delete();
  }
  createOrder( order: any ) {
    this.ordersCollection.add( order );
    this.getLastNumber();
  }
}
