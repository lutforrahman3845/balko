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
import {
  SiBluesky,
  SiSignal,
  SiViber,
  SiLine,
  SiWechat,
  SiKakaotalk,
  SiProducthunt,
  SiFigma,
} from "react-icons/si";
import { LuGlobe, LuPlus, LuTrash2 } from "react-icons/lu";
import { useMemo, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { CompanyCreateFormValues } from "@/@types/company";
import FormItem from "@/components/shared/FormItem";
import CustomeSelect from "@/components/shared/CustomeSelect";
import { Button } from "@/components/ui/button";

export const SOCIAL_PLATFORMS = [
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedin },
  { key: "twitter", label: "X (Twitter)", icon: FaXTwitter },
  { key: "github", label: "GitHub", icon: FaGithub },
  { key: "instagram", label: "Instagram", icon: FaInstagram },
  { key: "facebook", label: "Facebook", icon: FaFacebook },
  { key: "youtube", label: "YouTube", icon: FaYoutube },
  { key: "tiktok", label: "TikTok", icon: FaTiktok },
  { key: "reddit", label: "Reddit", icon: FaReddit },
  { key: "threads", label: "Threads", icon: FaThreads },
  { key: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
  { key: "telegram", label: "Telegram", icon: FaTelegram },
  { key: "discord", label: "Discord", icon: FaDiscord },
  { key: "medium", label: "Medium", icon: FaMedium },
  { key: "stackoverflow", label: "Stack Overflow", icon: FaStackOverflow },
  { key: "bluesky", label: "BlueSky", icon: SiBluesky },
  { key: "pinterest", label: "Pinterest", icon: FaPinterest },
  { key: "snapchat", label: "Snapchat", icon: FaSnapchat },
  { key: "twitch", label: "Twitch", icon: FaTwitch },
  { key: "slack", label: "Slack", icon: FaSlack },
  { key: "dribbble", label: "Dribbble", icon: FaDribbble },
  { key: "behance", label: "Behance", icon: FaBehance },
  { key: "spotify", label: "Spotify", icon: FaSpotify },
  { key: "soundcloud", label: "Soundcloud", icon: FaSoundcloud },
  { key: "patreon", label: "Patreon", icon: FaPatreon },
  { key: "mastodon", label: "Mastodon", icon: FaMastodon },
  { key: "tumblr", label: "Tumblr", icon: FaTumblr },
  { key: "quora", label: "Quora", icon: FaQuora },
  { key: "signal", label: "Signal", icon: SiSignal },
  { key: "viber", label: "Viber", icon: SiViber },
  { key: "line", label: "Line", icon: SiLine },
  { key: "wechat", label: "WeChat", icon: SiWechat },
  { key: "kakaotalk", label: "KakaoTalk", icon: SiKakaotalk },
  { key: "producthunt", label: "Product Hunt", icon: SiProducthunt },
  { key: "figma", label: "Figma", icon: SiFigma },
];

interface CompaniesSocialLinksProps {
  control: Control<CompanyCreateFormValues>;
  errors: FieldErrors<CompanyCreateFormValues>;
  setValue: UseFormSetValue<CompanyCreateFormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unregister: any;
}

const CompaniesSocialLinks = ({
  control,
  errors,
  setValue,
  unregister,
}: CompaniesSocialLinksProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  const socialLinks = useWatch({
    control,
    name: "socialLinks",
  });

  const activePlatforms = useMemo(() => {
    return SOCIAL_PLATFORMS.filter(
      (p) => socialLinks && socialLinks[p.key] !== undefined,
    );
  }, [socialLinks]);

  const availablePlatforms = useMemo(() => {
    return SOCIAL_PLATFORMS.filter(
      (p) => !activePlatforms.some((active) => active.key === p.key),
    ).map((p) => ({
      value: p.key,
      label: (
        <div className="flex items-center gap-2">
          <p.icon className="size-4 opacity-70" />
          <span>{p.label}</span>
        </div>
      ),
      searchText: p.label,
    }));
  }, [activePlatforms]);

  const handleAddSocial = (val: string | string[]) => {
    const key = Array.isArray(val) ? val[0] : val;
    if (key) {
      setValue(`socialLinks.${key}`, "", { shouldDirty: true });
      setSelectedPlatform("");
    }
  };

  const handleRemoveSocial = (key: string) => {
    unregister(`socialLinks.${key}`);
  };

  return (
    <div className="md:col-span-2 space-y-4 mt-8 pb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary">
          <LuGlobe className="size-4" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Social Profiles
            <span className="text-red-500 ml-1 text-xs">*</span>
          </h3>
        </div>
        {availablePlatforms.length > 0 && (
          <div className="w-64">
            <CustomeSelect
              name="social-selector"
              placeholder="Add social media link"
              options={availablePlatforms}
              onChange={handleAddSocial}
              value={selectedPlatform}
              className="h-9 text-xs"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2  gap-x-6 gap-y-4 bg-gray-50/50 dark:bg-gray-800/50 p-2 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 min-h-25">
        {activePlatforms.length > 0 ? (
          activePlatforms.map((platform) => (
            <div key={platform.key} className="relative group">
              <Controller
                name={`socialLinks.${platform.key}`}
                control={control}
                render={({ field }) => (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <FormItem
                        label={
                          <div className="flex items-center gap-2">
                            <platform.icon className="size-3.5 text-muted-foreground" />
                            <span>{platform.label} URL</span>
                          </div>
                        }
                        inputType="text"
                        placeholder={`https://${platform.key}.com/username`}
                        invalid={Boolean(errors.socialLinks?.[platform.key])}
                        errorMessage={
                          errors.socialLinks?.[platform.key]?.message
                        }
                        {...field}
                        value={field.value || ""}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-10 mb-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
                      onClick={() => handleRemoveSocial(platform.key)}
                    >
                      <LuTrash2 className="size-4" />
                    </Button>
                  </div>
                )}
              />
            </div>
          ))
        ) : (
          <div className="md:col-span-2 flex flex-col items-center justify-center py-6 text-muted-foreground border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
            <LuPlus className="size-8 opacity-20 mb-2" />
            <p className="text-xs font-medium uppercase tracking-widest opacity-60">
              No Social Profiles Added
            </p>
          </div>
        )}
      </div>
      {errors.socialLinks &&
        typeof errors.socialLinks === "object" &&
        "message" in errors.socialLinks && (
          <p className="text-red-500 text-sm mt-1">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(errors.socialLinks as any).message}
          </p>
        )}
    </div>
  );
};

export default CompaniesSocialLinks;
