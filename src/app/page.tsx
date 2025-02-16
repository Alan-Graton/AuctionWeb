"use client";

import React from "react";
import Image from "next/image";

import AppNavBar from "@/components/AppNavBar";
import AppFooter from "@/components/AppFooter";

import { Item } from "@/@types";

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
import { HTTP } from "@/api/http";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WEBSOCKET } from "@/api/websocket";

export default function Home() {
  WEBSOCKET.on("connect", () => {
    WEBSOCKET.emit("ping");
    console.log("Is socket connected? ", WEBSOCKET.connected);
  });

  WEBSOCKET.on("bids_events", () => {
    console.log("Someting was triggered");
  });

  WEBSOCKET.on("disconnect", () => {
    console.log("Is socket disconnected? ", WEBSOCKET.connected);
  });

  const form = useForm<BidSchema>({
    resolver: zodResolver(bidSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const [items, setItems] = React.useState<Item[]>([]);

  async function getItems() {
    try {
      const response = (await HTTP.get("/items")).data;

      setItems(response);
    } catch (error) {}
  }

  async function handleOnSubmit(data: BidSchema) {
    try {
      const response = (await HTTP.post("/bids", data)).data;

      // WEBSOCKET.on("bids_events", () => {
      //   console.log("Someting was triggered");
      // });
      // WEBSOCKET.emit("ping");

      // console.log("POST - Bids: ", response);
    } catch (error) {
      console.error("[Auction] handleOnSubmit FAILED: ", error);
    }
  }

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <AppNavBar />
      <Toaster position="top-right" />

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {items.map((item) => (
            <Card key={item.id}>
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
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <Form {...form}>
                  <form
                    className="space-y-8"
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                  >
                    <section className="flex flex-col justify-center items-center space-y-4">
                      <Table>
                        <TableCaption>Lances</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Autor</TableHead>
                            <TableHead>Lance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {item?.bids?.map((bid) => (
                            <TableRow key={bid.id}>
                              <TableCell>{bid.author}</TableCell>
                              <TableCell>{bid.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
          ))}
        </main>
        <AppFooter />
      </div>
    </>
  );
}
