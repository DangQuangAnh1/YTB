# Threads daily scout procedure

## 0. Access checks (learned 2026-10-17)

- If the logged-in Chrome window is minimized, the page viewport is 0×0: feeds stop loading and screenshots time out. Close only your own MCP tab and call `tabs_context_mcp` with `createIfEmpty`. That opens a new visible window in the same profile, which is still logged in. Never touch the user's other tabs.
- A logged-out browser can read post pages and search results, but its search returns weeks-old top posts rather than today's. Threads also shows a login wall after a few page views. Do not hide or bypass the wall. Record it as an access limit.
- Capture cards at 1080px width: clone the element at 360 CSS px with zoom 3, and use `zoom` with `scale: 1` and `save_to_disk`. Blur avatars in the clone.

## 1. Discover (recent first)

- Sidebar "Đang thịnh hành": open each trending topic and read its top posts.
- "Dành cho bạn" feed: scroll 10–15 screens. The feed is personalised, so record that it is.
- Topic searches matched to the channel's moods, for example "mẹ tôi", "kể chuyện", "công sở", "người yêu cũ", "tâm sự". Use both the "Hàng đầu" and "Gần đây" tabs.

Keep posts at most about 48h old for a "today" report. Older evergreen posts can go in a separate list.

## 2. Extract

Use the in-page snippet below on a post page (`/@user/post/ID`). It returns the post counts and the top-level comments with likes and reply counts.

Then open the top 3–5 comments that have reply counts. Clicking the comment's timestamp opens its own page, where the child replies show. Record each child's handle, text and likes. Do not click like/follow/reply.

```js
// Read-only extraction of visible comment cards (Threads web, 2026-10). Strip URLs from output.
const cards = [...document.querySelectorAll('div[data-pressable-container="true"]')].map((el) => {
  const t = el.innerText.split('\n').filter(Boolean).map((s) => s.replace(/https?:\S+/g, '[url]'));
  const nums = t.filter((x) => /^[\d.,]+\s*(K|N)?$/i.test(x));
  const link = el.querySelector('a[href*="/post/"]')?.getAttribute('href') ?? null;
  return {handle: t[0], when: t[1], text: t.filter((x) => !nums.includes(x)).slice(2).join(' / ').slice(0, 300),
    counts: nums, link, has_image: el.querySelectorAll('img').length > 1};
});
cards;
```

Counts appear in the order like, reply, repost, share. Missing numbers mean zero.

## 3. Score (transparent, not a prediction)

Parse "1,2K" as 1200.

- **Post score** = likes + 3 × replies.
- **Chain score for a top comment B** = likes(B) + 2 × (likes of its best two children) + 50 × min(child_count, 5).

Prefer posts where at least two chains score well. A post with one giant comment and no chains is weaker for this format.

## 4. Flag

For each candidate and chain, mark:
- the mood;
- the topic;
- rights flags (see the SKILL hard-rejects);
- whether avatars show faces, since Production may blur them;
- whether quotes come from a known author, which needs attribution.

## 5. Report

The table lists, for each candidate: rank, link, author, age, likes/replies, best chains (B → C, D with likes), mood and topic, flags, and the suggested angle for original commentary.

Rejected posts go in their own list with reasons. Record the observation time and access limits, for example a personalised feed or replies that did not load.
