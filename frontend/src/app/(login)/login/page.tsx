import FormLogin from "@/components/FormLogin";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <div
        className="max-w-lg md:max-w-5xl w-full grid lg:grid-cols-[1fr_1fr] shadow-lg rounded-lg
      min-h-[578px] overflow-hidden bg-white m-4"
      >
        <div className="flex flex-col items-center justify-center p-4">
          <div>
            <ShoppingCartIcon className="size-10 w-auto mx-auto text-green-600" />
            <h2 className="mt-10 text-center text-xl/9 sm:text-2xl/9 font-bold tracking-tight text-neutral-900">
              Sign in to your account
            </h2>
          </div>

          <FormLogin />
        </div>
        <div className="hidden lg:flex items-center justify-center relative">
          <Image
            src="/login-image.jpg"
            alt="Login Image"
            width={1920}
            height={1080}
            className="object-cover h-full"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-green-600 to-transparent"></div>
          <div className="absolute bottom-1 right-2 text-white text-sm">
            Photo by{" "}
            <a
              className="underline"
              href="https://unsplash.com/@boxedwater?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            >
              Boxed Water Is Better
            </a>{" "}
            on{" "}
            <a
              className="underline"
              href="https://unsplash.com/photos/a-woman-carrying-a-grocery-basket-of-vegetables-picks-up-a-boxed-water-box-7H1hDt694s8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            >
              Unsplash
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
