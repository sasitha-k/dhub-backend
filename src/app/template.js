
import ClientLayout from "./ClientLayout";

export default async function Layout({ children }) {

  return (
    <div className="">
        <main className="">
        <ClientLayout>
            {children}
        </ClientLayout>
        </main>
   </div>
  );
}