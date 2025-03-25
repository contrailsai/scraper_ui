import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function Video_content({ video_data }) {
    const videoRef = useRef(null);
    const [metadata, setMetadata] = useState({ duration: 0, width: 0, height: 0 });

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handleLoadedMetadata = () => {
                console.log(videoElement);
                setMetadata({
                    duration: videoElement.duration,
                    width: videoElement.videoWidth,
                    height: videoElement.videoHeight,
                });
            };

            videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

            return () => {
                videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
            };
        }
    }, [video_data]);

    const handleDownload = async () => {
        try {
            const encodedUrl = encodeURIComponent(video_data.data.video_url);
            window.location.href = `/nextapi/download_video?url=${encodedUrl}&&filename=${video_data.data.filename}`;
        } catch (err) {
            console.error('Download failed:', err);
        }
    };

    if (video_data !== null && video_data.context === "success") {
        // const video_data= {
        //     "context": "success",
        //     "data": {
        //       "video_url": "https://video.twimg.com/amplify_video/1651375696743129090/vid/1920x1080/GWvXwDqqO9uQlSuC.mp4?tag=16",
        //       "filename": "twitter_1651376097349578753.mp4"
        //     }

        return (
            <div className="w-full flex flex-wrap gap-10 items-start px-10 ">

                <div className="mt-4">
                    <h3 className="text-2xl mb-2">Video Preview</h3>
                    <video
                        ref={videoRef}
                        controls
                        width="600"
                        src={video_data.data.video_url}
                        className="rounded-lg border-2 border-gray-100 max-h-[80vh]"
                    >
                    </video>
                </div>

                <div className="px-4 h-full mt-14 ">
                    <div className="border-gray-100 border-2 rounded-lg p-4">
                        <h2 className="text-2xl mb-2">Video Details</h2>
                        <p className="mb-2">
                            <span className="font-semibold">Filename:</span> {video_data.data.filename}
                        </p>
                        <p className="mb-2 truncate xl:max-w-[400px] max-w-[700px]">
                            <span className="font-semibold">Video URL:</span>{" "}
                            <a
                                href={video_data.data.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                            >
                                {video_data.data.video_url}
                            </a>
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Duration:</span> {metadata.duration.toFixed(2)} seconds
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Resolution:</span> {metadata.width}x{metadata.height}
                        </p>
                    </div>
                    <Button onClick={handleDownload} className="mt-4 px-14 py-2 cursor-pointer transition-all">
                        Download video
                    </Button>
                </div>
            </div>
        );
    }
}
