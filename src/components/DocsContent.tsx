"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type SectionId =
  | "what-is-ctrlr"
  | "use-cases"
  | "supported-platforms"
  | "before-you-begin"
  | "getting-started"
  | "configuring-your-robot"
  | "locations"
  | "command-hq"
  | "foxglove"
  | "troubleshooting";

interface Section {
  id: SectionId;
  label: string;
  toc?: { href: string; label: string }[];
}

const SECTIONS: Section[] = [
  {
    id: "what-is-ctrlr",
    label: "What is CTRL+R?",
    toc: [
      { href: "#what-is-ctrlr", label: "Overview" },
      { href: "#what-makes-us-different", label: "What makes us different" },
    ],
  },
  { id: "use-cases", label: "Use Cases" },
  {
    id: "supported-platforms",
    label: "Supported Platforms",
    toc: [
      { href: "#os", label: "Operating System" },
      { href: "#ros", label: "ROS" },
      { href: "#architectures", label: "Architectures" },
    ],
  },
  {
    id: "before-you-begin",
    label: "Before You Begin",
    toc: [
      { href: "#docker", label: "Docker" },
      { href: "#ros-req", label: "ROS" },
      { href: "#rosbridge", label: "rosbridge_server" },
      { href: "#zenoh", label: "Zenoh (optional)" },
    ],
  },
  {
    id: "getting-started",
    label: "Getting Started",
    toc: [{ href: "#individuals", label: "For Individuals" }],
  },
  {
    id: "configuring-your-robot",
    label: "Configuring Your Robot",
    toc: [
      { href: "#config-overview", label: "Overview" },
      { href: "#robot-params", label: "Robot Parameters" },
      { href: "#ros-topics", label: "ROS Topics" },
    ],
  },
  { id: "locations", label: "Locations" },
  { id: "command-hq", label: "Command HQ" },
  { id: "foxglove", label: "FoxGlove Data Integration" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

// ── Shared prose classes ───────────────────────────────────────────────────

const H1 = "text-[2rem] font-bold mb-4 text-white leading-tight tracking-tight";
const H2 = "text-xl font-semibold mt-8 mb-3 text-white pb-2 border-b border-hairline";
const P = "text-[0.9375rem] leading-7 text-white/75 mb-4";
const LI = "text-[0.9375rem] leading-7 text-white/75 mb-1";
const CODE = "font-mono text-[0.85em] bg-white/[0.07] border border-hairline rounded px-1.5 py-0.5 text-amber-200/90";
const LINK = "text-[var(--accent)] hover:underline";

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-[3px] border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] rounded-r-lg px-5 py-3.5 my-5">
      <div className="text-[0.7rem] font-bold tracking-[0.06em] uppercase text-[var(--accent)] mb-1">
        {title}
      </div>
      <div className={cn(P, "m-0 text-sm")}>{children}</div>
    </div>
  );
}

function Table({
  head,
  rows,
}: {
  head: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-2.5 bg-white/[0.05] text-white font-semibold border-b border-hairline whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-2.5 text-white/75 border-b border-white/[0.06] align-top last:border-b-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DocsContent() {
  const [activeSection, setActiveSection] = useState<SectionId>("what-is-ctrlr");
  const current = SECTIONS.find((s) => s.id === activeSection);

  function NavBtn({ to, children }: { to: SectionId; children: React.ReactNode }) {
    return (
      <button className={cn(LINK, "cursor-pointer")} onClick={() => setActiveSection(to)}>
        {children}
      </button>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] max-w-[1400px] mx-auto w-full">
      {/* Left Sidebar */}
      <aside className="hidden md:block w-[240px] min-w-[240px] py-8 pl-6 pr-2 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-hairline shrink-0">
        <div className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-muted mb-2">
          Documentation
        </div>
        <nav className="flex flex-col gap-0.5">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={cn(
                "w-full text-left block px-3 py-1.5 rounded text-sm transition-colors ring-premium",
                activeSection === s.id
                  ? "bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[var(--accent)] font-medium"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white",
              )}
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 px-6 md:px-12 py-10 max-w-[760px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-muted mb-6">
          <span>Docs</span>
          <span className="opacity-40">›</span>
          <span>{current?.label}</span>
        </div>

        {/* What is CTRL+R */}
        <div className={activeSection === "what-is-ctrlr" ? "block" : "hidden"}>
          <h1 className={H1}>What is CTRL+R?</h1>
          <p className={P}>
            CTRL+R is making robot operations easy. Experience one unified interface for full
            robotic control, designed to be intuitive for first-time operators, yet powerful and
            customizable for advanced robotics teams managing diverse fleets.
          </p>
          <p className={P}>
            <strong className="text-white font-semibold">For robotics teams:</strong> CTRL+R is
            your one-stop-shop to operate, manage, and monitor your entire robot fleet. No more
            building in-house software or switching between tools — CTRL+R has everything baked in
            to help your fleet scale as your company grows.
          </p>
          <p className={P}>
            <strong className="text-white font-semibold">For retail, construction, and more:</strong>{" "}
            CTRL+R gives teams real-time visibility into physical operations, helping them monitor
            site conditions, verify execution, and make faster decisions from anywhere.
          </p>

          <h2 id="what-makes-us-different" className={H2}>
            What makes us different?
          </h2>
          <p className={P}>
            CTRL+R allows individuals and teams to operate and manage robotic fleets without
            building extensive software stacks. There is no vendor lock-in and our agent works on
            any robot running ROS or a manufacturer ROS SDK. CTRL+R is extremely easy to integrate
            with an existing software stack, taking just minutes to get up and running.
          </p>
          <p className={P}>
            Ready to get started?{" "}
            <NavBtn to="getting-started">Getting Started →</NavBtn>
          </p>
        </div>

        {/* Use Cases */}
        <div className={activeSection === "use-cases" ? "block" : "hidden"}>
          <h1 className={H1}>Use Cases</h1>
          <p className={cn(P, "italic text-muted")}>Coming soon.</p>
        </div>

        {/* Supported Platforms */}
        <div className={activeSection === "supported-platforms" ? "block" : "hidden"}>
          <h1 className={H1}>Supported Platforms</h1>

          <h2 id="os" className={H2}>Operating System</h2>
          <p className={P}>
            The CTRL+R agent requires <strong className="text-white">Ubuntu 18.04 or newer</strong>.
          </p>

          <h2 id="ros" className={H2}>ROS</h2>
          <p className={P}>
            The agent is compatible with both ROS1 and ROS2. For smoother operations we recommend
            using <strong className="text-white">ROS2 (Foxy or newer)</strong>.
          </p>

          <h2 id="architectures" className={H2}>Architectures</h2>
          <Table
            head={["Architecture", "Example Hardware"]}
            rows={[
              [<code className={CODE}>ARMv7</code>, "Older embedded compute boards"],
              [<code className={CODE}>AArch64</code>, "NVIDIA Jetson, newer Raspberry Pi models"],
              [<code className={CODE}>x86_64</code>, "Standard desktop / server (Intel and AMD)"],
            ]}
          />
        </div>

        {/* Before You Begin */}
        <div className={activeSection === "before-you-begin" ? "block" : "hidden"}>
          <h1 className={H1}>Before You Begin</h1>
          <p className={P}>The following prerequisites apply to both individuals and organizations.</p>

          <h2 id="docker" className={H2}>Docker</h2>
          <p className={P}>
            Your robot must have Docker installed. Install via <code className={CODE}>apt</code> —
            do <strong className="text-white">not</strong> install via the Snap Store, as snap
            Docker has filesystem and permission restrictions that break bind mounts.
          </p>
          <p className={P}>
            See the{" "}
            <a
              href="https://docs.docker.com/engine/install/"
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              official Docker install guide
            </a>
            .
          </p>

          <h2 id="ros-req" className={H2}>ROS (recommended)</h2>
          <p className={P}>
            We recommend your robot is running ROS. The agent is compatible with both ROS1 and ROS2
            — for smoother operations we recommend ROS2 (Foxy or newer). See{" "}
            <NavBtn to="supported-platforms">Supported Platforms</NavBtn> for more information.
          </p>

          <h2 id="rosbridge" className={H2}>rosbridge_server</h2>
          <p className={P}>
            If you plan to use ROS to control your robot, you must have{" "}
            <code className={CODE}>rosbridge_server</code> installed on your robot.
          </p>
          <Callout title="Recommendation">
            We recommend running rosbridge as a system service for reliable startup on boot.
          </Callout>

          <h2 id="zenoh" className={H2}>Zenoh (optional)</h2>
          <p className={P}>
            Zenoh can be used as an alternative video source to ROS. See the{" "}
            <a
              href="https://zenoh.io/docs/getting-started/installation/"
              target="_blank"
              rel="noreferrer"
              className={LINK}
            >
              Zenoh installation guide
            </a>{" "}
            for setup instructions.
          </p>
        </div>

        {/* Getting Started */}
        <div className={activeSection === "getting-started" ? "block" : "hidden"}>
          <h1 className={H1}>Getting Started</h1>

          <h2 id="individuals" className={H2}>For Individuals</h2>
          <p className={P}>
            This section contains instructions for individuals getting set up operating robots. For
            organizations, please see <NavBtn to="command-hq">Command HQ</NavBtn>.
          </p>
          <p className={P}>
            Please read the{" "}
            <NavBtn to="before-you-begin">Before You Begin</NavBtn> section before completing the
            following steps.
          </p>
          <Callout title="Recommendation">
            We recommend using Google Chrome with the CTRL+R webapp.
          </Callout>
          <ol className="pl-6 mb-4 list-decimal space-y-1.5">
            <li className={LI}>Go to the CTRL+R client from our website</li>
            <li className={LI}>
              From the dashboard, click the <strong className="text-white">Add Robot</strong> button
            </li>
            <li className={LI}>Follow the webapp instructions and create your robot listing</li>
            <li className={LI}>
              Once you reach the Robot Setup page, connect to your robot via SSH and follow the
              displayed instructions
            </li>
          </ol>
        </div>

        {/* Configuring Your Robot */}
        <div className={activeSection === "configuring-your-robot" ? "block" : "hidden"}>
          <h1 className={H1}>Configuring Your Robot</h1>

          <h2 id="config-overview" className={H2}>Overview</h2>
          <p className={P}>
            Configuration can be updated at any time while the robot is connected, including ROS
            topic names and video parameters. There are two places in the webapp to do this:
          </p>
          <ul className="pl-6 mb-4 list-disc space-y-1">
            <li className={LI}>
              <strong className="text-white">Robot Setup page</strong> — available during initial
              setup
            </li>
            <li className={LI}>
              <strong className="text-white">Edit Robot page</strong> — available at any time after
              setup
            </li>
          </ul>
          <p className={P}>
            When the CTRL+R agent is installed, a configuration file is saved locally on the robot
            at:
          </p>
          <pre className="bg-white/[0.05] border border-hairline rounded-lg px-5 py-4 overflow-x-auto my-4">
            <code className="font-mono text-sm text-white/80">/etc/ctrlr_agent/config.json</code>
          </pre>
          <p className={P}>This file contains four main parameter sections:</p>
          <ul className="pl-6 mb-4 list-disc space-y-1">
            <li className={LI}>
              <strong className="text-white">Core</strong> — These parameters should not be changed.
              They are essential for identifying the robot.
            </li>
            <li className={LI}>
              <strong className="text-white">Robot</strong> — These parameters relate to your
              robot&apos;s video feed.
            </li>
            <li className={LI}>
              <strong className="text-white">ROS Topics</strong> — These topics are used by the
              agent to communicate with your robot&apos;s ROS stack.
            </li>
            <li className={LI}>
              <strong className="text-white">Metrics</strong> — Controls whether the agent streams
              CPU and battery usage to the webapp.
            </li>
          </ul>

          <h2 id="robot-params" className={H2}>Robot Parameters</h2>
          <Table
            head={["Parameter", "Default"]}
            rows={[
              ["Image Format", <code className={CODE}>Jpeg</code>],
              ["Resolution", <code className={CODE}>640×480</code>],
              ["Video Source", <code className={CODE}>Ros</code>],
            ]}
          />

          <h2 id="ros-topics" className={H2}>ROS Topics</h2>
          <p className={P}>
            These topics are used by the agent to communicate with your robot&apos;s ROS stack.
          </p>
          <Table
            head={["Parameter", "Default", "Message Type", "Description"]}
            rows={[
              [
                "Camera Raw",
                <code className={CODE}>/camera/image_raw</code>,
                <code className={CODE}>sensor_msgs/Image</code>,
                "Raw camera frames",
              ],
              [
                "Camera JPEG",
                <code className={CODE}>/camera/image_raw/compressed</code>,
                <code className={CODE}>sensor_msgs/CompressedImage</code>,
                "Compressed camera frames",
              ],
              [
                "Velocity",
                <code className={CODE}>/cmd_vel</code>,
                <code className={CODE}>geometry_msgs/Twist</code>,
                "Movement commands published by the agent",
              ],
              [
                "Nav Goal",
                <code className={CODE}>/ctrlr/nav/goal</code>,
                <code className={CODE}>geometry_msgs/PoseStamped</code>,
                "Autonomous navigation goals",
              ],
              [
                "Nav Cancel",
                <code className={CODE}>/ctrlr/nav/cancel</code>,
                <code className={CODE}>std_msgs/Empty</code>,
                "Cancel active navigation",
              ],
              [
                "Nav Home",
                <code className={CODE}>/ctrlr/nav/home</code>,
                <code className={CODE}>std_msgs/Empty</code>,
                "Send robot home",
              ],
              [
                "Nav Status",
                <code className={CODE}>/ctrlr/nav/status</code>,
                <code className={CODE}>std_msgs/String</code>,
                "Navigation status published by the robot",
              ],
            ]}
          />
          <Callout title="Note">
            The agent expects exactly three string values from the nav status topic:{" "}
            <code className={CODE}>&quot;started&quot;</code>,{" "}
            <code className={CODE}>&quot;completed&quot;</code>, or{" "}
            <code className={CODE}>&quot;failed&quot;</code>. Anything else is ignored with a
            warning.
          </Callout>
        </div>

        {/* Locations */}
        <div className={activeSection === "locations" ? "block" : "hidden"}>
          <h1 className={H1}>Locations</h1>
          <p className={cn(P, "italic text-muted")}>Coming soon.</p>
        </div>

        {/* Command HQ */}
        <div className={activeSection === "command-hq" ? "block" : "hidden"}>
          <h1 className={H1}>Command HQ</h1>
          <p className={cn(P, "italic text-muted")}>Coming soon.</p>
        </div>

        {/* FoxGlove */}
        <div className={activeSection === "foxglove" ? "block" : "hidden"}>
          <h1 className={H1}>FoxGlove Data Integration</h1>
          <p className={cn(P, "italic text-muted")}>Coming soon.</p>
        </div>

        {/* Troubleshooting */}
        <div className={activeSection === "troubleshooting" ? "block" : "hidden"}>
          <h1 className={H1}>Troubleshooting</h1>
          <p className={cn(P, "italic text-muted")}>Coming soon.</p>
        </div>
      </main>

      {/* Right TOC */}
      <aside className="hidden xl:block w-[200px] min-w-[200px] px-6 py-10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto shrink-0">
        {current?.toc && current.toc.length > 0 && (
          <>
            <div className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-muted mb-3">
              On this page
            </div>
            <nav className="flex flex-col gap-0.5">
              {current.toc.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[0.8rem] text-muted hover:text-white transition-colors py-0.5"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </>
        )}
      </aside>
    </div>
  );
}
