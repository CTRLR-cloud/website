// Copied from robot-teleop-webapp src/pages/Docs.tsx (origin/main e83eecf).
// Keep in sync with the client app's Docs page.

export type SectionId =
  | 'what-is-ctrlr'
  | 'use-cases'
  | 'supported-platforms'
  | 'getting-started'
  | 'configuring-your-robot'
  | 'custom-commands'
  | 'two-way-audio'
  | 'locations'
  | 'command-hq'
  | 'security'
  | 'troubleshooting';

export interface Section {
  id: SectionId;
  label: string;
  toc?: { href: string; label: string }[];
}

export const SECTIONS: Section[] = [
  { id: 'what-is-ctrlr', label: 'What is CTRL+R?', toc: [{ href: '#what-is-ctrlr', label: 'Overview' }, { href: '#what-makes-us-different', label: 'What makes us different' }] },
  {
    id: 'use-cases',
    label: 'Use Cases',
    toc: [
      { href: '#uc-defense', label: 'Defense & Critical Infrastructure' },
      { href: '#uc-service', label: 'Customer Service & Visitor Experience' },
      { href: '#uc-retail', label: 'Retail' },
      { href: '#uc-delivery', label: 'First-Mile & Last-Mile Delivery' },
      { href: '#uc-energy', label: 'Energy' },
    ],
  },
  {
    id: 'supported-platforms',
    label: 'Supported Platforms',
    toc: [
      { href: '#os', label: 'Operating System' },
      { href: '#ros', label: 'ROS' },
      { href: '#architectures', label: 'Architectures' },
      { href: '#manufacturers', label: 'Compatible Manufacturers' },
      { href: '#custom-integrations', label: 'Integrations On Request' },
    ],
  },
  { id: 'getting-started', label: 'Getting Started', toc: [{ href: '#install-method', label: 'Installing the Agent' }, { href: '#ros-req', label: 'ROS' }, { href: '#rosbridge', label: 'rosbridge_server' }, { href: '#zenoh', label: 'Zenoh (optional)' }] },
  { id: 'configuring-your-robot', label: 'Configuring Your Robot', toc: [{ href: '#config-overview', label: 'Overview' }, { href: '#robot-params', label: 'Robot Parameters' }, { href: '#ros-topics', label: 'ROS Topics' }, { href: '#matching-topics', label: "When Your Robot Doesn't Match" }, { href: '#position', label: 'Position Reporting' }] },
  {
    id: 'custom-commands',
    label: 'Custom Commands',
    toc: [
      { href: '#cc-overview', label: 'Overview' },
      { href: '#cc-msg-types', label: 'Supported Message Types' },
      { href: '#cc-defining', label: 'Defining Commands' },
      { href: '#cc-bindings', label: 'Binding to Inputs' },
      { href: '#cc-firing', label: 'Firing Commands' },
      { href: '#cc-notes', label: 'Notes & Limitations' },
    ],
  },
  {
    id: 'two-way-audio',
    label: 'Two-way Audio',
    toc: [
      { href: '#audio-overview', label: 'Overview' },
      { href: '#audio-hardware', label: 'Hardware Setup' },
      { href: '#audio-enable', label: 'Enabling Audio' },
      { href: '#audio-devices', label: 'Selecting Devices' },
      { href: '#audio-session', label: 'Using It In a Session' },
    ],
  },
  {
    id: 'locations',
    label: 'Locations',
    toc: [
      { href: '#loc-what', label: 'What Locations Do' },
      { href: '#loc-sources', label: 'Where Locations Come From' },
      { href: '#loc-using', label: 'Sending a Robot' },
      { href: '#loc-technical', label: 'How It Works' },
      { href: '#loc-requirements', label: 'Requirements and Limits' },
    ],
  },
  {
    id: 'command-hq',
    label: 'Command HQ',
    toc: [
      { href: '#hq-overview', label: 'Overview' },
      { href: '#hq-members', label: 'Members' },
      { href: '#hq-eagle-eye', label: 'Eagle Eye' },
      { href: '#hq-devices', label: 'Devices' },
      { href: '#hq-sites', label: 'Sites' },
      { href: '#hq-sessions', label: 'Sessions and Logs' },
      { href: '#hq-customizations', label: 'Customizations' },
      { href: '#hq-denylist', label: 'Deny List' },
      { href: '#hq-notifications', label: 'Notifications' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    toc: [
      { href: '#sec-identity', label: 'Robot Identity' },
      { href: '#sec-sessions', label: 'Encrypted Sessions' },
      { href: '#sec-network', label: 'Network Posture' },
      { href: '#sec-access', label: 'Access Control' },
      { href: '#sec-audit', label: 'Audit Trail' },
      { href: '#sec-yours', label: 'Your Responsibilities' },
    ],
  },
  {
    id: 'troubleshooting',
    label: 'Troubleshooting',
    toc: [
      { href: '#ts-first', label: 'Check These First' },
      { href: '#ts-offline', label: 'Robot Will Not Come Online' },
      { href: '#ts-network', label: 'Network and Connectivity' },
      { href: '#ts-topics', label: 'No Video or Controls' },
      { href: '#ts-config', label: 'Configuring a New Robot' },
      { href: '#ts-nav', label: 'Navigation Problems' },
      { href: '#ts-audio', label: 'Audio Problems' },
      { href: '#ts-deps', label: 'Dependencies and Sources' },
    ],
  },
];
