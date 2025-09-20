import MarketsTable from "@/components/MarketsTable";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Polymarket Dashboard</h1>
      <MarketsTable />
    </main>
  );
}
