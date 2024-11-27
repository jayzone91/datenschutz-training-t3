"use client";

import Error from "@/app/_components/Error";
import LoadingSpinner from "@/app/_components/Loading";
import { api } from "@/trpc/react";
import {
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useEffect, useRef, useState } from "react";

export default function ShowInfo({ id }: { id: string }) {
  const Info = api.Infos.get.useQuery({ id });
  const ref = useRef<MDXEditorMethods>(null);
  const [lesezeit, setLesezeit] = useState(0);

  useEffect(() => {
    if (Info.data == null) return;
    const wpm = 225;
    const words = Info.data.Body.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);

    ref.current?.setMarkdown(Info.data.Body);

    setLesezeit(time);
  }, [Info.data]);

  if (Info.isLoading) return <LoadingSpinner />;
  if (Info.isError) return <Error error="Fehler beim Laden der Info" />;

  if (Info.data) {
    return (
      <div className="container mx-auto mt-12">
        <h1 className="mb-0 pb-0">{Info.data.Name}</h1>
        <small className="ps-4 text-sm font-light text-gray-500">
          Lesezeit: ca. {lesezeit} min
        </small>
        <h2 className="mt-6">{Info.data.Beschreibung}</h2>
        <hr />
        <MDXEditor
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            tablePlugin(),
            thematicBreakPlugin(),
          ]}
          readOnly
          spellCheck={false}
          markdown={Info.data.Body}
          ref={ref}
        />
      </div>
    );
  }
}
