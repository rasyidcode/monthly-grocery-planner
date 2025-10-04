import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function AddPlanPage() {
  return (
    <div className="flex-1 flex flex-col space-y-4 w-full">
      <h1 className="text-xl font-bold">Tambah Rencana</h1>

      <section className="bg-white shadow p-4 rounded">
        <form className="flex flex-col space-y-2.5">
          <div className="flex items-center gap-2">
            <label htmlFor="name" className="w-16">
              Nama
            </label>
            <input
              type="text"
              name="name"
              className="border-none outline outline-pink-300 rounded flex-1
              px-2 focus:outline-2 focus:outline-pink-600 py-1 w-full bg-pink-50"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="price" className="w-16">
              Harga
            </label>
            <input
              type="number"
              name="price"
              className="border-none outline outline-pink-300 rounded flex-1
              px-2 py-1 focus:outline-2 focus:outline-pink-600 w-full bg-pink-50"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="qty" className="w-16">
              Jumlah
            </label>
            <input
              type="number"
              name="qty"
              placeholder="Jumlah"
              defaultValue={1}
              className="border-none outline outline-pink-300 rounded flex-1
              px-2 py-1 focus:outline-2 focus:outline-pink-600 w-full bg-pink-50"
            />
          </div>
          <button className="bg-pink-600 text-white font-bold py-1.5 rounded-sm">
            Tambah
          </button>
        </form>
      </section>

      <section className="bg-white shadow flex-1 p-4 rounded overflow-hidden flex flex-col space-y-2">
        <h2 className="text-lg font-bold">Keranjang Belanja</h2>
        <ul className="flex-1 overflow-y-scroll divide-y divide-dotted space-y-1 h-full w-full">
          {Array.from({ length: 20 }, (value, index) => index + 1).map(
            (index) => (
              <li key={index} className="flex">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-light">Sunlight</span>
                    <button className="active:bg-pink-100 rounded-full">
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
                    <span className="font-semibold text-sm">
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
        <div className="border-t border-dotted py-1">
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
      <button className="bg-pink-600 text-white font-bold py-1.5 rounded-sm">
        Submit Rencana
      </button>
    </div>
  );
}
