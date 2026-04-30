import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import BrandsPage from "./pages/BrandsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import RodPage from "./pages/RodPage.jsx";

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");

  return (
    <div>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {activeSection === "Home" && <HomePage setActiveSection={setActiveSection} />}
      {activeSection === "Brands" && <BrandsPage setActiveSection={setActiveSection} />}
      {activeSection === "Search" && <SearchPage />}
      {activeSection === "Compare" && <ComparePage />}
      {activeSection === "Rod Page" && <RodPage />}

      <Footer />
    </div>
  );
}
