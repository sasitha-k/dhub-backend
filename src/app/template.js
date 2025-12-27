
import ClientLayout from "./ClientLayout";

export default async function Layout({ children }) {

  return (
    <div className="">
        <main className="w-auto h-full">
        <ClientLayout>
            {children}
        </ClientLayout>
        </main>
   </div>
  );
}