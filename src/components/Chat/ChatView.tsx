"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Phone, Send, Video, Search, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = { id: string; fromMe: boolean; text: string; time: string };
type Conversation = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  last: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

// Demo data — replace with your real conversations.
const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/avatars/avatar-1.jpg",
    role: "Product Designer",
    last: "Sounds good, I'll send the mockups over.",
    time: "2m",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", fromMe: false, text: "Hey! Did you get a chance to look at the new dashboard?", time: "9:41 AM" },
      { id: "m2", fromMe: true, text: "Yes, it looks great. Just a couple of tweaks on spacing.", time: "9:43 AM" },
      { id: "m3", fromMe: false, text: "Sounds good, I'll send the mockups over.", time: "9:44 AM" },
    ],
  },
  {
    id: "2",
    name: "Marcus Reid",
    avatar: "/avatars/avatar-2.jpg",
    role: "Engineering Lead",
    last: "The deploy is live 🎉",
    time: "1h",
    unread: 0,
    online: true,
    messages: [
      { id: "m1", fromMe: false, text: "Pushing the release now.", time: "8:10 AM" },
      { id: "m2", fromMe: false, text: "The deploy is live 🎉", time: "8:22 AM" },
      { id: "m3", fromMe: true, text: "Awesome, nice work!", time: "8:25 AM" },
    ],
  },
  {
    id: "3",
    name: "Design Team",
    avatar: "/avatars/avatar-5.jpg",
    role: "6 members",
    last: "Priya: Let's sync at 3pm.",
    time: "3h",
    unread: 5,
    online: false,
    messages: [
      { id: "m1", fromMe: false, text: "Sharing the updated component library.", time: "Yesterday" },
      { id: "m2", fromMe: false, text: "Priya: Let's sync at 3pm.", time: "Yesterday" },
    ],
  },
  {
    id: "4",
    name: "Elena Duarte",
    avatar: "/avatars/avatar-7.jpg",
    role: "Account Manager",
    last: "Thanks for the quick turnaround!",
    time: "1d",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", fromMe: true, text: "Sent over the revised proposal.", time: "Mon" },
      { id: "m2", fromMe: false, text: "Thanks for the quick turnaround!", time: "Mon" },
    ],
  },
];

export function ChatView() {
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const [showThreadOnMobile, setShowThreadOnMobile] = useState(false);
  const [draft, setDraft] = useState("");

  const active = conversations.find((c) => c.id === activeId)!;

  const openConversation = (id: string) => {
    setActiveId(id);
    setShowThreadOnMobile(true);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              last: text,
              time: "now",
              messages: [
                ...c.messages,
                { id: `m${c.messages.length + 1}`, fromMe: true, text, time: "now" },
              ],
            }
          : c,
      ),
    );
    setDraft("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden border-t">
      {/* Conversation list */}
      <aside
        className={cn(
          "w-full md:w-80 md:shrink-0 flex flex-col border-r bg-card",
          showThreadOnMobile && "hidden md:flex",
        )}
      >
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold tracking-tight">Messages</h1>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9 h-10" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => openConversation(c.id)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                c.id === activeId && "bg-muted/70",
              )}
            >
              <div className="relative shrink-0">
                <Image
                  src={c.avatar}
                  alt={c.name}
                  width={80}
                  height={80}
                  className="size-11 rounded-full object-cover"
                />
                {c.online && (
                  <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-card" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold">{c.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{c.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm text-muted-foreground">{c.last}</span>
                  {c.unread > 0 && (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Thread */}
      <section
        className={cn(
          "flex flex-1 flex-col bg-background",
          !showThreadOnMobile && "hidden md:flex",
        )}
      >
        {/* Thread header */}
        <div className="flex items-center gap-3 border-b p-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 md:hidden"
            onClick={() => setShowThreadOnMobile(false)}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Image
            src={active.avatar}
            alt={active.name}
            width={80}
            height={80}
            className="size-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{active.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {active.online ? "Online" : active.role}
            </p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Button variant="ghost" size="icon" className="size-9"><Phone className="size-4.5" /></Button>
            <Button variant="ghost" size="icon" className="size-9"><Video className="size-4.5" /></Button>
            <Button variant="ghost" size="icon" className="size-9"><MoreVertical className="size-4.5" /></Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {active.messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex", m.fromMe ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                  m.fromMe
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm",
                )}
              >
                <p>{m.text}</p>
                <p
                  className={cn(
                    "mt-1 text-[10px]",
                    m.fromMe
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground",
                  )}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <form onSubmit={send} className="flex items-center gap-2 border-t p-3">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message..."
            className="h-11"
          />
          <Button type="submit" size="icon" className="size-11 shrink-0" disabled={!draft.trim()}>
            <Send className="size-4.5" />
          </Button>
        </form>
      </section>
    </div>
  );
}
