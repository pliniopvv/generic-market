import { Component } from "react";
import type { ChangeEvent, FormEvent } from "react";
import ProductEntity from "~/model/Product.entity";
import { toast } from "react-toastify";
import { isEqual } from "lodash";

interface ProductFormState {
  product: ProductEntity;
}

export default class FormProduct extends Component<
  { onClose: Function; selected: any },
  ProductFormState
> {
  state = {
    product: new ProductEntity(),
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate(
    prevProps: Readonly<{ onClose: Function; selected: any }>,
    prevState: Readonly<ProductFormState>,
    snapshot?: any,
  ): void {
    const { selected } = this.props;
    
    if (selected)
      if (!isEqual(selected, this.state.product))
        this.setState({ product: selected });
  }

  setProduct(cmp) {
    this.setState({ product: Object.assign(this.state.product, cmp) });
  }

  handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      this.setState({
        product: Object.assign(this.state.product, {
          fileImage: e.target.files[0],
        }),
      });
    }
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { product } = this.state;
    const { onClose } = this.props;
    const result = await toast.promise(product.save(), {
      pending: "Salvando ...",
      error: "Falha em salvar produto!",
      success: "Produto salvo com sucesso!",
    });

    if (result && onClose) onClose(product);
  };

  render() {
    return (
      <div className="max-w-md mx-auto p-6 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Formulário de Produto</h2>
        <form onSubmit={this.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={this.state.product.name}
            onChange={(e) => this.setProduct({ name: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Digite o nome do produto"
            required
          />

          <textarea
            name="description"
            value={this.state.product.description}
            onChange={(e) => this.setProduct({ description: e.target.value })}
            className="textarea textarea-bordered w-full"
            placeholder="Digite a descrição"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={this.handleFileChange}
            className="file-input file-input-bordered w-full"
          />

          <input
            type="number"
            name="price"
            value={this.state.product.price}
            onChange={(e) => this.setProduct({ price: e.target.value })}
            className="input input-bordered w-full"
            placeholder="0.00"
            step="0.01"
            required
          />

          <label className="cursor-pointer label">
            <span className="label-text">Visível</span>
            <input
              type="checkbox"
              name="visible"
              checked={this.state.product.visible}
              onChange={(e) => this.setProduct({ visible: e.target.value })}
              className="checkbox checkbox-primary"
            />
          </label>

          <button type="submit" className="btn btn-primary w-full">
            Salvar Produto
          </button>
        </form>
      </div>
    );
  }
}
