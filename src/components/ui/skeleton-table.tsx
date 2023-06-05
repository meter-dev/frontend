import { Skeleton } from "./skeleton";

interface SkeletonTableProps {
  col: number;
  row: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ row, col }) => {
  return (
    <table className="w-full">
      <thead className="w-full">
        <tr className="w-full">
          {new Array(col).fill(0).map((_, i) => (
            <th key={i} className="mx-10 py-6">
              <Skeleton className="h-8 w-[200px] bg-slate-300" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="w-full">
        {new Array(row).fill(0).map((_, i) => (
          <tr key={i} className="w-full">
            {new Array(col).fill(0).map((_, j) => (
              <td key={j} className="mx-10 py-6">
                <Skeleton className="h-4 w-[200px] bg-slate-300" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkeletonTable;
