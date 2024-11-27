"use client";

import Error from "@/app/_components/Error";
import LoadingSpinner from "@/app/_components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import Link from "next/link";

export default function KategorienPage() {
  const Kategorien = api.Infos.getKategorien.useQuery();

  if (Kategorien.isLoading) return <LoadingSpinner />;
  if (Kategorien.isError)
    return <Error error="Fehler beim laden der Kategorien" />;

  return (
    <div className="container mx-auto mt-12">
      <h1>Alle Kategorien</h1>
      <div className="mt-12 grid grid-cols-2 gap-6">
        {Kategorien.data?.map((x) => (
          <Card key={x.id}>
            <CardHeader>{x.Name}</CardHeader>
            <CardContent>
              <p>{x.Beschreibung}</p>
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-row justify-between">
                <Button asChild>
                  <Link
                    className="text-blue-500 underline"
                    href={`/Infos/${x.id}`}
                  >
                    Ansehen
                  </Link>
                </Button>
                <small className="text-gray-400">
                  Anzahl der Artikel: {x._count.Infos}
                </small>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
