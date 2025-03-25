
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

export const metadata = {
  title: "Contrails | Scraper UI",
}

export default function Page() {
  return (
    <div className="px-5 pt-5 flex flex-col gap-3">
      {/* LINK DOWNLOADER CARD */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Playground</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            Download Video from Social Media
          </CardTitle>
          {/* <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <Link href={'/playground/scrape-video'} className=" hover:underline line-clamp-1 flex gap-2 font-medium">
            Open playground <TrendingUpIcon className="size-4" />
          </Link>
          <div className="text-muted-foreground">
            Supports major social media platforms
          </div>
        </CardFooter>
      </Card>

      {/* INSTAGRAM PROFILE GET DATA CARD  */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Instagram</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            Get any Instagram Profile and its Videos
          </CardTitle>
          {/* <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div> */}
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <Link href={'/profile-extraction/instagram'} className=" hover:underline line-clamp-1 flex gap-2 font-medium">
            Open profile scraper <TrendingUpIcon className="size-4" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
