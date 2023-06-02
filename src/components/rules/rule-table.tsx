import { DataTable } from "../ui/data-table";
import SkeletonTable from "../ui/skeleton-table";
import { type Rule, columns } from "./columns";

interface RuleTableProps {
  data?: Rule[];
}

const RuleTable: React.FC<RuleTableProps> = ({ data }) => {
  return (
    <div className="w-full">
      {data ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <SkeletonTable row={5} col={columns.length} />
      )}
    </div>
  );
};

export default RuleTable;
