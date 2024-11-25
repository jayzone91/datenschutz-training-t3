import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <small className="flex gap-4 text-muted-foreground">
      <LoaderCircle className="h-4 w-4 animate-spin" /> Laden ...
    </small>
  );
}
