"use server";

import Error from "@/app/_components/Error";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import UserList from "../_components/UserList";
import UserOverview from "../_components/User";
import UserForm from "@/app/_components/UserForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteUser from "../_components/Delete";

export default async function UserPages({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const session = await auth();
  const slug = (await params).slug;

  await api.Benutzer.getUsers.prefetch();

  if (
    Array.isArray(slug) &&
    slug.length == 2 &&
    slug[0] != null &&
    slug[1] == "edit"
  ) {
    await api.Benutzer.getUser.prefetch({ id: slug[0] });
  }

  if (!session?.user.admin) {
    return <Error error="Diese Seite ist nur für Administratoren" />;
  }

  if (slug == null) {
    // /Admin/Benutzer/
    return (
      <HydrateClient>
        <div className="container mx-auto mt-12">
          <h1>Admin / Alle Benutzer</h1>
          <UserList />
        </div>
      </HydrateClient>
    ); // show All
  }

  if (Array.isArray(slug)) {
    if (slug.length == 1 && slug[0] != null) {
      // /Admin/Benutzer/[ID]
      return (
        <HydrateClient>
          <div className="container mx-auto mt-12">
            <Button asChild className="mb-4">
              <Link href="/Admin/Benutzer">Zurück</Link>
            </Button>
            <UserOverview id={slug[0]} />
          </div>
        </HydrateClient>
      );
    }
    if (slug.length == 2) {
      if (slug[0] == null) return <Error error={"Keine ID angegeben!"} />;
      // /Admin/Benutzer/[ID]/( edit / delete)
      if (slug[1] == "edit") {
        return (
          <HydrateClient>
            <div className="container mx-auto mt-12">
              <Button asChild className="mb-4">
                <Link href="/Admin/Benutzer">Zurück</Link>
              </Button>
              <h1>Admin / Benutzer bearbeiten</h1>
              <UserForm id={slug[0]} admin />
            </div>
          </HydrateClient>
        ); // Show Edit Form
      }
      if (slug[1] == "delete") {
        return (
          <HydrateClient>
            <div className="container mx-auto mt-12">
              <Button asChild className="mb-4">
                <Link href="/Admin/Benutzer">Zurück</Link>
              </Button>
              <h1>Admin / Benutzer löschen</h1>
              <DeleteUser id={slug[0]} />
            </div>
          </HydrateClient>
        ); // Show  Delete
      }
    }
  }

  return <Error error="Server Fehler!" />;
}
