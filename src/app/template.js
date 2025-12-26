
import ClientLayout from "./ClientLayout";

export default async function Layout({ children }) {

  return (
    <div className="max-h-screen max-w-screen">
        <main className="">
        <ClientLayout>
            {children}
        </ClientLayout>
        </main>
   </div>
  );
}