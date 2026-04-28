"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MockIdea } from "@/lib/mock-data";
import { IdeaCard } from "@/components/shared/idea-card";
import { createClient } from "@/lib/supabase/client";
import {
  Lightbulb,
  Heart,
  ArrowLeft,
  Globe,
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

export default function UserProfilePage() {
  const params = useParams();
  const name = decodeURIComponent(params.id as string);
  const supabase = createClient();

  const [profile, setProfile] = useState<{ id: string; name: string; avatar_url: string | null } | null>(null);
  const [ideas, setIdeas] = useState<MockIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, name, avatar_url")
        .eq("name", name)
        .maybeSingle();

      if (!profileData) { setLoading(false); return; }
      setProfile(profileData);

      const { data: ideasData } = await supabase
        .from("ideas")
        .select("*")
        .eq("user_id", profileData.id)
        .eq("visibility", "public")
        .order("created_at", { ascending: false });

      if (ideasData) {
        const authorAvatar = profileData.name.charAt(0).toUpperCase();
        setIdeas(ideasData.map((i) => toMockIdea(i as DbIdea, profileData.name, authorAvatar)));
      }
      setLoading(false);
    };
    fetchData();
  }, [name]);

  const totalLikes = ideas.reduce((sum, i) => sum + i.likes, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Link href="/ideas">
            <Button variant="ghost" size="sm" className="rounded-full gap-1 mb-6 -ml-3 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" /> 戻る
            </Button>
          </Link>
          <Card className="p-12 text-center grain-overlay">
            <p className="text-muted-foreground">ユーザーが見つかりませんでした</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/ideas">
          <Button variant="ghost" size="sm" className="rounded-full gap-1 mb-6 -ml-3 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> 戻る
          </Button>
        </Link>

        {/* Profile Header */}
        <Card className="p-6 sm:p-8 mb-8 grain-overlay overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-32 gradient-amber rounded-t-xl opacity-20 dark:opacity-10" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
              <AvatarFallback className="text-2xl font-black bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-black tracking-tight">{profile.name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">アイディアハブメンバー</p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> {ideas.length} ideas
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-rose-500" /> {totalLikes} likes
                </span>
              </div>
            </div>
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
              Ideas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ideas" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{ideas.length}件のアイディア</span>
            </div>
            {ideas.length > 0 ? (
              ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} showAuthor={false} />
              ))
            ) : (
              <Card className="p-12 text-center grain-overlay">
                <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">まだ公開アイディアがありません</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
