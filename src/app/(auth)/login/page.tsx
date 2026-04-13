// src/app/(auth)/login/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignIn } from '@/lib/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const signIn = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email dan password wajib diisi');
      return;
    }
    try {
      await signIn.mutateAsync({ email, password });
      toast.success('Berhasil masuk!');
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login gagal. Periksa email dan password.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-zinc-50">Masuk</CardTitle>
          <CardDescription className="text-zinc-400">
            Lanjutkan program 24 minggu Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-zinc-700 bg-zinc-800 text-zinc-50 placeholder:text-zinc-500 focus:border-blue-500"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-zinc-300">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-zinc-700 bg-zinc-800 pr-10 text-zinc-50 placeholder:text-zinc-500 focus:border-blue-500"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11"
              disabled={signIn.isPending}
            >
              {signIn.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses...
                </span>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-zinc-500">
            Belum punya akun?{' '}
            <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300">
              Daftar
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
