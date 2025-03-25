"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputForm } from "./form";
import { Video_content } from "./video_content";
import { useState } from "react";

export const Page_container = () => {
    const [video_data, set_video_data] = useState(null);

    const supported_sites = [
        'youtube',
        'instagram',
        'facebook',
        'twitter/x',
        'reddit',
        'vimeo',
        'tiktok',
        'snapchat',
        'pinterest',
        'twitch clips',
        'loom',
        'soundcloud',
        'bilibili',
        'bluesky',
        'dailymotion',
        'ok.ru',
        'rutube',
        'streamable',
        'tumblr',
        'vk videos & clips',
        'xiaohongshu'
    ]

    return (
        <>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Enter the social media url where the video is in view  </CardTitle>
                </CardHeader>
                <CardContent>
                    <InputForm set_video_data={set_video_data} />
                </CardContent>
            </Card>

            {/* SUPPORTED PLATFORMS */}
            <div className="my-10 border-y-2 pt-2 pb-4 ">
                <h2 className="mb-3">
                    Supported social media websites
                </h2>
                <div className="flex flex-wrap gap-2">
                    {
                        supported_sites.map((val, idx) => (
                            <Badge key={idx}>{val}</Badge>
                        ))
                    }
                </div>
            </div>

            <Video_content video_data={video_data} />
        </>
    )
}