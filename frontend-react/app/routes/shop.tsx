import { Component, Fragment } from "react";
import type { Route } from "../+types/root";
import Carrousel from "~/shared/carrousel";
import ListCardProduct from "~/shared/list-card-product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export default class ShopRoute extends Component {
    render() {
        return (
              <ListCardProduct />
        )
    }
}