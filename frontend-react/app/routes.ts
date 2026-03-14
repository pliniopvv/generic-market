import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/index.tsx", [
        index("routes/shop.tsx"),
        route("/admin", "routes/admin.tsx")
    ]),
] satisfies RouteConfig;
