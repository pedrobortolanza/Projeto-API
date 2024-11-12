import { Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Ingressos from "./pages/Ingressos";
import Locais from "./pages/Locais";
import Eventos from "./pages/Eventos";
import Participantes from "./pages/Participantes";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/ingressos" element={<Layout><Ingressos /></Layout>} />
        <Route path="/locais" element={<Layout><Locais /></Layout>} />
        <Route path="/eventos" element={<Layout><Eventos /></Layout>} />
        <Route path="/participantes" element={<Layout><Participantes /></Layout>} /> 
      </Routes>
    </>
  );
}

export default App;
