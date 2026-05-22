"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
} from "@/components/ui/sheet";
import { User, MapPin, Clock, Layout, Globe, ExternalLink, Mail, Phone, GlobeIcon, Briefcase, CalendarClock, StickyNote } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import Link from "next/link";
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
import { RiBuilding2Line } from "react-icons/ri";
import { SiBluesky, SiFigma, SiKakaotalk, SiLine, SiProducthunt, SiSignal, SiViber, SiWechat } from "react-icons/si";
import { getConnectionStrengthBadge } from "@/lib/CompanyConnectionBadge";



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

import { useGetCompanyDetailsQuery } from "@/redux/apis/CompaniesApis";

const CompaniesDetails = ({
  open,
  onOpenChange,
  selectedId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId: string | null;
}) => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetCompanyDetailsQuery(selectedId as string, {
    skip: !selectedId || !open,
  });
  const company = data;
  const socialEntries = company?.socialLinks
    ? Object.entries(company.socialLinks).filter(([url]) => !!url)
    : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 sm:w-140 inset-5 inset-s-auto h-auto rounded-xl p-0 sm:max-w-none shadow-2xl border-l-0">
        <SheetHeader className="border-b bg-muted/30 p-4">
          <SheetTitle className="flex items-start gap-1 text-lg font-semibold">
            <RiBuilding2Line className="size-5 text-blue-500 mt-1" />
            <span>Company Overview</span>
          </SheetTitle>
        </SheetHeader>

        <SheetBody className="p-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-6 space-y-8">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="size-16 rounded-xl" />
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
                  message="Failed to load company details. Please check your connection."
                />
              ) : company ? (
                <>
                  {/* Company Header */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-16 rounded-xl border-[3px] border-background shadow-md overflow-hidden">
                        {company.logo ? (
                          <AvatarImage
                            className="object-cover"
                            src={company.logo}
                            alt={company.name}
                          />
                        ) : (
                          <AvatarFallback className="text-xl bg-primary/10 text-primary font-semibold rounded-none">
                            {company.name
                              ? company.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                              : "?"}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex flex-col min-w-0">
                            <h2 className="text-xl font-bold tracking-tight text-foreground/90 truncate">
                              {company.name}
                            </h2>
                          </div>
                          {getConnectionStrengthBadge(company.connectionStrength)}
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {company.companyTypes?.map((type) => (
                            <Badge key={type.id} variant="secondary" className="text-[10px] py-0 bg-secondary/50">
                              {type.name}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                          {company.website && (
                            <Link
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all group w-fit"
                            >
                              <div className="size-6 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                <GlobeIcon className="size-3.5" />
                              </div>
                              <span className="truncate max-w-40 text-xs font-medium">
                                {company.website.replace(/^https?:\/\//, "")}
                              </span>
                            </Link>
                          )}
                          {company.email && (
                            <a
                              href={`mailto:${company.email}`}
                              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all group w-fit"
                            >
                              <div className="size-6 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                <Mail className="size-3.5" />
                              </div>
                              <span className="truncate max-w-40 text-xs font-medium">
                                {company.email}
                              </span>
                            </a>
                          )}
                          {company.phone && (
                            <a
                              href={`tel:${company.phone}`}
                              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all group w-fit"
                            >
                              <div className="size-6 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                <Phone className="size-3.5" />
                              </div>
                              <span className="truncate max-w-40 text-xs font-medium">
                                {company.phone}
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ARR, Employees & Last Contacted */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 bg-muted/30 rounded-lg p-3 border border-border/50">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <Clock className="size-3 text-blue-500/70" />
                        Estimated ARR
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        {company.estimatedArr || "—"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 bg-muted/30 rounded-lg p-3 border border-border/50">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <User className="size-3 text-emerald-500/70" />
                        Employees
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        {company.employeeRange || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Description & Notes */}
                  <div className="grid gap-6">
                    {company.description && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                          <Layout className="size-4 text-primary/70" />
                          Description :
                        </div>
                        <div className="px-4 py-3 bg-primary/2 rounded-xl border border-primary/10 text-sm leading-relaxed text-foreground/80 relative italic shadow-sm">
                          <span className="absolute -top-2 left-3 bg-background px-1 text-primary/30">
                            &ldquo;
                          </span>
                          {company.description}
                          <span className="absolute -bottom-4 right-3 text-primary/30 text-2xl font-serif">
                            &rdquo;
                          </span>
                        </div>
                      </div>
                    )}
                    {(company.lastInteractionAt || company.note) && (
                      <div className="space-y-0 rounded-xl border border-border/50 overflow-hidden">
                        {/* Last Contacted row */}
                        <div className="flex items-center justify-between px-4 py-3 bg-blue-500/5 border-b border-blue-500/10">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <CalendarClock className="size-3 text-blue-400/70" />
                            Last Contacted
                          </span>
                          <span className="text-xs font-semibold text-foreground">
                            {company.lastInteractionAt
                              ? format(new Date(company.lastInteractionAt), "MMM d, yyyy 'at' HH:mm")
                              : "—"}
                          </span>
                        </div>
                        {/* Note */}
                        {company.note && (
                          <div className="px-4 py-3 bg-amber-500/5">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                              <StickyNote className="size-3 text-amber-400/70" />
                              Note
                            </div>
                            <p className="text-sm leading-relaxed text-foreground/80 italic">{company.note}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Contacts */}
                  <div className="space-y-4 pt-6 border-t font-semibold">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                        <User className="size-4 text-primary/70" />
                        Associated Contacts
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold h-5 px-2 bg-background">
                        {company.contacts?.length || 0}
                      </Badge>
                    </div>

                    <div className="grid gap-2">
                      {company.contacts && company.contacts.length > 0 ? (
                        company.contacts.map((contact) => (
                          <Link
                            key={contact.id}
                            href={`/contacts/${contact.id}`}
                            className="flex flex-col gap-2 p-3 rounded-xl hover:bg-muted/50 border border-border/40 hover:border-primary/30 transition-all group bg-card"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="size-10 border border-border/50 group-hover:border-primary/30 transition-colors">
                                <AvatarImage src={contact.avatar} alt={contact.name} className="object-cover" />
                                <AvatarFallback className="bg-muted text-[10px] font-bold uppercase text-primary">
                                  {contact.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                    {contact.name}
                                  </span>
                                  <ExternalLink className="size-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                                </div>
                                <span className="text-[11px] text-muted-foreground truncate flex items-center gap-1.5 leading-none mt-1">
                                  <Briefcase className="size-3 text-muted-foreground/60" />
                                  {contact.position}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/20">
                              {contact.email && (
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70 decoration-muted-foreground/30 hover:underline">
                                  <Mail className="size-3" />
                                  <span>{contact.email}</span>
                                </div>
                              )}
                              {contact.phone && (
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
                                  <Phone className="size-3" />
                                  <span>{contact.phone}</span>
                                </div>
                              )}
                              {contact.lastContacted && (
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/70 ml-auto">
                                  <CalendarClock className="size-3 text-blue-400/70" />
                                  <span>Last contacted {format(new Date(contact.lastContacted), "MMM d, yyyy")}</span>
                                </div>
                              )}
                            </div>
                            {contact.note && (
                              <div className="flex items-start gap-2 mt-1 px-3 py-2 bg-amber-500/5 rounded-lg border border-amber-500/10">
                                <StickyNote className="size-3 text-amber-400/70 mt-0.5 shrink-0" />
                                <p className="text-[11px] text-muted-foreground/80 leading-relaxed italic">{contact.note}</p>
                              </div>
                            )}
                          </Link>
                        ))
                      ) : (
                        <div className="py-8 flex flex-col items-center justify-center bg-muted/20 rounded-xl border border-dashed border-border/60 text-muted-foreground">
                          <User className="size-8 opacity-20 mb-2" />
                          <p className="text-xs font-medium">No contacts associated</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  {(company.address || company.city || company.country) && (
                    <div className="flex items-start gap-3 pt-6 border-t">
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-1.5 shrink-0">
                        <MapPin className="size-4 text-rose-500/70" />
                        Address :
                      </h4>
                      <p className="text-sm font-semibold text-foreground leading-relaxed">
                        {[
                          company.address,
                          company.city,
                          company.state,
                          company.zip,
                          company.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  )}

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

                  {/* Footer Stats */}
                  <div className="pt-6 border-t">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground/60 font-medium bg-muted/20 px-4 py-2 rounded-lg border border-border/40 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3" />
                        <span>Updated {format(new Date(company.updatedAt), "HH:mm, MMM d")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <RiBuilding2Line className="size-3" />
                        <span>Added {format(new Date(company.createdAt), "MMM d, yyyy")}</span>
                      </div>
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

export default CompaniesDetails;