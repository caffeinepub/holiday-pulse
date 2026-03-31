import { useEffect, useRef, useState } from "react";

// ── YouTube IFrame API minimal types ────────────────────────────────────────
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(vol: number): void;
  destroy(): void;
  getPlayerState(): number;
}
interface YTPlayerOptions {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: { onReady?: () => void };
}
declare global {
  interface Window {
    YT?: {
      Player: new (el: string | HTMLElement, opts: YTPlayerOptions) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const VIDEO_ID = "UDVtMYqUAyw";

export function BackgroundMusic() {
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [ready, setReady] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingPlay = useRef(false);
  const volumeRef = useRef(0.7);

  // Hide tooltip after 4.5 s
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 4500);
    return () => clearTimeout(t);
  }, []);

  // Load YouTube IFrame API once
  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: () => {
            playerRef.current?.setVolume(Math.round(volumeRef.current * 100));
            setReady(true);
            if (pendingPlay.current) {
              playerRef.current?.playVideo();
              pendingPlay.current = false;
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  function handleVolumeChange(newVol: number) {
    setVolume(newVol);
    volumeRef.current = newVol;
    playerRef.current?.setVolume(Math.round(newVol * 100));
  }

  function toggle() {
    setHint(false);
    if (playing) {
      playerRef.current?.pauseVideo();
      setPlaying(false);
    } else {
      if (ready && playerRef.current) {
        playerRef.current.playVideo();
      } else {
        pendingPlay.current = true;
      }
      setPlaying(true);
    }
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2"
      data-ocid="music.toggle"
    >
      {/* Hidden YouTube player — 1 × 1 so it never shows */}
      <div
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div ref={containerRef} />
      </div>

      {/* Tooltip */}
      <div
        className={[
          "absolute bottom-16 left-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs",
          "text-white bg-black/75 backdrop-blur-sm shadow-md pointer-events-none",
          "transition-all duration-500",
          hint && !playing
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-1",
        ].join(" ")}
      >
        🎵 Play travel music
      </div>

      <div className="relative">
        {/* Volume slider panel */}
        <div
          className={[
            "absolute left-1/2 -translate-x-1/2",
            "flex flex-col items-center justify-between",
            "bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl",
            "px-2 py-3 transition-all duration-300",
            playing
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none",
          ].join(" ")}
          style={{
            bottom: "calc(100% + 10px)",
            width: 40,
            height: 148,
          }}
        >
          <span className="text-sm leading-none select-none" aria-hidden="true">
            🔊
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) =>
              handleVolumeChange(Number.parseFloat(e.target.value))
            }
            aria-label="Music volume"
            data-ocid="music.input"
            style={{
              writingMode: "vertical-lr",
              direction: "rtl",
              height: 82,
              width: 20,
              cursor: "pointer",
              accentColor: "#f59e0b",
              flexShrink: 0,
            }}
          />
          <span className="text-sm leading-none select-none" aria-hidden="true">
            🔇
          </span>
        </div>

        {/* Animated ring when playing */}
        {playing && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: "oklch(0.78 0.18 55 / 0.5)",
              animationDuration: "1.8s",
            }}
          />
        )}

        {/* Button */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className={[
            "relative flex items-center justify-center rounded-full shadow-lg",
            "transition-transform duration-200 hover:scale-110 active:scale-95",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
            playing
              ? "bg-gradient-to-br from-amber-400/90 to-orange-500/90 backdrop-blur-sm"
              : "bg-black/60 backdrop-blur-sm hover:bg-black/70",
          ].join(" ")}
          style={{ width: 52, height: 52 }}
        >
          {playing ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 18V5l12-2v13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="2" />
              <circle cx="18" cy="16" r="3" stroke="white" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
