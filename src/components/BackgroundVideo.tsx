import { useEffect, useRef } from "react";

const FADE = 0.5; // seconds

/**
 * Looping background video with manual fade-in / fade-out.
 * - rAF loop watches currentTime/duration and sets opacity directly (no re-renders).
 * - On `ended`: opacity 0, wait 100ms, rewind, play again.
 * - Visitors who prefer reduced motion get a still first frame.
 */
export default function BackgroundVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.pause();
      video.style.opacity = "1";
      return;
    }

    let raf = 0;
    let restartTimer: number | undefined;

    const tick = () => {
      const { currentTime: t, duration: d } = video;
      if (d && Number.isFinite(d)) {
        let opacity = 1;
        if (t < FADE) opacity = t / FADE;
        else if (d - t < FADE) opacity = Math.max(0, (d - t) / FADE);
        video.style.opacity = String(opacity);
      }
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = "0";
      restartTimer = window.setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => {});
      }, 100);
    };

    video.style.opacity = "0";
    video.addEventListener("ended", onEnded);
    void video.play().catch(() => {});
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(restartTimer);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    // inset first, then top: the inset shorthand would otherwise reset top to auto.
    <div className="absolute z-0" style={{ inset: "auto 0 0 0", top: "300px" }} aria-hidden="true">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        muted
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
}
