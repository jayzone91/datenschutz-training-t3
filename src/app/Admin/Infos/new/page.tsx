"use server";

import Error from "@/app/_components/Error";
import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import InfoForm from "../_components/InfoForm";

export default async function NewInfoPage() {
  const session = await auth();

  if (session == null) return <Error error="Nicht angemeldet" />;
  if (session.user == null) return <Error error="Nicht angemeldet" />;
  if (!session.user.admin)
    return <Error error="Diese Seite ist nur für Administratoren" />;

  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1>Neue Info anlegen</h1>
        <InfoForm Info={null} />
      </div>
    </HydrateClient>
  );
}
