import { Component, type Context } from "react";
import { CartContext } from "~/context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import withNavigate from "../withNavigate";
import { toast } from "react-toastify";

class CartIcon extends Component<{ navigate: any }, {}> {
  static contextType?: Context<any> = CartContext;

  click() {
    const { navigate } = this.props;
    const { cart } = this.context as any;
    if (cart.length > 0) navigate("/cart");
    else toast.error("O carrinho está vazio!");
  }

  render() {
    const { cart } = this.context as any;
    return (
      <div className="indicator">
        {cart.length > 0 ? (
          <span className="indicator-item badge badge-primary">
            {cart.length}
          </span>
        ) : null}
        <button onClick={() => this.click()} className="btn">
          <FaShoppingCart />
        </button>
      </div>
    );
  }
}

export default withNavigate(CartIcon);
