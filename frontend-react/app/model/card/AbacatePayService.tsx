import type { AxiosInstance } from "axios";
import type { Card, Item, PaymentGateway, Slip } from "./GenericPayment";
import axios from "axios";

export default class AbacatePayService implements PaymentGateway {
  private readonly client: AxiosInstance;
  private payload: any = {};

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.abacatepay.com/v1", // endpoint fictício
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  pay(cart: Item[]): PaymentGateway {
    this.payload.cart = cart;
    return this;
  }

  withCard(info: Card): PaymentGateway {
    this.payload.paymentMethod = {
      type: "card",
      ...info,
    };
    return this;
  }

  withSlip(info: Slip): PaymentGateway {
    this.payload.paymentMethod = {
      type: "slip",
      ...info,
    };
    return this;
  }

  async process(): Promise<any> {
    try {
      const response = await this.client.post("/payments", this.payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro no pagamento");
    }
  }
}
