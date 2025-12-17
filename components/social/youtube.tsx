"use client";

interface YouTubeEmbedProps {
    url: string;
    title?: string;
}

function getYouTubeVideoId(url: string): string | null {
    const regexPatterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
    ];

    for (const pattern of regexPatterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

export function YtEmbedClient({ url, title = "YouTube Video" }: YouTubeEmbedProps) {
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
        return (
            <div className="my-8 flex justify-center px-4 sm:px-6">
                <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-950 p-4">
                    <p className="text-red-600 dark:text-red-400">Invalid YouTube URL</p>
                </div>
            </div>
        );
    }

    return (
        <div className="my-8 flex justify-center px-4 sm:px-6">
            <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="relative w-full aspect-video bg-black">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}
