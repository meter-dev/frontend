import { Icon } from "@iconify/react";
import { buttonVariants } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { type User } from "~/lib/user";

interface SidebarProps {
  user?: User;
}
const navs = [
  {
    name: "儀表板",
    icon: "octicon:meter-16",
    path: "/",
    isPublic: true,
  },
  {
    name: "警報事件",
    icon: "octicon:tasklist-16",
    path: "/issues",
    isPublic: false,
  },
  {
    name: "警報規則",
    icon: "octicon:alert-16",
    path: "/rules",
    isPublic: false,
  },
  // {
  //   name: "Members",
  //   icon: "octicon:organization-16",
  //   path: "/members",
  //   isPublic: false,
  // },
  {
    name: "設定",
    icon: "octicon:gear-16",
    path: "/settings",
    isPublic: false,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="bg-gradient-to-r from-violet-700 via-fuchsia-700 to-rose-900 bg-clip-text text-center text-3xl font-bold text-transparent">
        METER
      </div>

      <Separator className="my-4" />

      <Link
        className={twMerge(
          buttonVariants({
            variant: "ghost",
          }),
          "justify-start whitespace-nowrap px-3.5"
        )}
        href={user ? "/settings" : "/login"}
      >
        <Avatar className="mr-3 h-8 w-8">
          <AvatarFallback className="uppercase">
            {user ? user.name.slice(0, 1) : "G"}
          </AvatarFallback>
        </Avatar>
        {user ? user.name : "Guest"}
      </Link>

      {!user && (
        <div className="flex items-center">
          <Link
            className={twMerge(
              buttonVariants({ variant: "link" }),
              "mt-2 self-start whitespace-nowrap px-3 text-sm text-slate-500"
            )}
            href="/login"
          >
            登入
          </Link>
          <Separator orientation="vertical" className="mt-2 h-4 w-0.5" />
          <Link
            className={twMerge(
              buttonVariants({ variant: "link" }),
              "mt-2 self-start whitespace-nowrap px-3 text-sm text-slate-500"
            )}
            href="/register"
          >
            註冊
          </Link>
        </div>
      )}

      <Separator className="my-4" />

      {navs
        .filter(({ isPublic }) => isPublic || user)
        .map(({ name, icon, path }) => (
          <Link
            key={path}
            className={twMerge(
              buttonVariants({
                variant: "ghost",
              }),
              "my-1 justify-start whitespace-nowrap px-3.5"
            )}
            href={path}
          >
            <Icon icon={icon} className="mr-[18px] h-5 w-5" />
            {name}
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
