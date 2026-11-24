import { Route, Routes } from "react-router-dom";
import DeveloperPopup from "./components/DeveloperPopup";
import Layout from "./components/Layout";
import Chat from "./pages/Chat";
import CropScanner from "./pages/CropScanner";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Schemes from "./pages/Schemes";


export default function App() {
  return (
    <>
    <DeveloperPopup />
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="crop-scanner" element={<CropScanner />} />
        <Route path="schemes" element={<Schemes />} />
        <Route path="chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      </Routes>
    </>
  );
}
