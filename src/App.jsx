import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import BrandsPage from "./pages/BrandsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import RodPage from "./pages/RodPage.jsx";
import SeriesPage from "./pages/SeriesPage.jsx";

export default function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/series/:seriesId" element={<SeriesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/rods/:rodId" element={<RodPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}
