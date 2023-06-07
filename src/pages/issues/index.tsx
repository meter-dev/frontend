import { type NextPage } from "next";
import IssueTable from "~/components/issues/issue-table";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { Badge } from "~/components/ui/badge";
import fetcher from "~/lib/fetcher";
import { type IssueListItem } from "~/components/issues/columns";
import { Button } from "~/components/ui/button";
import { Icon } from "@iconify/react";

// const issues: Issue[] = [
//   {
//     id: "E002-9f37a0",
//     title: "供電：備轉燈號 >= 紅燈",
//     description: "台電處置中，最新公告：https://......",
//     alertId: "E003-00",
//     status: "CREATED",
//     assignees: ["bogay", "ala"],
//     createdAt: "2021-08-01T00:00:00Z",
//     updatedAt: "2021-08-01T00:00:05Z",
//     closedAt: "",
//     closedBy: "",
//   },
//   {
//     id: "E002-0a73f9",
//     title: "供水：水庫水位 < 10%",
//     description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
//     alertId: "W001-00",
//     status: "CREATED",
//     assignees: ["bogay", "ala", "uier", "skps"],
//     createdAt: "2021-08-01T00:00:00Z",
//     updatedAt: "2021-08-01T00:00:05Z",
//     closedAt: "",
//     closedBy: "",
//   },
// ];

type IssueTab = "CREATED" | "PROCESSING" | "SOLVED";
const issueTabs: IssueTab[] = ["CREATED", "PROCESSING", "SOLVED"];
const issueLabels = { CREATED: "新事件", PROCESSING: "處理中", SOLVED: "已結案" };

const Issues: NextPage = () => {
  const { data: issues, mutate } = useSWR<{ data: IssueListItem[] }>("/issue/", fetcher);
  const [issueTab, setIssueTab] = useState<IssueTab>("CREATED");
  const filteredIssues = useMemo(() => {
    return {
      CREATED: issues?.data.filter((issue) => issue.status === "CREATED"),
      PROCESSING: issues?.data.filter((issue) => issue.status === "PROCESSING"),
      SOLVED: issues?.data.filter((issue) => issue.status === "SOLVED"),
    };
  }, [issues]);

  return (
    <div className="flex w-full flex-col gap-4 p-6 pb-[300px]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">事件</h2>
      </div>
      <div className="flex items-center gap-x-8">
        <Tabs value={issueTab} onValueChange={(v) => setIssueTab(v as IssueTab)}>
          <TabsList>
            {issueTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                <span className="capitalize">{issueLabels[tab]}</span>
                {filteredIssues[tab] && (
                  <Badge className="ml-1 px-1" variant="secondary">
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    {filteredIssues[tab].length}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button
          variant="outline"
          onClick={() => {
            void mutate();
          }}
        >
          <Icon icon="octicon:sync-16" className="h-5 w-5" />
        </Button>
      </div>
      <IssueTable data={filteredIssues[issueTab]} />
    </div>
  );
};

export default Issues;
