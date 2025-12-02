"use client";

import { useCommandState } from "cmdk";
import {
  BadgeCheckIcon,
  BriefcaseBusinessIcon,
  CircleUserIcon,
  ComponentIcon as ComponentLucideIcon,
  ContrastIcon,
  CornerDownLeftIcon,
  CpuIcon,
  DownloadIcon,
  FolderGit2Icon,
  LetterTextIcon,
  MedalIcon,
  MessageCircleMoreIcon,
  MoonStarIcon,
  RssIcon,
  SearchIcon,
  SunMediumIcon,
  TextIcon,
  TriangleDashedIcon,
  TypeIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

import { socialLinks } from "@/config/Hero";
import { useUmami } from "@/hooks/use-umami";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { copyText } from "@/lib/utils/copy";

import { ChanhDaiMark, getMarkSVG } from "./chanhdai-mark";
import { getWordmarkSVG } from "./chanhdai-wordmark";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type CommandLinkItem = {
  title: string;
  href: string;

  icon?: React.ComponentType<{ className?: string }>;
  iconImage?: string;
  keywords?: string[];
  openInNewTab?: boolean;
};

type CommandMenuPost = {
  slug: string;
  metadata?: {
    title?: string;
    category?: string;
  };
  frontmatter?: {
    title?: string;
  };
  title?: string;
};

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: "Portfolio",
    href: "/",
    icon: ChanhDaiMark,
  },
  {
    title: "Components",
    href: "/components",
    icon: ComponentLucideIcon,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: RssIcon,
  },
];

const PORTFOLIO_LINKS: CommandLinkItem[] = [
  {
    title: "About",
    href: "/#about",
    icon: LetterTextIcon,
  },
  {
    title: "Tech Stack",
    href: "/#stack",
    icon: CpuIcon,
  },
  {
    title: "Experience",
    href: "/#experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Projects",
    href: "/#projects",
    icon: FolderGit2Icon,
  },
  {
    title: "Honors & Awards",
    href: "/#awards",
    icon: MedalIcon,
  },
  {
    title: "Certifications",
    href: "/#certs",
    icon: BadgeCheckIcon,
  },
  {
    title: "Testimonials",
    href: "/#testimonials",
    icon: MessageCircleMoreIcon,
  },
  {
    title: "Download vCard",
    href: "/vcard",
    icon: CircleUserIcon,
  },
];

const socialLinkIconToComponent = (
  icon: React.ReactElement<{ className?: string }>
) => {
  const IconComponent = ({ className }: { className?: string }) =>
    React.cloneElement(icon, {
      className: cn("size-4", icon.props.className, className),
    });

  return IconComponent;
};

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = socialLinks.map((item) => ({
  title: item.name,
  href: item.href,
  icon: socialLinkIconToComponent(item.icon),
  openInNewTab: true,
}));

export function CommandMenu({ posts = [] }: { posts?: CommandMenuPost[] }) {
  const router = useRouter();

  const { setTheme, resolvedTheme } = useTheme();
  const { trackEvent: trackUmamiEvent } = useUmami();

  const [open, setOpen] = useState(false);

  const trackEvent = useCallback(
    (event: { name: string; properties?: Record<string, unknown> }) => {
      const data: Record<string, string | number | boolean> = {};

      Object.entries(event.properties ?? {}).forEach(([key, value]) => {
        if (value === undefined) return;

        if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
        ) {
          data[key] = value;
        } else {
          data[key] = String(value);
        }
      });

      trackUmamiEvent({
        name: "external_link_click",
        data: { event: event.name, ...data },
      });
    },
    [trackUmamiEvent]
  );

  useHotkeys("mod+k, slash", (e) => {
    e.preventDefault();

    setOpen((open) => {
      if (!open) {
        trackEvent({
          name: "open_command_menu",
          properties: {
            method: "keyboard",
            key: e.key === "/" ? "/" : e.metaKey ? "cmd+k" : "ctrl+k",
          },
        });
      }
      return !open;
    });
  });



  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false);

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "navigate",
          href: href,
          open_in_new_tab: openInNewTab,
        },
      });

      if (openInNewTab) {
        window.open(href, "_blank", "noopener");
      } else {
        router.push(href);
      }
    },
    [router, trackEvent]
  );

  const handleCopyText = useCallback((text: string, message: string) => {
    setOpen(false);

    trackEvent({
      name: "command_menu_action",
      properties: {
        action: "copy",
        text: text,
      },
    });

    copyText(text);
    toast.success(message);
  }, [trackEvent]);

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      setOpen(false);

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "change_theme",
          theme: theme,
        },
      });

      setTheme(theme);

      // if (!document.startViewTransition) {
      //   setTheme(theme);
      //   return;
      // }

      // document.startViewTransition(() => setTheme(theme));
    },
    [setTheme, trackEvent]
  );

  const { componentLinks, blogLinks } = useMemo(() => {
    const normalizedPosts = posts ?? [];

    return {
      componentLinks: normalizedPosts
        .filter((post) => post.metadata?.category === "components")
        .map(postToCommandLinkItem),
      blogLinks: normalizedPosts
        .filter((post) => post.metadata?.category !== "components")
        .map(postToCommandLinkItem),
    };
  }, [posts]);

  return (
    <>
      <Button
        variant="secondary"
        className="h-8 gap-1.5 rounded-full border border-input bg-white px-2.5 text-muted-foreground shadow-xs select-none hover:bg-white dark:bg-input/30 dark:hover:bg-input/30"
        onClick={() => {
          setOpen(true);
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "click",
            },
          });
        }}
      >
        <SearchIcon aria-hidden />

        <span className="font-sans text-sm/4 font-medium sm:hidden">
          Search
        </span>

        <KbdGroup className="hidden sm:in-[.os-macos_&]:flex">
          <Kbd className="w-5 min-w-5">⌘</Kbd>
          <Kbd className="w-5 min-w-5">K</Kbd>
        </KbdGroup>

        <KbdGroup className="hidden sm:not-[.os-macos_&]:flex">
          <Kbd>Ctrl</Kbd>
          <Kbd className="w-5 min-w-5">K</Kbd>
          </KbdGroup>
      </Button>

      <CommandDialog open={open} modal={true} onOpenChange={setOpen}>
        <CommandMenuInput
          onSearch={(value) =>
            trackEvent({
              name: "command_menu_search",
              properties: {
                query: value,
                query_length: value.length,
              },
            })
          }
        />

        <CommandList className="min-h-80 supports-timeline-scroll:scroll-fade-y">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandLinkGroup
            heading="Menu"
            links={MENU_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandLinkGroup
            heading="Portfolio"
            links={PORTFOLIO_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandLinkGroup
            heading="Components"
            links={componentLinks}
            fallbackIcon={ComponentLucideIcon}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandLinkGroup
            heading="Blog"
            links={blogLinks}
            fallbackIcon={TextIcon}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandLinkGroup
            heading="Social Links"
            links={SOCIAL_LINK_ITEMS}
            onLinkSelect={handleOpenLink}
          />

          <CommandSeparator />

          <CommandGroup heading="Brand Assets">
            <CommandItem
              onSelect={() => {
                handleCopyText(
                  getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  "Copied Mark as SVG"
                );
              }}
            >
              <ChanhDaiMark />
              Copy Mark as SVG
            </CommandItem>

            <CommandItem
              onSelect={() => {
                handleCopyText(
                  getWordmarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  "Copied Logotype as SVG"
                );
              }}
            >
              <TypeIcon />
              Copy Logotype as SVG
            </CommandItem>

            <CommandItem
              onSelect={() => handleOpenLink("/blog/chanhdai-brand")}
            >
              <TriangleDashedIcon />
              Brand Guidelines
            </CommandItem>

            <CommandItem asChild>
              <a href="https://assets.chanhdai.com/chanhdai-brand.zip" download>
                <DownloadIcon />
                Download Brand Assets
              </a>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("light")}
            >
              <SunMediumIcon />
              Light
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("dark")}
            >
              <MoonStarIcon />
              Dark
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("system")}
            >
              <ContrastIcon />
              Auto
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <CommandMenuFooter />
      </CommandDialog>
    </>
  );
}
function CommandMenuInput({
  onSearch,
}: {
  onSearch?: (value: string) => void;
}) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.length >= 2) {
      const timeoutId = setTimeout(() => {
        onSearch?.(searchValue);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [onSearch, searchValue]);

  return (
    <CommandInput
      placeholder="Type a command or search..."
      value={searchValue}
      onValueChange={setSearchValue}
    />
  );
}

function Kbd({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded border border-border/70 bg-muted px-1.5 font-mono text-[10px] uppercase text-muted-foreground",
        className
      )}
    >
      {children}
    </kbd>
  );
}

function KbdGroup({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full  bg-transparent  px-2 py-1",
        className
      )}
    >
      {children}
    </span>
  );
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkSelect,
}: {
  heading: string;
  links: CommandLinkItem[];
  fallbackIcon?: React.ComponentType<{ className?: string }>;
  onLinkSelect: (href: string, openInNewTab?: boolean) => void;
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const Icon = link?.icon ?? fallbackIcon;

        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <Image
                className="rounded-sm corner-squircle supports-corner-shape:rounded-[50%]"
                src={link.iconImage}
                alt={link.title}
                width={16}
                height={16}
                unoptimized
              />
            ) : Icon ? (
              <Icon className="size-4" />
            ) : null}
            {link.title}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

type CommandKind = "command" | "page" | "link";

type CommandMetaMap = Map<
  string,
  {
    commandKind: CommandKind;
  }
>;

function buildCommandMetaMap() {
  const commandMetaMap: CommandMetaMap = new Map();

  commandMetaMap.set("Download vCard", { commandKind: "command" });

  commandMetaMap.set("Light", { commandKind: "command" });
  commandMetaMap.set("Dark", { commandKind: "command" });
  commandMetaMap.set("Auto", { commandKind: "command" });

  commandMetaMap.set("Copy Mark as SVG", {
    commandKind: "command",
  });
  commandMetaMap.set("Copy Logotype as SVG", {
    commandKind: "command",
  });
  commandMetaMap.set("Download Brand Assets", {
    commandKind: "command",
  });

  SOCIAL_LINK_ITEMS.forEach((item) => {
    commandMetaMap.set(item.title, {
      commandKind: "link",
    });
  });

  return commandMetaMap;
}

const COMMAND_META_MAP = buildCommandMetaMap();

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  command: "Run Command",
  page: "Go to Page",
  link: "Open Link",
};

function CommandMenuFooter() {
  const selectedCommandKind = useCommandState(
    (state) => COMMAND_META_MAP.get(state.value)?.commandKind ?? "page"
  );

  return (
    <>
      <div className="flex h-10" />

      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 border-t bg-zinc-100/30 px-4 text-xs font-medium dark:bg-zinc-800/30">
        <ChanhDaiMark className="size-6 text-muted-foreground" aria-hidden />

        <div className="flex shrink-0 items-center gap-2">
          <span>{ENTER_ACTION_LABELS[selectedCommandKind]}</span>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <span className="text-muted-foreground">Exit</span>
          <Kbd>Esc</Kbd>
        </div>
      </div>
    </>
  );
}

function postToCommandLinkItem(post: CommandMenuPost): CommandLinkItem {
  const isComponent = post.metadata?.category === "components";
  const title =
    post.metadata?.title ?? post.frontmatter?.title ?? post.title ?? post.slug;

  return {
    title,
    href: isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`,
    keywords: isComponent ? ["component"] : ["blog"],
    icon: isComponent ? ComponentLucideIcon : TextIcon,
  };
}
