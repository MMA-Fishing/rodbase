import { useState } from "react";

const PUBLIC_SAFE_IMAGE_USAGE = new Set([
  "own-photo",
  "licensed",
  "permission-granted",
]);

function getRodImageClass(rod) {
  const construction = String(rod.construction || "").toLowerCase();

  if (construction.includes("telescopic")) return "rodFallbackTelescopic";
  if (construction.includes("4-piece") || construction.includes("multi")) return "rodFallbackMulti";
  if (construction.includes("2-piece")) return "rodFallbackTwoPiece";

  return "rodFallbackStandard";
}

export default function RodImage({ rod, className = "" }) {
  const [failed, setFailed] = useState(false);

  const isLocalTestImage = rod.imageUsage === "local-test-only" && import.meta.env.DEV;
  const isPublicSafeImage = PUBLIC_SAFE_IMAGE_USAGE.has(rod.imageUsage);
  const canShowImage = rod.imageUrl && !failed && (isLocalTestImage || isPublicSafeImage);

  if (canShowImage) {
    return (
      <img
        className={`rodProductImage ${className}`}
        src={rod.imageUrl}
        alt={rod.imageAlt || `${rod.displayName} product image`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={`rodFallbackGraphic ${getRodImageClass(rod)} ${className}`}>
      <div className="rodFallbackTop">
        <span>{rod.brand}</span>
        <strong>{rod.model}</strong>
      </div>

      <div className="rodFallbackStage" aria-hidden="true">
        <div className="rodFallbackBlank">
          <i className="rodGuide rodGuideOne" />
          <i className="rodGuide rodGuideTwo" />
          <i className="rodGuide rodGuideThree" />
          <i className="rodGuide rodGuideFour" />
        </div>
        <div className="rodFallbackHandle" />
        <div className="rodFallbackReelSeat" />
      </div>

      <div className="rodFallbackBottom">
        <span>{rod.construction || "Rod"}</span>
        <span>No hosted product image</span>
      </div>
    </div>
  );
}
