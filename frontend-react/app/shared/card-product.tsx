import { Component } from "react";
import type ProductEntity from "~/model/Product.entity";

interface Props {
  product: ProductEntity;
}
interface State {
  product: ProductEntity
}

export default class CardProduct extends Component<Props, State> {
  state = {
    product: null,
  };

  componentDidMount(): void {
    const { product } = this.props;
    this.setState({ product });
  }

  render() {
    const { product } = this.state;
    return product ? (
      <div className="card bg-base-100 w-96 shadow-sm m-1">
        <figure>
          <img src={product.urlImage} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Comprar</button>
          </div>
        </div>
      </div>
    ) : null;
  }
}
