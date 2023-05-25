import { type NextPage } from "next";
import IssueTable from "~/components/issues/issue-table";
import { Input } from "~/components/ui/input";
import { type Issue } from "~/components/issues/columns";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useState } from "react";

const data: Issue[] = [
  {
    id: "m5gr84i9",
    title: "電供過低",
    description: "電供過低",
    alertId: "ELEC-1",
    status: "unresolved",
    assignees: ["bogay", "ala"],
    createdAt: "2021-08-01T00:00:00Z",
    updatedAt: "2021-08-01T00:00:05Z",
    closedAt: "",
    closedBy: "",
  },
  {
    id: "1233452345",
    title: "電供驟降",
    description: "電供驟降",
    alertId: "ELEC-2",
    status: "unresolved",
    assignees: ["bogay", "ala", "uier", "skps"],
    createdAt: "2021-08-01T00:00:00Z",
    updatedAt: "2021-08-01T00:00:05Z",
    closedAt: "",
    closedBy: "",
  },
];

const Issues: NextPage = () => {
  const tableData = {
    unresolved: data.filter((issue) => issue.status === "unresolved"),
    reviewing: data.filter((issue) => issue.status === "reviewing"),
    resolved: data.filter((issue) => issue.status === "resolved"),
  };
  const [tab, setTab] = useState<"unresolved" | "reviewing" | "resolved">("unresolved");

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">事件</h2>
        <Input type="text" placeholder="搜尋" className="w-1/2" />
      </div>
      <Tabs value={tab} onValueChange={(v) => setTab(v as "unresolved" | "reviewing" | "resolved")}>
        <TabsList>
          <TabsTrigger value="unresolved">{tableData.unresolved.length} Unresolved</TabsTrigger>
          <TabsTrigger value="reviewing">{tableData.reviewing.length} Reviewing</TabsTrigger>
          <TabsTrigger value="resolved">{tableData.resolved.length} Resolved</TabsTrigger>
        </TabsList>
      </Tabs>
      <IssueTable data={data} />
    </div>
  );
};

export default Issues;
