"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockIdeas, mockComments, mockPrototypes } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
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
  Reply,
  X,
  Star,
  ChevronDown,
} from "lucide-react";

interface ProtoComment {
  id: string;
  author: { name: string; avatar: string };
  content: string;
  createdAt: string;
  replyToId?: string;
}

const mockProtoComments: Record<string, ProtoComment[]> = {
  p1: [
    { id: "pc1", author: { name: "エンジニア大好き", avatar: "E" }, content: "すごい！早速触ってみました。動作サクサクで感動です。冷蔵庫の登録も簡単でした！", createdAt: "2026-04-26T09:00:00Z" },
    { id: "pc2", author: { name: "田中 優子", avatar: "T" }, content: "ありがとうございます！バーコードスキャンがめっちゃ便利ですね。カメラ認識機能は今後追加予定ですか？", createdAt: "2026-04-26T10:30:00Z" },
    { id: "pc3", author: { name: "プロトタイパー", avatar: "P" }, content: "ありがとうございます！カメラ認識は画像認識APIを使えばできそうですね。ちょっと試してみます🙏", createdAt: "2026-04-26T11:00:00Z", replyToId: "pc2" },
  ],
  p2: [
    { id: "pc4", author: { name: "伊藤 翔", avatar: "I" }, content: "これ探してたやつです！Chromeで使えるのが嬉しい。友達とペアで使える機能が欲しいです。", createdAt: "2026-04-25T14:00:00Z" },
  ],
};

export default function IdeaDetailPage() {
  const params = useParams();
  const idea = mockIdeas.find((i) => i.id === params.id) || mockIdeas[0];
  const comments = mockComments.filter((c) => c.ideaId === idea.id);
  const prototypes = mockPrototypes.filter((p) => p.ideaId === idea.id);

  const [likedProtoIds, setLikedProtoIds] = useState<Set<string>>(new Set());
  const [protoLocalLikes, setProtoLocalLikes] = useState<Record<string, number>>({});

  const getProtoLikes = (protoId: string, baseLikes: number) =>
    protoLocalLikes[protoId] ?? baseLikes;

  const handleProtoLike = (protoId: string) => {
    setLikedProtoIds((prev) => {
      const next = new Set(prev);
      if (next.has(protoId)) {
        next.delete(protoId);
        setProtoLocalLikes((l) => ({ ...l, [protoId]: (l[protoId] ?? mockPrototypes.find((p) => p.id === protoId)?.likes ?? 0) - 1 }));
      } else {
        next.add(protoId);
        setProtoLocalLikes((l) => ({ ...l, [protoId]: (l[protoId] ?? mockPrototypes.find((p) => p.id === protoId)?.likes ?? 0) + 1 }));
      }
      return next;
    });
  };

  // similar ideas: same tags, sorted by likes, exclude current
  const similarIdeas = mockIdeas
    .filter((i) => i.id !== idea.id && i.visibility === "public")
    .map((i) => ({
      ...i,
      tagOverlap: i.tags.filter((t) => idea.tags.includes(t)).length,
    }))
    .filter((i) => i.tagOverlap > 0)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

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
                  {formatDate(idea.createdAt)}
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
                            {formatDate(comment.createdAt)}
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
                    <ProtoCard
                      key={proto.id}
                      proto={proto}
                      liked={likedProtoIds.has(proto.id)}
                      likes={getProtoLikes(proto.id, proto.likes)}
                      onLike={() => handleProtoLike(proto.id)}
                    />
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
              <h3 className="font-bold text-sm mb-2">Need 度</h3>
              <p className="text-xs text-muted-foreground mb-3">投稿者の困り度・重要度</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Star
                    key={level}
                    className={`h-6 w-6 ${level <= idea.needLevel ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground whitespace-nowrap">
                  {idea.needLevel === 1 && "ちょっと気になる"}
                  {idea.needLevel === 2 && "少し困っている"}
                  {idea.needLevel === 3 && "まあまあ重要"}
                  {idea.needLevel === 4 && "かなり重要"}
                  {idea.needLevel === 5 && "めっちゃ欲しい！"}
                </span>
              </div>
            </Card>

            <Card className="p-5 grain-overlay">
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

            {/* Similar Ideas */}
            {similarIdeas.length > 0 && (
              <Card className="p-5 grain-overlay">
                <h3 className="font-bold text-sm mb-3">似ているアイディア</h3>
                <div className="space-y-3">
                  {similarIdeas.map((si) => (
                    <Link key={si.id} href={`/ideas/${si.id}`}>
                      <div className="group rounded-xl p-3 hover:bg-muted transition-colors">
                        <p className="text-sm font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-2">
                          {si.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-rose-500" /> {si.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" /> {si.comments}
                          </span>
                          <span>{si.tagOverlap}タグ共通</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtoCard({
  proto,
  liked,
  likes,
  onLike,
}: {
  proto: (typeof mockPrototypes)[number];
  liked: boolean;
  likes: number;
  onLike: () => void;
}) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const protoComments = mockProtoComments[proto.id] || [];
  const [localComments, setLocalComments] = useState<ProtoComment[]>(protoComments);
  const [newComment, setNewComment] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: ProtoComment = {
      id: `pc-local-${Date.now()}`,
      author: { name: "ユーザー", avatar: "U" },
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      replyToId: replyToId || undefined,
    };
    setLocalComments((prev) => [...prev, comment]);
    setNewComment("");
    setReplyToId(null);
  };

  const topLevelComments = localComments.filter((c) => !c.replyToId);
  const repliesFor = (commentId: string) => localComments.filter((c) => c.replyToId === commentId);

  return (
    <Card className="grain-overlay overflow-hidden">
      <div className="p-5">
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
              <button onClick={onLike} className="cursor-pointer text-xs text-muted-foreground hover:text-rose-500 transition-colors flex items-center gap-1">
                <Heart className={`h-3 w-3 ${liked ? "fill-rose-500 text-rose-500" : ""}`} /> {likes}
              </button>
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

        <Separator className="my-4" />
        <button
          onClick={() => setCommentsOpen((v) => !v)}
          className="cursor-pointer w-full group flex items-center justify-between rounded-xl px-4 py-3 bg-accent/5 hover:bg-accent/10 transition-all duration-300 border border-transparent hover:border-accent/20"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <MessageCircle className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">
                {localComments.length > 0
                  ? `${localComments.length}件のコメント`
                  : "最初のコメントを書く"}
              </p>
              <p className="text-xs text-muted-foreground">
                {localComments.length > 0 ? "タップして会話に参加する" : "このプロトタイプについて感想を伝えよう"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...new Set(localComments.map((c) => c.author.avatar))].slice(0, 3).map((av, i) => (
                <Avatar key={i} className="h-6 w-6 ring-2 ring-background">
                  <AvatarFallback className="text-[9px] bg-accent/10 text-accent">{av}</AvatarFallback>
                </Avatar>
              ))}
              {localComments.length > 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 ring-2 ring-background">
                  <span className="text-[9px] font-bold text-accent">+{localComments.length}</span>
                </div>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${commentsOpen ? "rotate-180" : ""}`} />
          </div>
        </button>
      </div>

      {/* Inline comment section */}
      {commentsOpen && (
        <div className="border-t">
          <ScrollArea className="max-h-72 px-5 py-4">
            <div className="space-y-4">
              {topLevelComments.map((comment) => (
                <div key={comment.id}>
                  <div className="flex gap-3">
                    <Link href={`/users/${comment.author.name}`}>
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-[10px]">{comment.author.avatar}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Link href={`/users/${comment.author.name}`} className="text-xs font-bold hover:underline">
                          {comment.author.name}
                        </Link>
                        <span className="text-[10px] text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
                      <button
                        onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                        className="cursor-pointer mt-1 text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                      >
                        <Reply className="h-3 w-3" /> 返信
                      </button>
                    </div>
                  </div>
                  {repliesFor(comment.id).length > 0 && (
                    <div className="ml-10 mt-2 space-y-2 border-l-2 border-muted pl-4">
                      {repliesFor(comment.id).map((reply) => (
                        <div key={reply.id} className="flex gap-2">
                          <Link href={`/users/${reply.author.name}`}>
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-[9px]">{reply.author.avatar}</AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Link href={`/users/${reply.author.name}`} className="text-xs font-bold hover:underline">
                                {reply.author.name}
                              </Link>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {topLevelComments.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  まだコメントがありません。最初のコメントを書きましょう！
                </p>
              )}
            </div>
          </ScrollArea>
          <div className="px-5 pb-4 pt-2 border-t">
            {replyToId && (
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 p-2 bg-muted rounded-lg">
                <Reply className="h-3 w-3" /> 返信を書いています...
                <button onClick={() => setReplyToId(null)} className="cursor-pointer">
                  <X className="h-3 w-3 hover:text-foreground" />
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder={replyToId ? "返信を書く..." : "コメントを書く..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
                className="rounded-xl text-sm"
              />
              <Button size="icon" onClick={handleAddComment} disabled={!newComment.trim()} className="shrink-0 rounded-xl gradient-amber">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
