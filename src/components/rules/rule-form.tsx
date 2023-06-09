import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import type { Rule } from "~/components/rules/columns";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { OPERATORS, POSITIONS, RESOURCES, VALUES, VALUE_VALIDATOR } from "./options";
import { Icon } from "@iconify/react";
import { Separator } from "../ui/separator";
import { rule } from "~/lib/api";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import ErrorAlert from "../error-alert";
import { errorSchema, getErrorMsg } from "~/lib/errors";
import { twMerge } from "tailwind-merge";
import { fontClasses } from "~/lib/fonts";

interface RuleFormProps {
  editRule?: Rule;
  onCancel: () => void;
  onSuccess: () => void;
}

const formSchema = z
  .object({
    name: z.string().min(1, "必填欄位"),
    resource: z.enum(["RECV_RATE", "PERCENT", "INTENSITY"], {
      required_error: "必填欄位",
    }),
    position: z.string({ required_error: "必填欄位" }),
    operator: z.string({ required_error: "必填欄位" }),
    value: z.number({ invalid_type_error: "僅接受數字", required_error: "必填欄位" }),
  })
  .refine(
    (data) => {
      if (!data.resource) return true;
      return VALUE_VALIDATOR[data.resource].safeParse(data.value).success;
    },
    {
      message: "無效的數值",
      path: ["value"],
    }
  );

const RuleForm: React.FC<RuleFormProps> = ({ editRule, onCancel, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editRule
      ? {
          name: editRule.name,
          resource: editRule.resource,
          position: editRule.position,
          operator: editRule.operator,
          value: editRule.value,
        }
      : {
          name: "",
        },
  });
  const resource = form.watch("resource");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (editRule) {
      try {
        await rule.update(editRule.id, values);
        form.reset();
        onSuccess();
      } catch (error) {
        form.setError("root", { message: getErrorMsg("UNKNOWN") });
        console.log(error);
      }
    } else {
      try {
        await rule.create(values);
        form.reset();
        onSuccess();
      } catch (error) {
        form.setError("root", { message: getErrorMsg("UNKNOWN") });
        console.log(error);
      }
    }
  }
  async function onDelete() {
    if (editRule && confirm("確定要刪除嗎？")) {
      try {
        await rule.delete(editRule.id);
        onSuccess();
      } catch (error) {
        form.setError("root", { message: getErrorMsg("UNKNOWN") });
        console.log(error);
      }
    }
  }
  async function onToggleEnable(toEnable: boolean) {
    if (editRule) {
      try {
        if (toEnable) {
          await rule.enable(editRule.id);
        } else {
          await rule.disable(editRule.id);
        }
        onSuccess();
      } catch (e) {
        const error = errorSchema.safeParse(e);
        if (error.success && error.data.response.code) {
          form.setError("root", { message: getErrorMsg(error.data.response.code) });
        } else {
          form.setError("root", { message: getErrorMsg("UNKNOWN") });
          console.error(e);
        }
      }
    }
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-x-4 gap-y-2 lg:flex-nowrap">
          {form.formState.errors.root && (
            <ErrorAlert title="操作失敗" description={form.formState.errors.root.message} />
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>規則名稱</FormLabel>
                <FormControl>
                  <Input
                    placeholder="選輸入名稱"
                    id="name"
                    {...field}
                    className="min-w-[200px]"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>監控資源</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[200px]" disabled={form.formState.isSubmitting}>
                      <SelectValue placeholder="請選擇" />
                    </SelectTrigger>
                    <SelectContent className={twMerge("font-sans", fontClasses)}>
                      <SelectGroup>
                        <SelectLabel>監控資源</SelectLabel>
                        {RESOURCES.map(({ value, label }) => (
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
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>監控範圍</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!resource}
                  >
                    <SelectTrigger className="w-[180px]" disabled={form.formState.isSubmitting}>
                      <SelectValue placeholder="請選擇" />
                    </SelectTrigger>
                    <SelectContent
                      className={twMerge("font-sans", fontClasses, "max-h-[300px] overflow-y-auto")}
                    >
                      <SelectGroup>
                        <SelectLabel>監控範圍</SelectLabel>
                        {resource &&
                          (POSITIONS[resource] || []).map(({ value, label }) => (
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
          <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>規則運算</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[100px]" disabled={form.formState.isSubmitting}>
                      <SelectValue placeholder="請選擇" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className={twMerge("font-sans", fontClasses)}>
                        <SelectLabel>規則運算</SelectLabel>
                        {OPERATORS.map(({ value, label }) => (
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
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>門檻值</FormLabel>
                <FormControl>
                  {/* {resource && VALUES[resource].type === "category" ? (
                    <Select onValueChange={(v) => field.onChange(parseInt(v, 10))}>
                      <SelectTrigger className="w-[120px]" disabled={form.formState.isSubmitting}>
                        <SelectValue placeholder="請選擇" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>門檻值</SelectLabel>
                          {VALUES[resource].options.map(({ value, label }) => (
                            <SelectItem key={value} value={`${value}`}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : ( */}
                  <Input
                    id="value"
                    type="number"
                    className="w-[120px]"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    onBlur={field.onBlur}
                    disabled={!resource || form.formState.isSubmitting}
                  />
                  {/* )} */}
                </FormControl>
                {resource && !(VALUES[resource].type === "category") && (
                  <FormDescription>輸入單位：{VALUES[resource].unit}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator className="my-6" />
        <div className="flex justify-end gap-x-6">
          {editRule && (
            <>
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  void onDelete();
                }}
              >
                刪除
              </Button>
              <div className="ml-4 flex items-center space-x-2">
                <Switch
                  id="toggle-rule"
                  checked={editRule.is_enable}
                  onCheckedChange={(v) => {
                    void onToggleEnable(v);
                  }}
                />
                <Label htmlFor="toggle-rule">{editRule.is_enable ? "啟用中" : "禁用中"}</Label>
              </div>
              <div className="flex-1" />
            </>
          )}
          <Button
            type="button"
            variant="secondary"
            disabled={form.formState.isSubmitting}
            onClick={() => {
              form.reset();
              onCancel();
            }}
          >
            取消
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icon icon="ion:load-c" className="mr-2 h-4 w-4 animate-spin" />
            )}
            確認送出
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RuleForm;
