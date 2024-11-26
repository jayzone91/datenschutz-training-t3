"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function DeleteInfo({ id }: { id: string }) {
  const router = useRouter();
  const Delete = api.Infos.delete.useMutation();

  const handleDelete = async () => {
    await Delete.mutateAsync({ id });
    router.push("/Admin/Infos");
  };

  const handleBack = () => {
    router.push("/Admin/Infos");
  };

  return (
    <div className="container mx-auto mt-14">
      <h1>Info Löschen</h1>

      <h2>Möchtest du die Info wirklich Löschen?</h2>
      <div className="mt-12 grid max-w-[40%] grid-cols-2 gap-6">
        <Button onClick={handleDelete} variant="destructive">
          JA!
        </Button>
        <Button onClick={handleBack} variant="secondary">
          Nein
        </Button>
      </div>
    </div>
  );
}
