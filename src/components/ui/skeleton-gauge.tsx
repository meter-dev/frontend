import { Skeleton } from "./skeleton";

const SkeletonGauge: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-start">
      <Skeleton className="h-[200px] w-[200px] rounded-full" />
      <Skeleton className="mt-2 h-[20px] w-[200px] rounded" />
    </div>
  );
};

export default SkeletonGauge;
