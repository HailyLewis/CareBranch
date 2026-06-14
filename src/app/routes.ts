import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { FindCarePage } from "./pages/FindCarePage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { AboutPage } from "./pages/AboutPage";
import { ConnectPage } from "./pages/ConnectPage";
import { VolunteerPage } from "./pages/VolunteerPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "find-care", Component: FindCarePage },
      { path: "resources", Component: ResourcesPage },
      { path: "about", Component: AboutPage },
      { path: "connect", Component: ConnectPage },
      { path: "volunteer", Component: VolunteerPage },
    ],
  },
]);
