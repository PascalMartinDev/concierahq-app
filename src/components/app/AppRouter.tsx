import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import AdminHome from "../admin/AdminHome";
import Webex from "../webex/Webex";
import AppHome from "./AppHome";
import MainAuth from "../auth/MainAuth";
import Commerce7Auth from "../auth/Commerce7Auth";
import KeapAuth from "../auth/KeapAuth";
import KlaviyoAuth from "../auth/KlaviyoAuth";
import ShopifyAuth from "../auth/ShopifyAuth";
import LightspeedAuth from "../auth/LightspeedAuth";


export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <AppHome /> },
      { path: "admin", element: <AdminHome /> },
      { path: "webex", element: <Webex /> },
      {
        path: "auth",
        element: <MainAuth />,
        children: [
          { path: "commerce7", element: <Commerce7Auth /> },
          { path: "keap", element: <KeapAuth /> },
          { path: "klaviyo", element: <KlaviyoAuth /> },
          { path: "lightspeed", element: <LightspeedAuth /> },
          { path: "shopify", element: <ShopifyAuth /> }
        ]
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
  },
});