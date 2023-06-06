import { type NextPage } from "next";
import IssueTable from "~/components/issues/issue-table";
import { type Issue } from "~/components/issues/columns";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useMemo, useState } from "react";
// import useSWR from "swr";
import { Badge } from "~/components/ui/badge";

const issues: Issue[] = [
  {
    id: "E002-9f37a0",
    title: "供電：備轉燈號 >= 紅燈",
    description: "台電處置中，最新公告：https://......",
    alertId: "E003-00",
    status: "unresolved",
    assignees: ["bogay", "ala"],
    createdAt: "2021-08-01T00:00:00Z",
    updatedAt: "2021-08-01T00:00:05Z",
    closedAt: "",
    closedBy: "",
  },
  {
    id: "E002-0a73f9",
    title: "供水：水庫水位 < 10%",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
    alertId: "W001-00",
    status: "unresolved",
    assignees: ["bogay", "ala", "uier", "skps"],
    createdAt: "2021-08-01T00:00:00Z",
    updatedAt: "2021-08-01T00:00:05Z",
    closedAt: "",
    closedBy: "",
  },
];

type IssueTab = "unresolved" | "reviewing" | "resolved";
const issueTabs: IssueTab[] = ["unresolved", "reviewing", "resolved"];

const Issues: NextPage = () => {
  // const { data: issues } = useSWR<{ data: Issue[] }>("/issue/", fetcher);
  const [issueTab, setIssueTab] = useState<IssueTab>("unresolved");
  const filteredIssues = useMemo(() => {
    return {
      unresolved: issues.filter((issue) => issue.status === "unresolved"),
      reviewing: issues.filter((issue) => issue.status === "reviewing"),
      resolved: issues.filter((issue) => issue.status === "resolved"),
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 pb-[300px]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">事件</h2>
      </div>
      <div className="flex items-center gap-x-8">
        <Tabs value={issueTab} onValueChange={(v) => setIssueTab(v as IssueTab)}>
          <TabsList>
            {issueTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                <span className="capitalize">{tab}</span>
                <Badge className="ml-1 px-1" variant="secondary">
                  {filteredIssues[tab].length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <IssueTable data={filteredIssues[issueTab]} />
    </div>
  );
};

export default Issues;
