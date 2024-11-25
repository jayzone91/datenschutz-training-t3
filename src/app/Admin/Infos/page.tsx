"use server";

import Error from "@/app/_components/Error";
import InfoList from "@/app/_components/InfoList";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default async function AdminInfos() {
  const session = await auth();
  await api.Infos.getAll.prefetch();

  if (session == null)
    return <Error error="Session kann nicht gelesen werden" />;
  if (session.user == null) return <Error error="Nicht angemeldet!" />;
  if (!session.user.admin)
    return <Error error="Diese Seite ist nur für Adminstratoren!" />;

  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="pb-5">Admin / Infos</h1>
        <Button variant={"default"} className="my-5" asChild>
          <Link href="/Admin/Infos/new">Neuer Eintrag</Link>
        </Button>
        <InfoList />
      </div>
    </HydrateClient>
  );
}
