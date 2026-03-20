import { Component, Fragment } from "react";
import type { Route } from "../+types/root";
import Menu from "~/shared/menu";
import { Outlet } from "react-router";
import FooterComponent from "~/shared/footer";
import { ToastContainer } from "react-toastify";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export default class ShopRoute extends Component {
    render() {
        return (
            <Fragment>
                <Menu />
                <Outlet />
                <FooterComponent />
                <ToastContainer limit={3} />
            </Fragment>
        )
    }
}