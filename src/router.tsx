import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import UnderConstruction from "@/pages/UnderConstruction";
import ReportsList from "@/pages/ReportsList";  

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