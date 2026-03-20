import { Component, type ErrorInfo } from "react";
import ProductEntity from "~/model/Product.entity";
import ModalButton from "~/shared/button-modal";
import FormProduct from "~/shared/form-product";
import TableProduct from "~/shared/table-product";

export default class AdminPage extends Component {
  state = {
    list: [],
  };

  async componentDidMount(): Promise<void> {
    const entity = new ProductEntity();
    const list = await entity.list();
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="text-black">
        <ModalButton label="Adicionar Produtos">
          <FormProduct />
        </ModalButton>
        <TableProduct list={list} />
      </div>
    );
  }
}
