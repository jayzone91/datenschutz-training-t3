import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function Error({ error }: { error: string }) {
  return (
    <Alert variant="destructive">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle className="text-2xl font-extrabold">
        Ein Fehler ist aufgetreten
      </AlertTitle>
      <AlertDescription>
        <p>{error}</p>
      </AlertDescription>
    </Alert>
  );
}
