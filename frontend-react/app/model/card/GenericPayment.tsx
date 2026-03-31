export interface Item {
  name: string;
  quantity: number;
  price: number;
}

export interface Card {
  cardName: string;
  cardNumber: number;
  expiry: string;
  cvv: number;
}

export interface Slip {
  name: string;
  adress: string;
  phone: number;
}

export interface PaymentGateway {
  pay(cart: Item[]);
  pay(cart: Item[]);
  withCard(info: Card);
  withSlip(info: Slip);
  process();
}

export default class GenericPayment {
  constructor(private readonly service: PaymentGateway) {}

  payWithCard(cart: Item[], info: Card) {
    return this.service.pay(cart).withCard(info).process();
  }
  payWithSlip(cart: Item[], info: Card) {
    return this.service.pay(cart).withSlip(info).process();
  }
}
