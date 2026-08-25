export function Stars({ value, size }: { value: number; size?: "sm" | "md" }) {
  const rounded = Math.round(value);
  return (
    <span className={`stars ${size === "md" ? "stars-md" : ""}`} aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rounded ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </span>
  );
}
