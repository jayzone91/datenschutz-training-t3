"use client";

import InfoList from "@/app/Admin/Infos/_components/InfoList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InfoKatList from "../../_components/KatList";

export default function AdminInfos() {
  return (
    <div className="container mx-auto">
      <h1 className="pb-5">Admin / Infos</h1>
      <div className="flex gap-4">
        <Button variant={"default"} className="my-5" asChild>
          <Link href="/Admin/Infos/new">Neuer Eintrag</Link>
        </Button>
        <Button variant={"default"} className="my-5" asChild>
          <Link href="/Admin/Infos/newCat">Neue Kategorie</Link>
        </Button>
      </div>

      {/* Kategorien */}
      <InfoKatList />

      {/* Infos */}
      <InfoList />
    </div>
  );
}
