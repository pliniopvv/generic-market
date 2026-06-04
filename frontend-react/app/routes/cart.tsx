import axios from "axios";
import { Component, Fragment, type Context } from "react";
import { CartContext } from "~/context/CartContext";
import { BASE_API } from "~/environment";
import type { Card } from "~/model/card/GenericPayment";
import ModalButton from "~/shared/button-modal";
import ListCart from "~/shared/cart/cart-list";
import FormCart from "~/shared/cart/form-cart";

export default class CartPage extends Component {
  static contextType?: Context<any> = CartContext;

  async pay(card: Card) {
    const { cart } = this.context as any;
    const { status, data } = await axios.post(`${BASE_API}/checkout`, { cart, card });
    console.log(status, data);
  }

  render() {
    return (
      <Fragment>
        <div className="m-5">
          <ListCart />
        </div>
        <div className="m-5">
          <ModalButton label="Finalizar Compra" block>
            <FormCart onClose={(data) => this.pay(data)} />
          </ModalButton>
        </div>
      </Fragment>
    );
  }
}
