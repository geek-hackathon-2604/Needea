"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Send,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  MessageCircle,
} from "lucide-react";

const aiQuestions = [
  "なるほど、面白い視点ですね！もう少し具体的に教えてください。どんな時にそれを感じますか？",
  "それは誰が一番困っている（または喜ぶ）と思いますか？",
  "もし理想的な解決方法があるとしたら、どんな形ですか？",
  "最後に、なぜそれがあなたにとって大事なんですか？",
];

const mockTags = ["家事", "効率化", "主婦向け", "食品ロス"];

type Step = "input" | "chat" | "confirm";

export default function PostPage() {
  const [step, setStep] = useState<Step>("input");
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleStartChat = () => {
    if (!inputText.trim()) return;
    setStep("chat");
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
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: answer },
    ]);
    setIsTyping(true);
    setTimeout(() => {
      if (nextQ < aiQuestions.length) {
        setChatMessages((prev) => [
          ...prev,
          { role: "ai", content: aiQuestions[nextQ] },
        ]);
        setCurrentQuestion(nextQ);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content:
              "素敵なアイディアですね！質問は以上です。あなたの思いが伝わってきました。この会話の内容をもとに、アイディアの種として投稿してみませんか？",
          },
        ]);
        setStep("confirm");
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleReset = () => {
    setStep("input");
    setInputText("");
    setChatMessages([]);
    setCurrentQuestion(0);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            AIがあなたのアイディアの種を掘り下げます
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            アイディアを投稿する
          </h1>
          <p className="mt-2 text-muted-foreground">
            漠然とした不満や「こうだったらいいな」を気軽にシェアしてください。AIがヒアリングしながらアイディアの種を具体化します。
          </p>
        </div>

        {/* Step 1: Initial Input */}
        {step === "input" && (
          <Card className="p-6 sm:p-8 grain-overlay">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-amber">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
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
              className="min-h-32 text-base leading-relaxed resize-none rounded-xl"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-muted-foreground">
                文字数: {inputText.length}
              </span>
              <Button onClick={handleStartChat} disabled={!inputText.trim()} className="rounded-full gap-2 gradient-amber">
                AIヒアリングを始める
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: AI Chat */}
        {step === "chat" && (
          <Card className="p-0 overflow-hidden grain-overlay">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-amber">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold">AI Idea Coach</p>
                  <p className="text-xs text-muted-foreground">あなたのアイディアを掘り下げています</p>
                </div>
              </div>
            </div>
            <ScrollArea className="h-[400px] sm:h-[500px]">
              <div className="p-4 sm:p-6 space-y-4">
                {chatMessages.map((msg, i) => (
                  <ChatBubble key={i} message={msg} />
                ))}
                {isTyping && (
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
                )}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>
            {step === "chat" && currentQuestion < aiQuestions.length && (
              <ChatInput onSend={handleReply} />
            )}
          </Card>
        )}

        {/* Step 3: Confirm & Post (the "seed" of an idea, not a polished summary) */}
        {step === "confirm" && (
          <div className="space-y-6">
            <Card className="p-6 sm:p-8 grain-overlay">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <MessageCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">アイディアの種が形になりました</h2>
                  <p className="text-sm text-muted-foreground">AIとの会話であなたのアイディアの輪郭が見えてきました。あとは投稿するだけです。</p>
                </div>
              </div>

              {/* Conversation summary */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-3 mb-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">ヒアリング概要</p>
                <div className="space-y-2">
                  {chatMessages.map((msg, i) => (
                    msg.role === "user" && (
                      <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                        &ldquo;{msg.content}&rdquo;
                      </p>
                    )
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2">AI自動タグ付け</p>
                <div className="flex flex-wrap gap-1.5">
                  {mockTags.map((tag) => (
                    <Badge key={tag} className="rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={handleReset} className="rounded-full gap-2">
                <RefreshCw className="h-4 w-4" />
                やり直す
              </Button>
              <Button className="rounded-full gap-2 gradient-amber shadow-lg shadow-amber-500/25">
                アイディアの種を投稿する
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
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
          placeholder="あなたの考えを入力..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
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
