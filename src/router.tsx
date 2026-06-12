import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import UnderConstruction from "@/pages/UnderConstruction";
import ReportsList from "@/pages/ReportsList";

console.log('📦 ===== router.tsx cargado =====');

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/reportar-estafa",
    element: <UnderConstruction />,
  },
  {
    path: "/reportes",
    element: <ReportsList />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

console.log('📦 Router configurado con rutas:', router.routes.map(r => r.path));