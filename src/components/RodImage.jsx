import { useState } from "react";

export default function RodImage({ rod, className = "" }) {
  const [failed, setFailed] = useState(false);
  const hasImage = rod.imageUrl && !failed;

  if (hasImage) {
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
    <div className={`rodImageFallback ${className}`}>
      <span>{rod.brand}</span>
      <strong>{rod.model}</strong>
    </div>
  );
}
