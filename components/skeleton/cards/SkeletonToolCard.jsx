import Skeleton from "../Skeleton";

export default function SkeletonToolCard() {
  return (
    <div
      id="card"
      className="p-0.5 border border-odtheme/10 rounded-2xl"
    >
      <div
        id="card-top"
        className="h-40 rounded-t-2xl overflow-hidden"
      >
        <Skeleton className="w-full h-72" />
      </div>

      <div id="card-content" className="p-3 pt-4 space-y-4 flex-1">
        <div className="flex justify-between items-center">
          <Skeleton className="w-14 h-9 rounded-full" />
          <Skeleton className="w-14 h-9 rounded-full" />
        </div>

        <Skeleton className="w-1/2 h-6 rounded-full" />

        <div id="features" className="flex items-center gap-1">
          <Skeleton className="w-4/5 h-6 rounded-full"/>
        </div>
      </div>

      <div id="actions" className="flex border-t-2 p-3 border-odtheme/10 gap-3">
        <Skeleton className=" h-9"/>
        <Skeleton className=" h-9"/>
      </div>
    </div>
  );
}
