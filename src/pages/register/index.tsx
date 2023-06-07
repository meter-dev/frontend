/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type NextPage } from "next";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { user } from "~/lib/api";
import ErrorAlert from "~/components/error-alert";
import { getErrorMsg } from "~/lib/errors";

const formSchema = z.object({
  email: z.string().min(1, "Please provide an Email").email("Invalid Email"),
  name: z.string().min(2, "At lease 2 characters").max(16, "At most 16 characters"),
  password: z.string().min(8, "At lease 8 characters").max(128, "At most 128 characters"),
  // confirmPassword: z.string().min(8).max(128),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

const Register: NextPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await user.signup(values);
      console.log(result);
      await router.push("/login");
    } catch (e) {
      // @ts-ignore
      if (e?.response?.data?.code) {
        // if (error.success && error.data.response.code) {
        // @ts-ignore
        form.setError("root", { message: getErrorMsg(e?.response?.data?.code) });
      } else {
        form.setError("root", { message: getErrorMsg("UNKNOWN") });
        console.error(e);
      }
    }
  }

  return (
    <div className="flex w-full flex-col items-start p-10">
      <h2 className="text-3xl font-bold">Get started 🚀</h2>
      <span className="mt-2 text-sm text-slate-500">開始建立你的帳號</span>

      <div className="my-4" />

      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[360px] space-y-8">
          {form.formState.errors.root && (
            <ErrorAlert title="註冊失敗" description={form.formState.errors.root.message} />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="example@tsmc.com"
                    {...field}
                    readOnly={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    placeholder="Alice"
                    readOnly={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  請使用英文名稱且需至少有 2 個字元<br></br>此名稱將作為您在系統內的顯示名稱
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    readOnly={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>需至少有 8 個字元</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input id="confirm-password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icon icon="ion:load-c" className="mr-2 h-4 w-4 animate-spin" />
            )}
            註冊
          </Button>
        </form>
      </Form>

      <div className="my-6" />

      <Link href="/login" className={twMerge(buttonVariants({ variant: "link" }), "px-0")}>
        {"已經擁有帳號了嗎？點選這裡來進行登入！"}
      </Link>
    </div>
  );
};

export default Register;
