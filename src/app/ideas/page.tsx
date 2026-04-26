"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockIdeas, MockIdea } from "@/lib/mock-data";
import {
  Heart,
  MessageCircle,
  Search,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Clock,
  AlertCircle,
  ArrowRight,
  Lock,
} from "lucide-react";

export default function IdeasFeedPage() {
  const [sort, setSort] = useState("likes");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showGate, setShowGate] = useState(true);

  const filtered = mockIdeas
    .filter((idea) => idea.visibility === "public")
    .filter((idea) => {
      if (filterStatus === "open") return idea.status === "open";
      if (filterStatus === "in_progress") return idea.status === "in_progress";
      if (filterStatus === "resolved") return idea.status === "resolved";
      return true;
    })
    .filter((idea) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        idea.title.toLowerCase().includes(q) ||
        idea.content.toLowerCase().includes(q) ||
        idea.tags.some((t) => t.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sort === "likes") return b.likes - a.likes;
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === "unresolved") {
        if (a.status === "open" && b.status !== "open") return -1;
        if (a.status !== "open" && b.status === "open") return 1;
        return 0;
      }
      return 0;
    });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
              Explore
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            アイディアを探す
          </h1>
          <p className="mt-2 text-muted-foreground">
            日常の不満から生まれたアイディアの種を見つけよう
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="キーワードやタグで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v || "likes")}>
            <SelectTrigger className="w-full sm:w-44 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="likes">
                <span className="flex items-center gap-2"><TrendingUp className="h-3.5 w-3.5" /> 共感順</span>
              </SelectItem>
              <SelectItem value="newest">
                <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> 新着順</span>
              </SelectItem>
              <SelectItem value="unresolved">
                <span className="flex items-center gap-2"><AlertCircle className="h-3.5 w-3.5" /> 未解決</span>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v || "all")}>
            <SelectTrigger className="w-full sm:w-40 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="open">募集中</SelectItem>
              <SelectItem value="in_progress">制作中</SelectItem>
              <SelectItem value="resolved">実現済</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <span>{filtered.length}件のアイディア</span>
        </div>

        {/* Idea Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((idea) => (
            <Link key={idea.id} href={`/ideas/${idea.id}`}>
              <Card className="overflow-hidden card-hover grain-overlay cursor-pointer h-full flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold leading-snug line-clamp-2">{idea.title}</h3>
                    <StatusBadge status={idea.status} />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {idea.content}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {idea.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs rounded-full bg-transparent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-t bg-muted/30">
                  <Link href={`/users/${idea.author.name}`} className="flex items-center gap-2 hover:underline" onClick={(e) => e.stopPropagation()}>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px] bg-amber-100 text-amber-700">
                        {idea.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{idea.author.name}</span>
                  </Link>
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
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">条件に一致するアイディアが見つかりませんでした</p>
          </div>
        )}
      </div>

      {/* Post Gate Dialog */}
      <Dialog open={showGate} onOpenChange={setShowGate}>
        <DialogContent className="sm:max-w-md text-center p-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30">
              <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Give & Take の精神で</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed pt-2">
              アイディアを見る前に、まずはあなたの不満やアイディアを1つシェアしてください。
              <br />
              <br />
              あなたの小さな「困った」が、誰かの大きなアイディアの種になります。
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Link href="/post" onClick={() => setShowGate(false)}>
              <Button className="w-full rounded-full gap-2 gradient-amber shadow-lg shadow-amber-500/25">
                <Lightbulb className="h-4 w-4" />
                アイディアを投稿する
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => setShowGate(false)} className="text-muted-foreground text-sm">
              スキップする（一部のみ表示）
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatusBadge({ status }: { status: MockIdea["status"] }) {
  if (status === "open") return null;
  if (status === "in_progress") {
    return (
      <Badge variant="secondary" className="shrink-0 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs">
        制作中
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="shrink-0 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 text-xs">
      実現済
    </Badge>
  );
}
