import { Component, Fragment } from "react";
import CardProduct from "./card-product";
import Filter from "~/model/Filter";
import Pagination from "./pagination";

export default class ListCardProduct extends Component {
  state = {
    list: [
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
      <CardProduct />,
    ],
    filter: new Filter(),
    listView: [] as any,
  };

  componentDidMount(): void {
    const { list } = this.state;
    const total = this.state.list.length;
    const filter = new Filter();

    filter.page = 1;
    filter.totalEntitys = total;

    const slice = list.slice(
      (filter.page - 1) * filter.pageSize,
      filter.page * filter.pageSize,
    );
    this.setState({ filter, listView: slice });
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
    console.log(`New page: ${ps}`);
  }

  render() {
    const { listView, list, filter } = this.state;
    return (
      <Fragment>
        <div className="flex flex-wrap justify-center items-center">
          {listView}
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <Pagination
            filter={filter}
            update={(ps: any) => this.pageSelect(ps)}
          />
        </div>
      </Fragment>
    );
  }
}
