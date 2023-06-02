import { type NextPage } from "next";
import IssueTable from "~/components/issues/issue-table";
import { Input } from "~/components/ui/input";
import { type Issue } from "~/components/issues/columns";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useMemo, useState } from "react";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import RuleTable from "~/components/rules/rule-table";
import useSWR from "swr";
import { type Rule } from "~/components/rules/columns";
import fetcher from "~/lib/fetcher";
import { Badge } from "~/components/ui/badge";

const issues: Issue[] = [
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

type IssueTab = "unresolved" | "reviewing" | "resolved";
const issueTabs: IssueTab[] = ["unresolved", "reviewing", "resolved"];

type RuleTab = "all" | "enalbed" | "disabled";
const ruleTabs: RuleTab[] = ["all", "enalbed", "disabled"];

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

  const [ruleTab, setRuleTab] = useState<RuleTab>("all");
  const { data: rules } = useSWR<{ data: Rule[] }>("/rule/", fetcher);
  const filteredRules = useMemo(() => {
    return {
      all: rules?.data || [],
      enalbed: (rules?.data || []).filter((rule) => rule.is_enable),
      disabled: (rules?.data || []).filter((rule) => !rule.is_enable),
    };
  }, [rules]);

  return (
    <div className="flex w-full flex-col gap-4">
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
        <Input type="text" placeholder="搜尋" className="max-w-xl" />
      </div>
      <IssueTable data={filteredIssues[issueTab]} />

      <Separator orientation="horizontal" className="my-10" />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">警告規則</h2>
      </div>
      <div className="flex items-center gap-x-8">
        <Tabs value={ruleTab} onValueChange={(v) => setRuleTab(v as RuleTab)}>
          <TabsList>
            {ruleTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                <span className="capitalize">{tab}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Input type="text" placeholder="搜尋" className="max-w-xl" />
        <Button>新增</Button>
      </div>
      <RuleTable data={filteredRules[ruleTab]} />
    </div>
  );
};

export default Issues;
