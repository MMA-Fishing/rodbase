import { useState } from "react";

const PUBLIC_SAFE_LOGO_USAGE = new Set([
  "own-design",
  "licensed",
  "permission-granted",
]);

function getBrandInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function BrandLogo({ brand, size = "default", className = "" }) {
  const [failed, setFailed] = useState(false);

  const canShowLogo =
    brand.logoUrl &&
    !failed &&
    PUBLIC_SAFE_LOGO_USAGE.has(brand.logoUsage);

  if (canShowLogo) {
    return (
      <img
        className={`brandLogoImage brandLogoImage-${size} ${className}`}
        src={brand.logoUrl}
        alt={`${brand.name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={`brandLogoFallback brandLogoFallback-${size} brandLogo-${brand.id} ${className}`}>
      <span>{getBrandInitials(brand.name)}</span>
      <strong>{brand.logoText || brand.name}</strong>
    </div>
  );
}
