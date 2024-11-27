"use client";

import Error from "@/app/_components/Error";
import LoadingSpinner from "@/app/_components/Loading";
import { api } from "@/trpc/react";
import { Ban, ThumbsUp } from "lucide-react";

export default function UserOverview({ id }: { id: string }) {
  const Benutzer = api.Benutzer.getUser.useQuery({ id });

  if (Benutzer.isLoading) return <LoadingSpinner />;
  if (Benutzer.isError)
    return <Error error="Benutzer konnte nicht geladen werden" />;

  return (
    <div>
      <h2>{Benutzer.data?.name}</h2>
      <p>Mail: {Benutzer.data?.email}</p>
      <p className="flex items-center gap-4">
        Admin:{" "}
        {Benutzer.data?.admin ? (
          <ThumbsUp className="h-4 w-4 text-green-500" />
        ) : (
          <Ban className="h-4 w-4 text-red-500" />
        )}
      </p>
      <p>Mail: {Benutzer.data?.email}</p>

      <h3>Zertifikate</h3>
      <ul>
        {Benutzer.data?.ZertifikatAnUser.map((x) => (
          <li key={x.ZertifikatId}>{x.Zertifikat.Name}</li>
        ))}
      </ul>

      <h3>Module</h3>
      <ul>
        {Benutzer.data?.ModulAnUser.map((x) => (
          <li key={x.ModulId}>{x.Modul.Name}</li>
        ))}
      </ul>

      <h3>Fragen</h3>
      <ul>
        {Benutzer.data?.FrageAnUser.map((x) => (
          <li key={x.FrageId}>{x.Frage.Name}</li>
        ))}
      </ul>
    </div>
  );
}
