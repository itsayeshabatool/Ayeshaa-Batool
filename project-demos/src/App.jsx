import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomeDemos from "./pages/HomeDemos.jsx";
import SmartAnalyticsDashboard from "./pages/SmartAnalyticsDashboard.jsx";
import SasProductLanding from "./pages/SasProductLanding.jsx";
import AuroraUI from "./pages/AuroraUI.jsx";
import CodSnippetManager from "./pages/CodSnippetManager.jsx";
import TeamCollaborationApp from "./pages/TeamCollaborationApp.jsx";
import StartupAgencyLanding from "./pages/StartupAgencyLanding.jsx";
import ImageCompressorTool from "./pages/ImageCompressorTool.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomeDemos />} />
        <Route path="/smart-analytics-dashboard" element={<SmartAnalyticsDashboard />} />
        <Route path="/sas-product-landing" element={<SasProductLanding />} />
        <Route path="/aurora-ui" element={<AuroraUI />} />
        <Route path="/cod-snippet-manager" element={<CodSnippetManager />} />
        <Route path="/team-collaboration-app" element={<TeamCollaborationApp />} />
        <Route path="/startup-agency-landing" element={<StartupAgencyLanding />} />
        <Route path="/image-compressor-tool" element={<ImageCompressorTool />} />
      </Route>
    </Routes>
  );
}
