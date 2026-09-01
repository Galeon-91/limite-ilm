import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Todo lo que ve el público (portada, categorías, artículos, contacto,
// buscador) vive bajo este grupo de rutas y comparte Navbar + Footer.
// El panel /admin no pasa por aquí — tiene su propio layout con sidebar.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-electric-radial" />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
