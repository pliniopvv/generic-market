import { Component, Fragment } from "react";
import type { Route } from "../+types/root";
import Carrousel from "~/shared/carrousel";
import ListCardProduct from "~/shared/product/list-card-product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "E-Commerce v1.0" },
    { name: "GenericMarket v1.0", content: "Bem vindo ao E-commerce!" },
  ];
}

export default class ShopRoute extends Component {
  render() {
    return <ListCardProduct />;
  }
}
