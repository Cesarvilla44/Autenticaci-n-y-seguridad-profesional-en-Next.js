import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Navbar from "../../components/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  if (!authToken) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
