"use client";

import { api } from "@/trpc/react";
import LoadingSpinner from "./Loading";
import Error from "./Error";
import { InfoDataTablePageinated } from "@/components/data-table";
import { columns } from "../Admin/Infos/_components/columns";

export default function InfoList() {
  const Infos = api.Infos.getAll.useQuery();

  if (Infos.isLoading) return <LoadingSpinner />;
  if (Infos.isError) return <Error error="Fehler beim Lesen von Infos" />;
  if (Infos.data) {
    return <InfoDataTablePageinated columns={columns} data={Infos.data} />;
  }
}
