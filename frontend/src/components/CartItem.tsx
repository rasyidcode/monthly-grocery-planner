"use client";

import { Item } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { ItemEditingContext } from "./ItemEditingContext";

export default function CartItem({
  item,
  onEdit,
  onDelete,
}: {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id?: number) => void;
}) {
  const itemEditing = useContext(ItemEditingContext);

  return (
    <>
      <li className={`${itemEditing === item.id && "bg-green-100"}`}>
        <div className="flex items-center justify-between">
          <span className="font-light">{item.name}</span>
          <div className="flex items-center gap-1">
            <button
              className="flex items-center justify-center gap-1 p-1
            active:bg-orange-100 rounded-full"
              onClick={() => onEdit(item)}
            >
              <PencilIcon className="size-4 text-orange-500" />
            </button>
            <button
              className="flex items-center justify-center gap-1 p-1
            active:bg-red-100 rounded-full"
              onClick={() => onDelete(item.id)}
            >
              <TrashIcon className="size-4 text-red-500" />
            </button>
          </div>
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
      </li>
    </>
  );
}
