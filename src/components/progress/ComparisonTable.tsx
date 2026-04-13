import { Card } from '@/components/ui/card';

export function ComparisonTable({ rows }: { rows: { label: string; start: string; now: string; delta: string }[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <table className="w-full text-sm">
        <thead className="bg-white/5 text-zinc-400">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Metode</th>
            <th className="px-4 py-3 text-left font-medium">Awal</th>
            <th className="px-4 py-3 text-left font-medium">Sekarang</th>
            <th className="px-4 py-3 text-left font-medium">Delta</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-white/5 text-zinc-200">
              <td className="px-4 py-3">{row.label}</td>
              <td className="px-4 py-3">{row.start}</td>
              <td className="px-4 py-3">{row.now}</td>
              <td className="px-4 py-3 text-blue-300">{row.delta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
