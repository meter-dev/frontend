import { Icon } from "@iconify/react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "./ui/separator";
import { useRouter } from "next/router";

const user = {
  name: "Alice Chen",
  avatar: "https://picsum.photos/id/38/120/120.jpg",
};

const navs = [
  {
    name: "儀表板",
    icon: "octicon:meter-16",
    path: "/dashboard",
  },
  {
    name: "事件管理",
    icon: "octicon:tasklist-16",
    path: "/issues",
  },
  {
    name: "人員管理",
    icon: "octicon:organization-16",
    path: "/members",
  },
  {
    name: "設定",
    icon: "octicon:gear-16",
    path: "/settings",
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col px-2 py-4">
      <div className="bg-gradient-to-r from-violet-700 via-fuchsia-700 to-rose-900 bg-clip-text text-center text-3xl font-bold text-transparent">
        METER
      </div>

      <Separator className="my-4" />

      <div className="flex items-center gap-x-3 px-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="uppercase">
            {user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span>{user.name}</span>
      </div>

      <Separator className="my-4" />

      {navs.map(({ name, icon, path }) => (
        <Button
          key={path}
          variant="ghost"
          className="my-1 justify-start whitespace-nowrap px-3.5"
          onClick={() => {
            void router.push(path);
          }}
        >
          <Icon icon={icon} className="mr-[18px] h-5 w-5" />
          {name}
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
