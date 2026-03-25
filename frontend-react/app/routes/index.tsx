import { Component, Fragment } from "react";
import type { Route } from "../+types/root";
import Menu from "~/shared/menu";
import { Outlet } from "react-router";
import FooterComponent from "~/shared/footer";
import { ToastContainer } from "react-toastify";
import { CartContext, CartProvider } from "~/context/CartContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-Commerce v1.0" },
    { name: "GenericMarket v1.0", content: "Bem vindo ao E-commerce!" },
  ];
}

export default class ShopRoute extends Component {
  render() {
    return (
      <CartProvider>
        <Menu />
        <Outlet />
        <FooterComponent />
        <ToastContainer limit={3} />
      </CartProvider>
    );
  }
}
