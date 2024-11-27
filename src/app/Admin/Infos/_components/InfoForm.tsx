"use client";

import Error from "@/app/_components/Error";
import LoadingSpinner from "@/app/_components/Loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  InsertTable,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  quotePlugin,
  Separator,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import type { Info } from "@prisma/client";
import { Select } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  Name: z.string(),
  Beschreibung: z.string(),
  Body: z.string(),
  Kategorie: z.string(),
});

export default function InfoForm({ Info }: { Info: Info | undefined | null }) {
  const Create = api.Infos.create.useMutation();
  const Update = api.Infos.update.useMutation();
  const Kategorien = api.Infos.getKategorien.useQuery();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: Info?.Name ?? "",
      Beschreibung: Info?.Beschreibung ?? "",
      Body: Info?.Body ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let res: Info | null = null;
    if (Info == null) {
      res = await Create.mutateAsync({
        ...values,
      });
    } else {
      res = await Update.mutateAsync({
        id: Info.id,
        ...values,
      });
    }
    if (res) router.push("/Admin/Infos");
  }

  if (Kategorien.isLoading) return <LoadingSpinner />;
  if (Kategorien.isError)
    return <Error error="Fehler beim Abrufen der Kategorien" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input required placeholder="Ich bin ein Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Beschreibung"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Ich bin eine Beschreibung"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Kategorie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategorie</FormLabel>
              <Select
                required
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle die Kategorie aus." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Kategorien.data?.map((x) => (
                    <SelectItem key={x.id} value={x.id}>
                      {x.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <div className="rounded-md border">
                <MDXEditor
                  ref={field.ref}
                  markdown={field.value}
                  onChange={field.onChange}
                  plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    linkPlugin(),
                    linkDialogPlugin(),
                    tablePlugin(),
                    thematicBreakPlugin(),
                    toolbarPlugin({
                      toolbarClassName: "flex row gap-4",
                      toolbarContents: () => (
                        <>
                          <UndoRedo />
                          <Separator />
                          <BoldItalicUnderlineToggles />
                          <Separator />
                          <BlockTypeSelect />
                          <Separator />
                          <InsertTable />
                          <ListsToggle />
                        </>
                      ),
                    }),
                  ]}
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Speichern</Button>
      </form>
    </Form>
  );
}
