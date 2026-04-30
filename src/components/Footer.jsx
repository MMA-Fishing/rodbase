import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container footerGrid">
        <div>
          <div className="footerBrand">RodBase</div>
          <p className="footerDisclaimer">
            All fishing rod information, specifications, ratings, prices, market notes, comparisons, and articles are provided for reference only. RodBase does not guarantee completeness, accuracy, availability, suitability, or purchase outcome. No liability shall be held by RodBase or its operators for any loss, damage, purchase decision, fishing result, or usage issue arising from reliance on this information.
          </p>
        </div>
        <div>
          <h3>Database</h3>
          <div className="footerLinks vertical">
            <Link to="/brands">Brands</Link>
            <span>Series</span>
            <Link to="/search">Advanced Search</Link>
            <Link to="/compare">Compare Rods</Link>
          </div>
        </div>
        <div>
          <h3>Information</h3>
          <div className="footerLinks vertical">
            <Link to="/data-corrections">Data & Corrections</Link>
            <span>About RodBase</span>
            <span>Contact</span>
          </div>
        </div>
        <div>
          <h3>Articles</h3>
          <div className="footerLinks vertical">
            <Link to="/articles">All Articles</Link>
            <Link to="/articles/how-to-read-rod-length">Rod Basics</Link>
            <Link to="/articles/telescopic-vs-multi-piece-rods">Comparisons</Link>
            <span>Fishing Notes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

