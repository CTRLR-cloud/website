"use client";
/* eslint-disable react/no-unescaped-entities -- text is kept verbatim from the client app */

// Copied from robot-teleop-webapp src/pages/Docs.tsx (origin/main e83eecf).
// Only the router glue differs (next/link, section passed in as a prop), so future
// updates can be copied across nearly verbatim.
import { useEffect } from "react";
import Link from "next/link";
import { SECTIONS } from "@/content/docs";
import "./DocsContent.css";

export function DocsContent({ section }: { section?: string }) {
  const current = SECTIONS.find(s => s.id === section) ?? SECTIONS[0];
  const activeSection = current.id;

  useEffect(() => {
    // Inactive sections are display:none, so the browser cannot resolve a #hash on load.
    const hash = window.location.hash;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    // Instant, as in the client app: this site's global smooth scrolling gets cut off on load.
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo(0, 0);
  }, [activeSection]);

  return (
    <div className="docs-layout">
      {/* Left Sidebar */}
      <aside className="docs-sidebar">
        <div className="docs-sidebar-section-label">Documentation</div>
        <nav>
          {SECTIONS.map(s => (
            <Link
              key={s.id}
              href={`/docs/${s.id}`}
              className={`docs-nav-link ${activeSection === s.id ? 'active' : ''}`}
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="docs-content">
        <div className="docs-breadcrumb">
          <span>Docs</span>
          <span className="docs-breadcrumb-sep">›</span>
          <span>{current?.label}</span>
        </div>

        {/* What is CTRL+R */}
        {activeSection === 'what-is-ctrlr' && (
        <div className="docs-section active">
          <h1>What is CTRL+R?</h1>
          <p id="what-is-ctrlr">
            CTRL+R is a browser-based operations platform for robots and physical AI. It gives you
            one interface to discover a robot, open a live session, see its video and telemetry, and
            send movement or navigation commands, without writing a custom application for each robot
            you support.
          </p>
          <p>
            <strong>For robotics teams:</strong> operate, manage, and monitor your entire fleet from
            one place. Fleets rarely stay homogeneous as they grow. CTRL+R is built for that, so
            adding a new robot model is an integration task, not a new tool for your operators to
            learn.
          </p>
          <p>
            <strong>For everyone else:</strong> get real-time visibility into physical operations and
            equipment, without your team needing to touch ROS or build robotics software in-house.
          </p>

          <h2 id="what-makes-us-different">What makes us different?</h2>
          <p>Three things follow from having a single operations layer across a mixed fleet:</p>
          <ul>
            <li>
              <strong>Robotics no longer requires a robotics team.</strong> Operating physical systems
              has traditionally meant hiring engineers who know a specific manufacturer's SDK and the
              failure modes of that specific hardware. CTRL+R absorbs that layer, so operating a fleet
              becomes a normal software integration rather than a specialized hire.
            </li>
            <li>
              <strong>The cost and consistency case for automation gets easier to make.</strong> When
              every robot needs its own tooling, evaluating automation means evaluating N different
              systems. One platform means one evaluation.
            </li>
            <li>
              <strong>Every connected device becomes a data source you actually own.</strong> Video,
              telemetry, faults, and interventions flow through one platform, structured and
              timestamped, instead of sitting in separate manufacturer dashboards. That data reflects
              your own equipment and conditions, which is different from a general-purpose model
              trained on someone else's.
            </li>
          </ul>
          <p>
            CTRL+R is hardware and industry agnostic. It doesn't assume a specific vertical or type of
            equipment. It assumes you have more than one kind of system, or the ambition to scale
            beyond one. That spans retail, defense, logistics, energy, oil and gas, construction, and
            categories not listed here.
          </p>
          <p>
            There is no vendor lock-in on our side. The agent that makes cross-manufacturer support
            possible speaks ROS, the standard most robots already run, which is what lets us connect
            across manufacturers without a custom integration for each one.
          </p>
          <p>
            Ready to get started?{' '}
            <Link className="docs-inline-link" href="/docs/getting-started">
              Getting Started →
            </Link>
          </p>
        </div>
        )}

        {/* Use Cases */}
        {activeSection === 'use-cases' && (
        <div className="docs-section active">
          <h1>Use Cases</h1>
          <p>
            CTRL+R is hardware and industry agnostic. The examples below are illustrative of how the
            platform gets used today, not an exhaustive list.
          </p>

          <h2 id="uc-defense">Defense &amp; Critical Infrastructure</h2>
          <p>
            <strong>The problem:</strong> Defense and critical infrastructure organizations tend to
            grow through acquisition, and every acquisition brings its own hardware, its own ground
            control software, and its own operator training. Complexity compounds with each addition:
            harder for headquarters to oversee, harder for field operators to stay fluent across
            systems.
          </p>
          <p>
            <strong>How CTRL+R helps:</strong> one operations layer across every connected system on
            site.
          </p>
          <ul>
            <li>Operate any robot, drone, or unmanned vehicle from one browser, regardless of manufacturer</li>
            <li>Real-time operations with one live map showing every connected robot, camera, and sensor</li>
            <li>Role-based access and a full audit trail: who operated what, when, and from where</li>
            <li>Operators train once on one interface, not once per vendor</li>
            <li>One dataset spanning every system, instead of siloed data per manufacturer</li>
          </ul>

          <h2 id="uc-service">Customer Service &amp; Visitor Experience</h2>
          <p>
            <strong>The problem:</strong> airports, government service centers, and transit hubs all
            want a visitor-facing presence that actually helps people: multilingual greetings,
            wayfinding, answering questions, standing in for a staff member during peak hours.
            Humanoid robots can now do this convincingly, but a
            humanoid greeter, a lobby camera, and a floor-cleaning robot from three different
            manufacturers each arrive with their own app and their own login.
          </p>
          <p>
            <strong>How CTRL+R helps:</strong> the humanoid, and everything else in the building,
            operated from the same browser tab.
          </p>
          <ul>
            <li>Operates humanoid robots for greeting, wayfinding, and multilingual visitor interaction from a single interface, alongside every other connected robot, camera, and sensor on site</li>
            <li>Brings robots from different manufacturers and different form factors, humanoid, wheeled, or otherwise, into one operating view rather than isolated per-vendor systems</li>
            <li>Gives staff a live handoff point: a human operator can step in through the same session if a visitor interaction needs a person, without switching applications</li>
            <li>Captures every visitor interaction as structured data, useful for measuring visitor flow, common questions, and service gaps over time</li>
            <li>Scales with the deployment: today's single greeter and tomorrow's added cameras, sensors, or additional robots all join the same view</li>
          </ul>

          <h2 id="uc-retail">Retail</h2>
          <p>
            <strong>The problem:</strong> Retailers lose an average of 4% of revenue when shelves
            aren't properly stocked.
          </p>
          <p>
            <strong>How CTRL+R helps:</strong> a robot that lives in-store, running on CTRL+R, becomes
            a 6-in-1 tool:
          </p>
          <ul>
            <li>Scans shelves around the clock to ensure on-shelf availability</li>
            <li>Alerts team members the moment an item goes out of stock, recouping lost revenue</li>
            <li>Acts as an AI store manager: cross-referencing inventory and planogram data against what's on the shelf to build an optimized task list for employees</li>
            <li>Assists customers finding products</li>
            <li>Supports advertising new products and offering samples</li>
            <li>Collects data on every single rotation to build your company's own dataset</li>
          </ul>

          <h2 id="uc-delivery">First-Mile &amp; Last-Mile Delivery</h2>
          <p>
            <strong>The problem:</strong> the slowest part of a delivery is rarely the road. It's a
            driver circling a mall complex trying to find the right restaurant entrance, or hunting
            for parking in a dense metro area, waiting for an elevator, then walking the final stretch
            to a customer's door. Every minute of that is a minute the customer waits and a minute the
            delivery platform pays for, multiplied across thousands of trips a day.
          </p>
          <p>
            <strong>How CTRL+R helps:</strong> robots handle the inefficient middle stretch so drivers
            stay in motion between easy-access points.
          </p>
          <ul>
            <li>Coordinates robots that retrieve orders from inside a restaurant or mall and bring them to an accessible pickup point for the driver, removing the need for a driver to park and navigate the complex themselves</li>
            <li>Coordinates robots that take the handoff from a driver at an easy-access point and complete the final stretch to the customer's doorstep, so the driver never deals with parking, elevators, or building navigation</li>
            <li>Operates and monitors a mixed fleet of these robots from a single dashboard, regardless of manufacturer</li>
            <li>Tracks live location and status across the entire fleet in real time</li>
            <li>Hands off manual control to a human operator when a robot encounters something outside its autonomous capability, without switching applications</li>
            <li>Captures delivery telemetry and incident data centrally, powering route optimization and fleet performance analysis over time</li>
          </ul>

          <h2 id="uc-energy">Energy</h2>
          <p>
            <strong>The problem:</strong> Physical inspection and maintenance across energy
            infrastructure, pipelines, solar arrays, and remote facilities is often slow, hazardous
            for personnel, or both, and coverage is limited by how many trained people can be sent to
            how many sites.
          </p>
          <p><strong>How CTRL+R helps:</strong></p>
          <ul>
            <li>Operates inspection robots and drones along pipelines or across solar installations from a remote interface</li>
            <li>Streams live video and sensor data back for review, and flags anomalies for follow-up</li>
            <li>Coordinates a fleet of robots handling different tasks (inspection, panel cleaning, thermal monitoring) across a single site through one interface</li>
            <li>Builds a longitudinal dataset of site conditions over time, powering predictive maintenance specific to your equipment and environment</li>
          </ul>
        </div>
        )}

        {/* Supported Platforms */}
        {activeSection === 'supported-platforms' && (
        <div className="docs-section active">
          <h1>Supported Platforms</h1>

          <h2 id="os">Operating System</h2>
          <p>
            The CTRL+R agent requires <strong>Ubuntu 18.04 or newer</strong>.
          </p>
          <p>
            <strong>Android support is in development.</strong> The agent is an adapter layer rather
            than something tied to a single operating system, so we add new platforms as our
            customers' fleets require them.
          </p>

          <h2 id="ros">ROS</h2>
          <p>
            The agent is compatible with both ROS 1 and ROS 2. On ROS 1 it targets{' '}
            <strong>Noetic</strong>. On ROS 2 the minimum is <strong>Foxy</strong> or newer, and for
            smoother operations we recommend <strong>Kilted</strong>.
          </p>
          <div className="docs-callout">
            <div className="docs-callout-title">Choosing between ROS 1 and ROS 2</div>
            <p>
              ROS 2 is the fully supported path: movement, video, navigation, pose tracking, GPS
              position, and custom commands all work. ROS 1 covers movement, video, and navigation,
              but does not support pose tracking, GPS position, or custom commands. If your robot
              needs any of those three, run it on ROS 2.
            </p>
          </div>

          <h2 id="architectures">Architectures</h2>
          <div className="docs-table-wrapper" tabIndex={0}>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Architecture</th>
                  <th>Example Hardware</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>ARMv7</code></td>
                  <td>Older embedded compute boards</td>
                </tr>
                <tr>
                  <td><code>AArch64</code></td>
                  <td>NVIDIA Jetson, newer Raspberry Pi models</td>
                </tr>
                <tr>
                  <td><code>x86_64</code></td>
                  <td>Standard desktop / server (Intel and AMD)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="manufacturers">Compatible Manufacturers</h2>
          <p>
            CTRL+R works with any robot exposing a ROS interface. The manufacturers below publish ROS
            drivers for their hardware, so they connect through the standard setup.
          </p>
          <div className="docs-table-wrapper" tabIndex={0}>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Manufacturers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Humanoid &amp; legged</td>
                  <td>AgiBot, Unitree, Booster Robotics, Boston Dynamics, NEURA Robotics</td>
                </tr>
                <tr>
                  <td>Mobile &amp; service robots</td>
                  <td>Clearpath Robotics, PAL Robotics, Keenon, Husarion, ROBOTIS</td>
                </tr>
                <tr>
                  <td>Industrial &amp; collaborative arms</td>
                  <td>
                    Universal Robots, KUKA, ABB, FANUC, Franka Robotics, Kinova, Denso, Mitsubishi
                    Electric, Flexiv, igus, UFACTORY
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            This is not a closed list. If your hardware exposes a ROS interface, it's very likely
            already compatible even if the manufacturer isn't named here.
          </p>

          <h2 id="custom-integrations">Platforms We Integrate On Request</h2>
          <p>
            Some manufacturers ship a proprietary SDK or cloud interface instead of ROS. These aren't
            supported out of the box, but they're well within reach: we build an adapter for the
            vendor's interface and the robot then behaves like any other device on the platform, with
            the same controls, the same fleet view, and the same data capture.
          </p>
          <p>
            Examples include <strong>PUDU</strong> and <strong>temi</strong>, the latter running on
            Android rather than Linux.
          </p>
          <div className="docs-callout">
            <div className="docs-callout-title">Running hardware that doesn't expose ROS?</div>
            <p>
              Get in touch. Custom integrations are a normal part of onboarding a fleet, not an
              exception to it.
            </p>
          </div>
        </div>
        )}

        {/* Getting Started */}
        {activeSection === 'getting-started' && (
        <div className="docs-section active">
          <h1>Getting Started</h1>
          <p>
            Every robot or device you operate through CTRL+R runs a small piece of software called
            the <strong>CTRL+R agent</strong>. It lives on the device, connects out to the platform,
            and translates between our interface and whatever that hardware already speaks. Until the
            agent is installed and enrolled, a device cannot be seen or controlled from the webapp.
          </p>
          <p>
            This is what makes a mixed fleet workable. A quadruped, a camera on a loading dock, and
            an arm from a third manufacturer all run the same agent and surface the same way, so your
            operators learn one interface instead of one per vendor, and every device reports into
            one fleet view rather than three separate dashboards.
          </p>
          <p>
            You do not write the install command yourself. Start from the webapp and it generates
            one carrying the device's identity and its enrollment token:
          </p>
          <ul>
            <li>
              <strong>Individual accounts:</strong> click <strong>Add Robot</strong> from the
              Dashboard or Robots page. Both open the same flow.
            </li>
            <li>
              <strong>Organizations:</strong> open <strong>Command HQ</strong>, go to the{' '}
              <strong>Devices</strong> tab, and click <strong>Add Device</strong>. Choose{' '}
              <strong>Robot</strong>, or one of the other device types (Edge Device, IP Camera, IoT
              Sensor) for hardware that is not a robot.
            </li>
          </ul>
          <p>
            Either path ends on the Robot Setup page, which hands you the command to run on the
            device. Connect to the robot over SSH and run it there, not on your own machine. The
            rest of this page covers what needs to be in place before you do.
          </p>
          <p>
            Running a fleet rather than a single robot?{' '}
            <Link className="docs-inline-link" href="/docs/command-hq">
              Command HQ
            </Link>{' '}
            covers the wider picture: adding robots and other device types, team members and
            permissions, sites, notifications, and monitoring everything from one view.
          </p>
          <div className="docs-callout">
            <div className="docs-callout-title">Recommendation</div>
            <p>We recommend using Google Chrome with the CTRL+R webapp.</p>
          </div>

          <h2 id="install-method">Installing the Agent</h2>
          <p>
            The agent installs one of two ways. Both enroll the device and both keep it running
            across reboots; the difference is whether the agent lives on the host or in a container.
            The Robot Setup page generates the exact command for whichever you choose, already
            filled in with your enrollment token.
          </p>

          <h3>Option 1: apt (recommended)</h3>
          <p>
            The default. Adds the CTRL+R package repository, installs the <code>ctrlr-agent</code>{' '}
            package, enrolls the device, and registers a systemd service.
          </p>
          <ul>
            <li><strong>Requires</strong> a Debian or Ubuntu system with <code>apt</code>, and root (run it with <code>sudo</code>).</li>
            <li><strong>Runs as</strong> a systemd service, so it starts on boot and restarts if it exits.</li>
            <li><strong>Updates</strong> through <code>apt</code> along with the rest of the system.</li>
            <li><strong>Check it with</strong> <code>systemctl status ctrlr-agent</code>.</li>
          </ul>
          <p>
            Choose this unless you have a reason not to. It is the least moving parts: no container
            runtime, and the agent is managed the same way as everything else on the machine.
          </p>

          <h3>Option 2: Docker</h3>
          <p>
            Add <code>--method docker</code> to the install command. Pulls the agent image and runs
            it as a container with <code>--restart=unless-stopped</code>. Use this if you would
            rather not install packages onto the host, or you are not on a Debian-based system.
          </p>
          <ul>
            <li>
              <strong>Requires</strong> Docker installed via <code>apt</code>. Docker from the Snap
              Store is <strong>not supported</strong>: its filesystem and permission restrictions
              break the bind mounts the agent needs, and the installer will stop if it finds one.
              See the{' '}
              <a href="https://docs.docker.com/engine/install/" target="_blank" rel="noreferrer">
                official Docker install guide
              </a>
              .
            </li>
            <li><strong>Uses host networking</strong> (<code>--network=host</code>), which is required so the agent can reach rosbridge on loopback. See below.</li>
            <li><strong>Updates</strong> by pulling a new image tag rather than through apt.</li>
            <li><strong>Check it with</strong> <code>docker ps</code> and <code>docker logs ctrlr-agent</code>.</li>
          </ul>
          <p>
            On NVIDIA boards running JetPack 6 or newer, use <code>--method docker-jetson</code>{' '}
            instead. It runs the same agent on an NVIDIA base image with the GPU runtime attached,
            which enables hardware video encoding.
          </p>

          <h2 id="ros-req">ROS (recommended)</h2>
          <p>
            We recommend your robot is running ROS. The agent is compatible with both ROS 1 (Noetic)
            and ROS 2 (Foxy or newer)—for smoother operations we recommend ROS 2 Kilted. See{' '}
            <Link className="docs-inline-link" href="/docs/supported-platforms">
              Supported Platforms
            </Link>{' '}
            for more information.
          </p>
          <p>
            Decide this before you install: pose tracking, GPS position, and custom commands are
            available on ROS 2 only. If your robot needs any of the three, run it on ROS 2.
          </p>
          <ul>
            <li>
              <strong>ROS 1:</strong>{' '}
              <a href="https://wiki.ros.org/noetic/Installation/Ubuntu" target="_blank" rel="noreferrer">
                Install Noetic
              </a>
            </li>
            <li>
              <strong>ROS 2:</strong>{' '}
              <a href="https://docs.ros.org/en/kilted/Installation/Ubuntu-Install-Debs.html" target="_blank" rel="noreferrer">
                Install Kilted
              </a>{' '}
              (recommended), or{' '}
              <a href="https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html" target="_blank" rel="noreferrer">
                Humble
              </a>{' '}
              and other recent distros
            </li>
          </ul>

          <h2 id="rosbridge">rosbridge_server</h2>
          <p>
            If you plan to use ROS to control your robot, you must have{' '}
            <code>rosbridge_server</code> installed on your robot.
          </p>
          <pre tabIndex={0}><code>sudo apt install ros-$ROS_DISTRO-rosbridge-suite</code></pre>
          <p>Start it with:</p>
          <pre tabIndex={0}><code>ros2 launch rosbridge_server rosbridge_websocket_launch.xml</code></pre>
          <p>
            The agent expects rosbridge at <code>ws://127.0.0.1:9090</code>, on the same machine.
            That address is fixed, which is why the Docker install uses host networking. Do not
            expose port 9090 off the robot: rosbridge has no authentication, so anything that can
            reach it can drive the robot.
          </p>
          <div className="docs-callout">
            <div className="docs-callout-title">Run rosbridge as a systemd service</div>
            <p>
              If you start rosbridge by hand in a terminal, it dies when you close that session and
              does not come back after a reboot. The agent has nothing to talk to, so video,
              movement, and navigation all stop until someone logs in and starts it again.
            </p>
            <p>
              Create a systemd unit that runs the launch command above so it starts at boot and
              restarts on failure. The unit has to source your ROS setup script first
              (<code>/opt/ros/&lt;distro&gt;/setup.bash</code>), since systemd does not load your
              shell profile.
            </p>
          </div>

          <h2 id="zenoh">Zenoh (optional)</h2>
          <p>
            Zenoh can be used as an alternative video source to ROS. See the{' '}
            <a href="https://zenoh.io/docs/getting-started/installation/" target="_blank" rel="noreferrer">
              Zenoh installation guide
            </a>{' '}
            for setup instructions.
          </p>
        </div>
        )}

        {/* Configuring Your Robot */}
        {activeSection === 'configuring-your-robot' && (
        <div className="docs-section active">
          <h1>Configuring Your Robot</h1>

          <h2 id="config-overview">Overview</h2>
          <p>
            Configuration can be updated at any time while the robot is connected, including ROS
            topic names and video parameters. There are two places in the webapp to do this:
          </p>
          <ul>
            <li><strong>Robot Setup page</strong>—available during initial setup</li>
            <li><strong>Edit Robot page</strong>—available at any time after setup</li>
          </ul>
          <p>
            Both pages show the same live panel: video settings, the ROS topic names, audio, metrics,
            pose streaming, and custom commands. Changes take effect on the connected robot
            immediately. A few settings are not in that panel yet, noted where they appear below.
          </p>
          <p>
            When the CTRL+R agent is installed, a configuration file is saved locally on the robot at:
          </p>
          <pre tabIndex={0}><code>/etc/ctrlr_agent/config.json</code></pre>
          <p>The sections that apply to a robot are:</p>
          <ul>
            <li><strong>Core</strong>—These parameters should not be changed. They are essential for identifying the robot.</li>
            <li><strong>Robot</strong>—These parameters relate to your robot's video feed.</li>
            <li><strong>ROS Topics</strong>—These topics are used by the agent to communicate with your robot's ROS stack.</li>
            <li><strong>Position</strong>—Controls whether the robot reports its location, and where that location comes from. Off by default.</li>
            <li><strong>Metrics</strong>—Controls whether the agent streams CPU and battery usage to the webapp. On by default.</li>
            <li>
              <strong>Audio</strong>—Microphone and speaker settings, covered in{' '}
              <Link className="docs-inline-link" href="/docs/two-way-audio">Two-way Audio</Link>.
            </li>
          </ul>
          <p>
            The file also carries a <code>Custom Commands</code> section (see{' '}
            <Link className="docs-inline-link" href="/docs/custom-commands">Custom Commands</Link>) and
            an <code>RTSP</code> section, which is only used by IP camera devices rather than robots.
          </p>

          <h2 id="robot-params">Robot Parameters</h2>
          <div className="docs-table-wrapper" tabIndex={0}>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Image Format</td><td><code>Jpeg</code></td></tr>
                <tr><td>Resolution</td><td><code>640×480</code></td></tr>
                <tr><td>Video Source</td><td><code>Ros</code></td></tr>
                <tr><td>Image Encoding</td><td><code>BGR</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Image Encoding only applies when Image Format is <code>Raw</code>. If your camera driver
            publishes <code>rgb8</code> and the video looks colour-swapped, it needs to be{' '}
            <code>RGB</code>. It is not shown in the webapp panel today, so it is read from the
            config file on the robot.
          </p>

          <h2 id="ros-topics">ROS Topics</h2>
          <p>
            These topics are used by the agent to communicate with your robot's ROS stack. All of
            them are editable from the live config panel except <strong>Velocity 2</strong>, which is
            read from the config file on the robot.
          </p>
          <div className="docs-table-wrapper" tabIndex={0}>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Camera Raw<span className="docs-table-subtype">sensor_msgs/Image</span></td>
                  <td><code>/camera/image_raw</code></td>
                  <td>Raw camera frames</td>
                </tr>
                <tr>
                  <td>Camera JPEG<span className="docs-table-subtype">sensor_msgs/CompressedImage</span></td>
                  <td><code>/camera/image_raw/compressed</code></td>
                  <td>Compressed camera frames</td>
                </tr>
                <tr>
                  <td>Velocity<span className="docs-table-subtype">geometry_msgs/Twist</span></td>
                  <td><code>/cmd_vel</code></td>
                  <td>Movement commands published by the agent</td>
                </tr>
                <tr>
                  <td>Velocity 2<span className="docs-table-subtype">geometry_msgs/Twist</span></td>
                  <td><code>/cmd_vel_2</code></td>
                  <td>Secondary movement channel, published when the operator uses the right stick</td>
                </tr>
                <tr>
                  <td>Nav Goal<span className="docs-table-subtype">geometry_msgs/PoseStamped</span></td>
                  <td><code>/ctrlr/nav/goal</code></td>
                  <td>Autonomous navigation goals</td>
                </tr>
                <tr>
                  <td>Nav Cancel<span className="docs-table-subtype">std_msgs/Empty</span></td>
                  <td><code>/ctrlr/nav/cancel</code></td>
                  <td>Cancel active navigation</td>
                </tr>
                <tr>
                  <td>Nav Home<span className="docs-table-subtype">std_msgs/Empty</span></td>
                  <td><code>/ctrlr/nav/home</code></td>
                  <td>Send robot home</td>
                </tr>
                <tr>
                  <td>Nav Status<span className="docs-table-subtype">std_msgs/String</span></td>
                  <td><code>/ctrlr/nav/status</code></td>
                  <td>Navigation status published by the robot</td>
                </tr>
                <tr>
                  <td>Pose<span className="docs-table-subtype">geometry_msgs/PoseWithCovarianceStamped</span></td>
                  <td><code>/amcl_pose</code></td>
                  <td>Robot's live pose, streamed back to the webapp (off by default)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="docs-callout">
            <div className="docs-callout-title">Pose streaming</div>
            <p>
              Pose streaming is <strong>disabled by default</strong>. Enable it by setting{' '}
              <code>ros.pose_enabled</code> to <code>true</code>. The agent then subscribes to{' '}
              <code>ros.pose_topic</code> and forwards the robot's pose to the webapp, throttled to
              5 Hz. The default source is Nav2's <code>/amcl_pose</code>; set{' '}
              <code>ros.pose_msg_type</code> to <code>geometry_msgs/PoseStamped</code> if your robot
              publishes pose without covariance.
            </p>
          </div>
          <div className="docs-callout">
            <div className="docs-callout-title">Note</div>
            <p>
              The agent expects exactly three string values from the nav status topic:{' '}
              <code>"started"</code>, <code>"completed"</code>, or <code>"failed"</code>. Anything
              else is ignored with a warning.
            </p>
          </div>

          <h2 id="matching-topics">When Your Robot Doesn't Match the Defaults</h2>
          <p>
            The defaults above are conventions, not guarantees. Manufacturers name things
            differently, and a robot you have never connected before will often publish its camera
            or accept movement on topics of its own. This is normal. Expect to spend a little time
            on the first robot of a given model, and none on the ones after it.
          </p>
          <p>
            Work through it in two steps: find out what the robot actually offers, then decide which
            of the two fixes you need.
          </p>

          <h3>Step 1: See what the robot publishes</h3>
          <p>
            On the robot, with your ROS environment sourced, list every topic along with its message
            type:
          </p>
          <pre tabIndex={0}><code>{`ros2 topic list -t          # ROS 2
rostopic list -v            # ROS 1`}</code></pre>
          <p>
            That gives you the real names. To inspect one topic in detail, including its type (message format) and
            whether anything is actually listening to it:
          </p>
          <pre tabIndex={0}><code>{`ros2 topic info /cmd_vel    # ROS 2
rostopic info /cmd_vel      # ROS 1`}</code></pre>
          <p>
            The two things to look for: the topic the robot publishes camera frames on, and whether
            the robot subscribes to anything of type <code>geometry_msgs/Twist</code>. A Twist
            subscriber is the robot telling you it accepts standard movement commands.
          </p>
          <p>
            Two more commands answer questions the topic list cannot. <code>hz</code> tells you
            whether a topic is actually publishing or merely advertised, which separates a dead
            camera from a misconfigured one. <code>echo</code> prints a real message, and some
            settings can only be found this way:
          </p>
          <pre tabIndex={0}><code>{`ros2 topic hz /camera/image_raw            # publishing? how fast?
ros2 topic echo /camera/image_raw --once   # read one real message

rostopic hz /camera/image_raw              # ROS 1
rostopic echo -n1 /camera/image_raw`}</code></pre>
          <ul>
            <li>
              The camera's <strong>encoding</strong> field (<code>rgb8</code>, <code>bgr8</code> and
              so on) appears in the message but not in the type. That is the value for Image
              Encoding.
            </li>
            <li>
              A pose message carries a <strong>frame name</strong> inside it. Navigation goals only
              work against the <code>map</code> frame, so this is worth checking before wondering why
              a robot ignores its destination.
            </li>
          </ul>
          <p>
            If you need to know which program owns a topic, so you can tell the manufacturer's driver
            apart from the navigation stack:
          </p>
          <pre tabIndex={0}><code>{`ros2 node list
ros2 node info /<node_name>

rosnode list                               # ROS 1
rosnode info /<node_name>`}</code></pre>

          <h3>Step 2: Pick the fix</h3>
          <p>
            <strong>If the message types match but the names differ</strong>, you are done in about a
            minute. Type the robot's real topic names into the live config panel on the Robot Setup
            or Edit Robot page. Nothing is installed on the robot and nothing is written by hand. For
            example, a robot publishing video to <code>/front_camera/image_raw</code> just needs that
            value in the Camera Raw field. This covers most robots.
          </p>
          <p>
            <strong>If the robot does not accept <code>Twist</code> at all</strong>, remapping will
            not help, because the problem is the shape of the message rather than its address. This
            happens with arms, with some car-like robots, and with manufacturers that ship their own
            motion API. The fix is a small translator node that runs on the robot: it subscribes to
            the Twist topic the agent publishes to, converts each message into whatever the robot
            expects, and publishes that. It is usually a short script, and it is the same piece of
            work whether you write it yourself or we build it as part of onboarding.
          </p>
          <div className="docs-callout">
            <div className="docs-callout-title">You only do this once per model</div>
            <p>
              Whatever you work out here is saved with the robot, in the webapp and in its config
              file, so it survives restarts and you never repeat it for that machine. When you add
              the second robot of the same model, you already know its topic names and reuse the same
              values, which turns an afternoon of investigation into a few minutes of typing. Fleets
              get faster to expand as you go, because the unknowns are per model rather than per
              robot.
            </p>
          </div>

          <h2 id="position">Position Reporting</h2>
          <p>
            Position reporting is what puts a robot on the map in Eagle Eye and Command HQ. It is{' '}
            <strong>off by default</strong>, and is not exposed in the webapp config panel yet, so
            these values come from the config file on the robot. Turn it on with{' '}
            <code>position.enabled</code>, then choose where the position comes from with{' '}
            <code>position.source</code>:
          </p>
          <div className="docs-table-wrapper" tabIndex={0}>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Where position comes from</th>
                  <th>Requires</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>map</code> (default)</td>
                  <td>Reuses the existing ROS pose subscription, so the robot is placed using its map-frame pose</td>
                  <td><code>ros.pose_enabled</code> set to <code>true</code>. ROS 2 only.</td>
                </tr>
                <tr>
                  <td><code>gps</code></td>
                  <td>
                    Subscribes to a <code>sensor_msgs/NavSatFix</code> topic, set by{' '}
                    <code>position.gps_topic</code> (default <code>/gps/fix</code>)
                  </td>
                  <td>A GPS receiver publishing NavSatFix. ROS 2 only.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Custom Commands */}
        {activeSection === 'custom-commands' && (
        <div className="docs-section active">
          <h1>Custom Commands</h1>
          <p>
            Custom commands let you publish to <strong>any</strong> ROS topic on your robot from
            the CTRL+R webapp, beyond the built-in movement and navigation controls. Each command
            is a named, one-shot publish bound to a keyboard key or gamepad button.
          </p>

          <h2 id="cc-overview">Overview</h2>
          <p>There are two roles in the custom-commands workflow:</p>
          <ul>
            <li>
              <strong>Robot owner</strong>—defines the available commands on the robot (topic,
              message type, default payload). Definitions are stored on the agent under{' '}
              <code>ros.custom_commands</code> in <code>/etc/ctrlr_agent/config.json</code>.
            </li>
            <li>
              <strong>Operator</strong>—binds the available commands to keyboard keys or
              gamepad buttons during a teleop session. Bindings are saved per user, per robot.
            </li>
          </ul>
          <div className="docs-callout">
            <div className="docs-callout-title">Capability gate</div>
            <p>
              Custom commands require an agent on protocol <code>0.6</code> or newer. Older
              agents will not advertise the capability and the UI will be hidden for that robot.
            </p>
          </div>

          <h2 id="cc-msg-types">Supported Message Types</h2>
          <p>
            Buttons are one-shot—they fire a single publish per press. To keep that safe, only
            message types whose payload has a well-defined "single value" are allowed. Continuous
            actuator types like <code>geometry_msgs/Twist</code> are intentionally excluded—a
            one-shot button bound to Twist would leave the actuator running indefinitely. Use
            the built-in joystick / WASD <code>cmd_vel</code> path for continuous motion.
          </p>
          <div className="docs-table-wrapper" tabIndex={0}>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Message Type</th>
                  <th>Payload Shape</th>
                  <th>Example Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>std_msgs/Bool</code></td>
                  <td><code>{`{ data: true | false }`}</code></td>
                  <td>Toggle lights, enable/disable a subsystem</td>
                </tr>
                <tr>
                  <td><code>std_msgs/Int32</code></td>
                  <td><code>{`{ data: <i32> }`}</code></td>
                  <td>Select a mode, set a discrete level</td>
                </tr>
                <tr>
                  <td><code>std_msgs/Float32</code></td>
                  <td><code>{`{ data: <number> }`}</code></td>
                  <td>Set a target speed, gain, or threshold</td>
                </tr>
                <tr>
                  <td><code>std_msgs/String</code></td>
                  <td><code>{`{ data: "<text>" }`}</code></td>
                  <td>Trigger a named behavior, play a sound</td>
                </tr>
                <tr>
                  <td><code>std_msgs/Empty</code></td>
                  <td><code>{`{}`}</code></td>
                  <td>Fire-and-forget trigger (e-stop, take photo)</td>
                </tr>
                <tr>
                  <td><code>geometry_msgs/PoseStamped</code></td>
                  <td>header + pose (position + orientation)</td>
                  <td>Send a navigation goal to a saved pose</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="docs-callout">
            <div className="docs-callout-title">PoseStamped timestamps</div>
            <p>
              The agent overwrites <code>header.stamp</code> with the current time at publish,
              per ROS convention. You don't need to set it when defining the command.
            </p>
          </div>

          <h2 id="cc-defining">Defining Commands (Robot Owner)</h2>
          <p>Commands are defined per-robot from the <strong>Edit Robot</strong> page:</p>
          <p>
            Organizations have a second option. Under{' '}
            <Link className="docs-inline-link" href="/docs/command-hq">Command HQ</Link> &rarr;{' '}
            <strong>Customizations</strong> &rarr; <strong>ROS Commands</strong>, you can save
            commands at the organization level instead of setting them up on each robot separately.
            They take the same three things as a per-robot command: the topic, the message type, and
            the payload. When adding one, you can load the available commands from a connected robot
            rather than typing them in. Useful when a fleet shares the same hardware and you want one
            place to manage the actions your operators get.
          </p>
          <ol>
            <li>
              Open the robot's <strong>Edit Robot</strong> page and connect to the live config
              session.
            </li>
            <li>
              Scroll to the <strong>Custom Commands</strong> panel and click{' '}
              <strong>Add Command</strong>.
            </li>
            <li>Fill in:
              <ul>
                <li><strong>Name</strong>—display label shown to operators.</li>
                <li><strong>Topic</strong>—ROS topic to publish on, e.g. <code>/lights/toggle</code>.</li>
                <li><strong>Message type</strong>—one of the supported types above.</li>
                <li>
                  <strong>Default payload</strong>—the value to publish when the command fires.
                  The editor renders a typed form per message type (checkbox for Bool, number
                  field for Int32/Float32, etc.).
                </li>
              </ul>
            </li>
            <li>
              Click <strong>Save</strong>. The webapp sends an <code>agent.config.update</code>{' '}
              message with the new <code>ros.custom_commands</code> list; the agent validates
              against the allowlist and persists the definition to disk.
            </li>
          </ol>
          <div className="docs-callout">
            <div className="docs-callout-title">Lazy advertise</div>
            <p>
              The agent doesn't advertise the ROS publisher until the command is fired for the
              first time in a session, then caches the publisher handle. No robot restart is
              required after adding, editing, or removing a command.
            </p>
          </div>

          <h2 id="cc-bindings">Binding to Inputs (Operator)</h2>
          <p>Bindings live per <em>(user, robot)</em> and persist across sessions:</p>
          <ol>
            <li>Start a teleop session with the robot.</li>
            <li>
              Open <strong>Input Bindings</strong> from the session toolbar. The modal lists
              every command currently defined on the robot.
            </li>
            <li>
              Switch between the <strong>Keyboard</strong> and <strong>Gamepad</strong> tabs and
              assign a key or button to each command you want to use.
            </li>
            <li>Click <strong>Save</strong> to persist the bindings to your account.</li>
          </ol>
          <div className="docs-callout">
            <div className="docs-callout-title">Triggers count as buttons</div>
            <p>
              Gamepad triggers (LT/RT) are treated as one-shot buttons—they fire when the
              analog value crosses the 0.5 threshold, not continuously while held.
            </p>
          </div>

          <h2 id="cc-firing">Firing Commands</h2>
          <p>During a teleop session:</p>
          <ul>
            <li>
              Press a bound key or button—the webapp sends an{' '}
              <code>agent.command.execute</code> envelope over the WebRTC data channel with the
              command ID and payload.
            </li>
            <li>
              The agent looks up the definition, validates the payload against the message-type
              schema, publishes on the configured ROS topic, and returns an{' '}
              <code>agent.command.response</code> with <code>success</code> /{' '}
              <code>error</code>.
            </li>
            <li>A toast surfaces the outcome (success or the agent's error message).</li>
          </ul>

          <h2 id="cc-notes">Notes &amp; Limitations</h2>
          <ul>
            <li>
              <strong>Publish-only.</strong> Custom commands publish to ROS; they do not
              subscribe. Sensor readback from custom topics is planned for a future release.
            </li>
            <li>
              <strong>One-shot only.</strong> Each press fires one publish. Continuous bindings
              from sticks/triggers (e.g. right stick → head pan/tilt) are not yet supported.
            </li>
            <li>
              <strong>Defense in depth.</strong> The agent re-validates the payload at execute
              time against the registered message type, even though the webapp also validates
              when editing—a stale binding or corrupted payload will be rejected cleanly.
            </li>
            <li>
              <strong>Per-robot bindings.</strong> If you operate multiple robots, you bind keys
              separately for each. The set of available commands also comes from each robot's
              own configuration.
            </li>
          </ul>
        </div>
        )}

        {/* Two-way Audio */}
        {activeSection === 'two-way-audio' && (
        <div className="docs-section active">
          <h1>Two-way Audio</h1>
          <p>
            Two-way audio lets you talk to people near the robot and hear them in real time during
            a teleop session. Audio is carried over the same WebRTC connection as video and is
            gated by a push-to-talk button on the operator side.
          </p>

          <h2 id="audio-overview">Overview</h2>
          <ul>
            <li><strong>Operator → robot:</strong> your browser captures your microphone and sends it to the robot's speakers.</li>
            <li><strong>Robot → operator:</strong> the robot captures its microphone and sends it to your browser.</li>
            <li><strong>Push-to-talk:</strong> the operator mic is muted by default. Hold <code>Space</code> (or press the on-screen mic button) to transmit.</li>
          </ul>
          <div className="docs-callout">
            <div className="docs-callout-title">Capability gate</div>
            <p>
              Audio support is built into every agent, but it depends on ALSA and GStreamer being
              available on the robot. The agent must be restarted after toggling
              <code> audio.enabled</code>.
            </p>
          </div>
          <div className="docs-callout">
            <div className="docs-callout-title">Audio format</div>
            <p>
              Audio is encoded with <strong>Opus at 48 kHz</strong>, stereo on capture, 20 ms frames
              at 24 kbit/s, carried over WebRTC with a 60 ms jitter buffer on the robot's playback
              side.
            </p>
          </div>

          <h2 id="audio-hardware">Hardware Setup</h2>
          <p>To use two-way audio, the robot needs a microphone and speakers connected to its host computer:</p>
          <ul>
            <li><strong>Microphone</strong>—USB mic, USB headset, or 3.5mm mic plugged into the robot's audio input.</li>
            <li><strong>Speakers</strong>—USB speakers, the robot's built-in audio jack, or a Bluetooth/HDMI output (anything ALSA can route to).</li>
          </ul>
          <p>
            Plug the devices in <strong>before</strong> starting the agent so ALSA enumerates them at
            startup. If you add a device after the agent is running, restart the agent.
          </p>

          <h2 id="audio-enable">Enabling Audio</h2>
          <p>
            Open the robot's <strong>Edit Robot</strong> page (or <strong>Robot Setup</strong> during
            initial setup), connect the configuration session, and look for the <strong>Audio</strong>{' '}
            group in the live config table.
          </p>
          <ul>
            <li>Set <strong>Two-way Voice</strong> to <code>Enabled</code>.</li>
            <li>
              <strong>Restart the agent</strong> for the change to take effect—the audio pipeline
              is wired up at startup, not on the fly. From the robot host:
            </li>
          </ul>
          <pre tabIndex={0}><code>{`sudo systemctl restart ctrlr-agent   # apt install (the default)
docker restart ctrlr-agent           # Docker install`}</code></pre>
          <p>If you don't restart, the toggle will save but no audio will flow.</p>

          <h2 id="audio-devices">Selecting Devices</h2>
          <p>
            By default the agent uses GStreamer's auto-detect: <code>autoaudiosrc</code> for the mic
            and <code>autoaudiosink</code> for speakers. That works on many robots, but if you need a
            specific device (e.g. a USB mic when the robot also has an HDMI input it would otherwise
            prefer), set the <strong>Microphone Device</strong> and <strong>Speaker Device</strong>{' '}
            fields to ALSA device names.
          </p>
          <p>To list available devices, run on the robot:</p>
          <pre tabIndex={0}><code>{`arecord -L   # list inputs (microphones)
aplay -L     # list outputs (speakers)`}</code></pre>
          <p>
            Pick the name you want (typically a <code>plughw:CARD=&lt;name&gt;,DEV=&lt;n&gt;</code>{' '}
            entry—the <code>plughw</code> form lets ALSA convert sample rates if needed), paste it
            into the matching field in the webapp, and press <code>Enter</code> to save.
          </p>
          <div className="docs-callout">
            <div className="docs-callout-title">Tip</div>
            <p>
              If <code>arecord -L</code> shows a long list, the ones you usually want are the
              <code> plughw:CARD=...</code> entries for the physical device you plugged in, or the
              <code> default</code> alias if your system is already configured to route to it.
            </p>
          </div>

          <h2 id="audio-session">Using It In a Session</h2>
          <ul>
            <li>Start a teleop session for the robot.</li>
            <li>
              Click the <strong>microphone</strong> button in the session controls. The first time,
              the browser will prompt you for microphone permission—accept it.
            </li>
            <li>
              The mic stays <strong>muted</strong> until you transmit. To talk:
              <ul>
                <li><strong>Hold <code>Space</code></strong>—push-to-talk. Mic transmits while held, mutes on release.</li>
                <li><strong>Click the mic button</strong>—latches transmit on; click again to mute.</li>
              </ul>
            </li>
            <li>Robot audio plays automatically through your browser once the session connects.</li>
          </ul>
          <div className="docs-callout">
            <div className="docs-callout-title">No audio?</div>
            <p>
              Check that <code>audio.enabled</code> is <code>true</code> and the agent was restarted
              afterward; verify the device names with <code>arecord -L</code> / <code>aplay -L</code>;
              and confirm browser microphone permission isn't blocked for the CTRL+R site.
            </p>
          </div>
        </div>
        )}

        {/* Locations */}
        {activeSection === 'locations' && (
        <div className="docs-section active">
          <h1>Locations</h1>
          <p>
            A location is a named point a robot can be sent to. Instead of an operator driving a
            robot across a building by hand, they pick a name from a list and the robot navigates
            there on its own, using its own navigation stack to route and avoid obstacles.
          </p>
          <p>
            You set them up by uploading a map of the site and clicking the spot you want. Give it a
            name and it becomes a destination. Each site has its own map, and every user and robot
            with access to that site gets every location on it, so you build the list once rather
            than robot by robot.
          </p>

          <h2 id="loc-what">What Locations Do</h2>
          <ul>
            <li>
              <strong>Turn driving into dispatching.</strong> Sending a robot to "Loading Dock 2"
              takes one click. The operator does not need to know the building, and does not need to
              watch the robot the whole way.
            </li>
            <li>
              <strong>Make one operator useful across many robots.</strong> Manual driving occupies a
              person for the whole trip. Dispatching does not, so one person can keep several robots
              working instead of babysitting one.
            </li>
            <li>
              <strong>Remove tribal knowledge.</strong> The place names live in the platform, not in
              an operator's head, so a new starter is useful immediately and cover is easy.
            </li>
            <li>
              <strong>Keep names consistent across a fleet.</strong> Every robot on a site can share
              the same set of places, so instructions mean the same thing regardless of which robot
              is free.
            </li>
            <li>
              <strong>See where the robot is.</strong> The robot's live position shows on the map as
              a pulsing red beacon, with a cone pointing the way it is facing, so you can watch it
              travel instead of guessing from the camera feed. The beacon turns grey if the position
              goes stale.
            </li>
            <li>
              <strong>Recall and cancel.</strong> Every robot has a Home, and any trip in progress
              can be cancelled from the session.
            </li>
          </ul>

          <h2 id="loc-sources">Where Locations Come From</h2>
          <p>
            Locations are created in{' '}
            <Link className="docs-inline-link" href="/docs/command-hq">Command HQ</Link> under{' '}
            <strong>Customizations</strong> &rarr; <strong>Locations</strong>, by placing them on a
            site's map. They then appear automatically in the Locations list inside the teleop
            session for any robot on that site. Operators do not add them, and nothing needs setting
            up on the robot itself.
          </p>
          <p>
            A site has to exist with its map uploaded before locations can be placed on it, so create
            the site first.
          </p>
          <p>Two other entries can show up in the same list:</p>
          <ul>
            <li>
              <strong>Home.</strong> Each robot has a Home entry. If a home location has been saved
              for that robot, the robot navigates to it. If not, CTRL+R asks the robot to run its own
              built-in homing routine instead, which is usually a return to its dock or charger.
            </li>
            <li>
              <strong>Places from a system you already run.</strong> Organizations can connect an
              existing source, so destinations already tracked elsewhere, such as inventory or
              product locations, become available without anyone retyping them.
            </li>
          </ul>

          <div className="docs-callout">
            <div className="docs-callout-title">Turn on live position</div>
            <p>
              The pulsing beacon needs <strong>Pose Streaming</strong> switched on for that robot,
              and it is <strong>off by default</strong>. Turn it on in the live config panel on the
              Robot Setup or Edit Robot page. Without it the map still works and the robot still
              navigates, you just cannot see where it is. The robot also has to report its position
              against the same map, so if the beacon never appears, check that first.
            </p>
          </div>

          <h3>Uploading a map</h3>
          <p>
            The usual source is a <code>PGM</code> file, which is what most robots produce from their
            standard mapping routine. Drive the robot around once to let it build a map of the space,
            export it, and upload it to the site. PNG, JPG and YAML files are accepted too.
          </p>

          <h2 id="loc-using">Sending a Robot</h2>
          <p>
            Locations live in a panel inside the teleop session. Open a session, find the location by
            name or with the search box, and send the robot. While it is travelling, the panel shows
            that the trip is in progress along with how long it has been going, and there is a Cancel
            control to stop it. Home has its own button at the top of the panel.
          </p>
          <p>
            The robot reports back when it arrives or if it fails, so the operator does not need to
            watch the video feed to know the trip finished.
          </p>

          <h2 id="loc-technical">How It Works</h2>
          <p>
            A location is a name plus a point in the robot's own map: an X, Y and Z coordinate, with
            an optional facing direction so the robot arrives pointing the right way. Those numbers
            are positions on the map your robot's navigation system already uses, not GPS
            coordinates.
          </p>
          <p>
            When an operator sends a robot, CTRL+R publishes that point to the robot's navigation
            goal topic as a <code>geometry_msgs/PoseStamped</code> in the <code>map</code> frame. The
            robot's own navigation stack does the rest. Cancelling publishes to the nav cancel topic,
            and Home publishes to the nav home topic when no home location is saved. All three topic
            names are configurable on the{' '}
            <Link className="docs-inline-link" href="/docs/configuring-your-robot">
              Configuring Your Robot
            </Link>{' '}
            page.
          </p>
          <p>
            Progress comes back on the nav status topic, which the agent expects to carry exactly
            three values: <code>"started"</code>, <code>"completed"</code> and{' '}
            <code>"failed"</code>. That is what drives the in-progress and finished states in the
            panel.
          </p>
          <p>
            The destination is handed to the robot at the moment an operator sends it, so the robot
            does not need the whole list of places in advance. Adding or renaming a location in
            Command HQ takes effect straight away, with nothing to push out to the fleet.
          </p>

          <h2 id="loc-requirements">Requirements and Limits</h2>
          <ul>
            <li>
              <strong>The robot needs a working navigation stack.</strong> CTRL+R sends a
              destination; it does not do path planning or obstacle avoidance. A robot that cannot
              navigate on its own will receive the goal and do nothing with it.
            </li>
            <li>
              <strong>The robot needs to know where it is.</strong> Navigation depends on the robot
              being localized on its map. If it has lost its position, trips will fail.
            </li>
            <li>
              <strong>Locations belong to a site, not a robot.</strong> A robot only sees the
              locations for the site it belongs to, so a robot moved between sites picks up that
              site's list rather than carrying its old one.
            </li>
            <li>
              <strong>Locations are map-specific.</strong> They only make sense against the map the
              robot was using when they were created. Remap the building and the coordinates need
              revisiting.
            </li>
          </ul>
        </div>
        )}

        {/* Command HQ */}
        {activeSection === 'command-hq' && (
        <div className="docs-section active">
          <h1>Command HQ</h1>
          <p>
            Command HQ is the fleet management side of CTRL+R, built for organizations running more
            than a handful of machines. A single robot needs an operator. A fleet needs to know who
            is allowed to touch what, what every device is doing right now, what happened last week,
            and how the whole thing behaves when something goes wrong. That is what this is.
          </p>
          <p>
            It is designed for mixed fleets. Robots from different manufacturers sit alongside
            cameras, edge devices and sensors in the same views, with the same permissions and the
            same history, so growing the fleet does not mean adding another dashboard.
          </p>
          <p>
            Two controls sit at the top of every tab: a <strong>site</strong> picker and a{' '}
            <strong>team</strong> picker, so a large organization can narrow everything down to one
            building or one group. Your current role is shown next to them, so it is always clear
            what you are permitted to do.
          </p>

          <h2 id="hq-overview">Overview</h2>
          <p>
            The landing tab, and the one to check first thing in the morning. It shows headline
            counts for the organization: how many members against your seat limit, how many devices,
            how many are online right now, and how many invitations are still outstanding.
          </p>
          <p>
            Below that, the member list shows who is in the organization and their role, and{' '}
            <strong>Fleet health</strong> lists every device with its type, session count and current
            status. One screen answers "is anything down, and is anyone around to deal with it".
          </p>

          <h2 id="hq-members">Members</h2>
          <p>
            People are invited by email address and given a role. There are four:
          </p>
          <div className="docs-table-wrapper" tabIndex={0}>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>What they can do</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Owner</strong></td>
                  <td>Full control. Cannot be removed.</td>
                </tr>
                <tr>
                  <td><strong>Admin</strong></td>
                  <td>Manage members, roles, devices and settings.</td>
                </tr>
                <tr>
                  <td><strong>Operator</strong></td>
                  <td>Operate robots and view sessions.</td>
                </tr>
                <tr>
                  <td><strong>Viewer</strong></td>
                  <td>Read-only access to the organization.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Roles are a shorthand for a finer-grained set of permissions, and you can see exactly
            which ones a member holds. They cover viewing and managing members, viewing and managing
            devices, operating devices, viewing sessions and logs, viewing and managing settings,
            viewing, managing and executing commands, and managing notification rules. Operating a
            robot is deliberately separate from managing one, so you can let someone drive without
            letting them reconfigure anything.
          </p>
          <p>
            Access can also be narrowed per person to specific devices, so a contractor or a
            site-based team only sees the machines they are responsible for.
          </p>

          <h2 id="hq-eagle-eye">Eagle Eye</h2>
          <p>
            Eagle Eye is live visibility across everything connected at once: robots, drones, camera
            streams, sensors and anything else enrolled. Rather than checking machines one at a time,
            you watch the whole site.
          </p>
          <p>
            Idle online robots stream together in view-only mode, with no control attached. If a
            robot is already in a live session, its tile shows who is driving it instead of the feed,
            so opening Eagle Eye can never interrupt or take over somebody's session.
          </p>
          <p>
            Tiles can be arranged automatically or locked to a fixed grid, and the list can be
            filtered to online devices only. There is also a map view, which places devices
            geographically rather than in a grid, with anything lacking a known position grouped to
            one side.
          </p>

          <h2 id="hq-devices">Devices</h2>
          <p>
            Everything enrolled in the organization lives here, and it is deliberately broader than
            robots. Four types can be added:
          </p>
          <div className="docs-table-wrapper" tabIndex={0}>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>What it covers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Robot</strong></td>
                  <td>
                    Any form factor: wheeled and tracked robots, quadrupeds, humanoids, arms, and
                    drones and other unmanned vehicles
                  </td>
                </tr>
                <tr>
                  <td><strong>IP Camera</strong></td>
                  <td>Fixed CCTV and security cameras, pulled in over RTSP by an on-site gateway</td>
                </tr>
                <tr>
                  <td><strong>IoT Sensor</strong></td>
                  <td>Standalone sensors reporting readings rather than a video feed</td>
                </tr>
                <tr>
                  <td><strong>Edge Device</strong></td>
                  <td>
                    On-site computers, which can also act as the gateway that brings cameras and
                    sensors onto the platform
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            They all share the same permissions, the same fleet views and the same history, so a
            camera in a corridor and a humanoid on the floor are managed the same way.
          </p>
          <p>The fleet is shown in three views:</p>
          <ul>
            <li>
              <strong>Diagram</strong> draws the relationship between operators and machines, so you
              can see who is assigned to what, which links are live, and which devices nobody owns.
            </li>
            <li>
              <strong>Bubble</strong> clusters devices around the person who owns them, which makes
              uneven distribution obvious at a glance.
            </li>
            <li>
              <strong>List</strong> is the detail view: model, type, status, who it is assigned to,
              who is using it right now, and accumulated session hours.
            </li>
          </ul>
          <p>
            Devices can be filtered by state, including in use, online, offline, error and
            unassigned. From any row you can start a teleop session or open that device's
            configuration, and new devices are added from here.
          </p>

          <h2 id="hq-sites">Sites</h2>
          <p>
            Sites are for organizations operating in more than one place. Each site has its own
            address and timezone, its own set of devices, and its own map.
          </p>
          <p>
            Uploading a floor plan turns a site into something operators can navigate. Click anywhere
            on the map to create a named waypoint, and robots at that site can be sent there. Maps
            accept PNG, JPG, YAML or PGM, and PGM is what most robots produce from their standard
            mapping routine. See{' '}
            <Link className="docs-inline-link" href="/docs/locations">Locations</Link> for how this
            works end to end.
          </p>
          <p>
            Because devices and people are scoped to a site, a large organization can hand a building
            to a local team without exposing the rest of the fleet.
          </p>

          <h2 id="hq-sessions">Sessions and Logs</h2>
          <p>
            Every teleop session is recorded and timestamped: which device, which operator, when it
            started, how long it ran, and how it ended. Sessions are marked active, completed, failed
            or terminated, so a bad session is visible rather than buried. The whole table exports to
            CSV.
          </p>
          <p>
            Alongside it, the <strong>Logs</strong> view records events across the fleet at three
            severities: information, warnings and errors. Connection losses, low battery, failed
            calibrations, firmware updates and successful actions all land here with tags and
            timestamps, filterable by month and searchable.
          </p>
          <p>
            The value is pattern-spotting. One robot failing calibration is an incident. The same
            robot failing calibration every Tuesday is a maintenance problem, and that only becomes
            visible when the events sit in one searchable place instead of inside separate sessions.
          </p>

          <h2 id="hq-customizations">Customizations</h2>
          <p>
            Where the platform gets shaped around your fleet rather than the manufacturer's defaults.
            Four groups:
          </p>
          <ul>
            <li>
              <strong>ROS Commands</strong> are organization-level actions published to a topic on
              your robots, defined once and reused across the fleet. See{' '}
              <Link className="docs-inline-link" href="/docs/custom-commands">Custom Commands</Link>.
            </li>
            <li>
              <strong>Controller</strong> holds controller configurations. Alongside a standard
              gamepad you can add your own layouts and map commands to specific buttons, which is how
              a bespoke or specialist controller gets supported.
            </li>
            <li>
              <strong>Locations</strong> manages the waypoints placed on your site maps. See{' '}
              <Link className="docs-inline-link" href="/docs/locations">Locations</Link>.
            </li>
            <li>
              <strong>Keyboard</strong> defines key bindings, so a keyboard can act as a full
              controller with movement, camera and command keys, plus modifiers for things like a
              speed boost or fine control.
            </li>
          </ul>
          <p>
            Configurations can target specific robots, so an arm and a ground robot can each have
            controls that suit them while operators stay in one interface. All of it sits behind the
            command permissions described above.
          </p>

          <h2 id="hq-denylist">Deny List</h2>
          <p>
            Organization-level access control for the cases where permissions are not enough. Rules
            block by <strong>IP address</strong>, <strong>user</strong>, <strong>device</strong> or{' '}
            <strong>region</strong>.
          </p>
          <p>
            Each rule records a reason, who created it and when, and can either be permanent or carry
            an expiry date, which suits a temporary suspension while something is investigated. Rules
            can be deactivated without deleting them, so the history of a decision is not lost.
          </p>
          <p>
            Typical uses: blocking a region you are not licensed to operate in, cutting off an IP
            address making repeated unauthorized attempts, or suspending an operator after a safety
            violation.
          </p>

          <h2 id="hq-notifications">Notifications</h2>
          <p>
            Notifications turn fleet events into something a person actually sees. The tab has two
            halves: a <strong>feed</strong> of what has happened, and the <strong>rules</strong> that
            decide what is worth raising.
          </p>
          <p>A rule is made up of four things:</p>
          <ul>
            <li>The <strong>event</strong> that triggers it, such as a robot disconnecting, a robot error, a command being executed, or a new member joining.</li>
            <li>A <strong>severity</strong>, so genuine problems are distinguishable from routine information.</li>
            <li><strong>Who to tell</strong>, either by role or by naming individual members.</li>
            <li><strong>How to tell them</strong>.</li>
          </ul>
          <p>
            Rules can be switched off without being deleted, and the feed tracks what has been read,
            so a shift handover starts from what is still outstanding.
          </p>
        </div>
        )}

        {/* Security */}
        {activeSection === 'security' && (
        <div className="docs-section active">
          <h1>Security</h1>
          <p>
            Teleoperation means a person on the internet can move a physical machine. Every robot
            proves its identity with cryptography rather than a shared secret, every session is
            encrypted, and nothing needs to be opened on your network for any of it to work.
          </p>

          <h2 id="sec-identity">Robot Identity</h2>
          <p>
            During setup, the agent generates an <strong>Ed25519</strong> keypair{' '}
            <strong>on the robot</strong>. The private half never leaves that machine. It is written
            to <code>/etc/ctrlr_agent/agent_key</code>, readable only by the account the agent runs
            as, and only the public half is ever sent to us.
          </p>
          <p>
            Ed25519 is the same signature scheme used to secure SSH and modern web infrastructure.
            Guessing a key is not a matter of having enough money or hardware: even a billion
            machines each making a trillion attempts every second would still need longer than the
            universe has existed.
          </p>
          <p>
            From then on, that keypair is the robot's identity. Every single time the robot connects,
            our signaling server issues a fresh challenge and the robot must sign it with its private
            key to prove it is genuine. A stolen recording of an earlier connection is useless,
            because the challenge is new each time.
          </p>
          <p>
            The token used during first-time enrollment is <strong>single use and expires</strong>.
            It is consumed the moment the robot registers its key, so an install command that leaks
            afterwards cannot be used to enroll an impostor.
          </p>
          <p>
            Until a connection has passed that check, it is allowed to do almost nothing: it can
            attempt to register and answer keepalives, and that is all. Nothing can be controlled
            before identity is proven.
          </p>

          <h2 id="sec-sessions">Encrypted Sessions</h2>
          <p>
            Video, audio and control commands travel over WebRTC, which is encrypted in transit by
            design. Signaling runs over an encrypted WebSocket connection. The session view displays
            the connection's security status while you operate.
          </p>
          <p>
            Operators authenticate through a managed identity provider, and their credentials are
            verified on every connection rather than once at login.
          </p>

          <h2 id="sec-network">Network Posture</h2>
          <ul>
            <li>
              <strong>The robot makes outbound connections only.</strong> It dials out to us. You do
              not need to open inbound ports, expose the robot to the internet, or give it a public
              address.
            </li>
            <li>
              <strong>No port forwarding, no VPN required.</strong> A robot behind normal corporate
              networking works without special treatment.
            </li>
            <li>
              <strong>The robot's internal messaging stays internal.</strong> The link between our
              agent and your robot's software runs over the machine's own loopback address. It is not
              reachable from the network at all.
            </li>
          </ul>

          <h2 id="sec-access">Access Control</h2>
          <p>
            Inside an organization, what someone can do is controlled in{' '}
            <Link className="docs-inline-link" href="/docs/command-hq">Command HQ</Link>.
          </p>
          <ul>
            <li>
              <strong>Roles and fine-grained permissions.</strong> Operating a robot is a separate
              permission from managing one, so you can let a contractor drive without letting them
              change configuration, and let an analyst read history without touching a machine.
            </li>
            <li>
              <strong>Per-person device access.</strong> Someone can be restricted to specific
              machines rather than the whole fleet.
            </li>
            <li>
              <strong>Sites.</strong> People and devices are scoped to a location, so a local team
              does not gain visibility of the rest of the organization.
            </li>
            <li>
              <strong>Deny list.</strong> Access can be blocked outright by user, device, IP address
              or region, permanently or with an expiry, with the reason recorded. This is how you
              suspend an operator during an investigation, or refuse connections from a region you
              are not licensed to operate in.
            </li>
            <li>
              <strong>One operator at a time.</strong> A robot already in a live session cannot be
              silently taken over. Fleet-wide monitoring views show who is driving instead of
              offering control.
            </li>
          </ul>

          <h2 id="sec-audit">Audit Trail</h2>
          <p>
            Every session is recorded with the device, the operator, when it started, how long it
            ran, and how it ended. Fleet events are logged separately with severities and timestamps,
            and both can be exported.
          </p>
          <p>
            "Who moved that robot, and when" is always answerable, for incident review, for insurers,
            and for demonstrating control over physical equipment.
          </p>

          <h2 id="sec-yours">Your Responsibilities</h2>
          <p>The following sit on your side of the boundary.</p>
          <ul>
            <li>
              <strong>Do not expose your robot's messaging port to the network.</strong> The bridge
              our agent talks to is unauthenticated and unencrypted by design. It is safe only
              because it stays on the robot's own loopback address, unreachable from the network.
              Publish it more widely and anything that can reach it can drive the robot with no
              credentials at all.
            </li>
            <li>
              <strong>Anyone with a login on the robot can command it directly.</strong> That is true
              of any ROS machine, and it bypasses CTRL+R entirely, along with its permissions and its
              audit trail. Accounts on the robot itself are part of your security boundary, not ours.
            </li>
            <li>
              <strong>Physical access is full access.</strong> Someone who takes the robot, or pulls
              its compute board, has the key file and can impersonate that device. If a machine is
              stolen or decommissioned, remove it from your organization so its identity stops being
              accepted, and treat its key as compromised.
            </li>
            <li>
              <strong>Enrollment commands contain a live token.</strong> Do not paste them into
              shared chats or tickets. If one leaks, regenerate it from the Robot Setup page.
            </li>
            <li>
              <strong>Review access periodically.</strong> Remove members who have left and revoke
              device access that is no longer needed.
            </li>
            <li>
              <strong>Physical safety remains yours.</strong> CTRL+R controls robots; it does not
              replace emergency stops, guarding or safe operating procedures on site.
            </li>
          </ul>
        </div>
        )}

        {/* Troubleshooting */}
        {activeSection === 'troubleshooting' && (
        <div className="docs-section active">
          <h1>Troubleshooting</h1>
          <p>
            Most problems come down to one of three things: the agent is not running, rosbridge
            cannot be reached, or the topic names do not match the robot. Work down this page in
            order and you will land on the cause quickly.
          </p>

          <h2 id="ts-first">Check These First</h2>
          <p>Three commands on the robot answer most questions. Run them over SSH:</p>
          <pre tabIndex={0}><code>{`systemctl status ctrlr-agent    # apt install: is the agent running?
docker ps                       # Docker install: is the container up?
ss -lntp | grep 9090            # is rosbridge listening?`}</code></pre>
          <p>Then the agent's own logs, which say why it stopped if it did:</p>
          <pre tabIndex={0}><code>{`journalctl -u ctrlr-agent -f    # apt install
docker logs -f ctrlr-agent      # Docker install`}</code></pre>

          <h2 id="ts-offline">Robot Will Not Come Online</h2>
          <p>
            The Robot Setup page keeps saying offline, or the robot disappears from Command HQ.
          </p>
          <ul>
            <li>
              <strong>The agent exits on purpose when it cannot reach our signaling server.</strong>{' '}
              This is by design, so it gets restarted cleanly rather than sitting in a broken state.
              It only comes back automatically if it is being supervised, which the standard install
              handles. If you launched it by hand, it will stay down. Check it is running as a
              service, or as a container with a restart policy.
            </li>
            <li>
              <strong>The enrollment token is one-time use and expires.</strong> It is consumed the
              moment the robot registers. If an install failed halfway, or you are reinstalling, the
              old command will not work twice. Generate a fresh token from the Robot Setup page.
            </li>
            <li>
              <strong>The robot needs outbound internet.</strong> It dials out to us over a secure
              WebSocket; nothing needs to be opened inbound. If the robot is on a locked-down network,
              outbound access is the thing to ask for.
            </li>
            <li>
              <strong>Check the clock.</strong> A badly wrong system time on the robot breaks secure
              connections in ways that look like random failures.
            </li>
          </ul>

          <h2 id="ts-network">Network and Connectivity</h2>
          <p>
            This is the most common source of confusing behaviour, because everything looks healthy
            in isolation and still does not work together.
          </p>
          <ul>
            <li>
              <strong>The agent and rosbridge must be on the same machine.</strong> The agent
              connects to rosbridge on the loopback address, port 9090, and that is fixed. It cannot
              reach a rosbridge running on another computer.
            </li>
            <li>
              <strong>Docker installs need host networking.</strong> Our installer sets this up for
              you. If you are running the container by hand and left it out, the agent will start
              fine and never see a single topic.
            </li>
            <li>
              <strong>The robot's driver has to be visible to rosbridge.</strong> If the manufacturer
              runs their software in its own container or with isolated network settings, rosbridge
              sees nothing even though the robot is working perfectly. Check with{' '}
              <code>ros2 topic list</code> in the same environment rosbridge runs in.
            </li>
            <li>
              <strong>Two robots on one network can steal each other's commands.</strong> By default
              ROS 2 shares topics across the whole local network, so a second robot can receive
              instructions meant for the first. Restrict discovery to the local machine:
            </li>
          </ul>
          <pre tabIndex={0}><code>{`export ROS_LOCALHOST_ONLY=1
export ROS_AUTOMATIC_DISCOVERY_RANGE=LOCALHOST`}</code></pre>

          <h2 id="ts-topics">No Video or Controls</h2>
          <p>The session connects, but the screen is black or the robot ignores you.</p>
          <ul>
            <li>
              <strong>Source your ROS environment before starting rosbridge.</strong> If you launch
              rosbridge without sourcing your ROS distribution and any manufacturer SDKs in the same
              shell, it starts successfully but without the message types your robot uses, and those
              topics become invisible to the agent. This is the single most common cause of a black
              screen on a healthy robot.
            </li>
            <li>
              <strong>The topic names probably do not match.</strong> Our defaults are conventions,
              not guarantees. Compare what the robot actually publishes against what is configured,
              and see{' '}
              <Link className="docs-inline-link" href="/docs/configuring-your-robot">
                Configuring Your Robot
              </Link>{' '}
              for how to find and fix them.
            </li>
            <li>
              <strong>Use JPEG, not Raw, unless you have a reason.</strong> Raw frames at higher
              resolutions travel badly and can collapse to roughly one frame per second. If video is
              technically working but unusably slow, this is usually why.
            </li>
            <li>
              <strong>Colours look wrong?</strong> That is the image encoding. Cameras publishing{' '}
              <code>rgb8</code> need the encoding set to RGB rather than the default.
            </li>
            <li>
              <strong>The robot may not accept standard movement commands.</strong> If video works
              but driving does nothing, check whether anything on the robot is actually listening for
              standard movement messages. Some manufacturers use their own motion API, which needs a
              small translator on the robot.
            </li>
          </ul>

          <h2 id="ts-config">Configuring a New Robot</h2>
          <p>
            Getting a robot you have never connected before to match our defaults is usually the
            hardest part of onboarding. It is almost always a naming problem rather than a broken
            robot. Work through it in this order.
          </p>

          <h3>1. See what the robot actually publishes</h3>
          <p>On the robot, with your ROS environment sourced:</p>
          <pre tabIndex={0}><code>{`ros2 topic list -t              # every topic, with its message type
ros2 node list                  # what is actually running

rostopic list -v                # ROS 1 equivalent
rosnode list`}</code></pre>
          <p>
            An empty or very short list means the robot's own software is not running, or is not
            visible from where you ran the command. Fix that before touching any CTRL+R settings.
          </p>

          <h3>2. Inspect the topics that matter</h3>
          <pre tabIndex={0}><code>{`ros2 topic info /cmd_vel        # type, and whether anything is listening
ros2 topic echo /camera/image_raw --once   # is real data flowing?
ros2 topic hz /camera/image_raw            # how fast?`}</code></pre>
          <p>
            A camera topic with a publisher but no data means the driver is up and the camera is not.
            A movement topic with no subscriber means nothing on the robot is waiting for commands,
            so driving will never work no matter what you configure.
          </p>

          <h3>3. Check for the manufacturer's ROS packages</h3>
          <p>
            Most manufacturers ship their own ROS driver, and many publish it on GitHub. If their
            topics are missing entirely, their package is usually either not installed or not sourced
            in the shell where rosbridge was started.
          </p>
          <pre tabIndex={0}><code>{`ls /opt/ros/                       # which ROS versions are installed
ros2 pkg list | grep -i <vendor>   # is the vendor package present?
printenv | grep -i ros             # what is sourced in this shell`}</code></pre>
          <p>
            If the package is installed but its topics are invisible to us, source it in the same
            shell as rosbridge and restart rosbridge. Sourcing only your ROS distribution is not
            enough when a vendor SDK provides its own message types.
          </p>

          <h3>4. Put the real names into CTRL+R</h3>
          <p>
            Once you know the actual topic names, enter them in the live config panel on the Robot
            Setup or Edit Robot page. Nothing gets installed on the robot and changes apply
            immediately. Full detail on every setting is in{' '}
            <Link className="docs-inline-link" href="/docs/configuring-your-robot">
              Configuring Your Robot
            </Link>
            .
          </p>

          <h3>Quick fixes</h3>
          <ul>
            <li>
              <strong>No topics at all.</strong> ROS environment not sourced, or the robot's software
              is not running.
            </li>
            <li>
              <strong>Topics exist but ours are empty.</strong> Names differ. Copy the real ones in.
            </li>
            <li>
              <strong>Right name, no data.</strong> The publisher is not actually running. Confirm
              with <code>echo</code> before blaming the configuration.
            </li>
            <li>
              <strong>Right name, wrong type.</strong> The robot uses a different message shape, so
              renaming will not help. It needs a small translator on the robot.
            </li>
            <li>
              <strong>Video connects but crawls.</strong> Switch the image format to JPEG and point
              at the compressed camera topic.
            </li>
            <li>
              <strong>Video works, colours inverted.</strong> Set the image encoding to RGB.
            </li>
            <li>
              <strong>Everything works until reboot.</strong> rosbridge is not set up to start on
              boot. Run it as a service.
            </li>
          </ul>

          <h2 id="ts-nav">Navigation Problems</h2>
          <ul>
            <li>
              <strong>Nothing happens when sending a robot to a location.</strong> CTRL+R sends a
              destination; the robot does the navigating. If it has no navigation stack running, the
              goal arrives and is ignored. Confirm the robot can navigate on its own first.
            </li>
            <li>
              <strong>The trip never shows as finished.</strong> The agent expects exactly three
              values on the navigation status topic: <code>started</code>, <code>completed</code> and{' '}
              <code>failed</code>. Anything else is ignored, so a robot reporting its own wording
              will appear to travel forever.
            </li>
            <li>
              <strong>The robot is not on the map.</strong> The live position marker needs pose
              streaming switched on, which is off by default, and the robot must report its position
              against the same map. See{' '}
              <Link className="docs-inline-link" href="/docs/locations">Locations</Link>.
            </li>
            <li>
              <strong>Goals go to the wrong place.</strong> Some navigation stacks listen on their
              own goal topic rather than ours. Point the nav goal topic at whatever the robot
              actually uses.
            </li>
          </ul>

          <h2 id="ts-audio">Audio Problems</h2>
          <ul>
            <li>
              <strong>Restart the agent after switching audio on.</strong> The audio pipeline is set
              up when the agent starts, so the toggle saves but nothing flows until it restarts.
            </li>
            <li>
              <strong>Plug hardware in before starting the agent</strong>, otherwise it will not be
              picked up.
            </li>
            <li>
              <strong>Wrong device selected.</strong> List what the robot can see with{' '}
              <code>arecord -L</code> and <code>aplay -L</code>, then set the device names
              explicitly. See{' '}
              <Link className="docs-inline-link" href="/docs/two-way-audio">Two-way Audio</Link>.
            </li>
            <li>
              <strong>Nothing from your side?</strong> Check the browser has microphone permission
              for the CTRL+R site.
            </li>
          </ul>

          <h2 id="ts-deps">Dependencies and Sources</h2>
          <p>
            CTRL+R sits on top of standard, open tooling rather than anything proprietary, so
            problems underneath us usually have well documented answers.
          </p>
          <div className="docs-table-wrapper" tabIndex={0}>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>What it does for us</th>
                  <th>Where to look</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>rosbridge_suite</strong></td>
                  <td>Carries messages between the agent and your robot's ROS graph</td>
                  <td>
                    <a href="https://wiki.ros.org/rosbridge_suite" target="_blank" rel="noreferrer">ROS 1</a>
                    {' / '}
                    <a href="https://index.ros.org/p/rosbridge_server/" target="_blank" rel="noreferrer">ROS 2</a>
                  </td>
                </tr>
                <tr>
                  <td><strong>ROS</strong></td>
                  <td>The robot's own messaging layer, which we read from and publish to</td>
                  <td>
                    <a href="https://wiki.ros.org/noetic/Installation/Ubuntu" target="_blank" rel="noreferrer">Noetic</a>
                    {' / '}
                    <a href="https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html" target="_blank" rel="noreferrer">Humble</a>
                    {' / '}
                    <a href="https://docs.ros.org/en/kilted/Installation/Ubuntu-Install-Debs.html" target="_blank" rel="noreferrer">Kilted</a>
                  </td>
                </tr>
                <tr>
                  <td><strong>Docker</strong></td>
                  <td>Optional way to run the agent in a container</td>
                  <td>
                    <a href="https://docs.docker.com/engine/install/" target="_blank" rel="noreferrer">Install guide</a>
                  </td>
                </tr>
                <tr>
                  <td><strong>Zenoh</strong></td>
                  <td>Alternative video transport for high bandwidth or low latency setups</td>
                  <td>
                    <a href="https://zenoh.io/docs/getting-started/installation/" target="_blank" rel="noreferrer">Install guide</a>
                  </td>
                </tr>
                <tr>
                  <td><strong>GStreamer and ALSA</strong></td>
                  <td>Video encoding and audio capture and playback on the robot</td>
                  <td>Installed with the agent; ALSA devices listed with <code>arecord -L</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="docs-callout">
            <div className="docs-callout-title">Still stuck?</div>
            <p>
              Get in touch, and include the agent logs from the commands at the top of this page
              along with the output of <code>ros2 topic list -t</code> on the robot. Those two
              together identify most problems without any back and forth.
            </p>
          </div>
        </div>
        )}
      </main>

      {/* Right TOC — always rendered to prevent layout shift */}
      <aside className="docs-toc" aria-label="On this page">
        {current?.toc && current.toc.length > 0 && (
          <>
            <div className="docs-toc-title">On this page</div>
            <nav aria-label="On this page">
              {current.toc.map(item => (
                <a key={item.href} href={item.href} className="docs-toc-link">
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
