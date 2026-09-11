import { createBrowserRouter } from "react-router";
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import AboutPage from "./AboutPage";
import BlocksLibraryPage from "./BlocksLibraryPage";
import RepresentativesPage from "./RepresentativesPage";
import CareersPage from "./CareersPage";
import JournalPage from "./JournalPage";
import ArticlePage from "./ArticlePage";
import PartnersPage from "./PartnersPage";
import BecomeRepresentativePage from "./BecomeRepresentativePage";
import DesignSystemPage from "./DesignSystemPage";

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/categorias/reclinaveis", Component: CategoryPage },
  { path: "/produtos/mille", Component: ProductPage },
  { path: "/produtos/:slug", Component: ProductPage },
  { path: "/sobre", Component: AboutPage },
  { path: "/blocos-3d", Component: BlocksLibraryPage },
  { path: "/representantes", Component: RepresentativesPage },
  { path: "/carreiras", Component: CareersPage },
  { path: "/conteudos", Component: JournalPage },
  { path: "/conteudos/:slug", Component: ArticlePage },
  { path: "/parceiros", Component: PartnersPage },
  { path: "/seja-representante", Component: BecomeRepresentativePage },
  { path: "/design-system", Component: DesignSystemPage },
  { path: "*", Component: HomePage },
]);
