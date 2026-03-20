import { Component, Fragment } from "react";
import CardProduct from "./card-product";
import Filter from "~/model/Filter";
import Pagination from "./pagination";
import { ProductMock } from "~/model/Product.mock";
import type ProductEntity from "~/model/Product.entity";

export default class ListCardProduct extends Component {
  state = {
    list: [
      <CardProduct key={0} product={ProductMock[0] as ProductEntity} />,
      <CardProduct key={1} product={ProductMock[1] as ProductEntity} />,
      <CardProduct key={2} product={ProductMock[2] as ProductEntity} />,
      <CardProduct key={3} product={ProductMock[3] as ProductEntity} />,
      <CardProduct key={4} product={ProductMock[4] as ProductEntity} />,
      <CardProduct key={5} product={ProductMock[5] as ProductEntity} />,
      <CardProduct key={6} product={ProductMock[6] as ProductEntity} />,
      <CardProduct key={7} product={ProductMock[7] as ProductEntity} />,
      <CardProduct key={8} product={ProductMock[8] as ProductEntity} />,
      <CardProduct key={9} product={ProductMock[9] as ProductEntity} />,
      <CardProduct key={10} product={ProductMock[10] as ProductEntity} />,
      <CardProduct key={11} product={ProductMock[11] as ProductEntity} />,
      <CardProduct key={12} product={ProductMock[12] as ProductEntity} />,
      <CardProduct key={13} product={ProductMock[13] as ProductEntity} />,
      <CardProduct key={14} product={ProductMock[14] as ProductEntity} />,
      <CardProduct key={15} product={ProductMock[15] as ProductEntity} />,
      <CardProduct key={16} product={ProductMock[16] as ProductEntity} />,
      <CardProduct key={17} product={ProductMock[17] as ProductEntity} />,
      <CardProduct key={18} product={ProductMock[18] as ProductEntity} />,
      <CardProduct key={19} product={ProductMock[19] as ProductEntity} />,
      <CardProduct key={20} product={ProductMock[20] as ProductEntity} />,
      <CardProduct key={21} product={ProductMock[21] as ProductEntity} />,
      <CardProduct key={22} product={ProductMock[22] as ProductEntity} />,
      <CardProduct key={23} product={ProductMock[23] as ProductEntity} />,
      <CardProduct key={24} product={ProductMock[24] as ProductEntity} />,
      <CardProduct key={25} product={ProductMock[25] as ProductEntity} />,
      <CardProduct key={26} product={ProductMock[26] as ProductEntity} />,
      <CardProduct key={27} product={ProductMock[27] as ProductEntity} />,
      <CardProduct key={28} product={ProductMock[28] as ProductEntity} />,
      <CardProduct key={29} product={ProductMock[29] as ProductEntity} />,
      <CardProduct key={30} product={ProductMock[30] as ProductEntity} />,
      <CardProduct key={31} product={ProductMock[31] as ProductEntity} />,
      <CardProduct key={32} product={ProductMock[32] as ProductEntity} />,
      <CardProduct key={33} product={ProductMock[33] as ProductEntity} />,
      <CardProduct key={34} product={ProductMock[34] as ProductEntity} />,
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
