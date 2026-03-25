import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/index.tsx", [
    index("routes/shop.tsx"),
    route("/admin", "routes/private.tsx", [route("", "routes/admin.tsx")]),
    route("/login", "routes/login.tsx"),
    route("/cart", "routes/cart.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
