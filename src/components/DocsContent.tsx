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
  | "custom-commands"
  | "two-way-audio"
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
  {
    id: "custom-commands",
    label: "Custom Commands",
    toc: [
      { href: "#cc-overview", label: "Overview" },
      { href: "#cc-msg-types", label: "Supported Message Types" },
      { href: "#cc-defining", label: "Defining Commands" },
      { href: "#cc-bindings", label: "Binding to Inputs" },
      { href: "#cc-firing", label: "Firing Commands" },
      { href: "#cc-notes", label: "Notes & Limitations" },
    ],
  },
  {
    id: "two-way-audio",
    label: "Two-way Audio",
    toc: [
      { href: "#audio-overview", label: "Overview" },
      { href: "#audio-hardware", label: "Hardware Setup" },
      { href: "#audio-enable", label: "Enabling Audio" },
      { href: "#audio-devices", label: "Selecting Devices" },
      { href: "#audio-session", label: "Using It In a Session" },
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

        {/* Custom Commands */}
        <div className={activeSection === "custom-commands" ? "block" : "hidden"}>
          <h1 className={H1}>Custom Commands</h1>
          <p className={P}>
            Custom commands let you publish to{" "}
            <strong className="text-white">any</strong> ROS topic on your robot from the CTRL+R
            webapp, beyond the built-in movement and navigation controls. Each command is a named,
            one-shot publish bound to a keyboard key or gamepad button.
          </p>

          <h2 id="cc-overview" className={H2}>Overview</h2>
          <p className={P}>There are two roles in the custom-commands workflow:</p>
          <ul className="pl-6 mb-4 list-disc space-y-1">
            <li className={LI}>
              <strong className="text-white">Robot owner</strong> — defines the available commands
              on the robot (topic, message type, default payload). Definitions are stored on the
              agent under <code className={CODE}>ros.custom_commands</code> in{" "}
              <code className={CODE}>/etc/ctrlr_agent/config.json</code>.
            </li>
            <li className={LI}>
              <strong className="text-white">Operator</strong> — binds the available commands to
              keyboard keys or gamepad buttons during a teleop session. Bindings are saved per
              user, per robot.
            </li>
          </ul>
          <Callout title="Capability gate">
            Custom commands require an agent on protocol <code className={CODE}>0.6</code> or
            newer. Older agents will not advertise the capability and the UI will be hidden for
            that robot.
          </Callout>

          <h2 id="cc-msg-types" className={H2}>Supported Message Types</h2>
          <p className={P}>
            Buttons are one-shot — they fire a single publish per press. To keep that safe, only
            message types whose payload has a well-defined &quot;single value&quot; are allowed.
            Continuous actuator types like{" "}
            <code className={CODE}>geometry_msgs/Twist</code> are intentionally excluded — a
            one-shot button bound to Twist would leave the actuator running indefinitely. Use the
            built-in joystick / WASD <code className={CODE}>cmd_vel</code> path for continuous
            motion.
          </p>
          <Table
            head={["Message Type", "Payload Shape", "Example Use"]}
            rows={[
              [
                <code className={CODE}>std_msgs/Bool</code>,
                <code className={CODE}>{`{ data: true | false }`}</code>,
                "Toggle lights, enable/disable a subsystem",
              ],
              [
                <code className={CODE}>std_msgs/Int32</code>,
                <code className={CODE}>{`{ data: <i32> }`}</code>,
                "Select a mode, set a discrete level",
              ],
              [
                <code className={CODE}>std_msgs/Float32</code>,
                <code className={CODE}>{`{ data: <number> }`}</code>,
                "Set a target speed, gain, or threshold",
              ],
              [
                <code className={CODE}>std_msgs/String</code>,
                <code className={CODE}>{`{ data: "<text>" }`}</code>,
                "Trigger a named behavior, play a sound",
              ],
              [
                <code className={CODE}>std_msgs/Empty</code>,
                <code className={CODE}>{`{}`}</code>,
                "Fire-and-forget trigger (e-stop, take photo)",
              ],
              [
                <code className={CODE}>geometry_msgs/PoseStamped</code>,
                "header + pose (position + orientation)",
                "Send a navigation goal to a saved pose",
              ],
            ]}
          />
          <Callout title="PoseStamped timestamps">
            The agent overwrites <code className={CODE}>header.stamp</code> with the current time
            at publish, per ROS convention. You don&apos;t need to set it when defining the
            command.
          </Callout>

          <h2 id="cc-defining" className={H2}>Defining Commands (Robot Owner)</h2>
          <p className={P}>
            Commands are defined per-robot from the{" "}
            <strong className="text-white">Edit Robot</strong> page:
          </p>
          <ol className="pl-6 mb-4 list-decimal space-y-1.5">
            <li className={LI}>
              Open the robot&apos;s <strong className="text-white">Edit Robot</strong> page and
              connect to the live config session.
            </li>
            <li className={LI}>
              Scroll to the <strong className="text-white">Custom Commands</strong> panel and
              click <strong className="text-white">Add Command</strong>.
            </li>
            <li className={LI}>
              Fill in:
              <ul className="pl-6 mb-2 list-disc space-y-1 mt-1">
                <li className={LI}>
                  <strong className="text-white">Name</strong> — display label shown to operators.
                </li>
                <li className={LI}>
                  <strong className="text-white">Topic</strong> — ROS topic to publish on, e.g.{" "}
                  <code className={CODE}>/lights/toggle</code>.
                </li>
                <li className={LI}>
                  <strong className="text-white">Message type</strong> — one of the supported
                  types above.
                </li>
                <li className={LI}>
                  <strong className="text-white">Default payload</strong> — the value to publish
                  when the command fires. The editor renders a typed form per message type
                  (checkbox for Bool, number field for Int32/Float32, etc.).
                </li>
              </ul>
            </li>
            <li className={LI}>
              Click <strong className="text-white">Save</strong>. The webapp sends an{" "}
              <code className={CODE}>agent.config.update</code> message with the new{" "}
              <code className={CODE}>ros.custom_commands</code> list; the agent validates against
              the allowlist and persists the definition to disk.
            </li>
          </ol>
          <Callout title="Lazy advertise">
            The agent doesn&apos;t advertise the ROS publisher until the command is fired for the
            first time in a session, then caches the publisher handle. No robot restart is
            required after adding, editing, or removing a command.
          </Callout>

          <h2 id="cc-bindings" className={H2}>Binding to Inputs (Operator)</h2>
          <p className={P}>
            Bindings live per <em>(user, robot)</em> and persist across sessions:
          </p>
          <ol className="pl-6 mb-4 list-decimal space-y-1.5">
            <li className={LI}>Start a teleop session with the robot.</li>
            <li className={LI}>
              Open <strong className="text-white">Input Bindings</strong> from the session
              toolbar. The modal lists every command currently defined on the robot.
            </li>
            <li className={LI}>
              Switch between the <strong className="text-white">Keyboard</strong> and{" "}
              <strong className="text-white">Gamepad</strong> tabs and assign a key or button to
              each command you want to use.
            </li>
            <li className={LI}>
              Click <strong className="text-white">Save</strong> to persist the bindings to your
              account.
            </li>
          </ol>
          <Callout title="Triggers count as buttons">
            Gamepad triggers (LT/RT) are treated as one-shot buttons — they fire when the analog
            value crosses the 0.5 threshold, not continuously while held.
          </Callout>

          <h2 id="cc-firing" className={H2}>Firing Commands</h2>
          <p className={P}>During a teleop session:</p>
          <ul className="pl-6 mb-4 list-disc space-y-1">
            <li className={LI}>
              Press a bound key or button — the webapp sends an{" "}
              <code className={CODE}>agent.command.execute</code> envelope over the WebRTC data
              channel with the command ID and payload.
            </li>
            <li className={LI}>
              The agent looks up the definition, validates the payload against the message-type
              schema, publishes on the configured ROS topic, and returns an{" "}
              <code className={CODE}>agent.command.response</code> with{" "}
              <code className={CODE}>success</code> / <code className={CODE}>error</code>.
            </li>
            <li className={LI}>
              A toast surfaces the outcome (success or the agent&apos;s error message).
            </li>
          </ul>

          <h2 id="cc-notes" className={H2}>Notes &amp; Limitations</h2>
          <ul className="pl-6 mb-4 list-disc space-y-1">
            <li className={LI}>
              <strong className="text-white">Publish-only.</strong> Custom commands publish to
              ROS; they do not subscribe. Sensor readback from custom topics is planned for a
              future release.
            </li>
            <li className={LI}>
              <strong className="text-white">One-shot only.</strong> Each press fires one publish.
              Continuous bindings from sticks/triggers (e.g. right stick → head pan/tilt) are not
              yet supported.
            </li>
            <li className={LI}>
              <strong className="text-white">Defense in depth.</strong> The agent re-validates the
              payload at execute time against the registered message type, even though the webapp
              also validates when editing — a stale binding or corrupted payload will be rejected
              cleanly.
            </li>
            <li className={LI}>
              <strong className="text-white">Per-robot bindings.</strong> If you operate multiple
              robots, you bind keys separately for each. The set of available commands also comes
              from each robot&apos;s own configuration.
            </li>
          </ul>
        </div>

        {/* Two-way Audio */}
        <div className={activeSection === "two-way-audio" ? "block" : "hidden"}>
          <h1 className={H1}>Two-way Audio</h1>
          <p className={P}>
            Two-way audio lets you talk to people near the robot and hear them in real time during
            a teleop session. Audio is carried over the same WebRTC connection as video and is
            gated by a push-to-talk button on the operator side.
          </p>

          <h2 id="audio-overview" className={H2}>Overview</h2>
          <ul className="pl-6 mb-4 list-disc space-y-1">
            <li className={LI}>
              <strong className="text-white">Operator → robot:</strong> your browser captures your
              microphone and sends it to the robot&apos;s speakers.
            </li>
            <li className={LI}>
              <strong className="text-white">Robot → operator:</strong> the robot captures its
              microphone and sends it to your browser.
            </li>
            <li className={LI}>
              <strong className="text-white">Push-to-talk:</strong> the operator mic is muted by
              default. Hold <code className={CODE}>Space</code> (or press the on-screen mic
              button) to transmit.
            </li>
          </ul>
          <Callout title="Capability gate">
            Two-way audio requires a CTRL+R agent built with audio support and ALSA / GStreamer
            available on the robot. The agent must be restarted after toggling{" "}
            <code className={CODE}>audio.enabled</code>.
          </Callout>
          <Callout title="Audio format">
            Audio is encoded with <strong className="text-white">Opus at 48 kHz</strong>, stereo
            on capture, 20 ms frames at 24 kbit/s, carried over WebRTC RTP (payload type 111) with
            a 60 ms jitter buffer on the robot&apos;s playback side.
          </Callout>

          <h2 id="audio-hardware" className={H2}>Hardware Setup</h2>
          <p className={P}>
            To use two-way audio, the robot needs a microphone and speakers connected to its host
            computer:
          </p>
          <ul className="pl-6 mb-4 list-disc space-y-1">
            <li className={LI}>
              <strong className="text-white">Microphone</strong> — USB mic, USB headset, or 3.5mm
              mic plugged into the robot&apos;s audio input.
            </li>
            <li className={LI}>
              <strong className="text-white">Speakers</strong> — USB speakers, the robot&apos;s
              built-in audio jack, or a Bluetooth/HDMI output (anything ALSA can route to).
            </li>
          </ul>
          <p className={P}>
            Plug the devices in <strong className="text-white">before</strong> starting the agent
            so ALSA enumerates them at startup. If you add a device after the agent is running,
            restart the agent.
          </p>

          <h2 id="audio-enable" className={H2}>Enabling Audio</h2>
          <p className={P}>
            Open the robot&apos;s <strong className="text-white">Edit Robot</strong> page (or{" "}
            <strong className="text-white">Robot Setup</strong> during initial setup), connect the
            configuration session, and look for the <strong className="text-white">Audio</strong>{" "}
            group in the live config table.
          </p>
          <ul className="pl-6 mb-4 list-disc space-y-1">
            <li className={LI}>
              Set <strong className="text-white">Two-way Voice</strong> to{" "}
              <code className={CODE}>Enabled</code>.
            </li>
            <li className={LI}>
              <strong className="text-white">Restart the agent</strong> for the change to take
              effect — the audio pipeline is wired up at startup, not on the fly. From the robot
              host:
            </li>
          </ul>
          <pre className="bg-white/[0.05] border border-hairline rounded-lg px-5 py-4 overflow-x-auto my-4">
            <code className="font-mono text-sm text-white/80">docker restart ctrlr-agent</code>
          </pre>
          <p className={P}>If you don&apos;t restart, the toggle will save but no audio will flow.</p>

          <h2 id="audio-devices" className={H2}>Selecting Devices</h2>
          <p className={P}>
            By default the agent uses GStreamer&apos;s auto-detect:{" "}
            <code className={CODE}>autoaudiosrc</code> for the mic and{" "}
            <code className={CODE}>autoaudiosink</code> for speakers. That works on many robots,
            but if you need a specific device (e.g. a USB mic when the robot also has an HDMI
            input it would otherwise prefer), set the{" "}
            <strong className="text-white">Microphone Device</strong> and{" "}
            <strong className="text-white">Speaker Device</strong> fields to ALSA device names.
          </p>
          <p className={P}>To list available devices, run on the robot:</p>
          <pre className="bg-white/[0.05] border border-hairline rounded-lg px-5 py-4 overflow-x-auto my-4">
            <code className="font-mono text-sm text-white/80">{`arecord -L   # list inputs (microphones)
aplay -L     # list outputs (speakers)`}</code>
          </pre>
          <p className={P}>
            Pick the name you want (typically a{" "}
            <code className={CODE}>plughw:CARD=&lt;name&gt;,DEV=&lt;n&gt;</code> entry — the{" "}
            <code className={CODE}>plughw</code> form lets ALSA convert sample rates if needed),
            paste it into the matching field in the webapp, and press{" "}
            <code className={CODE}>Enter</code> to save.
          </p>
          <Callout title="Tip">
            If <code className={CODE}>arecord -L</code> shows a long list, the ones you usually
            want are the <code className={CODE}>plughw:CARD=...</code> entries for the physical
            device you plugged in, or the <code className={CODE}>default</code> alias if your
            system is already configured to route to it.
          </Callout>

          <h2 id="audio-session" className={H2}>Using It In a Session</h2>
          <ul className="pl-6 mb-4 list-disc space-y-1">
            <li className={LI}>Start a teleop session for the robot.</li>
            <li className={LI}>
              Click the <strong className="text-white">microphone</strong> button in the session
              controls. The first time, the browser will prompt you for microphone permission —
              accept it.
            </li>
            <li className={LI}>
              The mic stays <strong className="text-white">muted</strong> until you transmit. To
              talk:
              <ul className="pl-6 mb-2 list-disc space-y-1 mt-1">
                <li className={LI}>
                  <strong className="text-white">
                    Hold <code className={CODE}>Space</code>
                  </strong>{" "}
                  — push-to-talk. Mic transmits while held, mutes on release.
                </li>
                <li className={LI}>
                  <strong className="text-white">Click the mic button</strong> — latches transmit
                  on; click again to mute.
                </li>
              </ul>
            </li>
            <li className={LI}>
              Robot audio plays automatically through your browser once the session connects.
            </li>
          </ul>
          <Callout title="No audio?">
            Check that <code className={CODE}>audio.enabled</code> is{" "}
            <code className={CODE}>true</code> and the agent was restarted afterward; verify the
            device names with <code className={CODE}>arecord -L</code> /{" "}
            <code className={CODE}>aplay -L</code>; and confirm browser microphone permission
            isn&apos;t blocked for the CTRL+R site.
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
