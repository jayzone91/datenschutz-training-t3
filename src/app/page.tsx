import Link from "next/link";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import LatestInfos from "./_components/LatestInfo";

export default async function Home() {
  const session = await auth();
  await api.Infos.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="container mx-auto mb-6 mt-12">
        {!session ? (
          <>
            <h1>Willkommen</h1>
            <h2>Auf der Datenschutz-Lernplatform</h2>
            <h3>
              Der Firmen Computer Extra GmbH und AEM Communication GmbH & Co. KG
            </h3>

            <p>Zum Nutzen der Seite ist ein Account erforderlich.</p>
            <p>
              Es können auch Informationen ohne Account gelesen werden, diese
              sind jedoch rein informativ
            </p>

            <p className="mb-12">
              Du hast bereits einen Account? Dann melde dich{" "}
              <Link className="text-blue-500 underline" href="/api/auth/signin">
                hier
              </Link>{" "}
              an.
            </p>
          </>
        ) : (
          <>
            {session.user.name ? (
              <h1>Hallo {session.user.name},</h1>
            ) : (
              <Alert variant="destructive">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle className="text-2xl font-extrabold">
                  Achtung!
                </AlertTitle>
                <AlertDescription>
                  <p>
                    Du hast noch gar keinen Namen hinterlegt. Dieser wird
                    benötigt um Zertifikate zu erstellen.
                    <br />
                    Geh auf dein{" "}
                    <Link href="/Benutzer" className="underline">
                      Profil
                    </Link>{" "}
                    und hinterlegt doch mal einen 😊
                  </p>
                </AlertDescription>
              </Alert>
            )}
            <h2>Schön, dass du wieder hier bist.</h2>
            <h3>Hier ist alles neue:</h3>
          </>
        )}
        <h4>Neueste Infos:</h4>
        <LatestInfos />
        {session && (
          <>
            <h4>Neueste Module:</h4>
            <h4>Neueste Tests:</h4>
          </>
        )}
      </div>
    </HydrateClient>
  );
}
