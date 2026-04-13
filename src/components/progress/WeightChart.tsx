'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { ChartDataPoint } from '@/lib/types';

export function WeightChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <Card className="p-4">
      <h3 className="mb-3 text-sm font-medium text-white">Berat Badan</h3>
      <ChartContainer className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
            <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} dot={{ fill: '#2563eb', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
