export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen flex justify-center items-center bg-neutral-50">{children}</main>
    </>
  );
}
