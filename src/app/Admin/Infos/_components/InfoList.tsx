"use client";

import { api } from "@/trpc/react";
import LoadingSpinner from "../../../_components/Loading";
import Error from "../../../_components/Error";
import { InfoDataTablePageinated } from "@/components/data-table";
import type { Info, InfoKategorie } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<
  Info & { InfoKategorie: InfoKategorie | null }
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  { accessorKey: "Name", header: "Name" },
  { accessorKey: "Beschreibung", header: "Beschreibung" },
  { accessorKey: "InfoKategorie.Name", header: "Kategorie" },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/Admin/Infos/${payment.id}/edit`}>Bearbeiten</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/Admin/Infos/${payment.id}/delete`}>Löschen</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function InfoList() {
  const Infos = api.Infos.getAll.useQuery();

  if (Infos.isLoading) return <LoadingSpinner />;
  if (Infos.isError) return <Error error="Fehler beim Lesen von Infos" />;
  if (Infos.data) {
    return <InfoDataTablePageinated columns={columns} data={Infos.data} />;
  }
}
