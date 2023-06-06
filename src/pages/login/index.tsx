import { type NextPage } from "next";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Form,
  FormControl,
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
import { Checkbox } from "~/components/ui/checkbox";
import { useLocalStorage } from "usehooks-ts";
import { useContext } from "react";
import Session from "~/lib/session-context";
import { auth } from "~/lib/api";
import ErrorAlert from "~/components/error-alert";
import { errorSchema, getErrorMsg } from "~/lib/errors";

const formSchema = z.object({
  username: z.string().min(1, "Please fill in your Email or Username"),
  password: z.string().min(1, "Please fill in your Password"),
  rememberMe: z.boolean(),
});

const Login: NextPage = () => {
  const [storedUsername, setStoredUsername] = useLocalStorage("meter-username", "");
  const [, setStoredToken] = useLocalStorage("meter-token", "");

  const { refetchUser } = useContext(Session);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: storedUsername,
      password: "",
      rememberMe: storedUsername !== "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.rememberMe) {
      setStoredUsername(values.username);
    } else {
      setStoredUsername("");
    }
    try {
      const loginForm = new FormData();
      loginForm.append("username", values.username);
      loginForm.append("password", values.password);
      const { data } = await auth.token(loginForm);
      if (data.token_type === "bearer") {
        setStoredToken(`Bearer ${data.access_token}`);
      } else {
        setStoredToken(`${data.token_type} ${data.access_token}`);
      }
      refetchUser();
      await router.push("/");
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

  return (
    <div className="flex w-full flex-col items-start p-10">
      <h2 className="text-3xl font-bold">Welcome back 👋</h2>
      <span className="mt-2 text-sm text-slate-500">請進行登入以使用更多功能</span>

      <div className="my-4" />

      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[360px] space-y-8">
          {form.formState.errors.root && (
            <ErrorAlert title="登入失敗" description={form.formState.errors.root.message} />
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email / Username</FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    className="w-full"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>記住我的 Email / Username</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icon icon="ion:load-c" className="mr-2 h-4 w-4 animate-spin" />
            )}
            登入
          </Button>
        </form>
      </Form>

      <div className="my-6" />

      <Link href="/register" className={twMerge(buttonVariants({ variant: "link" }), "px-0")}>
        {"還沒有帳號嗎？點選這裡立即註冊！"}
      </Link>
    </div>
  );
};

export default Login;
