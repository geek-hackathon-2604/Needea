"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import { mockIdeas } from "@/lib/mock-data";
import {
  Sparkles,
  Send,
  Lightbulb,
  Star,
  X,
  Plus,
  Eye,
  EyeOff,
  MessageCircle,
  RefreshCw,
} from "lucide-react";

const aiQuestions = [
  "面白い視点ですね！もう少し具体的に教えてください。どんな時にそれを感じますか？",
  "それは誰が一番困っている（または喜ぶ）と思いますか？",
  "もし理想的な解決方法があるとしたら、どんな形ですか？",
  "最後に、なぜそれがあなたにとって大事なんですか？",
];

const initialTags = ["家事", "効率化", "主婦向け", "食品ロス"];

// all available tags across all ideas for search
function getAllTags(): string[] {
  const tagSet = new Set<string>();
  mockIdeas.forEach((idea) => idea.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

function getTagUsageCount(tag: string): number {
  return mockIdeas.filter((idea) => idea.tags.includes(tag)).length;
}

export default function PostPage() {
  // input
  const [inputText, setInputText] = useState("");

  // chat
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatComplete, setChatComplete] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // tags
  const [tags, setTags] = useState<string[]>([...initialTags]);
  const [tagInput, setTagInput] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);

  // need level
  const [needLevel, setNeedLevel] = useState(0);

  // visibility
  const [isPublic, setIsPublic] = useState(true);

  const allTags = getAllTags();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleStartChat = () => {
    if (!inputText.trim()) return;
    setChatStarted(true);
    setChatMessages([
      { role: "user", content: inputText },
      {
        role: "ai",
        content:
          "ありがとうございます！あなたのその感覚、他の人もきっと持っているはずです。アイディアの種をもっと深掘りするために、いくつか質問させてください。\n\n" +
          aiQuestions[0],
      },
    ]);
  };

  const handleReply = (answer: string) => {
    if (!answer.trim()) return;
    const nextQ = currentQuestion + 1;
    setChatMessages((prev) => [...prev, { role: "user", content: answer }]);
    setIsTyping(true);
    setTimeout(() => {
      if (nextQ < aiQuestions.length) {
        setChatMessages((prev) => [...prev, { role: "ai", content: aiQuestions[nextQ] }]);
        setCurrentQuestion(nextQ);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "素敵なアイディアですね！質問は以上です。会話をもとに、アイディアの種として投稿しましょう。",
          },
        ]);
        setChatComplete(true);
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleResetChat = () => {
    setChatStarted(false);
    setChatComplete(false);
    setChatMessages([]);
    setCurrentQuestion(0);
  };

  const handleRemoveTag = (tag: string) => {
    if (tags.length <= 3) return; // minimum 3
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleAddTag = (tag: string) => {
    if (!tag.trim() || tags.includes(tag.trim())) return;
    setTags((prev) => [...prev, tag.trim()]);
    setTagInput("");
    setTagSuggestions([]);
  };

  const handleTagInputChange = (value: string) => {
    setTagInput(value);
    if (value.trim()) {
      const suggestions = allTags
        .filter((t) => t.toLowerCase().includes(value.toLowerCase()) && !tags.includes(t))
        .slice(0, 5);
      setTagSuggestions(suggestions);
    } else {
      setTagSuggestions([]);
    }
  };

  const canPost = inputText.trim() && tags.length >= 3 && (isPublic ? chatComplete : true);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            AIがあなたのアイディアの種を掘り下げます
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            アイディアを投稿する
          </h1>
          <p className="mt-2 text-muted-foreground">
            漠然とした不満や「こうだったらいいな」を気軽にシェアしてください
          </p>
        </div>

        <Card className="p-6 sm:p-8 grain-overlay mb-6">
          {/* Initial Input */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-amber">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">あなたの不満・アイディアを聞かせてください</h2>
              <p className="text-sm text-muted-foreground mt-1">
                箇条書きや一言のぼやきでも大丈夫。AIが掘り下げながら、アイディアの種に育てます。
              </p>
            </div>
          </div>
          <Textarea
            placeholder="例：冷蔵庫の中身を把握できなくて、いつも食材をダメにしてしまう。買い物中に冷蔵庫の中身が見られたらいいのに..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-28 text-base leading-relaxed resize-none rounded-xl"
          />

          {!chatStarted && (
            <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
              <span className="text-xs text-muted-foreground">文字数: {inputText.length}</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled={!inputText.trim()} className="rounded-full gap-2" onClick={() => { setIsPublic(false); }}>
                  <EyeOff className="h-4 w-4" />
                  非公開で保存
                </Button>
                <Button onClick={handleStartChat} disabled={!inputText.trim()} className="rounded-full gap-2 gradient-amber">
                  <Sparkles className="h-4 w-4" />
                  AIヒアリングを始める
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* AI Chat (appears below when started) */}
        {chatStarted && (
          <Card className="p-0 overflow-hidden grain-overlay mb-6">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-amber">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">AI Idea Coach</p>
                    <p className="text-xs text-muted-foreground">
                      {chatComplete ? "ヒアリング完了" : "あなたのアイディアを掘り下げています"}
                    </p>
                  </div>
                </div>
                {!chatComplete && (
                  <Button variant="ghost" size="sm" onClick={handleResetChat} className="rounded-full text-xs text-muted-foreground">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    リセット
                  </Button>
                )}
              </div>
            </div>
            <ScrollArea className="h-[350px] sm:h-[450px]">
              <div className="p-4 sm:p-6 space-y-4">
                {chatMessages.map((msg, i) => (
                  <ChatBubble key={i} message={msg} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>
            {!chatComplete && (
              <ChatInput onSend={handleReply} />
            )}
          </Card>
        )}

        {/* Tags, Need, Visibility (shown after chat starts) */}
        {chatStarted && (<>
        <Card className="p-5 sm:p-6 grain-overlay mb-6">
          <h3 className="font-bold text-sm mb-1">タグ</h3>
          <p className="text-xs text-muted-foreground mb-3">
            最低3つ必要です。AIが自動で候補を提案します。編集もできます。
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} className="rounded-full pl-3 pr-1.5 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 gap-1">
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  disabled={tags.length <= 3}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label={`${tag}を削除`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="relative">
            <div className="flex gap-2">
              <Input
                placeholder="タグを追加..."
                value={tagInput}
                onChange={(e) => handleTagInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
                className="rounded-xl text-sm h-9"
              />
              <Button size="sm" variant="outline" onClick={() => handleAddTag(tagInput)} disabled={!tagInput.trim()} className="rounded-xl shrink-0">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            {tagSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-xl shadow-lg z-10 p-1">
                {tagSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleAddTag(s)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors"
                  >
                    <span>{s}</span>
                    <span className="text-xs text-muted-foreground">{getTagUsageCount(s)}件</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Need Level */}
        <Card className="p-5 sm:p-6 grain-overlay mb-6">
          <h3 className="font-bold text-sm mb-1">Need 度（重要度）</h3>
          <p className="text-xs text-muted-foreground mb-3">
            このアイディアのあなたにとっての重要度・困り度を5段階で教えてください。
          </p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setNeedLevel(level)}
                className="p-1 transition-all hover:scale-110"
                aria-label={`Need度 ${level}`}
              >
                <Star
                  className={`h-8 w-8 ${
                    level <= needLevel
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  } transition-colors`}
                />
              </button>
            ))}
            {needLevel > 0 && (
              <span className="ml-3 text-sm text-muted-foreground">
                {needLevel === 1 && "ちょっと気になる"}
                {needLevel === 2 && "少し困っている"}
                {needLevel === 3 && "まあまあ重要"}
                {needLevel === 4 && "かなり重要"}
                {needLevel === 5 && "めっちゃ欲しい！"}
              </span>
            )}
          </div>
        </Card>

        {/* Visibility + Post Actions */}
        <Card className="p-5 sm:p-6 grain-overlay mb-6">
          <h3 className="font-bold text-sm mb-1">公開設定</h3>
          <p className="text-xs text-muted-foreground mb-4">
            公開アイディアはAIヒアリングが必須です。非公開の場合はヒアリングなしでも保存できます。
          </p>
          <div className="flex items-center gap-3 mb-4">
            <Toggle
              pressed={isPublic}
              onPressedChange={(v) => {
                // public requires chat complete, private doesn't
                setIsPublic(v);
              }}
              className="rounded-full gap-1.5 data-[state=on]:bg-amber-100 data-[state=on]:text-amber-700"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">公開</span>
            </Toggle>
            <Toggle
              pressed={!isPublic}
              onPressedChange={(v) => {
                setIsPublic(!v);
              }}
              className="rounded-full gap-1.5 data-[state=on]:bg-muted data-[state=on]:text-muted-foreground"
            >
              <EyeOff className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">非公開</span>
            </Toggle>
          </div>

          {!isPublic && (
            <p className="text-xs text-muted-foreground mb-4 p-3 bg-muted/50 rounded-xl">
              ヒアリング内容は保存されます。非公開なので他のユーザーには表示されません。
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button disabled={!canPost} className="rounded-full gap-2 gradient-amber shadow-lg shadow-amber-500/25">
              <Send className="h-4 w-4" />
              {isPublic ? "アイディアの種を投稿する" : "非公開で保存する"}
            </Button>
          </div>
        </Card>
        </>)}
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: { role: "user" | "ai"; content: string } }) {
  const isAI = message.role === "ai";
  return (
    <div className={`flex gap-3 ${isAI ? "justify-start" : "justify-end"}`}>
      {isAI && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isAI ? "bg-muted rounded-tl-sm" : "gradient-amber text-white rounded-tr-sm"
        }`}
      >
        {message.content}
      </div>
      {!isAI && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="text-xs">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce" />
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.1s]" />
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
        </div>
      </div>
    </div>
  );
}

function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="p-4 border-t bg-card">
      <div className="flex gap-2">
        <Textarea
          placeholder="Shift+Enter で送信 / Enter で改行"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="min-h-0 h-10 resize-none rounded-xl text-sm"
          rows={1}
        />
        <Button size="icon" onClick={handleSubmit} disabled={!value.trim()} className="shrink-0 rounded-xl gradient-amber">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
