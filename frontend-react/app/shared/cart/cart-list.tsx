import { Component, type Context } from "react";
import { CartContext } from "~/context/CartContext";

export default class ListCart extends Component {
  static contextType?: Context<any> = CartContext;

  render() {
    const { cart } = this.context as any;
    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((x, i) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={x.urlImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{x.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-wrap">{x.description}</td>
                <td>R$ {x.price.toFixed(2)}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
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
