import { type NextPage } from "next";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import RuleTable from "~/components/rules/rule-table";
import useSWR from "swr";
import { type Rule } from "~/components/rules/columns";
import fetcher from "~/lib/fetcher";
import RuleForm from "~/components/rules/rule-form";
import { Icon } from "@iconify/react";

type RuleTab = "all" | "enalbed" | "disabled";
const ruleTabs: RuleTab[] = ["all", "enalbed", "disabled"];
const ruleLabels = { all: "全部", enalbed: "啟用中", disabled: "禁用中" };

const Issues: NextPage = () => {
  const [ruleTab, setRuleTab] = useState<RuleTab>("all");
  const { data: rules, mutate: fetchRules } = useSWR<{ data: Rule[] }>("/rule/", fetcher);
  const filteredRules = useMemo(() => {
    return {
      all: rules?.data,
      enalbed: rules?.data?.filter((rule) => rule.is_enable),
      disabled: rules?.data?.filter((rule) => !rule.is_enable),
    };
  }, [rules]);
  const [isCreatingRule, setIsCreatingRule] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 p-6 pb-[300px]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">警報規則</h2>
      </div>
      <div className="flex items-center gap-x-8">
        <Tabs value={ruleTab} onValueChange={(v) => setRuleTab(v as RuleTab)}>
          <TabsList>
            {ruleTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                <span>{ruleLabels[tab]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex-1" />
        <Button
          variant={isCreatingRule ? "outline" : "default"}
          onClick={() => setIsCreatingRule((v) => !v)}
        >
          <Icon icon="octicon:plus-circle-16" className="mr-2" />
          新增
        </Button>
      </div>
      {isCreatingRule && (
        <div className="px-10 pb-10 pt-6">
          <div className="mb-2 text-xl font-medium">新增警報規則</div>
          <RuleForm
            onCancel={() => setIsCreatingRule(false)}
            onSuccess={() => {
              setIsCreatingRule(false);
              void fetchRules();
            }}
          />
        </div>
      )}
      <RuleTable
        data={filteredRules[ruleTab]}
        onSuccess={() => {
          void fetchRules();
        }}
      />
    </div>
  );
};

export default Issues;
