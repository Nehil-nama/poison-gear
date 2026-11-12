export function StockBar({ unitsLeft, totalUnits }: { unitsLeft: number; totalUnits: number }) {
  const claimed = Math.round(((totalUnits - unitsLeft) / totalUnits) * 100);
  const urgent = unitsLeft / totalUnits <= 0.25;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs">
        <span className={`font-semibold ${urgent ? "text-destructive" : "text-toxic"}`}>
          {urgent ? "Almost gone · " : ""}
          {unitsLeft} of {totalUnits} left
        </span>
        <span className="text-muted-foreground">{claimed}% claimed</span>
      </div>
      <div
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalUnits}
        aria-valuenow={totalUnits - unitsLeft}
        aria-label="Units claimed"
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            urgent
              ? "bg-destructive shadow-[0_0_12px_var(--color-destructive)]"
              : "bg-toxic shadow-[0_0_12px_var(--color-toxic)]"
          }`}
          style={{ width: `${claimed}%` }}
        />
      </div>
    </div>
  );
}