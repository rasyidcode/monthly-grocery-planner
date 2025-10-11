"use client";

import { createItem, deleteItem, updateItem } from "@/app/action";
import { Item } from "@/types";
import { FormEvent, useRef, useState } from "react";
import ShoppingCart from "./ShoppingCart";
import { ItemEditingContext } from "./ItemEditingContext";
import { useRouter } from "next/navigation";

export default function FormPlanning({
  initialItems,
  planId,
}: {
  initialItems?: Item[];
  planId?: number;
}) {
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("1");
  const [items, setItems] = useState<Item[]>(initialItems ?? []);
  const [formState, setFormState] = useState<"creating" | "editing">(
    "creating"
  );

  const priceNum = useRef(0);
  const qtyNum = useRef(1);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formState === "creating") {
      const newItem = await createItem({
        planId: planId ?? 0,
        name: name,
        price: priceNum.current,
        qty: qtyNum.current,
      });

      setItems([...items, newItem ?? {}]);
    } else {
      const updatedItem = await updateItem({
        planId: planId ?? 0,
        id: id ?? 0,
        name: name,
        price: priceNum.current,
        qty: qtyNum.current,
      });

      if (updatedItem) {
        setItems(
          items.map((i) => {
            if (i.id === id) {
              return updatedItem;
            } else {
              return i;
            }
          })
        );
      }
    }

    // reset form
    setId(null);
    setName("");
    setPrice("");
    priceNum.current = 0;
    setQty("1");
    qtyNum.current = 1;
    setFormState("creating");
  }

  async function handleItemEdit(item: Item) {
    setFormState("editing");
    setId(item.id ?? null);
    setName(item.name ?? "");

    const itemPrice = item.price ?? 0;
    setPrice(
      itemPrice.toLocaleString("id-ID", {
        currency: "IDR",
        style: "currency",
        minimumFractionDigits: 0,
      })
    );
    priceNum.current = itemPrice;

    const itemQty = item.qty ?? 1;
    setQty(itemQty.toString());
    qtyNum.current = itemQty;
  }

  function handleCancel() {
    setFormState("creating");
    setId(null);
    setName("");
    setPrice("");
    priceNum.current = 0;
    setQty("1");
    qtyNum.current = 1;
  }

  async function handleItemDelete(id?: number) {
    await deleteItem({ planId: planId ?? 0, id: id ?? 0 });

    setItems(
      items.filter((i) => {
        if (i.id !== id) {
          return i;
        }
      })
    );
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
                placeholder="1"
                value={qty}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setQty("");
                  } else {
                    setQty(raw);
                  }
                  qtyNum.current = Number(e.target.value);
                }}
                className="w-full border-0 border-b border-dashed border-neutral-400 bg-transparent
                outline-none placeholder:text-neutral-300 focus:border-neutral-500 focus:ring-0"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <strong>
                {(priceNum.current * qtyNum.current).toLocaleString("id-ID", {
                  currency: "IDR",
                  style: "currency",
                  minimumFractionDigits: 0,
                })}
              </strong>
            </div>
            <div className="flex items-center gap-1">
              {formState === "creating" && (
                <button
                  type="submit"
                  className="bg-green-600 text-sm text-white font-semibold py-1 rounded-sm px-4 shadow-md"
                >
                  Tambahkan
                </button>
              )}
              {formState === "editing" && (
                <>
                  <button
                    type="submit"
                    className="border border-green-600 text-green-600 text-sm font-semibold py-1 rounded-sm
                  px-4 shadow-md"
                    onClick={handleCancel}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-sm text-white font-semibold py-1 rounded-sm px-4 shadow-md"
                  >
                    Ubah
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </section>

      <ItemEditingContext value={id}>
        <ShoppingCart
          items={items}
          onItemEdit={handleItemEdit}
          onItemDelete={handleItemDelete}
        />
      </ItemEditingContext>

      <button
        type="button"
        className="bg-green-600 text-white font-bold py-1.5 rounded-sm"
        onClick={() => {
          router.replace("/");
        }}
      >
        Simpan
      </button>
    </div>
  );
}
