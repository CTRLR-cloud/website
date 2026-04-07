"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Replaces `next.config` redirect (not supported with `output: "export"`). */
export default function LaunchAppRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/launch-client");
  }, [router]);
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-section text-white/60 text-sm">
      Redirecting…
    </div>
  );
}
