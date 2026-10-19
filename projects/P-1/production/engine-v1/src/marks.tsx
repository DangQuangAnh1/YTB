import React from 'react';

// Channel logo marks (original vector drawings). Shared by the brand sheet and the episode outro.
// A — "Hóng Cmt": a comment bubble whose two eyes peek sideways, the visual for "hóng" (eagerly watching).
export const MarkHong: React.FC<{size: number}> = ({size}) => <svg width={size} height={size} viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#111"/>
  <path d="M38 62 Q38 40 60 40 H140 Q162 40 162 62 V118 Q162 140 140 140 H92 L64 166 L70 140 H60 Q38 140 38 118 Z" fill="#FFD43B"/>
  <ellipse cx="78" cy="90" rx="19" ry="23" fill="#fff" stroke="#111" strokeWidth="5"/>
  <ellipse cx="122" cy="90" rx="19" ry="23" fill="#fff" stroke="#111" strokeWidth="5"/>
  <circle cx="88" cy="96" r="9" fill="#111"/><circle cx="132" cy="96" r="9" fill="#111"/>
  <circle cx="91" cy="92" r="3" fill="#fff"/><circle cx="135" cy="92" r="3" fill="#fff"/>
  <path d="M60 64 Q78 54 96 64" stroke="#111" strokeWidth="5" fill="none" strokeLinecap="round"/>
</svg>;

// B — "Lướt Giùm": stacked comment cards (the reply-chain format) with a hand-drawn swipe-up stroke.
export const MarkLuot: React.FC<{size: number}> = ({size}) => <svg width={size} height={size} viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#0f172a"/>
  <rect x="52" y="44" width="96" height="34" rx="10" fill="#2dd4bf" opacity="0.45"/>
  <rect x="44" y="70" width="112" height="40" rx="12" fill="#2dd4bf" opacity="0.75"/>
  <rect x="36" y="100" width="128" height="52" rx="14" fill="#f8fafc"/>
  <circle cx="56" cy="126" r="9" fill="#fb7185"/>
  <rect x="72" y="116" width="70" height="8" rx="4" fill="#0f172a"/><rect x="72" y="130" width="48" height="8" rx="4" fill="#94a3b8"/>
  <path d="M168 150 C 178 120, 176 92, 162 66" stroke="#fb7185" strokeWidth="9" fill="none" strokeLinecap="round"/>
  <path d="M150 72 L162 60 L172 76" stroke="#fb7185" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
</svg>;

// C — "Rep Gì Đây": a reply arrow forming a question mark inside a speech bubble.
export const MarkRep: React.FC<{size: number}> = ({size}) => <svg width={size} height={size} viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#fb7185"/>
  <path d="M40 66 Q40 44 62 44 H138 Q160 44 160 66 V116 Q160 138 138 138 H84 L56 162 L62 138 Q40 138 40 116 Z" fill="#fff"/>
  <path d="M76 82 Q78 64 100 64 Q124 64 124 84 Q124 98 106 104 Q100 106 100 114" stroke="#111" strokeWidth="12" fill="none" strokeLinecap="round"/>
  <circle cx="100" cy="128" r="7" fill="#111"/>
  <path d="M136 116 L150 102 L136 88" stroke="#fb7185" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
</svg>;


// D — "Đọc Cmt Giùm": a yellow comment bubble whose eyes look down, reading the comment lines inside it.
export const MarkDocA: React.FC<{size: number}> = ({size}) => <svg width={size} height={size} viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#111"/>
  <path d="M36 58 Q36 36 58 36 H142 Q164 36 164 58 V122 Q164 144 142 144 H94 L64 168 L70 144 H58 Q36 144 36 122 Z" fill="#FFD43B"/>
  <ellipse cx="80" cy="74" rx="16" ry="17" fill="#fff" stroke="#111" strokeWidth="5"/>
  <ellipse cx="120" cy="74" rx="16" ry="17" fill="#fff" stroke="#111" strokeWidth="5"/>
  <circle cx="82" cy="82" r="7.5" fill="#111"/><circle cx="122" cy="82" r="7.5" fill="#111"/>
  <rect x="60" y="102" width="80" height="9" rx="4.5" fill="#111"/>
  <rect x="60" y="118" width="54" height="9" rx="4.5" fill="#111" opacity="0.55"/>
</svg>;

// E — "Đọc Cmt Giùm" (alt): round reading glasses over a stack of comment lines, in teal and coral.
export const MarkDocB: React.FC<{size: number}> = ({size}) => <svg width={size} height={size} viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="100" fill="#0f172a"/>
  <path d="M38 64 Q38 44 58 44 H142 Q162 44 162 64 V124 Q162 144 142 144 H96 L68 166 L74 144 H58 Q38 144 38 124 Z" fill="#2dd4bf"/>
  <rect x="58" y="108" width="84" height="9" rx="4.5" fill="#0f172a"/>
  <rect x="58" y="124" width="58" height="9" rx="4.5" fill="#0f172a" opacity="0.5"/>
  <circle cx="78" cy="80" r="17" fill="#f8fafc" stroke="#fb7185" strokeWidth="7"/>
  <circle cx="122" cy="80" r="17" fill="#f8fafc" stroke="#fb7185" strokeWidth="7"/>
  <path d="M95 80 Q100 74 105 80" stroke="#fb7185" strokeWidth="6" fill="none" strokeLinecap="round"/>
  <circle cx="80" cy="84" r="6" fill="#0f172a"/><circle cx="124" cy="84" r="6" fill="#0f172a"/>
</svg>;
