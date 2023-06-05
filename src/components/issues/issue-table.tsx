import { DataTable } from "../ui/data-table";
import SkeletonTable from "../ui/skeleton-table";
import { type Issue, columns } from "./columns";

interface IssueTableProps {
  data?: Issue[];
}

const IssueTable: React.FC<IssueTableProps> = ({ data }) => {
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

export default IssueTable;
