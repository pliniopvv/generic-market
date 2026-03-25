import { Component, Fragment } from "react";
import CardProduct from "../card-product";
import Filter from "~/model/Filter";
import Pagination from "../pagination";
import ProductEntity from "~/model/Product.entity";

export default class ListCardProduct extends Component {
  state = {
    list: [],
    filter: new Filter(),
    listView: [] as any,
  };

  async componentDidMount(): Promise<void> {
    const entity = new ProductEntity();
    const list = (await entity.list())
      .filter((x) => x.visible)
      .map((x, i) => <CardProduct key={i} product={x} />);
    const filter = new Filter();

    filter.page = 1;
    filter.totalEntitys = list.length;

    const slice = list.slice(
      (filter.page - 1) * filter.pageSize,
      filter.page * filter.pageSize,
    );
    this.setState({ list, filter, listView: slice });
  }

  pageSelect(ps: any) {
    const { filter, list } = this.state;
    filter.page = ps;
    filter.pageSize + filter.page;
    const slice = list.slice(
      (filter.page - 1) * filter.pageSize,
      filter.page * filter.pageSize,
    );
    this.setState({ filter, listView: slice });
  }

  render() {
    const { listView, filter } = this.state;
    return (
      <Fragment>
        <div className="m-5 flex flex-wrap justify-end items-center">
          <Pagination
            filter={filter}
            update={(ps: any) => this.pageSelect(ps)}
          />
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {listView}
        </div>
      </Fragment>
    );
  }
}
