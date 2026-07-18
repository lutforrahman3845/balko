import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "Support", "Community", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies"],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Image
              src="/logo/balcofullwhite.svg"
              alt="Balko"
              width={140}
              height={40}
              className="h-8 w-auto dark:hidden"
            />
            <Image
              src="/logo/balcofullblack.svg"
              alt="Balko"
              width={140}
              height={40}
              className="hidden h-8 w-auto dark:block"
            />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The CRM and project management platform that keeps your team in
              sync.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Balko. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with care for growing teams.
          </p>
        </div>
      </div>
    </footer>
  );
}
