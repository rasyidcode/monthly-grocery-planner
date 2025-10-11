"use client";

import { Item } from "@/types";
import CartItem from "./CartItem";

export default function ShoppingCart({
  items,
  onItemEdit,
  onItemDelete,
}: {
  items: Item[];
  onItemEdit: (item: Item) => void;
  onItemDelete: (id?: number) => void;
}) {
  const priceTotal = items.reduce((acc, curr) => acc + (curr.price ?? 0), 0);
  const itemsTotal = items.reduce((acc, curr) => acc + (curr.qty ?? 0), 0);

  return (
    <section
      className="bg-white shadow flex-1 p-4 rounded border border-neutral-100 
       overflow-hidden flex flex-col space-y-2"
    >
      <h2 className="font-bold">Keranjang Belanja</h2>
      <ul
        className="flex-1 overflow-y-scroll divide-y divide-dashed divide-neutral-400 
        space-y-1 h-full w-full"
        onScroll={() => {}}
      >
        {items.length === 0 && (
          <li className="font-light text-sm text-neutral-600">
            Tidak ada item
          </li>
        )}
        {items.length > 0 &&
          items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onEdit={onItemEdit}
              onDelete={onItemDelete}
            />
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
  );
}
