import { Skeleton } from "./skeleton";

interface SkeletonLiquidProps {
  width?: number;
}

const SkeletonLiquid: React.FC<SkeletonLiquidProps> = ({ width }) => {
  return (
    <Skeleton className="rounded-full" style={{ height: width ?? 200, width: width ?? 200 }} />
  );
};

export default SkeletonLiquid;
