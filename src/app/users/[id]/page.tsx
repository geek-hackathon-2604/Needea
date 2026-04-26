"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockOtherUser, mockIdeas } from "@/lib/mock-data";
import {
  Lightbulb,
  Heart,
  MessageCircle,
  ArrowLeft,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function UserProfilePage() {
  const params = useParams();
  const name = decodeURIComponent(params.id as string);

  // Find user's ideas from mock data
  const userIdeas = mockIdeas.filter(
    (idea) => idea.author.name === name && idea.visibility === "public"
  );

  // Derive profile from available data or use mockOtherUser
  const profile =
    name === mockOtherUser.name
      ? mockOtherUser
      : {
          name,
          avatar: name.charAt(0),
          totalIdeas: userIdeas.length,
          totalLikes: userIdeas.reduce((sum, i) => sum + i.likes, 0),
        };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/ideas">
          <Button variant="ghost" size="sm" className="rounded-full gap-1 mb-6 -ml-3 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> 戻る
          </Button>
        </Link>

        {/* User Header */}
        <Card className="p-6 sm:p-8 mb-8 grain-overlay overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-32 gradient-amber rounded-t-xl opacity-20 dark:opacity-10" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
              <AvatarFallback className="text-2xl font-black bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                {profile.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-black tracking-tight">{profile.name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">アイディアハブメンバー</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> {profile.totalIdeas} ideas
                </span>
                {"totalLikes" in profile && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-rose-500" /> {profile.totalLikes} likes
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* User's Ideas */}
        <div>
          <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            {profile.name}のアイディア ({userIdeas.length})
          </h2>

          {userIdeas.length > 0 ? (
            <div className="space-y-4">
              {userIdeas.map((idea) => (
                <Link key={idea.id} href={`/ideas/${idea.id}`}>
                  <Card className="p-5 card-hover cursor-pointer grain-overlay">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold leading-snug">{idea.title}</h3>
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
            </div>
          ) : (
            <Card className="p-12 text-center grain-overlay">
              <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">まだ公開アイディアがありません</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
