'use client'
import { BarChart3, Landmark } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
export default function SideBar() {
    const router = useRouter()
  const menuList = [
    {
      group: "General",
      items: [
        { link: "/", text: "Översikt", icon: <Landmark /> },
        { link: "/transaktioner", text: "Transaktioner", icon: <BarChart3 /> },
        { link: "/tidsrappotering", text: "Tidsrappotering", icon: <Landmark /> },
        { link: "/c", text: "Overaawiewghhhh", icon: <Landmark /> },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/hhh",
          text: "General Settings",
          icon: <Landmark />,
        },
        { link: "/b", text: "Settiangaaaaas", icon: <Landmark /> },
        { link: "/ac", text: "Setstingsbbbb", icon: <Landmark /> },
        { link: "/s", text: "Settvingccccccs", icon: <Landmark /> },
      ],
    },
  ];
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex pl-3 justify-between">
        <span>Logo</span>
      </div>

      <Command className="overflow-visible">
        <CommandList className="overflow-visible">
          {menuList.map((menu, key) => (
            <CommandGroup key={key} heading={menu.group}>
              {menu.items.map((option, optionKey) => (
                <CommandItem
                  key={optionKey}

                  onSelect={() => router.push(option.link)}
                  className="flex gap-2 items-center cursor-pointer "
                >
                  {option.icon} {option.text}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
