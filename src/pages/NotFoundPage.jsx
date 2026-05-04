import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";

export default function NotFoundPage() {
  return (
    <main className="notFoundPage">
      <PageTitle
        title="Page Not Found"
        description="The requested RodBase page could not be found. Search rods, browse brands, or return home."
      />

      <section className="container notFoundPanel">
        <div>
          <div className="catalogEyebrow">404</div>
          <h1>Page not found.</h1>
          <p>
            This page may have moved, the rod or series may have been renamed,
            or the URL may be incorrect.
          </p>

          <div className="notFoundActions">
            <Link to="/search">Search rods</Link>
            <Link to="/brands">Browse brands</Link>
            <Link to="/">Go home</Link>
          </div>
        </div>

        <div className="notFoundGraphic" aria-hidden="true">
          <div className="notFoundRod" />
          <div className="notFoundBadge">RB</div>
        </div>
      </section>
    </main>
  );
}
