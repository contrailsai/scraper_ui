import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Reel_card({ reel }) {
    const videoRef = useRef(null);
    // const [video, set_video] = useState(reel.is_video ? reel.video_data : null);
    const [playing, setPlaying] = useState(false);
    const [show_thumbnail, set_show_thumbnail] = useState(false);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    const handleDownload = async () => {
        try {
            // setStatus('downloading');
            const encodedUrl = encodeURIComponent(reel.is_video ? reel.video_data.url: reel.reel_thumbnail_url);
            window.location.href = `/api/download_video?url=${encodedUrl}&&filename=${reel.code}.${reel.is_video? "mp4": "jpg"}`;
        } catch (err) {
            console.error('Download failed:', err);
            // setStatus('error');
        }
    };

    return (
        <Card className="overflow-hidden">
            <div className="relative aspect-[9/16] bg-gray-100">

                <div className="absolute inset-0 flex items-center justify-center z-30 hover:opacity-100 opacity-0 transition-all ">
                    <Button
                        variant="outline"
                        size="icon"
                        className={` ${reel.is_video ? "" : "hidden"} rounded-full bg-black/50 text-white hover:opacity-60 transition-all cursor_pointer`}
                        onClick={() => {
                            if (playing) {
                                videoRef.current.pause();
                            } else {
                                videoRef.current.play();
                            }
                            setPlaying(!playing);
                            set_show_thumbnail(true);
                        }}
                    >
                        {
                            playing ?
                                <Pause className="h-6 w-6" />
                                :
                                <Play className="h-6 w-6" />
                        }
                    </Button>
                </div>

                <Image
                    src={reel.reel_thumbnail_url || "/placeholder.svg"}
                    alt={`Reel ${reel.code}`}
                    fill
                    className={`object-cover ${show_thumbnail ? "opacity-0" : "opacity-100"} z-20 transition-all`}
                />
                {
                    reel.is_video &&
                    <video
                        ref={videoRef}
                        // controls
                        // width="600"
                        src={reel.video_data.url}
                        className={`object-cover ${!show_thumbnail ? "opacity-0" : "opacity-100"} z-10 transition-all`}
                    >
                        reel video
                    </video>
                }
            </div>
            <CardContent className="p-4">
                <p className="text-sm line-clamp-2 mb-2">{reel.caption.text}</p>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatNumber(reel.like_count)} likes</span>
                    <span>{formatNumber(reel.comment_count)} comments</span>
                </div>
                <div className="mt-3 flex justify-between">
                    <Button variant="outline" size="sm">
                        {/* <Instagram className="h-4 w-4 mr-2" /> */}
                        <Link href={`https://instagram.com/reel/${reel.code}`} target="_blank" >
                            View on Instagram
                        </Link>
                    </Button>
                    <Button onClick={handleDownload} variant="ghost" size="sm">
                        Download
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
