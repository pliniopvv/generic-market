import { Component, type ErrorInfo } from "react";
import ProductEntity from "~/model/Product.entity";
import ModalButton from "~/shared/button-modal";
import FormProduct from "~/shared/product/form-product";
import TableProduct from "~/shared/product/table-product";

export default class AdminPage extends Component {
  state = {
    list: [],
  };

  async componentDidMount(): Promise<void> {
    await this.update();
  }

  async update() {
    const entity = new ProductEntity();
    const list = await entity.list();
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="text-black">
        <ModalButton label="Adicionar Produtos">
          <FormProduct onClose={() => this.update()} />
        </ModalButton>
        <TableProduct list={list} onExclude={() => this.update()} />
      </div>
    );
  }
}
