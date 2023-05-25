import { DataTable } from "../ui/data-table";
import { type Issue, columns } from "./columns";

interface IssueTableProps {
  data: Issue[];
}

const IssueTable: React.FC<IssueTableProps> = ({ data }) => {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default IssueTable;
