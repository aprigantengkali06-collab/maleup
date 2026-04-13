'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { ChartDataPoint } from '@/lib/types';

export function MeasurementChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <Card className="p-4">
      <h3 className="mb-3 text-sm font-medium text-white">Lingkar Pinggang</h3>
      <ChartContainer className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
            <Bar dataKey="value" fill="#22c55e" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
