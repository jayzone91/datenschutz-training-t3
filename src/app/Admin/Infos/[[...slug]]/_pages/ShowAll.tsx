"use client";

import InfoList from "@/app/Admin/Infos/_components/InfoList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminInfos() {
  return (
    <div className="container mx-auto">
      <h1 className="pb-5">Admin / Infos</h1>
      <Button variant={"default"} className="my-5" asChild>
        <Link href="/Admin/Infos/new">Neuer Eintrag</Link>
      </Button>
      <InfoList />
    </div>
  );
}
