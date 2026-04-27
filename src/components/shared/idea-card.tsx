import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MockIdea, mockPrototypes } from "@/lib/mock-data";
import { Heart, MessageCircle, Clock, Globe, Eye, EyeOff, ChevronRight } from "lucide-react";

interface IdeaCardProps {
  idea: MockIdea;
  showVisibility?: boolean;
  showAuthor?: boolean;
  showChevron?: boolean;
  className?: string;
}

export function IdeaCard({ idea, showVisibility = true, showAuthor = false, showChevron = true, className }: IdeaCardProps) {
  const prototypeCount = mockPrototypes.filter((p) => p.ideaId === idea.id).length;
  const isPrivate = idea.visibility === "private";

  return (
    <Link href={`/ideas/${idea.id}`}>
      <Card
        className={`p-5 card-hover cursor-pointer grain-overlay ${isPrivate ? "bg-muted/30 border-dashed" : ""} ${className || ""}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold leading-snug">{idea.title}</h3>
              {showVisibility && (
                isPrivate ? (
                  <Badge variant="outline" className="text-[10px] rounded-full shrink-0 bg-muted-foreground/10">
                    <EyeOff className="h-2.5 w-2.5 mr-0.5" />非公開
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] rounded-full shrink-0 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    <Eye className="h-2.5 w-2.5 mr-0.5" />公開
                  </Badge>
                )
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
          {showChevron && <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          {showAuthor && (
            <span className="flex items-center gap-1">
              <Avatar className="h-4 w-4">
                <AvatarFallback className="text-[8px]">{idea.author.avatar}</AvatarFallback>
              </Avatar>
              {idea.author.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-rose-500" /> {idea.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" /> {idea.comments}
          </span>
          {prototypeCount > 0 && (
            <span className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-accent" /> {prototypeCount}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {new Date(idea.createdAt).toLocaleDateString("ja-JP")}
          </span>
        </div>
      </Card>
    </Link>
  );
}
