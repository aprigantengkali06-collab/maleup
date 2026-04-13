import { Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { UserAchievement } from '@/lib/types';

export function AchievementGrid({ achievements }: { achievements: UserAchievement[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {achievements.map((item, index) => (
        <Card key={`${item.achievement_id}-${index}`} className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{item.achievement?.name}</p>
            <p className="text-xs leading-5 text-zinc-400">{item.achievement?.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
