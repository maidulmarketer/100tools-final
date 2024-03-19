import Container from "@/components/wrappers/Container";
import Skeleton from "../Skeleton";

export default function ToolsDetails() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="space-y-9 w-full md:w-1/2">
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start gap-3">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex gap-3 items-center w-full">
                <Skeleton className="w-full h-3 rounded-sm" />
              </div>
              <div className="max-w-md lg:max-w-sm">
                <Skeleton className="w-full h-4 rounded-sm" />
              </div>
            </div>
            <div className="flex gap-2.5 w-full">
              <Skeleton className="w-full h-6 rounded-sm" />
              <Skeleton className="w-full h-6 rounded-sm" />
              <Skeleton className="w-full h-6 rounded-sm" />
            </div>
          </div>

          <div className="w-full md:w-1/2 block md:hidden">
            <Skeleton className="w-full rounded-md h-48 max-h-48 lg:max-h-[359px]" />
          </div>

          <div className="flex flex-col gap-3">
            <Skeleton className="w-full h-5 rounded-md" />
            <Skeleton className="w-full h-5 rounded-md" />
            <Skeleton className="w-full h-5 rounded-md" />
            <Skeleton className="w-full h-5 rounded-md" />
          </div>
        </div>
        <div className="w-full md:w-1/2 hidden md:block">
          <Skeleton className="w-full rounded-md h-48 max-h-48 lg:max-h-[359px]" />
        </div>
      </div>
      <div className="text-center p-2">
        <Skeleton className="w-full h-16 rounded-sm" />
      </div>

      <div className="flex justify-between gap-3">
        <div className="w-1/2">
          <Skeleton className="w-full h-6 rounded-full" />
        </div>
        <div className="w-1/2 flex justify-center">
          <Skeleton className="w-full h-6 rounded-full" />
        </div>
      </div>
    </>
  );
}
