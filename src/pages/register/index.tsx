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
import { api } from "~/utils/api";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const formSchema = z.object({
  email: z.string().min(1, "Please provide an Email").email("Invalid Email"),
  username: z.string().min(2, "At lease 2 characters").max(16, "At most 16 characters"),
  password: z.string().min(8, "At lease 8 characters").max(128, "At most 128 characters"),
  // confirmPassword: z.string().min(8).max(128),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

const Register: NextPage = () => {
  const router = useRouter();
  const { mutateAsync } = api.user.signup.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await mutateAsync(values);
    if (result.ok) {
      await router.push("/");
      return;
    }
    console.log("result", result.data);
  }

  return (
    <div className="flex flex-col items-start p-10">
      <h2 className="text-3xl font-bold">Get started</h2>
      <span className="mt-2 text-sm text-slate-500">Create your account now</span>

      <div className="my-4" />

      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="username"
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
                  This is your public display name. At least 2 characters.
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
                <FormDescription>At least 8 characters.</FormDescription>
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
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="my-6" />

      <Link href="/login" className={twMerge(buttonVariants({ variant: "link" }), "px-0")}>
        Already have an account? Click here to login.
      </Link>
    </div>
  );
};

export default Register;
