"use server";

import Error from "@/app/_components/Error";
import { api, HydrateClient } from "@/trpc/server";
import ShowInfo from "./_components/ShowInfo";

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  if (slug == null) return <Error error="Keine ID angegeben!" />;

  await api.Infos.get.prefetch({ id: slug });

  return (
    <HydrateClient>
      <ShowInfo id={slug} />
    </HydrateClient>
  );
}
