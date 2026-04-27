"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockIdeas, mockPrototypes } from "@/lib/mock-data";
import { IdeaCard } from "@/components/shared/idea-card";
import {
  Lightbulb,
  Heart,
  MessageCircle,
  ArrowLeft,
  Globe,
} from "lucide-react";

export default function UserProfilePage() {
  const params = useParams();
  const name = decodeURIComponent(params.id as string);

  const userIdeas = mockIdeas.filter(
    (idea) => idea.author.name === name && idea.visibility === "public"
  );
  const userPrototypes = mockPrototypes.filter((p) => p.author.name === name);
  const totalLikes = userIdeas.reduce((sum, i) => sum + i.likes, 0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/ideas">
          <Button variant="ghost" size="sm" className="rounded-full gap-1 mb-6 -ml-3 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> 戻る
          </Button>
        </Link>

        {/* Profile Header — same style as MyPage */}
        <Card className="p-6 sm:p-8 mb-8 grain-overlay overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-32 gradient-amber rounded-t-xl opacity-20 dark:opacity-10" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
              <AvatarFallback className="text-2xl font-black bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-black tracking-tight">{name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">アイディアハブメンバー</p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> {userIdeas.length} ideas
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-rose-500" /> {totalLikes} likes
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5 text-accent" /> {userPrototypes.length} apps
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs — same style as MyPage */}
        <Tabs defaultValue="ideas" className="space-y-6">
          <TabsList className="w-full justify-start rounded-full p-1 bg-muted h-auto gap-0 flex-wrap">
            <TabsTrigger
              value="ideas"
              className="rounded-full data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-200 px-4 py-2 text-sm"
            >
              <Lightbulb className="h-4 w-4 mr-1.5" />
              Ideas
            </TabsTrigger>
            <TabsTrigger
              value="apps"
              className="rounded-full data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900 dark:data-[state=active]:bg-amber-900/30 dark:data-[state=active]:text-amber-200 px-4 py-2 text-sm"
            >
              <Globe className="h-4 w-4 mr-1.5" />
              Apps
            </TabsTrigger>
          </TabsList>

          {/* Ideas */}
          <TabsContent value="ideas" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{userIdeas.length}件のアイディア</span>
            </div>
            {userIdeas.length > 0 ? (
              userIdeas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} showAuthor={false} />
              ))
            ) : (
              <Card className="p-12 text-center grain-overlay">
                <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">まだ公開アイディアがありません</p>
              </Card>
            )}
          </TabsContent>

          {/* Apps */}
          <TabsContent value="apps" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{userPrototypes.length}件のプロトタイプ</span>
            </div>
            {userPrototypes.length > 0 ? (
              userPrototypes.map((proto) => (
                <Card key={proto.id} className="p-5 grain-overlay">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Globe className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/ideas/${proto.ideaId}`} className="font-bold hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        {proto.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{proto.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Heart className="h-3 w-3 text-rose-500" /> {proto.likes}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" /> コメント
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center grain-overlay">
                <Globe className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">まだプロトタイプがありません</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
