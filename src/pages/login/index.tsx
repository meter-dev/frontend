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
import { api } from "~/utils/api";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Checkbox } from "~/components/ui/checkbox";
import { useLocalStorage } from "usehooks-ts";

const formSchema = z.object({
  email: z.string().min(1, "Please fill in your Email").email("Invalid Email"),
  password: z.string().min(1, "Please fill in your Password"),
  rememberMe: z.boolean(),
});

const Login: NextPage = () => {
  const [storedEmail, setStoredEmail] = useLocalStorage("meter-email", "");
  const router = useRouter();
  const { mutateAsync } = api.auth.login.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: storedEmail,
      password: "",
      rememberMe: storedEmail !== "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.rememberMe) {
      setStoredEmail(values.email);
    } else {
      setStoredEmail("");
    }
    const result = await mutateAsync(values);
    if (result.ok) {
      await router.push("/");
      return;
    }
    console.log("result", result.data);
  }

  return (
    <div className="flex w-full flex-col items-start p-10">
      <h2 className="text-3xl font-bold">Welcome back 👋</h2>
      <span className="mt-2 text-sm text-slate-500">Sign in to continue access</span>

      <div className="my-4" />

      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[360px] space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
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
                  <FormLabel>Remember my email</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icon icon="ion:load-c" className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </form>
      </Form>

      <div className="my-6" />

      <Link href="/register" className={twMerge(buttonVariants({ variant: "link" }), "px-0")}>
        {"Don't have an account? Click here to Sign up now!"}
      </Link>
    </div>
  );
};

export default Login;
