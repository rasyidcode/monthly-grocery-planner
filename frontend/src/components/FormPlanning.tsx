"use client";

import { createItem } from "@/app/action";
import { Item } from "@/types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { FormEvent, useRef, useState } from "react";

export default function FormPlanning({
  initialItems,
  planId,
}: {
  initialItems?: Item[];
  planId?: number;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const priceNum = useRef(0);
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState<Item[]>(initialItems ?? []);

  const priceTotal = items.reduce((acc, curr) => acc + (curr.price ?? 0), 0);
  const itemsTotal = items.reduce((acc, curr) => acc + (curr.qty ?? 0), 0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newPlan = await createItem({
      planId: planId ?? 0,
      name: name,
      price: priceNum.current,
      qty: qty,
    });

    setItems([...items, newPlan ?? {}]);

    // reset form
    setName("");
    setPrice("");
    priceNum.current = 0;
    setQty(1);
  }

  return (
    <div className="flex-1 space-y-4 flex flex-col h-full w-full overflow-hidden">
      <section className="bg-white shadow p-4 rounded border border-neutral-100 relative space-y-2">
        <h1 className="font-bold">Tambah barang</h1>
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label htmlFor="name" className="block text-sm text-neutral-600">
              Barang
            </label>
            <input
              type="text"
              name="name"
              placeholder="Contoh: Sunlight"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-0 border-b border-dashed bg-transparent border-neutral-400
              outline-none placeholder:text-neutral-300 focus:border-neutral-600 focus:ring-0"
            />
          </div>
          <div className="grid grid-cols-[1fr_45px] gap-4">
            <div className="">
              <label htmlFor="price" className="block text-sm text-neutral-600">
                Harga (Rp)
              </label>
              <input
                type="text"
                name="price"
                placeholder="Rp 12.000"
                value={price}
                onChange={(e) => {
                  const number = e.target.value.replace(/[^0-9,]/g, "");
                  const numericValue = Number(number.replace(/,/g, "")) || 0;

                  setPrice(
                    numericValue.toLocaleString("id-ID", {
                      currency: "IDR",
                      style: "currency",
                      minimumFractionDigits: 0,
                    })
                  );
                  priceNum.current = numericValue;
                }}
                className="w-full border-0 border-b border-dashed border-neutral-400 bg-transparent
              outline-none placeholder:text-neutral-300 focus:border-neutral-500 focus:ring-0"
              />
            </div>
            <div>
              <label htmlFor="qty" className="block text-sm text-neutral-600">
                Jumlah
              </label>
              <input
                type="number"
                name="qty"
                placeholder="Jumlah"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value ?? 0))}
                className="w-full border-0 border-b border-dashed border-neutral-400 bg-transparent
                outline-none placeholder:text-neutral-300 focus:border-neutral-500 focus:ring-0"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-sm text-white font-semibold py-1 rounded-sm px-4 shadow-md"
            >
              Tambahkan
            </button>
          </div>
        </form>
      </section>

      <section
        className="bg-white shadow flex-1 p-4 rounded border border-neutral-100 
       overflow-hidden flex flex-col space-y-2"
      >
        <h2 className="font-bold">Keranjang Belanja</h2>
        <ul
          className="flex-1 overflow-y-scroll divide-y divide-dashed divide-neutral-400 
        space-y-1 h-full w-full"
        >
          {items.length === 0 && (
            <li className="font-light text-sm text-neutral-600">
              Tidak ada item
            </li>
          )}
          {items.length > 0 &&
            items.map((item) => (
              <li key={item.id} className="flex">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-light">{item.name}</span>
                    <button className="active:bg-neutral-200 rounded-full">
                      <EllipsisVerticalIcon className="size-4" />
                    </button>
                  </div>
                  <div className="space-x-2 flex items-center justify-between">
                    <span className="text-neutral-500 text-sm">
                      (
                      {(item.price ?? 0)
                        .toLocaleString("id-ID", {
                          currency: "IDR",
                          style: "currency",
                        })
                        .slice(0, -3)}
                      ) x {item.qty ?? 1}
                    </span>
                    <span className="font-semibold text-sm text-neutral-600">
                      {((item.price ?? 0) * (item.qty ?? 1))
                        .toLocaleString("id-ID", {
                          currency: "IDR",
                          style: "currency",
                        })
                        .slice(0, -3)}
                    </span>
                  </div>
                </div>
              </li>
              //   <li key={index} className="flex items-center gap-2 w-full">
              //     <label className="w-full">
              //       <input
              //         type="text"
              //         placeholder="Nama"
              //         className="border-none outline outline-pink-300 bg-pink-50
              //         text-sm px-1 w-full"
              //         value="Sabun cuci"
              //       />
              //     </label>
              //     <label className="w-full">
              //       <input
              //         type="text"
              //         placeholder="Harga"
              //         className="border-none outline outline-pink-300 bg-pink-50 w-full
              //         text-sm px-1"
              //         value="Rp. 30,000"
              //       />
              //     </label>
              //     <label className="w-full">
              //       <input
              //         type="text"
              //         placeholder="Jumlah"
              //         className="border-none outline outline-pink-300 bg-pink-50
              //         text-sm px-1 max-w-max w-full"
              //         value={1}
              //       />
              //     </label>
              //     <strong>Rp.78,000</strong>
              //   </li>
            ))}
        </ul>
        <div className="p-1 bg-neutral-100 rounded border border-neutral-200">
          <div className="flex items-center justify-between">
            <span>Total barang</span>
            <strong>{itemsTotal}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Total harga</span>
            <strong>
              {priceTotal
                .toLocaleString("id-ID", {
                  currency: "IDR",
                  style: "currency",
                })
                .slice(0, -3)}
            </strong>
          </div>
        </div>
      </section>

      <button className="bg-green-600 text-white font-bold py-1.5 rounded-sm">
        Simpan
      </button>
    </div>
  );
}
