"use client";

import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { User } from "@prisma/client";
import LoadingSpinner from "./Loading";
import Error from "./Error";

const formSchema = z.object({
  name: z.string(),
  admin: z.boolean().optional(),
});

export default function UserForm({
  id = undefined,
  admin = false,
}: {
  id?: string;
  admin?: boolean;
}) {
  const User = api.Benutzer.getUser.useQuery({ id });

  if (User.isLoading) return <LoadingSpinner />;
  if (User.isError) return <Error error="Fehler beim Lesen des Benutzers" />;

  if (User.data) {
    return <FormFields User={User.data} admin={admin} id={id} />;
  }
}

function FormFields({
  User,
  admin,
  id,
}: {
  User: User;
  admin?: boolean;
  id?: string;
}) {
  const UserUpdate = api.Benutzer.updateUser.useMutation();
  const AdminUpdate = api.Benutzer.updateUserAdmin.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: User.name ?? "",
      admin: User.admin ?? false,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (admin && id) {
      await AdminUpdate.mutateAsync({
        id: id,
        name: values.name,
        admin: values.admin ?? false,
      });
    } else {
      await UserUpdate.mutateAsync({
        name: values.name,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  required
                  type="text"
                  placeholder="Max Muster"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Gib hier bitte deinen vollen Namen ein, dieser wird benutzt um
                Zertifikate zu erstellen
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {admin && id && (
          <FormField
            control={form.control}
            name="admin"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Administrator</FormLabel>
                  <FormDescription>
                    Setze den Benutzer als Administrator
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Speichern</Button>
      </form>
    </Form>
  );
}
