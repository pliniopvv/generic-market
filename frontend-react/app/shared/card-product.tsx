import { Component, type Context } from "react";
import { CartContext } from "~/context/CartContext";
import type ProductEntity from "~/model/Product.entity";

interface Props {
  product: ProductEntity;
}
interface State {
  product: ProductEntity;
}

export default class CardProduct extends Component<Props, State> {
  static contextType?: Context<any> = CartContext;

  state = {
    product: null,
  };

  componentDidMount(): void {
    const { product } = this.props;
    this.setState({ product });
  }

  render() {
    const { addItem } = this.context as any;
    const { product } = this.state;
    return product ? (
      <div className="card bg-base-100 w-96 shadow-sm m-1">
        <figure>
          <img src={product.urlImage} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="flex justify-between items-center">
            <div>R$ {product.price.toFixed(2)}</div>
            <div className="card-actions justify-end">
              {addItem && (
                <button
                  onClick={() => addItem(product)}
                  className="btn btn-primary"
                >
                  Adicionar ao carrinho
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
