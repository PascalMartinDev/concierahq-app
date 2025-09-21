import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import AdminHome from "../admin/AdminHome";
import Webex from "../webex/webex";
import AppHome from "./AppHome";
import MainAuth from "../auth/MainAuth";
import Commerce7Auth from "../auth/Commerce7Auth";
import KeapAuth from "../auth/KeapAuth";
import KlaviyoAuth from "../auth/KlaviyoAuth";
import ShopifyAuth from "../auth/ShopifyAuth";
import LightspeedAuth from "../auth/LightspeedAuth";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Home - default home page route section
      { path: "/", element: <AppHome /> },
      // Admin - Protected multi-page route section
      { path: "/admin", element: <AdminHome /> },
      // Webex - Conciera webextension - SPA route section
      { path: "/webex", element: <Webex /> },
      // Auth - Oauth2 redirect uri route section
      {
        path: "/auth",
        element: <MainAuth />,
        children: [
          { path:"commerce7",  element: <Commerce7Auth /> },
          { path:"keap",  element: <KeapAuth /> },
          { path:"klaviyo",  element: <KlaviyoAuth /> },
          { path:"lightspeed",  element: <LightspeedAuth /> },
          { path:"shopify",  element: <ShopifyAuth /> }
        ]
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
  },
});