import { getPrimarySourceRecord } from "../utils/sourceHelpers.js";

export default function SourceBadge({ record }) {
  const primarySource = getPrimarySourceRecord(record);

  if (primarySource?.url) {
    return (
      <span className="sourceBadge sourceBadgeOfficial">
        Official reference available
      </span>
    );
  }

  if ((record.sourceRecords || []).length > 0) {
    return (
      <span className="sourceBadge">
        Reference recorded
      </span>
    );
  }

  return (
    <span className="sourceBadge sourceBadgeMissing">
      Source pending
    </span>
  );
}
