'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

export function MacroDonut({ protein, carb, fat }: { protein: number; carb: number; fat: number }) {
  const data = [
    { name: 'Protein', value: protein, color: '#60a5fa' },
    { name: 'Carb', value: carb, color: '#22c55e' },
    { name: 'Fat', value: fat, color: '#f59e0b' }
  ];

  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Komposisi Makro</h3>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-36 w-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={42} outerRadius={60} dataKey="value" stroke="none">
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-zinc-300">
              <span className="h-3 w-3 rounded-full" style={{ background: item.color }} />
              {item.name}: {item.value} g
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
