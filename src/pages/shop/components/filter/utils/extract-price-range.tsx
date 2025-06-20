const extractPriceRange = (
  filterStr: string,
): { min: number; max: number } | null => {
  const match = filterStr.match(/\((\d+)\s+to\s+(\d+)\)/);
  if (!match) return null;

  return {
    min: parseInt(match[1]) / 100,
    max: parseInt(match[2]) / 100,
  };
};
export default extractPriceRange;
