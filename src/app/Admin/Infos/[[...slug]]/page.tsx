"use server";

import Error from "@/app/_components/Error";
import { auth } from "@/server/auth";
import DeleteInfo from "./_pages/Delete";
import { api, HydrateClient } from "@/trpc/server";
import AdminInfos from "./_pages/ShowAll";
import NewInfoPage from "./_pages/New";
import InfoEditPage from "./_pages/Edit";
import NewInfoKatPage from "./_pages/NewCat";

export default async function InfoPages({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const session = await auth();
  const slug = (await params).slug;

  await api.Infos.getAll.prefetch();

  if (
    Array.isArray(slug) &&
    slug.length == 2 &&
    slug[0] != null &&
    slug[1] == "edit"
  ) {
    await api.Infos.get.prefetch({ id: slug[0] });
  }

  if (!session?.user.admin) {
    return <Error error="Diese Seite ist nur für Administratoren" />;
  }

  if (slug == null) {
    // /Admin/Infos/
    return (
      <HydrateClient>
        <AdminInfos />
      </HydrateClient>
    ); // show All
  }

  if (Array.isArray(slug)) {
    if (slug.length == 1) {
      // /Admin/Infos/[ID] || / Admin/Infos/new
      if (slug[0] == "new") {
        return (
          <HydrateClient>
            <NewInfoPage />
          </HydrateClient>
        ); // New Form
      }
      if (slug[0] == "newCat") {
        return (
          <HydrateClient>
            <NewInfoKatPage />
          </HydrateClient>
        ); // New Cat Form
      }
    }
    if (slug.length == 2) {
      if (slug[0] == null) return <Error error={"Keine ID angegeben!"} />;
      // /Admin/Infos/[ID]/( edit / delete)
      if (slug[1] == "edit") {
        return (
          <HydrateClient>
            <InfoEditPage id={slug[0]} />
          </HydrateClient>
        ); // Show Edit Form
      }
      if (slug[1] == "delete") {
        return (
          <HydrateClient>
            <DeleteInfo id={slug[0]} />
          </HydrateClient>
        ); // Show  Delete
      }
    }
  }

  return <Error error="Server Fehler!" />;
}
