'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { ChartDataPoint } from '@/lib/types';

export function WeightMiniChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">Trend Berat</p>
          <p className="text-xs text-zinc-400">6 checkpoint terakhir</p>
        </div>
      </div>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
            <Area type="monotone" dataKey="value" stroke="#60a5fa" fill="url(#weightFill)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
