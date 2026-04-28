"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Sparkles, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      setError("送信に失敗しました。もう一度お試しください。");
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-amber shadow-lg shadow-amber-500/25 mb-4">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Needea</h1>
          <p className="text-sm text-muted-foreground mt-1">
            ログインしてアイディアをシェアしよう
          </p>
        </div>

        <Card className="p-6 grain-overlay">
          {sent ? (
            <div className="text-center py-4">
              <Mail className="h-10 w-10 text-amber-500 mx-auto mb-3" />
              <h2 className="font-bold text-lg mb-2">メールを送信しました</h2>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{email}</span> にログインリンクを送りました。
                メールを確認してリンクをクリックしてください。
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-xs text-muted-foreground hover:underline cursor-pointer"
              >
                別のメールアドレスで試す
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  メールアドレス
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full rounded-full gradient-amber"
              >
                {loading ? "送信中..." : "ログインリンクを送る"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                メールアドレスにログインリンクを送ります。
                パスワード不要です。
              </p>
            </form>
          )}
        </Card>

        <div className="mt-4 text-center">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
