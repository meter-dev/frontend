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

interface RuleFormProps {
  rule?: Rule;
  onCancel: () => void;
  onSuccess: () => void;
}

const formSchema = z
  .object({
    name: z.string().min(1, "必填欄位"),
    resource: z.enum(["E002", "E003", "W001", "Q001"], { required_error: "必填欄位" }),
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
      message: "Invalid value",
      path: ["value"],
    }
  );

const RuleForm: React.FC<RuleFormProps> = ({ onCancel, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const resource = form.watch("resource");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await rule.create(values);
      form.reset();
      onSuccess();
    } catch (error) {
      form.setError("root", { message: "Login Failed" });
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={void form.handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-x-4 gap-y-2 lg:flex-nowrap">
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
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Resource</SelectLabel>
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
                    <SelectContent className="h-[300px] overflow-y-auto">
                      <SelectGroup>
                        <SelectLabel>Position</SelectLabel>
                        {resource &&
                          (POSITIONS[resource[0] as keyof typeof POSITIONS] || []).map(
                            ({ value, label }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            )
                          )}
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
                      <SelectGroup>
                        <SelectLabel>Operator</SelectLabel>
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
                  {resource && VALUES[resource].type === "category" ? (
                    <Select onValueChange={(v) => field.onChange(parseInt(v, 10))}>
                      <SelectTrigger className="w-[120px]" disabled={form.formState.isSubmitting}>
                        <SelectValue placeholder="請選擇" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Value</SelectLabel>
                          {VALUES[resource as "E003"].options.map(({ value, label }) => (
                            <SelectItem key={value} value={`${value}`}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="value"
                      type="number"
                      className="w-[120px]"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onBlur={field.onBlur}
                      disabled={!resource || form.formState.isSubmitting}
                    />
                  )}
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
          <Button
            type="button"
            variant="secondary"
            disabled={form.formState.isSubmitting}
            onClick={() => {
              form.reset();
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icon icon="ion:load-c" className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save and Deploy Rule
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RuleForm;
