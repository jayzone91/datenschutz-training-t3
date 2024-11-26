"use client";

import { api } from "@/trpc/react";
import InfoForm from "../../_components/InfoForm";
import LoadingSpinner from "@/app/_components/Loading";
import Error from "@/app/_components/Error";

export default function InfoEditPage({ id }: { id: string }) {
  const Info = api.Infos.get.useQuery({ id });

  if (Info.isLoading) return <LoadingSpinner />;
  if (Info.isError) return <Error error="Fehler beim Laden der Info" />;

  if (Info.data)
    return (
      <div className="container mx-auto">
        <h1>Info Bearbeiten</h1>
        <InfoForm Info={Info.data} />
      </div>
    );
}
