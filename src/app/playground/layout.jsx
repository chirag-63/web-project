import Navbar from "@/components/navbar/navbar";
export default function layout({ children }) {
  return (
    <main className="w-full">
      <Navbar />
      {children}
    </main>
  );
}
