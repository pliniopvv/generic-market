import { Component } from "react";
import withNavigate from "./withNavigate";
import CartIcon from "./cart/cart-icon";

class Menu extends Component {
  render() {
    const { navigate } = this.props as any;
    return (
      <nav className="bg-fuchsia-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a
            onClick={() => navigate("/")}
            className="text-white font-bold text-xl cursor-pointer"
          >
            Generic-Market
          </a>

          <div className="hidden md:flex space-x-6">
            {/* <a href="#" className="text-fuchsia-300 hover:text-white px-4 py-2 ">Principal</a>
                        <a href="#" className="text-fuchsia-300 hover:text-white px-4 py-2 ">Produtos</a> */}

            {/* <input
                            type="text"
                            placeholder="Buscar produto ..."
                            className="px-3 py-2 rounded-md text-sm bg-fuchsia-700 text-white placeholder-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="bg-fuchsia-500 text-white px-4 py-2 rounded hover:bg-fuchsia-600 transition-colors cursor-pointer">
                            Buscar
                        </button> */}
            <CartIcon />
          </div>

          <button className="md:hidden text-fuchsia-300 hover:text-white">
            ☰
          </button>
        </div>
      </nav>
    );
  }
}

export default withNavigate(Menu);
