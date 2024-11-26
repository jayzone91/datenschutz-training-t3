"use client";

import { api } from "@/trpc/react";
import LoadingSpinner from "./Loading";
import Error from "./Error";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LatestInfos() {
  const Infos = api.Infos.getLatest.useQuery();

  if (Infos.isLoading) return <LoadingSpinner />;
  if (Infos.isError) return <Error error="Fehler beim Laden von Infos" />;

  if (Infos.data)
    return (
      <div className="grid grid-cols-2 gap-6">
        {Infos.data.map((x) => (
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
                    Lesen
                  </Link>
                </Button>
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
            </CardFooter>
          </Card>
        ))}
      </div>
    );
}
