"use client";

import { api } from "@/trpc/react";
import LoadingSpinner from "../../../_components/Loading";
import Error from "../../../_components/Error";
import { UserDataTablePageinated } from "@/components/data-table";
import type { User } from "@prisma/client";
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

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Link className="underline" href={`/Admin/Benutzer/${payment.id}`}>
          {payment.id}
        </Link>
      );
    },
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "EMail" },
  { accessorKey: "admin", header: "Admin" },
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
              <Link href={`/Admin/Benutzer/${payment.id}/edit`}>
                Bearbeiten
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/Admin/Benutzer/${payment.id}/delete`}>Löschen</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UserList() {
  const Benutzer = api.Benutzer.getUsers.useQuery();

  if (Benutzer.isLoading) return <LoadingSpinner />;
  if (Benutzer.isError) return <Error error="Fehler beim Lesen von Infos" />;
  if (Benutzer.data) {
    return <UserDataTablePageinated columns={columns} data={Benutzer.data} />;
  }
}
