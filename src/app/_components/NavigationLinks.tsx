"use client";

import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import type { MenuItems } from "./MainMenu";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "@/components/ListItem";
import LoadingSpinner from "./Loading";
import Error from "./Error";

export default function NavigationLinks() {
  const Infos = api.Infos.getAll.useQuery();
  const [menuItems, setMenuItems] = useState<MenuItems[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (Infos.data == null) return;

    const menuItems: MenuItems[] = [];
    // Dashbaard
    menuItems.push({
      title: "Dashbaord",
      items: [
        {
          title: "Übersicht",
          href: "/Dashboard",
          desc: "Deine Übersicht",
        },
        {
          title: "Tests",
          href: "/Tests",
          desc: "Deine Tests",
        },
        {
          title: "Zertifikate",
          href: "/Zertifikate",
          desc: "Deine Zertifikate",
        },
      ],
    });

    // Infos
    menuItems.push({
      title: "Infos",
      items: [],
    });
    Infos.data?.forEach((x) => {
      const y = menuItems.find((z) => z.title === "Infos");
      if (y != null)
        y.items.push({
          title: x.Name,
          href: x.id,
          desc: x.Beschreibung,
        });
    });

    setMenuItems(menuItems);
  }, [Infos.data]);

  if (Infos.isLoading) return <LoadingSpinner />;
  if (Infos.isError)
    return <Error error="Fehler beim Laden des Info Elemets" />;

  return (
    <>
      {menuItems?.map((group) => (
        <NavigationMenuItem key={group.title}>
          <NavigationMenuTrigger>{group.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {group.items.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.desc}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      ))}
    </>
  );
}
