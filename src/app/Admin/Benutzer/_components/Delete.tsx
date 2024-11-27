"use client";

import Error from "@/app/_components/Error";
import LoadingSpinner from "@/app/_components/Loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteUser({ id }: { id: string }) {
  const router = useRouter();
  const Benutzer = api.Benutzer.getUser.useQuery({ id });
  const Delete = api.Benutzer.deleteUser.useMutation();

  const handleDelete = async () => {
    await Delete.mutateAsync({ id });
    router.push("/Admin/Benutzer");
  };

  const handleBack = () => {
    router.push("/Admin/Benutzer");
  };

  if (Benutzer.isLoading) return <LoadingSpinner />;
  if (Benutzer.isError)
    return <Error error="Benutzer konnte nicht geladen werden" />;

  return (
    <div className="mt-4">
      <h2>Möchtest du {Benutzer.data?.name} wirklich Löschen?</h2>
      {Benutzer.data?.admin && (
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle className="text-2xl font-extrabold">Achtung!</AlertTitle>
          <AlertDescription>
            <p>Dieser Benutzer ist ein Admin!</p>
          </AlertDescription>
        </Alert>
      )}
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
