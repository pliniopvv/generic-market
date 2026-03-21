import { Component } from "react";
import { toast } from "react-toastify";
import type ProductEntity from "~/model/Product.entity";

interface Props {
  list: ProductEntity[];
  onExclude: Function;
}

export default class TableProduct extends Component<Props, {}> {
  state = {
    list: [],
  };

  componentDidMount(): void {
    const { list } = this.props;
    this.setState({ list });
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    if (this.props.list.length != this.state.list.length)
      this.setState({ list: this.props.list });
  }

  async onExclude(entity) {
    const { onExclude } = this.props;
    const result = await toast.promise(entity.delete(), {
      pending: "Excluíndo ...",
      error: "Erro ao excluir",
      success: "Excluído com sucesso!",
    });
    if (result && onExclude) onExclude(entity);
  }

  render() {
    const { list } = this.state;
    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  {/* <input type="checkbox" className="checkbox" /> */}
                </label>
              </th>
              <th>Name</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((x, i) => {
              return (
                <tr key={i}>
                  <th>
                    <label>
                      {/* <input type="checkbox" className="checkbox" /> */}
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={x.urlImage} alt="Product Image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{x.name}</div>
                        <div className="text-sm opacity-50"></div>
                      </div>
                    </div>
                  </td>
                  <td className="text-wrap">{x.description}</td>
                  <td>R$ {x.price.toFixed(2)}</td>
                  <th>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => this.onExclude(x)}
                    >
                      Excluir
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
