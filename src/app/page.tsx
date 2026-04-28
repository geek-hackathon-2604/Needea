"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockIdeas, MockIdea } from "@/lib/mock-data";
import {
  ArrowRight,
  Lightbulb,
  Heart,
  MessageCircle,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  const [showAllTrending, setShowAllTrending] = useState(false);
  const visibleIdeas = showAllTrending ? mockIdeas : mockIdeas.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-500/10" />
          <div className="absolute top-40 right-10 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-500/10" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-500/10" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              アイディア、集まる。
              <br />
              <span className="gradient-text">未来、</span>始まる。
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              日常で感じるみんなの『こうなったらいいな』が集まる場所。
              相互にひらめきを育んで、漠然とした想いを、確かな形にするプラットフォーム。
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Link href="/post">
                <Button
                  size="lg"
                  className="rounded-full gap-2 text-base px-8 h-14 gradient-amber hover:opacity-90 shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
                >
                  <Lightbulb className="h-5 w-5" />
                  不満・アイディアを投稿する
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/ideas">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full text-base px-8 h-14"
                >
                  みんなのアイディアを見る
                </Button>
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              {[
                { value: "1,234", label: "投稿アイディア" },
                { value: "8,567", label: "共感リアクション" },
                { value: "42", label: "生まれたプロトタイプ" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Ideas */}
      <section className="py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                  Trending Ideas
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                いま話題のアイディア
              </h2>
              <p className="mt-2 text-muted-foreground">
                共感を集めている最新の不満・アイディアをチェック
              </p>
            </div>
            <Link
              href="/ideas"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline"
            >
              すべて見る <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleIdeas.map((idea, i) => (
              <IdeaCard key={idea.id} idea={idea} masked={false} index={i} />
            ))}
          </div>

          {!showAllTrending && (
            <div className="mt-10 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                さらに多くのアイディアを見るには、まずあなたのアイディアを共有してください
              </p>
              <Link href="/post">
                <Button variant="outline" className="rounded-full gap-2">
                  <Lightbulb className="h-4 w-4" />
                  アイディアを投稿してアンロック
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            あなたの<span className="gradient-text">アイディアの種</span>を
            <br />
            シェアしよう
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            AIがあなたのアイディアの言語化をサポートします。まずは気軽に話しかけてみてください。
          </p>
          <div className="mt-8">
            <Link href="/post">
              <Button
                size="lg"
                className="rounded-full gap-2 text-base px-10 h-14 gradient-amber hover:opacity-90 shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
                無料で始める
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function IdeaCard({
  idea,
  index,
}: {
  idea: MockIdea;
  masked: boolean;
  index: number;
}) {
  return (
    <Card
      className={`overflow-hidden card-hover grain-overlay animate-in fade-in slide-in-from-bottom-4 duration-500 hover:cursor-pointer`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-5 flex-1">
        <h3 className="font-bold text-lg leading-snug line-clamp-2 mb-3 ">
          {idea.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {idea.content}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {idea.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs rounded-full bg-transparent"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t bg-muted/30">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-[10px] bg-amber-100 text-amber-700">
              {idea.author.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            {idea.author.name}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-rose-500" /> {idea.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" /> {idea.comments}
          </span>
        </div>
      </div>
    </Card>
  );
}
