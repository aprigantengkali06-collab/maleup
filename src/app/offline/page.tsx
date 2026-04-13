import Link from 'next/link';
import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-300">
          <WifiOff className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">Anda sedang offline</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">MaleUp tetap bisa menampilkan halaman yang sudah pernah Anda buka. Coba sambungkan kembali untuk sinkronisasi data.</p>
        </div>
        <Link href="/dashboard">
          <Button className="w-full">Kembali ke Dashboard</Button>
        </Link>
      </Card>
    </main>
  );
}
