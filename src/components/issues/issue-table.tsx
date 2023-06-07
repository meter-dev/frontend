import { DataTable } from "../ui/data-table";
import SkeletonTable from "../ui/skeleton-table";
import { columns, type IssueListItem } from "./columns";

interface IssueTableProps {
  data?: IssueListItem[];
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
