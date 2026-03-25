import { Component, Fragment, type Context } from "react";
import { CartContext } from "~/context/CartContext";
import ModalButton from "~/shared/button-modal";
import ListCart from "~/shared/cart/cart-list";
import FormCart from "~/shared/cart/form-cart";

export default class CartPage extends Component {
  static contextType?: Context<any> = CartContext;

  pay(data: any) {
    const { cart } = this.context as any;
    debugger;
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
