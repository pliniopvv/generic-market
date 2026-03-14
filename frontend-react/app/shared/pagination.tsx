import { Component } from "react";
import Filter from "~/model/Filter";

interface PaginationProps {
  filter: Filter;
  update: Function;
}

export default class Pagination extends Component<
  PaginationProps,
  PaginationProps
> {
  constructor(props: any) {
    super(props);
    this.setState({
      filter: props.filter,
    });
  }

  render() {
    const { filter, update } = this.props;
    const totalPages = Math.round(
        filter.totalEntitys / filter.pageSize
    );
    const pages = [];
    for (let i = 0; i < totalPages; i++) pages.push(i);

    return (
      <div className="join">
        {pages.map((p, i) => (
          <button
          key={i}
            className={`join-item btn ${filter.page == i+1 ? "btn-active" : ""}`}
            onClick={() => update(i+1)}
          >
            {i+1}
          </button>
        ))}
      </div>
    );
  }
}
