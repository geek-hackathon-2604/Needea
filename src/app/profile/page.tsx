"use client";

import { useState, useMemo } from "react";
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
import { mockUserProfile, mockIdeas, MockIdea } from "@/lib/mock-data";
import { IdeaCard } from "@/components/shared/idea-card";
import {
  Lightbulb,
  Heart,
  MessageCircle,
  Bell,
  Globe,
  Search,
  ChevronRight,
  Eye,
  EyeOff,
  Clock,
} from "lucide-react";

const mockLikedIdeaIds = ["3", "5", "6", "10", "12"];

const sortLabels: Record<string, string> = {
  likes: "共感順",
  newest: "新着順",
};

export default function ProfilePage() {
  const { name, avatar, totalIdeas, totalLikes, totalComments, totalContributions, ideas, notifications, myComments } =
    mockUserProfile;
  const [showPrivate, setShowPrivate] = useState(false);
  const [sort, setSort] = useState("likes");
  const [tagFilter, setTagFilter] = useState("");

  const likedIdeas = mockIdeas.filter((i) => mockLikedIdeaIds.includes(i.id) && i.visibility === "public");

  const totalPrototypes = useMemo(() => {
    let count = 0;
    ideas.forEach((idea) => {
      count += (idea as any)._protoCount || 0;
    });
    return count;
  }, [ideas]);

  const filteredIdeas = useMemo(() => {
    let filtered = showPrivate ? [...ideas] : ideas.filter((i) => i.visibility === "public");
    if (tagFilter) {
      filtered = filtered.filter((i) => i.tags.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase())));
    }
    return filtered.sort((a, b) => {
      if (sort === "likes") return b.likes - a.likes;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [ideas, showPrivate, tagFilter, sort]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Profile Header */}
        <Card className="p-6 sm:p-8 mb-8 grain-overlay overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-32 gradient-amber rounded-t-xl opacity-20 dark:opacity-10" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
              <AvatarFallback className="text-2xl font-black bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                {avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-black tracking-tight">{name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">アイディアハブメンバー</p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> {totalIdeas} ideas
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-rose-500" /> {totalLikes} likes
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" /> {totalComments} comments
                </span>
              </div>
            </div>
            <Link href="/post">
              <Button className="rounded-full gap-2 gradient-amber shadow-lg shadow-amber-500/25">
                <Lightbulb className="h-4 w-4" /> 新規投稿
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
            <TabsTrigger
              value="feedback"
              className="rounded-full data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-200 px-4 py-2 text-sm"
            >
              <Bell className="h-4 w-4 mr-1.5" />
              My Feedback
            </TabsTrigger>
          </TabsList>

          {/* My Ideas */}
          <TabsContent value="ideas" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <span className="text-sm text-muted-foreground">{filteredIdeas.length}件のアイディア</span>
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
                <Select value={sort} onValueChange={(v) => setSort(v || "likes")}>
                  <SelectTrigger className="h-8 w-28 rounded-xl text-xs">
                    <SelectValue>{sortLabels[sort] || "並び替え"}</SelectValue>
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
                  {showPrivate ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  <span className="text-[11px]">{showPrivate ? "すべて" : "公開のみ"}</span>
                </Toggle>
              </div>
            </div>
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} showVisibility />
            ))}
          </TabsContent>

          {/* Liked Ideas */}
          <TabsContent value="liked" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{likedIdeas.length}件のいいね</span>
            </div>
            {likedIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} showVisibility={false} showAuthor />
            ))}
          </TabsContent>

          {/* My Comments */}
          <TabsContent value="comments" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{myComments.length}件のコメント</span>
            </div>
            {myComments.map((comment, i) => (
              <Link key={i} href={`/ideas/${comment.ideaId}`}>
                <Card className="p-4 card-hover cursor-pointer grain-overlay">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        「{comment.ideaTitle}」<span className="text-muted-foreground/60"> by {comment.ideaAuthor}</span> にコメント
                      </p>
                      <p className="text-sm leading-relaxed line-clamp-2">&ldquo;{comment.content}&rdquo;</p>
                      <span className="text-xs text-muted-foreground mt-1.5 block">{comment.time}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </TabsContent>

          {/* My Feedback */}
          <TabsContent value="feedback" className="space-y-4">
            {notifications.map((notif, i) => (
              <Card key={i} className="p-4 grain-overlay">
                <div className="flex items-start gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    notif.type === "like"
                      ? "bg-rose-100 text-rose-500 dark:bg-rose-900/30 dark:text-rose-400"
                      : notif.type === "comment"
                      ? "bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400"
                  }`}>
                    {notif.type === "like" && <Heart className="h-4 w-4" />}
                    {notif.type === "comment" && <MessageCircle className="h-4 w-4" />}
                    {notif.type === "prototype" && <Globe className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed">
                      {notif.type === "like" && <><span className="font-bold">{notif.count}件のいいね</span> がつきました</>}
                      {notif.type === "comment" && <><span className="font-bold">{notif.count}件のコメント</span> がつきました</>}
                      {notif.type === "prototype" && <>あなたのアイディアに <span className="font-bold">プロトタイプ</span> が投稿されました</>}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">「{notif.ideaTitle}」</p>
                    <span className="text-xs text-muted-foreground mt-1 block">{notif.time}</span>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
