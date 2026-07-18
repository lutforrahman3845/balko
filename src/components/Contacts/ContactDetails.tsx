"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
} from "@/components/ui/sheet";
import { User, MapPin, Clock, Layout, Globe, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import Link from "next/link";
import { LuBuilding2, LuPhone, LuMail, LuBriefcase } from "react-icons/lu";
import { BiMessageAltDots } from "react-icons/bi";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaMedium,
  FaStackOverflow,
  FaXTwitter,
  FaTiktok,
  FaReddit,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaPinterest,
  FaSnapchat,
  FaTwitch,
  FaSlack,
  FaDribbble,
  FaBehance,
  FaSpotify,
  FaSoundcloud,
  FaPatreon,
  FaThreads,
  FaMastodon,
  FaTumblr,
  FaQuora,
} from "react-icons/fa6";
import { RiContactsLine } from "react-icons/ri";
import { SiBluesky, SiFigma, SiKakaotalk, SiLine, SiProducthunt, SiSignal, SiViber, SiWechat } from "react-icons/si";
import { getStatusBadge } from "@/lib/ContactStatusBadge";
interface ContactDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId?: string | null;
}


const platforms = [
  { key: "linkedin", icon: FaLinkedin },
  { key: "twitter", icon: FaXTwitter },
  { key: "github", icon: FaGithub },
  { key: "instagram", icon: FaInstagram },
  { key: "facebook", icon: FaFacebook },
  { key: "youtube", icon: FaYoutube },
  { key: "tiktok", icon: FaTiktok },
  { key: "reddit", icon: FaReddit },
  { key: "threads", icon: FaThreads },
  { key: "whatsapp", icon: FaWhatsapp },
  { key: "telegram", icon: FaTelegram },
  { key: "discord", icon: FaDiscord },
  { key: "medium", icon: FaMedium },
  { key: "stackoverflow", icon: FaStackOverflow },
  { key: "bluesky", icon: SiBluesky },
  { key: "pinterest", icon: FaPinterest },
  { key: "snapchat", icon: FaSnapchat },
  { key: "twitch", icon: FaTwitch },
  { key: "slack", icon: FaSlack },
  { key: "dribbble", icon: FaDribbble },
  { key: "behance", icon: FaBehance },
  { key: "spotify", icon: FaSpotify },
  { key: "soundcloud", icon: FaSoundcloud },
  { key: "patreon", icon: FaPatreon },
  { key: "mastodon", icon: FaMastodon },
  { key: "tumblr", icon: FaTumblr },
  { key: "quora", icon: FaQuora },
  { key: "signal", icon: SiSignal },
  { key: "viber", icon: SiViber },
  { key: "line", icon: SiLine },
  { key: "wechat", icon: SiWechat },
  { key: "kakaotalk", icon: SiKakaotalk },
  { key: "producthunt", icon: SiProducthunt },
  { key: "figma", icon: SiFigma },
];

import { useGetContactDetailsQuery } from "@/redux/apis/ContactApis";

const ContactDetails = ({
  open,
  onOpenChange,
  selectedId,
}: ContactDetailsProps) => {
  const {
    data: contact,
    isLoading,
    error,
    refetch,
  } = useGetContactDetailsQuery(selectedId as string, {
    skip: !selectedId || !open,
  });

  const socialEntries = contact?.socialLinks
    ? Object.entries(contact.socialLinks).slice(0, 8)
    : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 sm:w-125 inset-5 inset-s-auto h-auto rounded-xl p-0 sm:max-w-none shadow-2xl border-l-0">
        <SheetHeader className="border-b bg-muted/30 p-4">
          <SheetTitle className="flex items-start gap-1 text-lg font-semibold">
            <RiContactsLine className="size-5 text-blue-500 mt-1" />
            <span>Contact Overview</span>
          </SheetTitle>
        </SheetHeader>

        <SheetBody className="p-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-6 space-y-8">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="size-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-16 rounded-xl" />
                    <Skeleton className="h-16 rounded-xl" />
                  </div>
                  <Skeleton className="h-40 rounded-xl" />
                </div>
              ) : error ? (
                <ErrorState
                  onRetry={() => refetch()}
                  message="Failed to load contact details. Please check your connection."
                />
              ) : contact ? (
                <>
                  {/* Contact Header */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-16 border-[3px] border-background shadow-md">
                        {contact.avatar ? (
                          <AvatarImage
                            className="object-cover"
                            src={contact.avatar}
                            alt={contact.name}
                          />
                        ) : (
                          <AvatarFallback className="text-xl bg-primary/10 text-primary font-semibold">
                            {contact.name
                              ? contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                              : "?"}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h2 className="text-xl font-bold tracking-tight text-foreground/90 truncate">
                            {contact.name}
                          </h2>
                          {getStatusBadge(contact.status)}
                        </div>

                        {contact.position && (
                          <span className="text-sm font-medium text-primary flex items-center gap-1.5 mb-3 w-fit bg-primary/10 px-2 py-0.5 rounded-md">
                            <LuBriefcase className="size-3.5" />
                            <span className="truncate">{contact.position}</span>
                          </span>
                        )}

                        <div className="flex flex-col gap-2 mt-1">
                          {contact.email && (
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all group w-fit"
                            >
                              <div className="size-6 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                <LuMail className="size-3.5" />
                              </div>
                              <span className="truncate max-w-50">
                                {contact.email}
                              </span>
                            </a>
                          )}
                          {contact.phone && (
                            <a
                              href={`tel:${contact.phone}`}
                              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all group w-fit"
                            >
                              <div className="size-6 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                <LuPhone className="size-3.5" />
                              </div>
                              <span>{contact.phone}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Company */}
                    {contact.company && (
                      <div className="pt-4 border-t border-border/60 space-y-3">
                        <Link
                          href={contact.company.website || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 group w-fit"
                        >
                          <Avatar className="size-10 rounded-md border border-border shadow-sm group-hover:border-primary/50 transition-colors">
                            <AvatarImage
                              className="object-cover"
                              src={contact.company.logo ?? undefined}
                              alt={contact.company.name || "Company"}
                            />
                            <AvatarFallback className="rounded-md bg-muted text-muted-foreground">
                              <LuBuilding2 className="size-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
                              Company
                            </span>
                            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-none flex items-center gap-1">
                              {contact.company.name || "—"}
                              <ExternalLink className="size-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                            </span>
                            {contact.company.website && (
                              <span className="text-[11px] text-muted-foreground/70 mt-0.5">
                                {contact.company.website}
                              </span>
                            )}
                          </div>
                        </Link>

                        {(contact.company.employeeRange ||
                          contact.company.estimatedArr) && (
                            <div className="flex flex-wrap gap-2">
                              {contact.company.employeeRange && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] px-1.5 py-0 bg-secondary/40 text-secondary-foreground/80 font-medium border-0"
                                >
                                  {contact.company.employeeRange} emps
                                </Badge>
                              )}
                              {contact.company.estimatedArr && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] px-1.5 py-0 bg-secondary/40 text-secondary-foreground/80 font-medium border-0"
                                >
                                  {contact.company.estimatedArr} ARR
                                </Badge>
                              )}
                            </div>
                          )}

                        {contact.company.description && (
                          <p className="text-xs text-muted-foreground/80 leading-relaxed italic line-clamp-3">
                            &rdquo;{contact.company.description}&rdquo;
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Last Contacted & Added */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 bg-muted/30 rounded-lg p-3 border border-border/50">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <Clock className="size-3 text-blue-500/70" />
                        Last Contacted
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        {format(new Date(contact.lastContacted), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 bg-muted/30 rounded-lg p-3 border border-border/50">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <User className="size-3 text-emerald-500/70" />
                        Added
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        {format(new Date(contact.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  {(contact.address || contact.city || contact.country) && (
                    <div className="flex items-start gap-3">
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-1.5 shrink-0">
                        <MapPin className="size-4 text-rose-500/70" />
                        Address :
                      </h4>
                      <p className="text-sm font-semibold text-foreground leading-relaxed">
                        {[
                          contact.address,
                          contact.city,
                          contact.state,
                          contact.zip,
                          contact.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Note */}
                  <div className="space-y-3 pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                      <Layout className="size-4 text-primary/70" />
                      Note :
                    </div>
                    <div className="px-2 bg-muted/5 min-h-6 text-sm leading-relaxed text-foreground/80">
                      {contact.note || (
                        <em className="opacity-50">
                          No note added for this contact.
                        </em>
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  {socialEntries.length > 0 && (
                    <div className="space-y-4 pt-6 border-t">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                        <Globe className="size-4 text-primary/70" />
                        Social Profiles
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {socialEntries.map(([platform, url]) => {
                          const Icon = platforms.find((p) => p.key === platform)?.icon;
                          return (
                            <Link
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-200"
                            >
                              <div className="size-4 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                                {Icon ? (
                                  <Icon className="size-3.5" />
                                ) : (
                                  <span className="text-[10px] font-bold uppercase">
                                    {platform.slice(0, 2)}
                                  </span>
                                )}
                              </div>
                              <span className="capitalize">{platform}</span>
                              <ExternalLink className="size-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Follow Up action hint */}
                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-medium">
                      <BiMessageAltDots className="size-4 text-blue-500/50" />
                      Use the Follow Up action from the contacts list to update
                      status &amp; notes.
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </ScrollArea>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default ContactDetails;
