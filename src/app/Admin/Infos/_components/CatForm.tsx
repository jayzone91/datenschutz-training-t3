"use client";

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
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import "@mdxeditor/editor/style.css";
import type { InfoKategorie } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  Name: z.string(),
  Beschreibung: z.string(),
});

export default function InfoKatForm({
  Info,
}: {
  Info: InfoKategorie | undefined | null;
}) {
  const Create = api.Infos.createKategorie.useMutation();
  const Update = api.Infos.updateKategorie.useMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: Info?.Name ?? "",
      Beschreibung: Info?.Beschreibung ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let res: InfoKategorie | null = null;
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
                <Input placeholder="shadcn" {...field} />
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Speichern</Button>
      </form>
    </Form>
  );
}
