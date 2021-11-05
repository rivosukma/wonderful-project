import { lazy } from "react";
import url from "./url";

const Homepage = lazy(() => import('../views/content/containers/homepage/Homepage'))

const routes = [
    { path: url.HOMEPAGE, exact: true, component: Homepage }
]

export default routes