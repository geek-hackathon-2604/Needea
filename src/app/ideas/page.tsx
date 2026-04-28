"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useMemo } from "react";
import { mockIdeas, MockIdea, mockPrototypes } from "@/lib/mock-data";
import { SORT_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
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
  Globe,
  X,
  Tag,
} from "lucide-react";

const FREE_VIEW_LIMIT = 20;

type Idea = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  status: "open" | "in_progress" | "resolved";
  visibility: "public" | "private";
  createdAt?: string;
  created_at?: string;
  needLevel?: number;
  need_level?: number;
  author?: { name: string; avatar: string };
  profiles?: { name: string; avatar_url: string | null };
  chatHistory?: { question: string; answer: string }[];
  chat_history?: { question: string; answer: string }[];
};

export default function IdeasFeedPage() {
  const router = useRouter();
  const supabase = createClient();
  const [sort, setSort] = useState<keyof typeof SORT_LABELS>("likes");
  const [searchQuery, setSearchQuery] = useState("");
  const [showGate, setShowGate] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [localLikes, setLocalLikes] = useState<Record<string, number>>({});
  const [dbIdeas, setDbIdeas] = useState<Idea[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    supabase
      .from("ideas")
      .select("*, profiles(name, avatar_url)")
      .eq("visibility", "public")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data?.length) setDbIdeas(data as Idea[]); });

    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null);
      if (user) {
        supabase.from("likes").select("idea_id").eq("user_id", user.id)
          .then(({ data }) => {
            if (data) setLikedIds(new Set(data.map((l) => l.idea_id)));
          });
      }
    });
  }, []);

  const allIdeas: Idea[] = dbIdeas.length > 0 ? dbIdeas : (mockIdeas as unknown as Idea[]);

  const allTags = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const idea of allIdeas) {
      if (idea.visibility !== "public") continue;
      for (const tag of idea.tags) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [allIdeas]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const sorted = [...allIdeas]
    .filter((idea) => idea.visibility === "public")
    .filter((idea) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        idea.title.toLowerCase().includes(q) ||
        idea.content.toLowerCase().includes(q)
      );
    })
    .filter((idea) => {
      if (selectedTags.size === 0) return true;
      return [...selectedTags].every((t) => idea.tags.includes(t));
    })
    .sort((a, b) => {
      if (sort === "likes") return b.likes - a.likes;
      if (sort === "newest")
        return (
          new Date(b.createdAt ?? b.created_at ?? 0).getTime() - new Date(a.createdAt ?? a.created_at ?? 0).getTime()
        );
      if (sort === "unresolved") {
        if (a.status === "open" && b.status !== "open") return -1;
        if (a.status !== "open" && b.status === "open") return 1;
        return 0;
      }
      return 0;
    });

  const visibleIdeas = sorted.slice(0, FREE_VIEW_LIMIT);
  const hasMore = sorted.length > FREE_VIEW_LIMIT;

  const getLikes = (idea: Idea) => localLikes[idea.id] ?? idea.likes;
  const getPrototypeCount = (ideaId: string) =>
    mockPrototypes.filter((p) => p.ideaId === ideaId).length;

  const handleToggleLike = async (e: React.MouseEvent, idea: Idea) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUserId) { toast.error("ログインが必要です"); return; }
    const liked = likedIds.has(idea.id);
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (liked) next.delete(idea.id);
      else next.add(idea.id);
      return next;
    });
    setLocalLikes((l) => ({ ...l, [idea.id]: getLikes(idea) + (liked ? -1 : 1) }));
    if (liked) {
      await supabase.from("likes").delete().eq("idea_id", idea.id).eq("user_id", currentUserId);
      await supabase.from("ideas").update({ likes: Math.max(0, (idea.likes ?? 0) - 1) }).eq("id", idea.id);
    } else {
      await supabase.from("likes").insert({ idea_id: idea.id, user_id: currentUserId });
      await supabase.from("ideas").update({ likes: (idea.likes ?? 0) + 1 }).eq("id", idea.id);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
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
            みんなの『こうなったらいいな』がここにある
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="キーワードで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <Select
            value={sort}
            onValueChange={(v) =>
              setSort((v as keyof typeof SORT_LABELS) || "likes")
            }
          >
            <SelectTrigger className="w-full sm:w-44 rounded-xl">
              <SelectValue>{SORT_LABELS[sort] || "並び替え"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="likes">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5" /> 共感順
                </span>
              </SelectItem>
              <SelectItem value="newest">
                <span className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" /> 新着順
                </span>
              </SelectItem>
              <SelectItem value="unresolved">
                <span className="flex items-center gap-2">
                  <AlertCircle className="h-3.5 w-3.5" /> 未解決
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tag filter — Pixiv style */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">タグで絞り込む（複数選択可）</span>
            {selectedTags.size > 0 && (
              <button
                onClick={() => setSelectedTags(new Set())}
                className="cursor-pointer text-xs text-amber-600 dark:text-amber-400 hover:underline ml-auto"
              >
                クリア
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allTags.map(({ tag, count }) => {
              const active = selectedTags.has(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`cursor-pointer inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all border ${
                    active
                      ? "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-300 dark:shadow-amber-900"
                      : "bg-transparent text-muted-foreground border-border hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400"
                  }`}
                >
                  {active && <X className="h-2.5 w-2.5" />}
                  {tag}
                  <span className={`${active ? "text-amber-100" : "text-muted-foreground/60"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <span>{sorted.length}件のアイディア</span>
          {visibleIdeas.length < sorted.length && <span>うち {visibleIdeas.length}件表示中</span>}
          {selectedTags.size > 0 && (
            <span className="text-amber-600 dark:text-amber-400">
              タグ: {[...selectedTags].join(" + ")}
            </span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleIdeas.map((idea) => {
            const protoCount = getPrototypeCount(idea.id);
            const liked = likedIds.has(idea.id);
            const authorName = idea.profiles?.name ?? idea.author?.name ?? "Unknown";
            const authorInitial = authorName.charAt(0).toUpperCase();
            return (
              <Link key={idea.id} href={`/ideas/${idea.id}`}>
                <Card className="overflow-hidden card-hover grain-overlay cursor-pointer h-full flex flex-col">
                  <div className="p-5 flex-1">
                    <h3 className="font-bold leading-snug line-clamp-2 mb-3">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {idea.content}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {idea.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleTag(tag); }}
                          className={`text-xs rounded-full cursor-pointer transition-colors ${
                            selectedTags.has(tag)
                              ? "bg-amber-500 text-white border-amber-500"
                              : "bg-transparent hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400"
                          }`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3 border-t bg-muted/30">
                    <span
                      className="flex items-center gap-2 hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        router.push(`/users/${authorName}`);
                      }}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-amber-100 text-amber-700">
                          {authorInitial}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {authorName}
                      </span>
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <button
                        onClick={(e) => handleToggleLike(e, idea)}
                        className="cursor-pointer flex items-center gap-1 hover:text-rose-500 transition-colors"
                      >
                        <Heart
                          className={`h-3.5 w-3.5 text-rose-500 ${liked ? "fill-rose-500 " : ""}`}
                        />
                        {getLikes(idea)}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/ideas/${idea.id}#comments`);
                        }}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        {idea.comments}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/ideas/${idea.id}#prototypes`);
                        }}
                        className="flex items-center gap-1 hover:text-accent transition-colors"
                      >
                        <Globe className="h-3.5 w-3.5 text-accent" />
                        {protoCount}
                      </button>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {visibleIdeas.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              条件に一致するアイディアが見つかりませんでした
            </p>
          </div>
        )}

        {hasMore && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              さらにアイディアを見るには、1週間に1回アイディアを投稿してください
            </p>
            <Button
              variant="outline"
              className="rounded-full gap-2"
              onClick={() => setShowGate(true)}
            >
              <Lock className="h-4 w-4" />
              もっと見る（あと {sorted.length - FREE_VIEW_LIMIT} 件）
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showGate} onOpenChange={setShowGate}>
        <DialogContent className="sm:max-w-md text-center p-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30">
              <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-black">
              Give & Take の精神で
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed pt-2">
              アイディアをもっと見るには、1週間に1回、あなたのアイディアの種を1つ投稿してください。
              <br />
              <br />
              みんなの「こうなったらいいな」が集まる場所を、一緒に育てていきましょう。
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
            <Button
              variant="ghost"
              onClick={() => setShowGate(false)}
              className="text-muted-foreground text-sm"
            >
              今はスキップ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
