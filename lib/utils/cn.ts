// Utility function for merging Tailwind classes
export function cn(...classes: (string | undefined | null | boolean)[]) {
  const filtered = classes.filter(
    (cls): cls is string => typeof cls === 'string' && cls.trim().length > 0
  );
  return filtered.join(' ');
}
