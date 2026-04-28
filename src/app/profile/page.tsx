"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MockIdea } from "@/lib/mock-data";
import { SORT_LABELS } from "@/lib/constants";
import { IdeaCard } from "@/components/shared/idea-card";
import { createClient } from "@/lib/supabase/client";
import {
  Lightbulb,
  PlusCircle,
  Heart,
  MessageCircle,
  Globe,
  Search,
  ChevronRight,
  Eye,
  EyeOff,
  GitFork,
  ExternalLink,
} from "lucide-react";

type DbIdea = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  status: "open" | "in_progress" | "resolved";
  visibility: "public" | "private";
  need_level: number;
  chat_history: { question: string; answer: string }[] | null;
  created_at: string;
  user_id: string;
};

type DbComment = {
  id: string;
  idea_id: string;
  content: string;
  created_at: string;
  ideas: { id: string; title: string; profiles: { name: string } | null } | null;
};

type LikedIdea = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  status: "open" | "in_progress" | "resolved";
  visibility: "public" | "private";
  need_level: number;
  chat_history: { question: string; answer: string }[] | null;
  created_at: string;
  profiles: { name: string; avatar_url: string | null } | null;
};

function toMockIdea(idea: DbIdea, authorName: string, authorAvatar: string): MockIdea {
  return {
    id: idea.id,
    title: idea.title,
    content: idea.content,
    chatHistory: idea.chat_history ?? [],
    tags: idea.tags ?? [],
    likes: idea.likes ?? 0,
    comments: idea.comments ?? 0,
    author: { name: authorName, avatar: authorAvatar },
    createdAt: idea.created_at,
    status: idea.status,
    visibility: idea.visibility,
    needLevel: idea.need_level ?? 3,
  };
}

function likedToMockIdea(idea: LikedIdea): MockIdea {
  const authorName = idea.profiles?.name ?? "Unknown";
  return {
    id: idea.id,
    title: idea.title,
    content: idea.content,
    chatHistory: idea.chat_history ?? [],
    tags: idea.tags ?? [],
    likes: idea.likes ?? 0,
    comments: idea.comments ?? 0,
    author: { name: authorName, avatar: authorName.charAt(0).toUpperCase() },
    createdAt: idea.created_at,
    status: idea.status,
    visibility: idea.visibility,
    needLevel: idea.need_level ?? 3,
  };
}

export default function ProfilePage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<{ name: string; avatar_url: string | null } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [ideas, setIdeas] = useState<DbIdea[]>([]);
  const [likedIdeas, setLikedIdeas] = useState<LikedIdea[]>([]);
  const [myComments, setMyComments] = useState<DbComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPrivate, setShowPrivate] = useState(false);
  const [sort, setSort] = useState("likes");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsAuthenticated(false); setLoading(false); return; }
      setIsAuthenticated(true);

      const [profileRes, ideasRes, commentsRes, likedRes] = await Promise.all([
        supabase.from("profiles").select("name, avatar_url").eq("id", user.id).single(),
        supabase.from("ideas").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("comments")
          .select("*, ideas(id, title, profiles(name))")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase.from("likes")
          .select("ideas(id, title, content, tags, likes, comments, status, visibility, need_level, chat_history, created_at, profiles(name, avatar_url))")
          .eq("user_id", user.id),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (ideasRes.data) setIdeas(ideasRes.data as DbIdea[]);
      if (commentsRes.data) setMyComments(commentsRes.data as DbComment[]);
      if (likedRes.data) {
        const liked = likedRes.data
          .map((l: any) => l.ideas)
          .filter(Boolean) as LikedIdea[];
        setLikedIdeas(liked);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const name = profile?.name ?? "ユーザー";
  const avatar = (profile?.name ?? "U").charAt(0).toUpperCase();
  const totalIdeas = ideas.length;
  const totalLikes = ideas.reduce((sum, i) => sum + (i.likes ?? 0), 0);
  const totalComments = ideas.reduce((sum, i) => sum + (i.comments ?? 0), 0);

  const mockIdeasForCard = useMemo(
    () => ideas.map((i) => toMockIdea(i, name, avatar)),
    [ideas, name, avatar],
  );

  const likedIdeasForCard = useMemo(
    () => likedIdeas.map(likedToMockIdea),
    [likedIdeas],
  );

  const topTags = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const idea of ideas) {
      for (const tag of idea.tags ?? []) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag, count]) => ({ tag, count }));
  }, [ideas]);

  const filteredIdeas = useMemo(() => {
    let filtered = showPrivate
      ? [...mockIdeasForCard]
      : mockIdeasForCard.filter((i) => i.visibility === "public");
    if (tagFilter) {
      filtered = filtered.filter((i) =>
        i.tags.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase())),
      );
    }
    return filtered.sort((a, b) => {
      if (sort === "likes") return b.likes - a.likes;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [mockIdeasForCard, showPrivate, tagFilter, sort]);

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">ログインが必要です</p>
          <Link href="/post">
            <Button className="rounded-full gradient-amber">ログインする</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-full px-4 sm:px-6">
      <div className="mx-auto max-w-4xl my-8">
        {/* Profile Header */}
        <Card className="p-6 sm:p-8 mb-8 grain-overlay overflow-hidden relative ">
          <div className="absolute top-0 left-0 right-0 h-full gradient-amber opacity-20 dark:opacity-10" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
              <AvatarFallback className="text-2xl font-black bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                {avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-black tracking-tight">{name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                アイディアハブメンバー
              </p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" />{" "}
                  {totalIdeas} ideas
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-rose-500" /> {totalLikes}{" "}
                  likes
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" /> {totalComments}{" "}
                  comments
                </span>
              </div>
            </div>
            <Link href="/post">
              <Button className="rounded-full gap-2 gradient-amber shadow-lg shadow-amber-500/25">
                <PlusCircle className="h-4 w-4" /> 新規投稿
              </Button>
            </Link>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="ideas" className="space-y-6">
          <TabsList className="w-full justify-start rounded-full p-1 bg-muted h-auto gap-0 flex-wrap">
            <TabsTrigger
              value="ideas"
              className="rounded-full data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-200 px-4 py-2 text-sm"
            >
              <Lightbulb className="h-4 w-4 mr-1.5" />
              My Ideas
            </TabsTrigger>
            <TabsTrigger
              value="liked"
              className="rounded-full data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-200 px-4 py-2 text-sm"
            >
              <Heart className="h-4 w-4 mr-1.5" />
              Liked
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="rounded-full data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-200 px-4 py-2 text-sm"
            >
              <MessageCircle className="h-4 w-4 mr-1.5" />
              Comments
            </TabsTrigger>
          </TabsList>

          {/* My Ideas */}
          <TabsContent value="ideas" className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {filteredIdeas.length}件のアイディア
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="タグで絞り込む..."
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    className="h-8 pl-8 rounded-xl text-xs w-40"
                  />
                </div>
                <Select
                  value={sort}
                  onValueChange={(v) => setSort(v || "likes")}
                >
                  <SelectTrigger className="h-8 w-28 rounded-xl text-xs">
                    <SelectValue>
                      {SORT_LABELS[sort as keyof typeof SORT_LABELS] ||
                        "並び替え"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="likes">共感順</SelectItem>
                    <SelectItem value="newest">新着順</SelectItem>
                  </SelectContent>
                </Select>
                <Toggle
                  pressed={showPrivate}
                  onPressedChange={setShowPrivate}
                  size="sm"
                  className="rounded-full gap-1 h-8 data-[state=on]:bg-muted"
                  aria-label="非公開のアイディアも表示"
                >
                  {showPrivate ? (
                    <Eye className="h-3 w-3" />
                  ) : (
                    <EyeOff className="h-3 w-3" />
                  )}
                  <span className="text-[11px]">
                    {showPrivate ? "すべて" : "公開のみ"}
                  </span>
                </Toggle>
              </div>
            </div>
            {topTags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mt-10">
                <span className="text-xs text-muted-foreground shrink-0">
                  よく使うタグ
                </span>
                {topTags.map(({ tag }) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={`text-xs rounded-full cursor-pointer transition-colors ${
                      tag === tagFilter
                        ? "bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100"
                        : "hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-900/30 dark:hover:text-amber-300"
                    }`}
                    onClick={() => setTagFilter(tag === tagFilter ? "" : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <div className="gap-3 flex flex-col">
              {filteredIdeas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
            {filteredIdeas.length === 0 && (
              <Card className="p-12 text-center grain-overlay">
                <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">まだアイディアがありません</p>
              </Card>
            )}
          </TabsContent>

          {/* Liked Ideas */}
          <TabsContent value="liked" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {likedIdeasForCard.length}件のいいね
              </span>
            </div>
            <div className="gap-3 flex flex-col">
              {likedIdeasForCard.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} showAuthor />
              ))}
            </div>
            {likedIdeasForCard.length === 0 && (
              <Card className="p-12 text-center grain-overlay">
                <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">まだいいねしたアイディアがありません</p>
              </Card>
            )}
          </TabsContent>

          {/* My Comments */}
          <TabsContent value="comments" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {myComments.length}件のコメント
              </span>
            </div>
            <div className="gap-3 flex flex-col">
              {myComments.map((comment) => (
                <Link key={comment.id} href={`/ideas/${comment.idea_id}`}>
                  <Card className="p-4 card-hover cursor-pointer grain-overlay">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">
                          「{comment.ideas?.title ?? "アイディア"}」
                          {comment.ideas?.profiles?.name && (
                            <span className="text-muted-foreground/60">
                              {" "}by {comment.ideas.profiles.name}
                            </span>
                          )}{" "}
                          にコメント
                        </p>
                        <p className="text-sm leading-relaxed line-clamp-2">
                          &ldquo;{comment.content}&rdquo;
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            {myComments.length === 0 && (
              <Card className="p-12 text-center grain-overlay">
                <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">まだコメントがありません</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
