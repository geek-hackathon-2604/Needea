"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { mockUserProfile } from "@/lib/mock-data";
import {
  Lightbulb,
  Heart,
  MessageCircle,
  Bell,
  TrendingUp,
  Send,
  Clock,
  ExternalLink,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ProfilePage() {
  const { name, avatar, totalIdeas, totalLikes, totalComments, totalContributions, ideas, notifications, contributions } =
    mockUserProfile;
  const [showPrivate, setShowPrivate] = useState(false);

  const filteredIdeas = showPrivate
    ? ideas
    : ideas.filter((idea) => idea.visibility === "public");

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
              <div className="flex items-center gap-4 mt-3">
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
          <TabsList className="w-full justify-start rounded-full p-1 bg-muted h-auto gap-0">
            <TabsTrigger
              value="ideas"
              className="rounded-full data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-200 px-5 py-2 text-sm"
            >
              <Lightbulb className="h-4 w-4 mr-1.5" />
              My Ideas
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="rounded-full data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-200 px-5 py-2 text-sm"
            >
              <Bell className="h-4 w-4 mr-1.5" />
              My Feedback
            </TabsTrigger>
            <TabsTrigger
              value="contributions"
              className="rounded-full data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-200 px-5 py-2 text-sm"
            >
              <TrendingUp className="h-4 w-4 mr-1.5" />
              Contribution
            </TabsTrigger>
          </TabsList>

          {/* My Ideas */}
          <TabsContent value="ideas" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{filteredIdeas.length}件のアイディア</span>
              <Toggle
                pressed={showPrivate}
                onPressedChange={setShowPrivate}
                size="sm"
                className="rounded-full gap-1.5 data-[state=on]:bg-muted"
                aria-label="非公開のアイディアも表示"
              >
                {showPrivate ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                <span className="text-xs">{showPrivate ? "すべて表示" : "公開のみ"}</span>
              </Toggle>
            </div>
            {filteredIdeas.map((idea) => (
              <Link key={idea.id} href={`/ideas/${idea.id}`}>
                <Card className="p-5 card-hover cursor-pointer grain-overlay">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold leading-snug">{idea.title}</h3>
                        {idea.visibility === "private" && (
                          <Badge variant="outline" className="text-[10px] rounded-full shrink-0">
                            <EyeOff className="h-2.5 w-2.5 mr-0.5" />非公開
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{idea.content}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {idea.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs rounded-full bg-transparent">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-rose-500" /> {idea.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" /> {idea.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(idea.createdAt).toLocaleDateString("ja-JP")}
                    </span>
                    {idea.status === "in_progress" && (
                      <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700">制作中</Badge>
                    )}
                    {idea.status === "resolved" && (
                      <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-700">実現済</Badge>
                    )}
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
                    {notif.type === "prototype" && <ExternalLink className="h-4 w-4" />}
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

          {/* Contribution */}
          <TabsContent value="contributions" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 text-center grain-overlay">
                <Lightbulb className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <p className="text-2xl font-black">{totalIdeas}</p>
                <p className="text-xs text-muted-foreground">投稿アイディア</p>
              </Card>
              <Card className="p-4 text-center grain-overlay">
                <MessageCircle className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-black">{totalContributions}</p>
                <p className="text-xs text-muted-foreground">フィードバック数</p>
              </Card>
              <Card className="p-4 text-center grain-overlay">
                <Heart className="h-6 w-6 text-rose-500 mx-auto mb-2" />
                <p className="text-2xl font-black">{totalLikes}</p>
                <p className="text-xs text-muted-foreground">獲得いいね</p>
              </Card>
            </div>

            <h3 className="font-bold text-lg mb-3">最近のアクティビティ</h3>
            {contributions.map((contrib, i) => (
              <Card key={i} className="p-4 grain-overlay">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Send className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      「{contrib.ideaTitle}」に<span className="font-medium text-amber-600 dark:text-amber-400"> {contrib.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{contrib.time}</p>
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
