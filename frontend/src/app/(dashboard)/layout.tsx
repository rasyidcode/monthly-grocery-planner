import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-md mx-auto p-4 flex-1 w-full h-full flex max-h-[800px]">
        {children}
      </main>
    </div>
  );
}
