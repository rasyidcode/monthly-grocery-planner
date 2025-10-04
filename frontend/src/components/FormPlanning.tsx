"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function FormPlanning() {
  return (
    <form
      onSubmit={() => {}}
      className="flex-1 space-y-4 flex flex-col h-full w-full overflow-hidden"
    >
      <section className="bg-white shadow p-4 rounded border border-neutral-100 relative">
        <div className="space-y-2.5">
          <div>
            <label htmlFor="name" className="block text-sm text-neutral-600">
              Barang
            </label>
            <input
              type="text"
              name="name"
              placeholder="Contoh: Sunlight"
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
                type="number"
                name="price"
                placeholder="12000"
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
                defaultValue={1}
                className="w-full border-0 border-b border-dashed border-neutral-400 bg-transparent
                outline-none placeholder:text-neutral-300 focus:border-neutral-500 focus:ring-0"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-neutral-500 text-sm text-white font-semibold py-1 rounded-sm px-4 shadow-md">
              Tambahkan
            </button>
          </div>
        </div>
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
          {Array.from({ length: 20 }, (value, index) => index + 1).map(
            (index) => (
              <li key={index} className="flex">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-light">Sunlight</span>
                    <button className="active:bg-neutral-200 rounded-full">
                      <EllipsisVerticalIcon className="size-4" />
                    </button>
                  </div>
                  <div className="space-x-2 flex items-center justify-between">
                    <span className="text-neutral-500 text-sm">
                      (
                      {(20000)
                        .toLocaleString("id-ID", {
                          currency: "IDR",
                          style: "currency",
                        })
                        .slice(0, -3)}
                      ) x 4
                    </span>
                    <span className="font-semibold text-sm text-neutral-600">
                      {(80000)
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
            )
          )}
        </ul>
        <div className="p-1 bg-neutral-100 rounded border border-neutral-200">
          <div className="flex items-center justify-between">
            <span>Total barang</span>
            <strong>30</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Total harga</span>
            <strong>Rp, 30.000</strong>
          </div>
        </div>
      </section>

      <button className="bg-neutral-500 text-white font-bold py-1.5 rounded-sm">
        Simpan Rencana
      </button>
    </form>
  );
}
