"use server";

import Error from "@/app/_components/Error";
import { api, HydrateClient } from "@/trpc/server";
import ShowInfo from "./_components/ShowInfo";
import ShowInfoKategorie from "./_components/ShowInfos";

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug;

  if (slug == null) return <Error error="Keine ID angegeben!" />;

  if (Array.isArray(slug))
    if (slug.length == 1 && slug[0]) {
      await api.Infos.getKategorie.prefetch({ id: slug[0] });
      return (
        <HydrateClient>
          <ShowInfoKategorie id={slug[0]} />
        </HydrateClient>
      );
    }
  if (slug.length == 2 && slug[1]) {
    await api.Infos.get.prefetch({ id: slug[1] });
    return (
      <HydrateClient>
        <ShowInfo id={slug[1]} />
      </HydrateClient>
    );
  }
}
