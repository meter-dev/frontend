/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { fontClasses } from "~/lib/fonts";
import fetcher from "~/lib/fetcher";
import useSWR from "swr";
import { Icon } from "@iconify/react";
import { formatTime } from "~/lib/dt";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ErrorAlert from "../error-alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { issue } from "~/lib/api";
import { getErrorMsg } from "~/lib/errors";
import { RESOURCES } from "../rules/options";
import { POSITIONS } from "../rules/options";

interface Issue {
  id: number;
  title: string;
  status: "CREATED" | "PROCESSING" | "SOLVED";
  created_at: string;
  updated_at: string;
  content: string;
  processing_at: string;
  solved_at: string;
  rule: {
    name: string;
    position: string;
    resource: string;
    operator: string;
    value: number;
    is_enable: boolean;
    id: number;
    user_id: number;
  };
}

const formSchema = z.object({
  status: z.union([z.literal("CREATED"), z.literal("PROCESSING"), z.literal("SOLVED")]),
});

const Issue: React.FC<{
  id: number;
}> = ({ id }) => {
  const { data, mutate } = useSWR<{ data: Issue }>(`/issue/${id}`, fetcher);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await issue.update(id, values);
      form.reset();
      await mutate();
    } catch (error) {
      form.setError("root", { message: getErrorMsg("UNKNOWN") });
      console.log(error);
    }
  }

  useEffect(() => {
    if (data?.data.status) {
      form.setValue("status", data.data.status);
    }
  }, [data, form]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">檢視</Button>
      </DialogTrigger>
      <DialogContent className={twMerge("font-sans", fontClasses, "sm:max-w-5xl")}>
        {data?.data ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {data.data.id} - {data.data.title}
              </DialogTitle>
              <DialogDescription>{data.data.content}</DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex flex-col gap-y-10">
              <div className="flex flex-col">
                <div className="mr-4 flex items-center">
                  <Icon icon="mdi:calendar-clock" className="mr-2" />
                  <span>建立於 {formatTime(data.data.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <Icon icon="mdi:calendar-clock" className="mr-2" />
                  <span>更新於 {formatTime(data.data.updated_at)}</span>
                </div>
                <div className="mr-4 flex items-center">
                  <Icon icon="mdi:calendar-clock" className="mr-2" />
                  <span>
                    處理於 {data.data.processing_at ? formatTime(data.data.processing_at) : "-"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Icon icon="mdi:calendar-clock" className="mr-2" />
                  <span>解決於 {data.data.solved_at ? formatTime(data.data.solved_at) : "-"}</span>
                </div>
              </div>

              <div>
                <div>觸發警報名稱：{data.data.rule.name}</div>
                <div>
                  觸發警報規則：
                  <span className="font-bold text-sky-500">
                    {RESOURCES.find(({ value }) => data.data.rule.resource === value)?.label}
                  </span>{" "}
                  <span className="font-bold text-red-500">
                    {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //   @ts-ignore
                      POSITIONS[data.data.rule.resource as keyof typeof POSITIONS].find(
                        ({ value }) => data.data.rule.position === value
                      ).label
                    }
                  </span>{" "}
                  <span className="font-bold text-teal-500">{data.data.rule.operator}</span>{" "}
                  {data.data.rule.value}
                </div>
              </div>

              <div>
                <Form {...form}>
                  <form
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-[360px] space-y-8"
                  >
                    {form.formState.errors.root && (
                      <ErrorAlert
                        title="操作失敗"
                        description={form.formState.errors.root.message}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>事件狀態</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger
                                className="w-[100px]"
                                disabled={form.formState.isSubmitting}
                              >
                                <SelectValue placeholder="請選擇事件狀態" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup className={twMerge("font-sans", fontClasses)}>
                                  <SelectLabel>請選擇事件狀態</SelectLabel>
                                  {[
                                    { value: "CREATED", label: "新事件" },
                                    { value: "PROCESSING", label: "處理中" },
                                    { value: "SOLVED", label: "已解決" },
                                  ].map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting && (
                        <Icon icon="ion:load-c" className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      儲存
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </>
        ) : (
          <Icon icon="ion:load-c" className="mr-2 h-4 w-4 animate-spin" />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Issue;
