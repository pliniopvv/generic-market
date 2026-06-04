import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { Checkout, Method } from './entities/checkout.entity';
import SumUpService, { CardInfo, CartItem } from '../service/SumUpService';
import SumUp from 'sumup-sdk-node';
import { ProductService } from 'src/product/product.service';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly productService: ProductService
  ) { }

//   {
//     "cart": [
//         {
//             "id": 21,
//             "url": "http://localhost:3000/product",
//             "name": "Notebook Pro 15",
//             "description": "Notebook de alto desempenho com tela de 15 polegadas e processador i7.",
//             "urlImage": "https://picsum.photos/384/227?random=1",
//             "price": 5989,
//             "visible": true
//         },
//         {
//             "id": 22,
//             "url": "http://localhost:3000/product",
//             "name": "Smartphone X",
//             "description": "Smartphone com câmera tripla e bateria de longa duração.",
//             "urlImage": "https://picsum.photos/384/227?random=2",
//             "price": 3499,
//             "visible": true
//         }
//     ],
//     "card": {
//         "cardName": "PLINIO V. DE P. V. VIANNA",
//         "cardNumber": "5210 3205 7436 4748",
//         "expiry": "04/11/2027",
//         "cvv": "671"
//     }
// }



  @Post()
  async create(@Body() {cart, card}: {cart: CartItem[], card: CardInfo}) {

    // const service = new SumUpService("sup_sk_gFTrXJR4qw4oS2RVJ9kdzyl5Cy9t8DzjC");
    // console.log({cart, card});
    // const response = await service
    //     .pay(cart)
    //     .withCard(card)
    //     .process();

    const sumup = new SumUp(process.env.TOKEN_KEY);
    const adapter = new CheckoutAdapter({cart, card});
    const checkoutminimal = adapter.toCheckoutMinimal();
    const _card = adapter.toCard();



    console.log(response);
    const products = [];
    for (const item of cart)
      products.push(await this.productService.findOne(item.id));
  
    const model = new Checkout();
    model.Products = products;
    model.method = Method.CARD;
    model.token_payment = response.reference;
    console.log(response, model);

    return this.checkoutService.create(model);
  }

  @Get()
  findAll() {
    return this.checkoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckoutDto: Checkout) {
    return this.checkoutService.update(+id, updateCheckoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutService.remove(+id);
  }
}


// Adapter
class CheckoutAdapter {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  public toCheckoutMinimal() {
    // Exemplo: soma dos preços do carrinho
    const amount = this.data.cart.reduce(
      (acc: number, item: any) => acc + item.price,
      0
    );

    return {
      currency: "BRL",
      amount: amount,
      checkout_reference: "REF0000048", // poderia ser gerado dinamicamente
      pay_to_email: "6240cd8ed1d441a08562d6d471049919@developer.sumup.com",
      description: "Descrição de uma venda.",
    };
  }

  public toCard() {
    const { card } = this.data;

    // Quebra da validade em mês/ano
    const [month, year] = card.expiry.split("/");

    return {
      name: card.cardName,
      number: card.cardNumber.replace(/\s/g, ""), // remove espaços
      expiry_month: month,
      expiry_year: year.slice(-2), // pega apenas os dois últimos dígitos
      cvv: card.cvv,
    };
  }
}