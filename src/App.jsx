import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CompareTray from "./components/CompareTray.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import HomePage from "./pages/HomePage.jsx";
import BrandsPage from "./pages/BrandsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import RodPage from "./pages/RodPage.jsx";
import SeriesPage from "./pages/SeriesPage.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import DataCorrectionsPage from "./pages/DataCorrectionsPage.jsx";
import { CompareProvider } from "./context/CompareContext.jsx";

export default function App() {
  return (
    <CompareProvider>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brands/:brandId" element={<BrandsPage />} />
        <Route path="/series/:seriesId" element={<SeriesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/rods/:rodId" element={<RodPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:articleId" element={<ArticlePage />} />
        <Route path="/data-corrections" element={<DataCorrectionsPage />} />
        <Route path="/source-policy" element={<Navigate to="/data-corrections" replace />} />
        <Route path="/submit" element={<Navigate to="/data-corrections" replace />} />
        <Route path="/submit-correction" element={<Navigate to="/data-corrections" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <CompareTray />
      <Footer />
    </CompareProvider>
  );
}
