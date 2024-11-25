"use server";

import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import UserForm from "../_components/UserForm";

export default async function Benutzer() {
  const session = await auth();

  if (session == null) return <>Bitte erst anmelden!</>;
  if (session.user == null) return <>Bitte erst anmelden!</>;

  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1>Dein Profil</h1>
        <UserForm />
      </div>
    </HydrateClient>
  );
}
