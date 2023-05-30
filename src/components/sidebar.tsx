import { Icon } from "@iconify/react";
import { buttonVariants } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  user: {
    name: string;
    avatar: string;
    visitor: boolean;
  };
}

const navs = [
  {
    name: "Dashboard",
    icon: "octicon:meter-16",
    path: "/",
    allowVisitor: true,
  },
  {
    name: "Issues",
    icon: "octicon:tasklist-16",
    path: "/issues",
    allowVisitor: false,
  },
  {
    name: "Members",
    icon: "octicon:organization-16",
    path: "/members",
    allowVisitor: false,
  },
  {
    name: "Settings",
    icon: "octicon:gear-16",
    path: "/settings",
    allowVisitor: false,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="flex h-full flex-col px-2 py-4">
      <div className="bg-gradient-to-r from-violet-700 via-fuchsia-700 to-rose-900 bg-clip-text text-center text-3xl font-bold text-transparent">
        METER
      </div>

      <Separator className="my-4" />

      <div className="flex items-center gap-x-3 px-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="uppercase">{user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <span>{user.name}</span>
      </div>

      {user.visitor && (
        <Link
          className={twMerge(buttonVariants({ variant: "link" }), "mt-2 whitespace-nowrap")}
          href="/login"
        >
          <span>Login / Register</span>
        </Link>
      )}

      <Separator className="my-4" />

      {navs
        .filter(({ allowVisitor }) => allowVisitor || !user || !user.visitor)
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
            <span>{name}</span>
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
