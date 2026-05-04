import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  listenCompareChanges,
  MAX_COMPARE_RODS,
  readCompareIds,
  writeCompareIds,
} from "../utils/compareStore.js";

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    setCompareIds(readCompareIds());

    return listenCompareChanges((nextIds) => {
      setCompareIds(nextIds);
    });
  }, []);

  function sync(nextIds) {
    const savedIds = writeCompareIds(nextIds);
    setCompareIds(savedIds);
    return savedIds;
  }

  function addCompareId(rodId) {
    if (compareIds.includes(rodId)) return compareIds;
    if (compareIds.length >= MAX_COMPARE_RODS) return compareIds;

    return sync([...compareIds, rodId]);
  }

  function removeCompareId(rodId) {
    return sync(compareIds.filter((id) => id !== rodId));
  }

  function toggleCompareId(rodId) {
    if (compareIds.includes(rodId)) {
      return removeCompareId(rodId);
    }

    return addCompareId(rodId);
  }

  function clearCompareIds() {
    return sync([]);
  }

  function isCompared(rodId) {
    return compareIds.includes(rodId);
  }

  const value = useMemo(
    () => ({
      compareIds,
      maxCompareRods: MAX_COMPARE_RODS,
      canAddMore: compareIds.length < MAX_COMPARE_RODS,
      addCompareId,
      removeCompareId,
      toggleCompareId,
      clearCompareIds,
      isCompared,
    }),
    [compareIds]
  );

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error("useCompare must be used inside CompareProvider");
  }

  return context;
}
