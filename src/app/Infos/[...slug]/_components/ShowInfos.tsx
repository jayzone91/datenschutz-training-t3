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

export default function ShowInfoKategorie({ id }: { id: string }) {
  const Info = api.Infos.getKategorie.useQuery({ id });

  if (Info.isLoading) return <LoadingSpinner />;
  if (Info.isError) return <Error error="Fehler beim Laden der Info" />;

  if (Info.data) {
    return (
      <div className="container mx-auto mt-12">
        <h1 className="mb-0 pb-0">{Info.data.Name}</h1>
        <h2 className="mt-6">{Info.data.Beschreibung}</h2>
        <div className="mt-12 grid grid-cols-2 gap-6">
          {Info.data.Infos.map((x) => (
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
                      href={`/Infos/Info/${x.id}`}
                    >
                      Lesen
                    </Link>
                  </Button>
                  <div className="flex flex-col text-end">
                    <small className="text-gray-400">
                      Veröffentlicht am{" "}
                      {x.published.toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      um{" "}
                      {x.published.toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      Uhr
                    </small>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
