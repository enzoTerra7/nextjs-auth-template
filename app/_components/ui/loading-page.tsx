import { Skeleton } from "./skeleton";

export function LoadingPageComponent({
  showCTAButton = false,
  simulateTableLoading = false,
  simulateCardsLoading = false,
}: {
  showCTAButton?: boolean;
  simulateTableLoading?: boolean;
  simulateCardsLoading?: boolean;
}) {
  return (
    <>
      <div
        className={
          "flex flex-col items-start justify-start lg:items-center lg:justify-center md:flex-row gap-2"
        }
      >
        <div className="flex flex-col text-start items-start gap-1 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-2.5 w-1/3" />
        </div>
        {showCTAButton && (
          <div className="flex w-fit gap-2 items-center justify-center">
            <Skeleton className="h-4 w-10" />
          </div>
        )}
      </div>
      {simulateTableLoading && <Skeleton className="h-40 w-full" />}
      {simulateCardsLoading && (
        <div className="flex w-full items-center gap-4 flex-wrap">
          <Skeleton className="h-20 min-w-40 shrink-0 w-full" />
          <Skeleton className="h-20 min-w-40 shrink-0 w-full" />
          <Skeleton className="h-20 min-w-40 shrink-0 w-full" />
        </div>
      )}
    </>
  );
}
