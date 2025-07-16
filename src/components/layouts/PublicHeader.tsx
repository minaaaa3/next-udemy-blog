import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import SearchBox from "@/components/post/SearchBox";
export default function PublicHeader() {
  return (
    <header className="border-b bg-blue-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" className="text-xl font-bold">
                <NavigationMenuLink asChild>Blog</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <SearchBox />
          <Button variant="outline" asChild>
            <Link href="/login" className="text-sm font-medium hover:underline">
              ログイン
            </Link>
          </Button>
          <Button asChild>
            <Link href="/register">登録</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
