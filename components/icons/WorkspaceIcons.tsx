/**
 * WorkspaceIcons — inline SVG icon set for workspace sidebar.
 * Colors: default black (#111111), active gold (#F4B400).
 * All icons 18×18 viewBox, strokeWidth 1.75.
 */

interface IconProps { className?: string; size?: number; }

const base = (size = 18) =>
    ({ width: size, height: size, viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export function IconGrid({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><rect x="2" y="2" width="6" height="6" rx="1" /><rect x="10" y="2" width="6" height="6" rx="1" /><rect x="2" y="10" width="6" height="6" rx="1" /><rect x="10" y="10" width="6" height="6" rx="1" /></svg>;
}
export function IconRocket({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M9 2s4 2 4 7l-4 7-4-7c0-5 4-7 4-7z" /><circle cx="9" cy="9" r="1.5" /></svg>;
}
export function IconUsers({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><circle cx="7" cy="6" r="2.5" /><path d="M2 16c0-3 2-5 5-5h4c3 0 5 2 5 5" /><circle cx="13" cy="6" r="2" /><path d="M16 16c0-2-1-3.5-3-4" /></svg>;
}
export function IconBriefcase({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><rect x="2" y="6" width="14" height="10" rx="1.5" /><path d="M6 6V4.5A1.5 1.5 0 0 1 7.5 3h3A1.5 1.5 0 0 1 12 4.5V6" /><path d="M2 11h14" /></svg>;
}
export function IconMessage({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M15 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3l3 3 3-3h3a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" /></svg>;
}
export function IconSettings({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><circle cx="9" cy="9" r="2.5" /><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4" /></svg>;
}
export function IconCalendar({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><rect x="2" y="3" width="14" height="14" rx="1.5" /><path d="M2 7h14" /><path d="M6 1v4M12 1v4" /><path d="M6 11h2M10 11h2M6 14h2" /></svg>;
}
export function IconStar({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M9 2l1.8 3.6L15 6.3l-3 2.9.7 4.1L9 11.3l-3.7 2 .7-4.1-3-2.9 4.2-.7z" /></svg>;
}
export function IconInbox({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M2 9h4l1.5 2.5h3L12 9h4" /><rect x="2" y="3" width="14" height="14" rx="1.5" /></svg>;
}
export function IconBarChart({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><rect x="2" y="9" width="3" height="7" rx="0.5" /><rect x="7.5" y="5" width="3" height="11" rx="0.5" /><rect x="13" y="2" width="3" height="14" rx="0.5" /></svg>;
}
export function IconShield({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M9 2l6 2.5v4c0 3.5-2.5 6-6 8-3.5-2-6-4.5-6-8v-4z" /><path d="M6 9l2 2 4-4" /></svg>;
}
export function IconBell({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M9 2a6 6 0 0 1 6 6v3l1.5 2.5H1.5L3 11V8a6 6 0 0 1 6-6z" /><path d="M7.5 14.5a1.5 1.5 0 0 0 3 0" /></svg>;
}
export function IconPlus({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M9 4v10M4 9h10" /></svg>;
}
export function IconEdit({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M11 3l4 4-8 8H3v-4z" /><path d="M9 5l4 4" /></svg>;
}
export function IconTrash({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M3 5h12M8 5V3h2v2M5 5l.5 10a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1L13 5" /></svg>;
}
export function IconEye({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M2 9s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="9" cy="9" r="2" /></svg>;
}
export function IconSend({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M16 2L2 7l5 2 7-5-5 7 2 4.5z" /></svg>;
}
export function IconUpload({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><path d="M9 13V5M6 8l3-3 3 3" /><path d="M3 14h12" /></svg>;
}
export function IconUser({ className, size }: IconProps) {
    return <svg {...base(size)} className={className}><circle cx="9" cy="6" r="3" /><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" /></svg>;
}
