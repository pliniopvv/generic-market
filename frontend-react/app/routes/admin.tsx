import { Component, type ErrorInfo } from "react";
import { toast } from "react-toastify";
import Filter from "~/model/Filter";
import ProductEntity from "~/model/Product.entity";
import ModalButton from "~/shared/button-modal";
import Pagination from "~/shared/pagination";
import FormProduct from "~/shared/product/form-product";
import TableProduct from "~/shared/product/table-product";

export default class AdminPage extends Component {
  state = {
    filter: new Filter(),
    list: [],
  };

  async componentDidMount(): Promise<void> {
    await this.update();
  }

  async update() {
    const { filter } = this.state;
    const entity = new ProductEntity();
    const list = await entity.list(filter);
    filter.totalEntitys = list[0]._.totalPages * filter.pageSize;
    this.setState({ list, filter });
  }

  async query(page) {
    const { filter } = this.state;
    filter.page = page;
    const entity = new ProductEntity();
    const list = await toast.promise(entity.list(filter), {
      success: "Carregado.",
      pending: "Carregando.",
      error: "Falha em carregar",
    });

    this.setState({ list, filter });
  }

  render() {
    const { list, filter } = this.state;
    return (
      <div className="text-black">
        <ModalButton label="Adicionar Produtos">
          <FormProduct onClose={() => this.update()} />
        </ModalButton>
        <TableProduct list={list} onExclude={() => this.update()} />
        <div className="text-end m-5">
          <Pagination filter={filter} update={(e) => this.query(e)} />
        </div>
      </div>
    );
  }
}
