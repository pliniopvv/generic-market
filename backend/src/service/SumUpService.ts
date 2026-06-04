import axios, { AxiosInstance } from "axios";

export interface CartItem {
    id: number;
    url: string;
    name: string;
    description: string;
    urlImage: string;
    price: number;
    visible: boolean;
}

export interface CardInfo {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}

export interface PaymentPayload {
    amount: number;
    currency: string;
    description: string;
    checkout_reference: string;
    card?: {
        name: string;
        number: string;
        expiry_month: string;
        expiry_year: string;
        cvv: string;
    };
}

export default class SumUpService {
    private TOKEN: string;
    private client: AxiosInstance;
    private payload!: PaymentPayload;

    constructor(API_KEY: string) {
        this.TOKEN = API_KEY;
        this.client = axios.create({
            baseURL: "https://api.sumup.com/v0.1",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.TOKEN}`,
            },
        });
    }

    pay(cart: CartItem[]) {
        // const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        // const description = cart.map(item => `${item.quantity}x ${item.name}`).join(", ");
        const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
        const description = cart.map(item => `01x ${item.name}`).join(", ");

        this.payload = {
            amount: totalAmount,
            currency: "BRL",
            description: description.substring(0, 255),
            checkout_reference: `CHK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        };
        return this;
    }

    withCard(info: CardInfo) {
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

    async process() {
        try {
            const response = await this.client.post("/checkouts", this.payload);

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