import AvatarMenu from "@/components/layouts/AvatarMenu";
import DesktopMenu from "@/components/layouts/DesktopMenu";
import LogoLink from "@/components/layouts/LogoLink";
import MobileSheetMenu from "@/components/layouts/MobileSheetMenu";
import UpgradeSubscriptionBadge from "@/components/layouts/UpgradeSubscriptionBadge";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 2xl:mx-auto 2xl:max-w-screen-xl">
        {children}
      </main>
    </section>
  );
}

function Navbar() {
  return <nav className="flex justify-between items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 h-14">
    <div className="hidden md:block">
      <LogoLink />
    </div>
    <MobileSheetMenu />
    <AvatarMenu />
  </nav>
}

