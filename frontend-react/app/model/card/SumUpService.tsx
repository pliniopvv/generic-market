import type { AxiosInstance } from "axios";
import type { Card, Item, PaymentGateway, Slip } from "./GenericPayment";
import axios from "axios";

export default class SumUpService implements PaymentGateway {
  private readonly client: AxiosInstance;
  private payload: any = {};
  TOKEN: string;

  constructor(API_KEY: string) {
    this.TOKEN = API_KEY;
    this.client = axios.create({
      baseURL: "https://api.sumup.com/v0.1", // Endpoint da API da SumUp
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.TOKEN}`, // SumUp utiliza Bearer Token
      },
    });
  }

  pay(cart: Item[]): PaymentGateway {
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const description = cart.map(item => `${item.quantity}x ${item.name}`).join(", ");

    this.payload = {
      ...this.payload,
      amount: totalAmount,
      currency: "BRL", // Assumindo BRL como padrão para o mercado genérico
      description: description.substring(0, 255), // Limite de caracteres da SumUp
      checkout_reference: `CHK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
    return this;
  }

  withCard(info: Card): PaymentGateway {
    // Mapeamento para o formato de cartão da SumUp
    const [expiryMonth, expiryYear] = info.expiry.split("/");

    this.payload.card = {
      name: info.cardName,
      number: info.cardNumber.toString(),
      expiry_month: expiryMonth.padStart(2, "0"),
      expiry_year: expiryYear.length === 2 ? `20${expiryYear}` : expiryYear,
      cvv: info.cvv.toString(),
    };
    return this;
  }

  withSlip(info: Slip): PaymentGateway {
    // A SumUp não possui um "Boleto" nativo da mesma forma,
    // mas guardamos os dados caso seja necessário um provedor secundário
    this.payload.paymentMethod = {
      type: "slip",
      customer: {
        name: info.name,
        address: info.adress,
        phone: info.phone.toString(),
      }
    };
    return this;
  }

  async process(): Promise<any> {
    try {
      // SumUp Checkouts: https://developer.sumup.com/docs/checkouts
      const response = await this.client.post("/checkouts", this.payload);

      // Adaptador de resposta para simplificar o retorno ao frontend
      return {
        id: response.data.id,
        status: response.data.status,
        reference: response.data.checkout_reference,
        amount: response.data.amount,
        next_step: response.data.next_step || "DONE",
      };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Erro no processamento da SumUp";
      throw new Error(message);
    }
  }
}

