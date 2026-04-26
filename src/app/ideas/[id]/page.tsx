"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { mockIdeas, mockComments, mockPrototypes } from "@/lib/mock-data";
import {
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Lightbulb,
  Clock,
  Send,
  GitFork,
  Globe,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

export default function IdeaDetailPage() {
  const params = useParams();
  const idea = mockIdeas.find((i) => i.id === params.id) || mockIdeas[0];
  const comments = mockComments.filter((c) => c.ideaId === idea.id);
  const prototypes = mockPrototypes.filter((p) => p.ideaId === idea.id);
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6" key={params.id as string}>
      <div className="mx-auto max-w-4xl">
        <Link href="/ideas">
          <Button variant="ghost" size="sm" className="rounded-full gap-1 mb-6 -ml-3 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> フィードに戻る
          </Button>
        </Link>

        {/* Idea Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                {idea.title}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <Link href={`/users/${idea.author.name}`} className="flex items-center gap-1 hover:underline">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px] bg-amber-100 text-amber-700">
                      {idea.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {idea.author.name}
                </Link>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date(idea.createdAt).toLocaleDateString("ja-JP")}
                </span>
                {idea.visibility === "private" && (
                  <Badge variant="outline" className="text-xs rounded-full">非公開</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Button variant="secondary" size="sm" className="rounded-full gap-1.5">
              <Heart className="h-4 w-4 text-rose-500" />
              共感 {idea.likes}
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full gap-1.5">
              <Share2 className="h-4 w-4" />
              シェア
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Idea Content */}
            <Card className="p-6 grain-overlay">
              <h2 className="font-bold text-lg mb-3">アイディアの種</h2>
              <p className="text-muted-foreground leading-relaxed">{idea.content}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {idea.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-full bg-transparent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* AI Chat History */}
            <Card className="p-6 bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 grain-overlay">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h2 className="font-bold text-lg">AIヒアリング履歴</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                投稿者とAIの会話です。アイディアの背景やコンテキストをより深く理解できます。
              </p>
              <div className="space-y-4">
                {idea.chatHistory.map((chat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex gap-2">
                      <Avatar className="h-6 w-6 shrink-0">
                        <AvatarFallback className="text-[10px] bg-amber-100 text-amber-700">
                          <Sparkles className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                        {chat.question}
                      </p>
                    </div>
                    <div className="flex gap-2 pl-8">
                      <Avatar className="h-6 w-6 shrink-0">
                        <AvatarFallback className="text-[10px]">{idea.author.avatar}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {chat.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Comments */}
            <div>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                コメント ({comments.length})
              </h2>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="p-4 grain-overlay">
                    <div className="flex gap-3">
                      <Link href={`/users/${comment.author.name}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-accent/10 text-accent">
                            {comment.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Link href={`/users/${comment.author.name}`} className="text-sm font-bold hover:underline">
                            {comment.author.name}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString("ja-JP")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-4 mt-4 grain-overlay">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea placeholder="コメントを書く..." className="min-h-20 resize-none rounded-xl text-sm" />
                    <div className="flex justify-end">
                      <Button size="sm" className="rounded-full gap-1.5 gradient-amber">
                        <Send className="h-3.5 w-3.5" /> 投稿
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Prototypes */}
            <div>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-accent" />
                作ってみた ({prototypes.length})
              </h2>
              {prototypes.length > 0 ? (
                <div className="space-y-4">
                  {prototypes.map((proto) => (
                    <Card key={proto.id} className="p-5 grain-overlay">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                          <Globe className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold">{proto.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{proto.description}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <Link href={`/users/${proto.author.name}`} className="text-xs text-muted-foreground hover:underline flex items-center gap-1">
                              <Avatar className="h-4 w-4">
                                <AvatarFallback className="text-[8px]">{proto.author.avatar}</AvatarFallback>
                              </Avatar>
                              {proto.author.name}
                            </Link>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Heart className="h-3 w-3 text-rose-500" /> {proto.likes}
                            </span>
                          </div>
                          <div className="flex gap-3 mt-3">
                            <a href={proto.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium bg-muted px-3 py-1.5 rounded-full hover:bg-muted/80 transition-colors">
                              <GitFork className="h-3.5 w-3.5" /> GitHub
                            </a>
                            <a href={proto.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium bg-accent text-accent-foreground px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity">
                              <ExternalLink className="h-3.5 w-3.5" /> Demo
                            </a>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center grain-overlay">
                  <Globe className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    まだ誰もこのアイディアのプロトタイプを作っていません。
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    最初のプロトタイプを作ってみませんか？
                  </p>
                </Card>
              )}

              <Card className="p-4 mt-4 grain-overlay">
                <h3 className="font-bold text-sm mb-3">プロトタイプを投稿する</h3>
                <div className="space-y-3">
                  <Input placeholder="プロトタイプ名" className="rounded-xl text-sm" />
                  <Textarea placeholder="説明文" className="min-h-16 resize-none rounded-xl text-sm" />
                  <div className="flex gap-2">
                    <Input placeholder="GitHub URL" className="rounded-xl text-sm flex-1" />
                    <Input placeholder="Demo URL" className="rounded-xl text-sm flex-1" />
                  </div>
                  <Button size="sm" className="rounded-full gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" /> 投稿する
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-5 grain-overlay">
              <h3 className="font-bold text-sm mb-3">ステータス</h3>
              <Badge className="rounded-full">
                {idea.status === "open" ? "募集中" : idea.status === "in_progress" ? "制作中" : "実現済"}
              </Badge>
              <Separator className="my-3" />
              <h3 className="font-bold text-sm mb-3">投稿者</h3>
              <Link href={`/users/${idea.author.name}`} className="flex items-center gap-3 hover:underline">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">
                    {idea.author.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold">{idea.author.name}</p>
                  <p className="text-xs text-muted-foreground">プロフィールを見る</p>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
