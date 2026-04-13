// src/app/(auth)/layout.tsx
import { Dumbbell } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-10 mx-auto max-w-sm">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600">
          <Dumbbell className="h-5 w-5 text-white" />
        </div>
        <span className="text-2xl font-bold text-blue-500">MaleUp</span>
      </div>
      <div className="w-full">{children}</div>
    </main>
  );
}
