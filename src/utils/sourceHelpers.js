export function getPrimarySourceRecord(record) {
  const sources = record?.sourceRecords || [];

  return (
    sources.find((source) =>
      String(source.sourceType || "").toLowerCase().includes("official")
    ) ||
    sources.find((source) => source.url) ||
    null
  );
}
