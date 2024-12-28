"use client";

import React from "react";
import Image from "next/image";

import AppNavBar from "@/components/AppNavBar";
import AppFooter from "@/components/AppFooter";

import { Bids } from "@/@types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormLabel } from "@/components/ui/form";

import { Send } from "lucide-react";

import { useForm } from "react-hook-form";
import { BidSchema, bidSchema, DEFAULT_VALUES } from "@/schemas/bid.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const form = useForm<BidSchema>({
    resolver: zodResolver(bidSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const [bids, setBids] = React.useState<Bids[]>([]);

  async function handleOnSubmit(data: BidSchema) {
    try {
    } catch (error) {
      console.error("[Auction] handleOnSubmit FAILED: ", error);
    }
  }

  return (
    <>
      <AppNavBar />
      <Toaster position="top-right" />

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Card>
            <CardContent className="">
              <CardHeader className="items-center">
                <Image
                  className="dark:invert mb-6"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={100}
                  height={38}
                  priority
                />
                <CardTitle>Item leiloado - Gado</CardTitle>
                <CardDescription>
                  Faça seus lances aqui para concorrer ao item!
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form
                  className="space-y-8"
                  onSubmit={form.handleSubmit(handleOnSubmit)}
                >
                  <section className="flex flex-col justify-center items-center space-y-4">
                    <Label>Último lance: R$00,00</Label>
                    <Label>Autor: ...</Label>
                  </section>
                  <CardFooter className="flex flex-col space-y-6">
                    <div>
                      <FormLabel>Faça seu lance!</FormLabel>
                      <div className="flex gap-4">
                        {/* FIXME: Deve ter formatação monetário */}
                        <Input
                          type="number"
                          placeholder="R$10,00"
                          {...form.register("price")}
                        />
                        <Button
                          type="submit"
                          variant="secondary"
                          className="w-14"
                        >
                          <Send />
                        </Button>
                      </div>
                      {form.formState.errors.price && (
                        <FormLabel className="text-muted-foreground text-red-500">
                          {form.formState.errors.price.message}
                        </FormLabel>
                      )}
                    </div>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
        <AppFooter />
      </div>
    </>
  );
}
