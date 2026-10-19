# YouTube Shorts SEO: titles, descriptions, hashtags, tags (BA research, 2026-10-17)

Read-only research for Đọc Cmt Giùm (@doccmtgium), done before the first 3 Shorts go out. It builds on `research/channel-name-seo-v1.md` and does not repeat its name and handle work.

- **(V)** means verified on 2026-10-17 from an official page, an opened page or raw endpoint output.
- **(I)** means an inference by this agent.
- **(3P)** means a third-party claim from a page that was opened but has no official backing.

Nothing was posted, logged into or changed.

---

## 1. How Shorts metadata works (2025–2026)

### Discovery in general
- **Search:** YouTube search ranks results by how well the title, tags, description and video content match the query, then weighs engagement and quality, with some personalization (V, How YouTube search works).
- **Shorts feed:** Most Shorts traffic comes from the feed, not search. The system first finds a seed audience, then widens or narrows distribution based on how viewers respond. YouTube's Shorts lead has said hashtags are optional (V, MediaPost and SEJ coverage of the 2023 interview with Todd Sherman).
- **Search filter:** In January 2026 YouTube added a "Shorts" type filter to search, so Shorts can now be searched on their own (V, Tubefilter, citing YouTube's help-forum post).
- **Classification:** A video counts as a Short when it is square or vertical and up to 3 minutes long. A hashtag plays no part in this (V, YouTube Help 15424877).
- **What this means (I):** title and description keywords matter mainly for search and for the topic signal. Retention and the hook drive feed reach, and metadata cannot rescue a weak hook.
- **Competitor evidence:** I checked 12 Threads/comment Shorts (§3). In 6 of them, which drew 0.16–4.45M views, the hashtags in the title were the only metadata: the description and the tags field were both empty (V for the observation; I for the conclusion).

### Title
- **Hard limit:** 100 characters, with no invalid characters (V, YouTube Help 57404 and 10059070).
- **Truncation in the Shorts feed:** No official figure exists. Third-party estimates are about 40 characters on the mobile Shorts feed (vidIQ), about 50 in mobile feed previews (Hashtag Tools) and 55–70 on desktop (3P).
- **Rule:** put the hook in the first ~40 characters and keep the whole title at 60 characters or fewer (the kit's limit). Emoji may count as 2 characters, so this report counts with a margin (I).
- **YouTube's own advice:** write clear, engaging titles that grab attention (V, YouTube Official Blog, Apr 8 2025).

### Hashtags
- **Placement:** You can put hashtags in the title or the description. Both link to a results page for that hashtag (V, YouTube Help 6390658).
- **Which ones show by the title:** the official wording is now "up to three hashtags that are considered most engaging". It no longer says the first three. Put your preferred three first anyway, but YouTube may choose others (V for the wording; I for the advice).
- **The 60 limit:** if a video has more than 60 hashtags, YouTube ignores all of them. Over-tagging can also get the video removed from uploads or search (V, 6390658).
- **Relevance:** unrelated or misleading hashtags can lead to removal. Hashtags cannot contain spaces (V, 6390658).
- **#shorts:**
  - It is not needed for classification (V, 15424877).
  - YouTube's 2025 blog lists #Shorts and #YouTubeShorts among popular hashtags without calling them required (V).
  - #shorts carries about 1.9 billion videos on its landing page, so it gives no niche signal (V for the count).
  - **Rule:** treat it as optional and put it last or drop it, never in the lead three (I).
- **Hashtags in the title:** competitors usually stack 2–5 hashtags in the title (V). This channel should keep the title for the hook and put hashtags in the description's last line. Title hashtags use up the visible ~40 characters (I; YouTube treats both places the same for linking, V).

### Tags field
- **Weight:** title, thumbnail and description matter more than tags, which play only a minimal role in discovery. Tags help mainly when the topic is commonly misspelled (V, YouTube Help 146402 and 57404).
- **Spam:** stuffing many tags into the description breaks the spam, deceptive practices and scams policy (V, 146402).
- **Length:** the field is said to cap at 500 characters, but only third parties say so (3P, Hashtag Tools).
- **Diacritics:** YouTube autocomplete already maps unaccented input to the accented query. For example, "doc cmt" suggests "đọc cmt thread" and "meo hai" suggests "mèo hài" (V). So unaccented variants add little; use at most one (I).

### Description
- **Limit:** 5,000 characters, with no invalid characters (V, 57404).
- **YouTube's advice for Shorts:** a brief description that gives context and invites engagement (V, Official Blog 2025).
- **The first line:**
  - On a Short the description sits behind a tap, so few viewers read it. Search snippets show the start of it (3P; YouTube has not documented the exact cut).
  - **Rule:** make line 1 a unique hook with one main keyword, under about 100 characters. Put the question CTA on line 2 (I).

### Spam and misleading-metadata policy
- **Malicious clickbait (V, YouTube spam policy 2801973):** titles, thumbnails, descriptions or images that promise something the video does not deliver. YouTube's example is a title that promises a full match when the video shows only a clip.
- **Two other categories matter to this channel (V, same page):**
  - **Automated or synthetic mass production:** high volumes of near-identical content made with automated tools or AI. YouTube's example is the same background music and repetitive AI imagery, with an AI-read script on every video.
  - **Scraped content:** reposting other people's material without original value.
- **What this means for metadata (I):** metadata should truthfully signal the original layer, for example "Trích dẫn để bình luận". Hook lines must differ from video to video, and music, backgrounds and formats should vary. The launch kit already requires this before monetizing.

---

## 2. Vietnamese keyword demand (autocomplete, 2026-10-17)

**Method (V):**
- **Endpoint:** `suggestqueries.google.com/complete/search?client=firefox&hl=vi&gl=VN&ie=utf-8&oe=utf-8&q=…`, with `ds=yt` for YouTube and without it for Google.
- **Run times:** YouTube 11:37–11:43 UTC; Google 11:38 UTC.
- **Encoding problem:** the first run used Git Bash curl on Windows and sent "?" in place of Vietnamese letters, so it returned junk. The data below comes from a UTF-8 Python re-run.
- **Limits:** autocomplete reflects popularity but gives no search volumes.

### 2a. Raw YouTube suggestions (ds=yt), the seeds you asked for

| Seed | YouTube suggestions, raw and in the order returned | Reading |
|---|---|---|
| đọc cmt | đọc cmt thread; đọc cmt tiktok; đọc cmt; đọc cmt live tiktok; siro đọc cmt; hiếu leblanc đọc cmt; đọc cmt trên facebook; đọc cmt facebook | Real demand for the format; "thread" is the top suggestion (V) |
| đọc comment | đọc comment; đọc comment thread; đọc comment roblox; đọc comment threads; đọc comment live tiktok; thích đọc comment; nghiện đọc comment; ghiền đọc comment; acn đọc comment; angel đọc comment | "đọc comment threads" is a ready-made keyword (V) |
| cmt hài | cmt hài; cmt hài hước nhất; những cmt hài hước nhất; top cmt hài hước; cmt hài hước | |
| threads hài | threads hài; threads tấu hài; threads hài hước | Niche keyword (V) |
| top comment | top comment; top comments; top comment hài hước; top comments hài hước; top comment bình luận hài hước; top comment mới nhất; top comment ảnh chế hài hước; top comment tiktok; top comment bá đạo mới nhất; top comment bá đạo | The strongest generic format keyword (V) |
| bình luận hài | bình luận hài hước; bình luận hài hước bóng đá; bình luận hài; bình luận hài hước trên facebook; bình luận hài bóng đá; bình luận hài hước bóng đá việt nam-thái lan; bình luận hài hước mới nhất; toạc bình luận hài hước; top bình luận hài hước; những bình luận hài hước | Pulled toward football commentary (I) |
| hài hước | hài hước; hài hước vùng cao; hài hước cười vỡ bụng; hài hước êđê; hài hước nhất thế giới; hài hước động vật; hài hước đất; hài hước nhất; hài hước trung quốc; hài hước audio | Generic comedy |
| viral | viral english; viral hit; viral; viral phonk; viral video; viral videos; viral comedy shorts; viral funny shorts; viral english lớp 4; viral english lớp 6 | No Vietnamese demand; don't use the word in titles (I) |
| triết lý cuộc sống | triết lý cuộc sống; triết lý cuộc sống tuổi già; triết lý cuộc sống mới nhất; triết lý cuộc sống tuổi 60; triết lý cuộc sống hay nhất mới nhất; triết lý cuộc sống vợ chồng; triết lý cuộc sống không quảng cáo; triết lý cuộc sống hay; triết lý cuộc sống tuổi 50; triết lý cuộc sống lại văn sâm | Skews to an older audience (50+, tuổi già) (V); a poor fit for a Gen Z voice (I) |
| tâm sự buồn | tâm sự buồn; tâm sự buồn karaoke; tâm sự buồn phong đạt; tâm sự buồn vui; tâm sự buồn về gia đình; tâm sự buồn của người phụ nữ; tâm sự buồn karaoke tone nam; tâm sự buồn karaoke phong đạt; tâm sự buồn karaoke tone nữ; tâm sự buồn văn sâm | Mostly a karaoke song title (V); weak as a title keyword |
| câu nói hay | câu nói hay; câu nói hay về tình yêu; câu nói hay của tào tháo; câu nói hay trong anime; câu nói hay trong naruto; câu nói hay trong conan; câu nói hay táo quân; câu nói hay tam quốc; câu nói hay anime; câu nói hay của trấn thành | Quote culture: anime, Tam Quốc, celebrities |
| chữa lành | chữa lành; chữa lành tâm hồn; chữa lành định mệnh; chữa lành không cần thuốc phim; chữa lành thế giới; chữa lành vết thương thời gian; chữa lành audio; chữa lành trái tim tập 1; chữa lành vết thương; chữa lành tình yêu | Mixed with drama-series titles |
| tâm trạng | tâm trạng; tâm trạng buồn; tâm trạng chill; tâm trạng karaoke; tâm trạng buổi sáng; tâm trạng remix; tâm trạng tan chậm; tâm trạng khi yêu; tâm trạng trung quốc; tâm trạng buồn karaoke | Music-heavy |
| stt buồn | stt buồn; stt buồn tâm trạng; stt buồn về gia đình tan vỡ; stt buồn về tình yêu; stt buồn về chồng vô tâm; stt buồn về cuộc sống; stt buồn tiktok; stt buồn về gia đình; stt buồn về cuộc sống mệt mỏi; stt buồn tâm trạng cuộc sống | Real sad-text demand (V) |
| mẹ | mẹ ơi có biết; mẹ yêu ơi; mẹ yêu con; mẹ yêu; mẹ ơi đừng lo; mẹ ơi có biết karaoke; mẹ yêu karaoke; mẹ chồng nàng dâu; mẹ tôi karaoke; mẹ tổng tài ba vô địch | Songs and family drama; too broad |
| gia đình | gia đình haha; gia đình là số 1; gia đình là số 1 hàn quốc; gia đình là số 1 phần 1; gia đình haha tập 1; gia đình là số 1 phần 2; gia đình nhỏ hạnh phúc to; gia đình mình vui bất thình lình; gia đình trái dấu; gia đình là số 1 phần 2 hàn quốc | TV shows; too broad |
| lớn rồi mới hiểu | lớn rồi mới hiểu karaoke; lớn rồi mới hiểu remix | Mostly a song; fine as an owned series name, weak as a search term (I) |
| mèo hài | mèo hài hước; mèo hài; mèo hài hước nhất thế giới; mèo hài nhất thế giới; mèo hài hước cute; mèo hài hước nhất; mèo hài hước vui nhộn; mèo hài nhất; mèo hài cười; mèo hài meme | Strong pet keyword (V) |
| boss | bossa nova; boss baby; boss; boss phó bản bán bánh kẹp; bossdog; boss là chồng cũ; boss trò chơi kinh dị là người bạn thời thơ ấu của tôi; bossa nova jazz; boss là nữ phụ; boss nhí review | Ambiguous (music, film, games); never use it alone (V) |
| chó mèo | chó mèo; chó mèo hài hước; chó mèo bán đi; chó mèo song ca; chó mèo dễ thương; chó mèo đánh nhau; chó mèo vui nhộn; chó mèo cắn nhau; chó mèo kêu; chó mèo tivi | |
| drama threads | drama threads of destiny; drama china threads of destiny; dramabox threads of fire; drama cina threads of destiny; red thread drama; drama threads review | Taken by a Chinese drama; avoid the phrase (V) |
| hóng | hóng showbiz; hóng drama; hóng phim việt; hóng biến hòa bình; hóng hớt comedy; hồng; bóng 365; hóng chuyện tích điểm; hóng gì đăng đó; hóng biến đường phố | Gossip and street incidents (V) |
| xu hướng | xu hướng; xu hướng công nghệ; xu hướng biến đổi thành phần và một số tính chất của hợp chất trong một chu kì; xu hướng tiktok; xu hướng kinh doanh thế kỷ 21; xu hướng giá vàng; xu hướng kinh doanh 2026; xu hướng kinh doanh 2025; xu hướng giá vàng sắp tới; xu hướng nghề nghiệp trong tương lai | Business, gold prices, schoolwork; no fit |
| trending | trending; trending music; trending tiktok; trending music vietnam; trending youtube; trending funny shorts; trending season; trending vietnam; trending tiktok songs 2025; trending songs 2025 | Music |

### 2b. Extra YouTube seeds, raw (ds=yt)

| Seed | Raw suggestions |
|---|---|
| kể chuyện threads | kể chuyện threads; kể chuyện 2d |
| threads | threads; threads city; threads là gì; threads hài; threads of time; threads of resonance; threads of fate; threads kiếm tiền; threads of memory; threads of destiny |
| đọc thread | đọc thread; tối đọc thread; đọc comment threads; đọc bình luận thread; đọc thread c#; đọc threaded |
| comment hài | comment hài hước; comment hài; top comment hài hước; comment dạo hài hước; comment hài meme |
| tin nhắn hài | tin nhắn hài hước; tin nhắn hài; tin nhắn hài hước tán gái; nhắn tin hài hước với crush; những tin nhắn hài hước; cách nhắn tin hài hước; những dòng tin nhắn hài hước |
| nhắn tin với mẹ | nhắn tin với mẹ; mẹo nhắn tin với crush; tin nhắn kinh dị với mẹ; nhắn tin với mẹ cha; nhắn tin với mẹ chồng |
| tin nhắn mẹ | nhắn tin mẹ; nhắn tin với mẹ; nhắn tin xin mẹ tiền; tin nhắn kinh dị với mẹ; tin nhắn mẹ bầu; tin nhắn mẹ cha |
| mẹ việt nam | mẹ việt nam anh hùng; mẹ việt nam mắt ngời sáng quắc; mẹ việt nam anh hùng karaoke; mẹ việt nam; … (all patriotic songs) |
| mẹ việt nam hài | mẹ việt nam hài hước; mẹ việt nam hài karaoke |
| mẹ hài | mẹ hài; mẹ hài hước; mẹ hài nhí; mẹ hà; mẹ hài minh vy; … |
| mẹ chuyển tiền / mẹ báo tin / mẹ nhắn tin | (none) / cùng mẹ loan báo tin mừng / mẹ nhắn tin |
| xin tiền mẹ | xin tiền mẹ đi sĩ gái; xin tiền mẹ đi ăn cưới; xin tiền mẹ; xin tiền mẹ suốt 2 tháng; xin tiền mẹ mua xipo |
| nhắn tin xin tiền mẹ | nhắn tin xin tiền mẹ suốt 2 tháng liền… (audio stories); cách xin tiền mẹ không bị chửi; cách để xin tiền mẹ; … |
| ca dao chế | ca dao chế; ca dao tự chế; ca dao nhạc chế; ca dao em và tôi chế; ca dao chế linh; ca dao chế karaoke; ca dao chết |
| mèo trộm | mèo trộm; mèo trộm vàng; mèo trộm vịt; trộm mèo bị bắt; trộm mèo báo pháp luật; mèo bắt trộm; mèo siêu trộm; bẫy mèo trộm; mèo tên trộm; con mèo trộm vàng |
| mèo ăn trộm | mèo ăn trộm; con mèo ăn trộm; con mèo ăn trộm cá; gấu mèo ăn trộm; mèo simmy ăn trộm; mèo đi ăn trộm; con mèo bắt ăn trộm; mèo ăn trộm chó |
| mèo tha đồ / mèo trộm đồ | con mèo tha đồ kỳ lạ; mèo tha đồ chơi; … / mèo trộm đồ chơi; mèo trộm đồ ăn; mèo trộm đồng |
| con sen | con sen; con sen của cậu; … (mostly a short-drama series) |
| boss mèo | boss mèo; boss mèo play together; gói boss mèo; … (a game) |
| thú cưng hài | thú cưng hài hước; thú cưng hài; thú cưng hài hước dễ thương; thú cưng tấu hài; … |
| tâm sự | tâm sự tuổi già; tâm sự cùng văn sâm; tâm sự tuổi 30; tâm sự; … |
| tâm sự đêm khuya | radio hosts (Đinh Đoàn, Lại Văn Sâm…), dễ ngủ, chuyện vợ chồng |
| triết lý | triết lý cuộc sống; triết lý nhân sinh; triết lý sống; triết lý tinh hoa; triết lý cổ nhân; … triết lý phật giáo |
| lời hay ý đẹp | lời hay ý đẹp; … về cuộc sống; … về tình yêu; … của phật; … mỗi ngày |
| câu nói hay về cuộc sống | … tiktok; … xã hội; … vợ chồng; … tình yêu; những câu nói hay về cuộc sống tạo động lực |
| tâm sự gia đình | tâm sự gia đình; … buồn; … hôn nhân; radio tâm sự gia đình; podcast tâm sự gia đình |
| câu chuyện ý nghĩa | … cuộc sống; … về gia đình; … nhân văn |
| tình mẹ / ấm áp | songs (karaoke) |
| drama / hóng biến / biến căng | drama audio số …; hóng biến + province names; celebrity and news incidents |
| genz / hài / shorts hài / cười / meme | genz hài hước; hài tết 2026, comedians; shorts hài hước; cười vỡ bụng; meme mèo, meme cười |
| lũ lụt / lũ lụt hài | lũ lụt miền trung, thái nguyên, huế… (news) / hài lũ lụt; lũ lụt hài hước |
| doc cmt / meo hai | đọc cmt thread… / mèo hài… (diacritics added automatically) |
| đọc cmt threads / top comment threads | (none) / top comment hài hước; top comment bá đạo |

### 2c. Raw Google suggestions (no ds)

| Seed | Raw Google suggestions |
|---|---|
| đọc cmt | đọc cmt tiktok; đọc cmt; đọc cmt là gì; đọc cmt ghim; đọc cmt trên threads; đọc cmt trên x; cách đọc cmt trên x; cách đọc cmt trên thread; gg đọc cmt; app đọc cmt tiktok |
| đọc comment | đọc comment live tiktok; đọc comment tiktok; đọc comment; đọc comment là gì; đọc comment trên thread; đọc comment trên x; đọc comment livestream; … |
| threads hài | threads hài; threads hài hước; meme hài threads |
| cmt hài | cmt hài bựa; cmt hài; cmt hài hước khen xinh; cmt hài hước trên facebook; cmt hài hước ngắn gọn; cmt hài tiktok; cmt ảnh hài hước; ảnh cmt hài; cmt khen hài hước; những cmt hài hước |
| triết lý cuộc sống | … bằng tiếng anh; … tích cực; … người già; … về phụ nữ; … của tuổi già; … trong đạo phật; … ở đời; triết lý cuộc sống; … tình yêu; triết lý cuộc sống hài hước |
| tâm sự buồn | … vui tuổi xế chiều; … đêm khuya; … khi mang thai; … của người vợ; … chán nản; … karaoke; … về cuộc sống gia đình; … vui; … về cuộc sống |
| chữa lành | … trong tiếng anh là gì; … đứa trẻ bên trong bạn; … thân tâm trí bằng sóng thông tin; … năng lượng toàn diện; … những sang chấn tuổi thơ; … là j; … ánh sáng bản thể; … tự thân; … tâm thức; … |
| câu nói hay | … về hạnh phúc; … về nụ cười; … về giáo dục; … về hạnh phúc gia đình; … về tình bạn đẹp; … về cuộc sống an nhiên; … về mùa thu; … |
| mèo hài | mèo hài hình meme; mèo hài; mèo hài hước cười; mèo hài meme; mèo hài hước cute; mèo hài hước; mèo hài bựa; mèo hài hước meme; mèo hài cute; mèo hài ảnh meme |
| tin nhắn hài | … hước với người yêu; … hước bá đạo; tin nhắn hài; tin nhắn hài hước; … tán gái; … buổi sáng; … cho chồng; … với crush; nhắn tin hài hước với con gái; những tin nhắn hài hước |
| xin tiền mẹ | xin tiền mẹ; … tiếng anh là gì; xin tiền mẹ meme; … tiếng trung là gì; cách xin tiền mẹ không bị chửi; cách xin tiền mẹ; thơ xin tiền mẹ; văn xin tiền mẹ; cách xin tiền mẹ mua đồ; cách xin tiền mẹ đi chơi |
| drama threads | drama threads of destiny; drama threads; nina drama threads; chinese drama threads of destiny; k drama threads; … |
| hóng | hóng hớt đường phố hà nội; hồng; hóng homestay; hóng meme; … hóng biến quốc oai; … |

### 2d. What the demand says (I)

- **Format keywords to own:** đọc cmt, đọc comment threads, top comment hài hước, threads hài, kể chuyện threads, tin nhắn hài hước.
- **Sad-mood traps:**
  - "triết lý cuộc sống" serves a 50+ audience of radio-style hosts and Buddhist sayings.
  - "tâm sự buồn" and "tâm trạng" are mostly songs and karaoke.
  - On Google, "chữa lành" is spiritual or energy healing.
  - These terms work as one hashtag or tag, but the title should use the channel's own framing: "lớn rồi mới hiểu", "tâm sự", "stt buồn về cuộc sống" and "đọc cmt mà lặng người".
- **Mom keywords:**
  - Plain "mẹ", "gia đình", "tình mẹ" and "mẹ việt nam" are crowded by songs, TV shows and the patriotic "Mẹ Việt Nam anh hùng".
  - Use "tin nhắn / nhắn tin với mẹ", "mẹ hài hước" and "xin tiền mẹ" instead.
- **Pet keywords:** "boss", "boss mèo" and "con sen" are ambiguous. Use "mèo hài hước", "mèo ăn trộm" and "thú cưng hài hước".
- **"Viral", "xu hướng", "trending":** these have no Vietnamese demand that fits this channel. The viral style should come from honest social proof, for example "post 20K like", not from the word "viral".

### 2e. Hashtag landing-page size (V, public `youtube.com/hashtag/<tag>` header, 2026-10-17)

| Hashtag | Videos • channels | Use |
|---|---|---|
| #shorts | 1.9 billion • 98M | optional, last |
| #viral / #funny / #trending | 916M / 521M / 775M | too generic; skip |
| #threads | 220K • 52K | niche lead tag |
| #topcomment / #topcomments | 15K • 3K / 5.3K • 699 | format lead tag |
| #comment / #cmt | 20M / 41K | generic |
| #doccomment / #doccmt | 647 • 57 / <100 | small, but they describe the format exactly |
| #threadsvietnam / #threadsvn / #threadstory / #chuyenthreads / #threadsviral | 1.3K / 590 / 2.2K / 294 / 421 | optional niche |
| #haihuoc / #hàihước / #hai | 1.3M / 318K / 1.3M | mood lead (unaccented form dominates) |
| #giaitri / #xuhuong | 1.3M / 3.7M | generic |
| #genz | 1.2M • 401K | generic; drop |
| #tinnhanhai / #tinnhan / #nhantin | 292 / 1.1K / 963 | chat-format niche |
| #giadinh / #tinhme / #mevacon / #mehai / #chuyenmecon / #tamsugiadinh | 561K / 12K / 6.7K / 2.3K / 173 / 24K | family |
| #mevietnam / #mevn / #mehaihuoc | 259 / 889 / 101 | small; "mẹ Việt Nam" carries a patriotic association, so avoid it |
| #xintienme / #xintien / #chuyentien | <100 / <100 / 1.2K | small, but #xintienme is accurate for release-02 |
| #cadao / #cadaoche | 4K / <100 | release-02 |
| #meo / #mèo / #conmeo / #meohai / #meocute / #bossmeo / #consen | 97K / 99K / 6.1K / 1K / 6.1K / 1.3K / 1.4K | pets |
| #thucung / #thucunghaihuoc / #pets / #cat / #funnycats | 124K / 4.6K / 18M / 51M / 5.3M | pets |
| #boss | 1.3M • 394K | ambiguous; drop |
| #trietlycuocsong / #trietly / #baihoccuocsong / #daolycuocsong | 234K / 50K / 789K / 17K | sad / reflective |
| #tamsu / #tamsubuon / #tamtrang / #sttbuon / #chualanh / #caunoihay / #cauchuyencuocsong | 86K / 3.9K / 717K / 3K / 350K / 72K / 36K | sad / reflective |
| #lonroimoihieu | <100 | free to own as a series tag |
| #drama / #hongbien / #kechuyen | 10M / 2.7K / 121K | drama (#hongbien means street incidents; avoid it) |
| #mualu / #lauga | 12K / 3K | #mualu is flood news; avoid it |
| **No landing page returned:** #docmt, #threadshai, #cadaochebien, #doccmtgium, #meoantrom, #meotrom, #tinnhanme, #nhantinvoime | — | **#docmt in the current drafts is a typo for #doccmt.** The others are unused, so they bring no traffic yet |

---

## 3. Comparable Vietnamese Shorts (public pages, no login, V)

| Channel | Short (views, upload date) | Title pattern | Hashtags | Description / tags field |
|---|---|---|---|---|
| Lá Rau Muống | "Trung bình đoạn tin nhắn giữa con cái với phụ huynh 🤡" (4.45M, 2026-04-13) | "Trung bình + [situation]" meme | #topcomment #memes #viral #threads (in the title) | empty / none |
| Comments Mỗi Ngày | "Trung bình Cmt trên Threads City" (3.1M, 2026-05-11) | "Trung bình" meme | #memes #funny #viral (title) | empty / none |
| PetDocComments | "Đây có phải "Chó" không vậy ??!" (1.6M); "Mèo và những cái tên độc lạ…" (1.67M) | reaction question; "[pet] và những…" | #threads #topcomment #pets #mèo (title); 8–13 in the description | hashtag list only; tags: #thread, #meo, #pet |
| Internet có gì | "Chuyên mục mù mắt cùng toptop" (1.69M); "Câu chuyện thật là gây cấn 🤣🤣" (527K) | short reaction line | #threads #comment #funny #shorts (title) | empty / none |
| SECRET DIARY | "Hãy kể 1 chuyện kinh tởm mà bạn từng làm" (1.19M) | the original post's question as the title | #threads #topcomment #memes | 2 lines + hashtags |
| Động Threads | "lý do chia tay là gì em có biết không?" (963K) | question, lowercase | #threads #memes #funny #topcomment #fyp | copy of the title |
| Threads Daily | "Khi biết mẹ lén đọc nhật kí và cái kết" (374K) | "Khi … và cái kết" | #threads #threadstories #threadstory | empty |
| ThreadFox | "mẹ mình bị dính bùa hả mọi người 😭" (189K, 2026-10-10) | first-person quote | #threads #shorts #loithithamcuacomment | tags: 5 relevant |
| Thờ Rét Xi Ty (ThreadsCityVietnam) | "Gieo mầm hạt giống nỗi buồn \| ThreadsCityVietnam" (137K, sad pet story) | poetic line + brand | #threadscityvietnam #shorts #dongvat #pets #kechuyen #threads | **30 tags, many unrelated** ("pháp luật đời sống", "kiến thức"): the over-tagging to avoid |
| Khắc Kỷ 365 | "12 câu nói "chắc như đinh đóng cột" của Khổng Tử" (626K) | numbered list | #shorts #shortvideo #viral #độnglựcsống #trietlysong | long description; 20 tags |
| Positive Energy | "13 chân lý cuộc sống nghe một lần ngấm cả đời" (295K) | number + promise | #positiveenergy | empty |
| Minh Anh chuyện Đời / Lyric Life | "Nhà Nào Cũng Có Chuyện, Chỉ Là Không Ai Nói Ra"; "Càng Trưởng Thành Càng Hiểu: … \| Triết Lý Cuộc Sống" (8–13K) | Title Case aphorism + "\| keyword" | #Shorts #DaoLyCuocSong #TamSuCuocDoi | long descriptions; 26 tags |

**Takeaways:**
- The hit Threads-comment Shorts use sentence case, a 3–8-word hook and minimal metadata. #threads appears on almost all of them, usually with #topcomment, #comment or #memes (V).
- Their reach is driven by the hook and retention, not by tags (I).
- The triết lý niche uses Title Case aphorisms, numbered lists and long, stuffed metadata, with lower views on most videos checked (V for the observation, I for the reading).
- "Trung bình [X]", "Khi … và cái kết" and the post's own question are proven hook shapes in this niche (V).

---

## 4. Rules for Đọc Cmt Giùm

### 4a. Titles
1. **Length:** 60 characters or fewer, with the hook in the first ~40 (3P + I).
2. **Accuracy:** every claim must happen in the video. "Tự thú", "bị bắt", "xin tiền" and the like must match what the cards and voiceover actually show (V policy: malicious clickbait).
3. **Case:** sentence case, with no ALL CAPS words (I; the niche hits use sentence case, V).
4. **Emoji:** at most 1, at the end: 😭 / 😂 for funny, 🥲 / 🤍 for warm or sad. Use none on drama (I).
5. **No hashtags in the title**, so the visible hook stays clean (I).
6. **"Threads":** only as a place ("trên Threads"), at most once, never as a brand-like name. "Cmt" is the preferred format word in titles (I + Meta brand rules, §4e).
7. **Numbers:** only if they are true when the video is published, for example "post 20K like", "481 cmt" (I).

### 4b. Title formulas by mood (Vietnamese examples)

| Mood | Formula | Example (made up, to show the pattern) |
|---|---|---|
| **Hài / đọc cmt** | [Situation], [character] rep: [twist] + emoji | Hỏi mẹ lũ có sao không, mẹ rep: nấu lẩu gà 😭 |
| | Trung bình [familiar situation] + emoji | Trung bình cách mẹ báo tin mùa lũ 😭 |
| | [The post's question]? Cmt [reaction] | Mẹ chuyển tiền, rep sao cho ngầu? Cmt hiến kế cực lầy 😂 |
| | [Half the punchline]… [the twist] | Mẹ đẹp như tiên… thêm dấu huyền: mẫu xin tiền mẹ 😂 |
| **Buồn / tâm sự / triết lý** | Lớn rồi mới hiểu: [insight] | Lớn rồi mới hiểu: bố ít nói vì bố mệt 🥲 |
| | Đọc cmt mà lặng người: [topic] | Đọc cmt mà lặng người: câu mẹ dặn trước khi đi xa |
| | [Question that invites a confession]? | Có ai từng khóc vì một tin nhắn của mẹ chưa? |
| | [Short quote from a comment] | "Nhà không còn ai chờ cơm nữa" – cmt chạm đáy |
| **Ấm áp / gia đình** | Tin nhắn của [mẹ/bố] khiến cả cmt rưng rưng | Tin nhắn bố gửi lúc 2h sáng, cả cmt rưng rưng 🤍 |
| | [Small act], [unexpected warm result] | Mẹ không biết dùng emoji, nhưng câu cuối thì… 🥲 |
| | Lớn rồi mới hiểu [something about mom/dad] | Lớn rồi mới hiểu vì sao mẹ hay "chuyển nhầm" tiền |
| **Thú cưng** | [Pet] bị bắt quả tang [act], cmt [reaction] | Mèo ăn trộm bị bắt quả tang, cmt truy ra chủ mưu 😭 |
| | [Pet] [act]… để [absurd motive]? | Mèo tha đồ hàng xóm… để mai mối cho chủ? 😂 |
| | Con sen kể: boss nhà mình [x] | Con sen kể: boss nhà mình biết mở tủ lạnh 😂 |
| **Drama** | [Situation], cmt chia 2 phe | Bạn thân mượn tiền không trả, cmt chia 2 phe |
| | Bạn đứng về phía ai? [situation] | Bạn đứng về phía ai? Chuyện chia tiền đám cưới |
| | Đọc cmt vụ [anonymised topic]: [twist] | Đọc cmt vụ trả lại quà sinh nhật: câu cuối mới gắt |

Drama is anonymised by default. Never name a real private person, and use no "phốt", "biến căng" or "bóc phốt" framing (I; see the avoid list).

### 4c. Description template

```
[Line 1: unique hook, ≤ ~100 characters, starts with or contains the main keyword, e.g. "Đọc cmt: …"]
[Line 2: question CTA] … Kể dưới đây, câu hay nhất lên tập sau.

Trích dẫn để bình luận – chuyện trên Threads của @…, bình luận của @….
Giọng đọc AI (VieNeu-TTS). Nền: Pexels. Nhạc/SFX: Freesound CC0. Emoji: Microsoft Fluent (MIT). Font: TikTok Sans, Patrick Hand (OFL).
Kênh không liên kết với Meta/Threads.

#lead1 #lead2 #lead3 #more1 #more2 #more3 #doccmtgium
```

- The takedown/email line is removed, as the user asked.
- All hashtags go in one final line, 6–8 in total. Use no other hashtags anywhere in the description (I; the 60-hashtag cap is V).

### 4d. Hashtag sets by mood (3 lead + 3–5 more, unaccented, all must be relevant)

| Mood | Lead 3 (put first) | More (pick 3–5) |
|---|---|---|
| Hài / đọc cmt | #haihuoc #threads #topcomment | #doccmt #tinnhanhai #giaitri #comment #doccmtgium |
| Buồn / tâm sự / triết lý | #tamsu #threads #trietlycuocsong | #baihoccuocsong #tamtrang #caunoihay #sttbuon #doccmtgium |
| Ấm áp / gia đình | #giadinh #tinhme #threads | #tamsugiadinh #chuyenmecon #lonroimoihieu (series) #doccmt #doccmtgium |
| Thú cưng | #meo #thucung #threads | #topcomment #thucunghaihuoc #bossmeo #consen #doccmtgium |
| Drama | #drama #threads #topcomment | #kechuyen #giaitri #doccmt #doccmtgium |

- **#shorts:** optional, last, never in the lead three (V for not required; I for the advice).
- **#doccmtgium:** keep it on every video. It builds the channel's own landing page, but it is not a lead tag until it has videos (I).
- **#chualanh:** use only for genuine self-healing content. Its Google meaning is spiritual healing (V autocomplete; I).

### 4e. Tags field by mood (8–13 tags, well under 500 characters)

| Mood | Tags |
|---|---|
| Hài / đọc cmt | đọc cmt, đọc comment threads, đọc cmt threads, top comment hài hước, cmt hài hước, comment hài hước, threads hài, kể chuyện threads, tin nhắn hài hước, doc cmt, Đọc Cmt Giùm |
| Buồn / tâm sự | tâm sự, stt buồn về cuộc sống, tâm trạng buồn, câu nói hay về cuộc sống, triết lý cuộc sống, lời hay ý đẹp về cuộc sống, lớn rồi mới hiểu, đọc comment threads, kể chuyện threads, Đọc Cmt Giùm |
| Ấm áp / gia đình | nhắn tin với mẹ, tin nhắn với mẹ, mẹ hài hước, câu chuyện ý nghĩa về gia đình, tâm sự gia đình, chuyện mẹ con, lớn rồi mới hiểu, đọc comment threads, kể chuyện threads, Đọc Cmt Giùm |
| Thú cưng | mèo hài hước, mèo hài, thú cưng hài hước, chó mèo hài hước, mèo cute hài hước, con mèo ăn trộm, top comment hài hước, đọc comment threads, Đọc Cmt Giùm |
| Drama | drama, hóng drama, kể chuyện threads, chuyện threads, đọc comment threads, top comment, bạn đứng về phe nào, Đọc Cmt Giùm |

### 4f. Things to avoid

| Avoid | Why |
|---|---|
| Titles that promise more than the video shows, e.g. stating a joke comment as fact ("chủ mưu tự thú" when a commenter only claims it) | malicious clickbait (V policy); accuracy (I) |
| More than ~8 hashtags; unrelated trend tags (#fyp, #viral, #trending, #minecraft-style bait) | YouTube may remove videos for unrelated or excessive hashtags; more than 60 voids all of them (V) |
| Stuffing the tags field (20–30 loosely related tags, as in the ThreadsCityVietnam example) | minimal benefit (V); spam policy on excessive tags in the description (V) |
| "Threads"/"Meta" as a brand: the Threads logo in the cover or title, "Threads chính thức", "Threads Việt Nam" as a name, or the word Threads combined with our brand | Meta's Instagram guidelines forbid implying partnership and combining the brand with other names (V for Instagram; the Threads page has no detailed rules yet, so applying them to Threads is I). Keep "trên Threads" and "Kênh không liên kết với Meta/Threads" |
| Press/news-style words: "tin tức", "nóng", "khẩn", "chấn động", "phốt", "biến căng", "hóng biến" | they read as news or gossip (I); Decree 147 bans press words in account names (V, earlier research); the autocomplete for these terms is news and incidents (V) |
| Disaster keywords as traffic bait: #lulut, #mualu, "lũ lụt" in tags | flood-news results (V); laughing near real disasters is insensitive (I). Mention "mùa lũ" only as story context |
| Ambiguous tags: #boss, "boss mèo", "con sen" alone, "drama threads", "mẹ Việt Nam" | autocomplete shows games, films, songs or a Chinese drama (V) |
| Sexual framing words in metadata ("đồ lót", "biến thái") | the release-03 package forbids sexual framing; it is also a safety-filter risk (I) |
| ALL CAPS, Title Case Every Word, 2+ emoji, "=))" chains | readability and tone (I) |
| An identical hook line on every video | the mass-production / scraped-content risk (V policy; I for how it applies) |
| Hashtag typos (#docmt) and empty invented tags (#threadshai, #cadaochebien) | no landing page (V) |

---

## 5. Applied to the 3 release videos

Character counts are code points, measured with Python. Emoji add one more in UTF-16. Credits lines are unchanged from `youtube-upload-v1.md`, and the takedown line stays removed.

### release-01: mom's flood chat (hài · mẹ)

- **Title:** `Hỏi mẹ lũ có sao không, mẹ rep: nấu lẩu gà 😭` (44 chars; the twist is inside the first 40)
- **Alternative:** `Trung bình cách mẹ báo tin mùa lũ 😭` (35 chars). The current `Hỏi thăm mẹ mùa lũ, nhận về… thực đơn lẩu gà 😭` (46) is also compliant.
- **Description:** line 1 is `Đọc cmt mùa lũ: chết ba con gà, mẹ bình tĩnh đổi luôn thực đơn 😭`, then the existing CTA `Mẹ bạn từng báo tin kiểu gì làm bạn hết hồn? Kể dưới đây, câu hay nhất lên tập sau.`
- **Hashtags:** `#haihuoc #threads #topcomment #tinnhanhai #giadinh #doccmt #doccmtgium`
- **Changes from the draft:**
  - Drop #meVietNam, which leans patriotic.
  - Drop #kechuyenthreads, #genz and #threadshai (empty or generic).
  - Keep #shorts last only if you want it.
- **Tags:** đọc cmt, đọc comment threads, top comment hài hước, tin nhắn hài hước, nhắn tin với mẹ, mẹ hài hước, mẹ việt nam hài hước, chuyện mẹ con, threads hài, kể chuyện threads, doc cmt, Đọc Cmt Giùm

### release-02: "Mẹ vừa chuyển tiền, rep sao cho ngầu?" (hài · mẹ · tiền)

- **Title:** `Mẹ chuyển tiền, rep sao cho ngầu? Cmt hiến kế cực lầy 😂` (55 chars). This replaces "Cả Threads hiến kế", so the brand name is not used as a crowd.
- **Alternative:** `Mẹ đẹp như tiên… thêm dấu huyền: mẫu xin tiền mẹ 😂` (50 chars). It is accurate because the voiceover calls it "mẫu xin thêm" and quotes "tiền mẹ con xin".
- **Description:** line 1 is `Đọc cmt: mẹ vừa chuyển tiền, cả cmt hiến kế, có cả ca dao chế xin tiền mẹ 😂`, then `Nhận tiền mẹ gửi thì bạn sẽ rep câu nào? Câu hay nhất lên tập sau.`
- **Hashtags:** `#haihuoc #threads #topcomment #xintienme #cadaoche #doccmt #doccmtgium`
- **Changes from the draft:**
  - Fix the #docmt typo.
  - Drop #cadaochebien, which is empty; #cadaoche matches the "ca dao chế" search demand.
  - Drop #genz.
- **Tags:** xin tiền mẹ, cách xin tiền mẹ, nhắn tin xin tiền mẹ, ca dao chế, ca dao tự chế, top comment hài hước, đọc comment threads, đọc cmt, threads hài, tin nhắn hài hước, mẹ hài hước, Đọc Cmt Giùm

### release-03: cat caught on a roof with the neighbour's laundry (hài · thú cưng)

- **Title:** `Mèo ăn trộm bị bắt quả tang, cmt truy ra chủ mưu 😭` (50 chars). It matches the voiceover ("Cư dân mạng lập tức truy ra kẻ chủ mưu") and does not state the joke confession as fact. It uses the "mèo ăn trộm" search phrase.
- **Alternative:** `Mèo tha đồ hàng xóm… để mai mối cho chủ? 😂` (42 chars)
- **Description:** line 1 is `Đọc cmt: mèo ăn trộm bị chụp quả tang trên mái nhà, cmt truy ra luôn chủ mưu 😭`, then the existing CTA `Boss nhà bạn từng tha món gì về nhà? Kể dưới đây, câu hay nhất lên tập sau.`
- **Hashtags:** `#meo #thucung #threads #topcomment #thucunghaihuoc #bossmeo #doccmtgium`
- **Changes from the draft:** drop #boss (ambiguous) and fix #docmt. Keep "đồ lót" out of all metadata.
- **Tags:** mèo hài hước, mèo ăn trộm, con mèo ăn trộm, mèo trộm, mèo hài, thú cưng hài hước, chó mèo hài hước, mèo cute hài hước, top comment hài hước, đọc comment threads, threads hài, Đọc Cmt Giùm

**Other settings stay as in the upload sheet:** Entertainment category, AI disclosure as the user chooses, and pinned comments.
- **Optional, unverified effect (I):** set the video language to Tiếng Việt in Studio, and file the funny videos under the Comedy category.

---

## 6. Not verified / open

- **Feed truncation:** the exact number of title characters shown in the Shorts feed (only third-party figures of 40/50; no YouTube statement).
- **Description visibility:** how much of the description a Short shows, and which characters appear in search snippets (third-party only).
- **Tags field limit:** the 500-character limit is third-party only.
- **#shorts:** whether it still affects distribution. There is no official 2025–2026 statement either way, only that it is not needed for classification.
- **Hashtag weight:** whether hashtags in the title and in the description weigh differently for ranking. There is no official statement.
- **Lead hashtags:** whether hashtag order influences YouTube's choice of the three it treats as most engaging.
- **Threads naming rules:** Meta's Threads-specific rules on name use. Its page says detailed guidelines are "coming soon", so the Instagram rules were applied by analogy.
- **Emoji length:** whether emoji count as 1 or 2 characters toward the 100-character limit.
- **Hashtag counts:** a snapshot on 2026-10-17. "No landing page returned" was read from the page header and could also mean a page this scraper failed to parse (I).
- **Spam policy wording:** the policy page is long and was read through a summarising fetch tool, so category names are confirmed but full wording is not.
- **Unopened sources:** the 2026 search-filter change comes from Tubefilter's report of YouTube's help-forum post. The forum post itself was not opened.

---

## Sources (opened 2026-10-17)

**Official**
- https://support.google.com/youtube/answer/6390658?hl=en (Use hashtags for YouTube videos)
- https://support.google.com/youtube/answer/146402?hl=en (Add tags to videos)
- https://support.google.com/youtube/answer/57404?hl=en (Edit video settings: title 100, description 5,000)
- https://support.google.com/youtube/answer/2801973?hl=en and ?hl=en-GB (Spam, deceptive practices and scams policies)
- https://support.google.com/youtube/answer/16090438?hl=en (How YouTube search works; redirected from youtube.com/howyoutubeworks/product-features/search/)
- https://support.google.com/youtube/answer/10059070?hl=en (Get started creating YouTube Shorts)
- https://support.google.com/youtube/answer/15424877?hl=en (Understand three-minute YouTube Shorts)
- https://blog.youtube/creator-and-artist-stories/your-guide-to-getting-started-with-youtube-shorts/ (YouTube Official Blog, Apr 8 2025)
- https://www.meta.com/brand/resources/threads/ (Threads brand overview)
- https://www.meta.com/brand/resources/instagram/instagram-brand/ (Instagram brand guidelines)

**Secondary / third-party**
- https://www.mediapost.com/publications/article/388588/ (Todd Sherman, Creator Insider interview, Aug 25 2023)
- https://www.searchenginejournal.com/youtube-explains-how-shorts-algorithm-works/494953/ (Aug 28 2023)
- https://www.tubefilter.com/?p=190226 (search filters with a Shorts type, Jan 9 2026)
- https://vidiq.com/blog/post/youtube-shorts-titles/ (3P, updated Jun 5 2026)
- https://hashtagtools.io/blog/youtube-shorts-character-limits-title-description-hashtags-2026 (3P, May 23 2026)

**Raw data (public endpoints, no login)**
- **Autocomplete:** `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=vi&gl=VN&ie=utf-8&oe=utf-8&q=<seed>` for 82 seeds, plus the same without `ds=yt` for 13 seeds.
- **YouTube search results** (`https://www.youtube.com/results?search_query=…&hl=vi&gl=VN`):
  - "đọc comment threads"
  - "triết lý cuộc sống shorts"
  - "tâm sự buồn threads"
  - "tin nhắn với mẹ hài threads"
  - "mèo hài threads comment"
- **Watch pages** (`https://www.youtube.com/watch?v=<id>`): MpBQmSvmqps, l-d7UtMowfI, g_jOVSh0RB4, 2d-hg6nsBzM, 7gR9Heea8WI, mI2gGZ_eztU, ytT7NHeh1eM, 3H37VJP7Xko, qdcUoD4HTv4, qcV5V-Z-Qfs, P8Mmt1AHejs, y5qjqmVHusc, 5alxEpxfxe0, ywt9-XBgitM, g0Ru8JbJuSQ, LBr1-m1B0s8
- **Hashtag pages:** `https://www.youtube.com/hashtag/<tag>` for 87 tags; the relevant ones are in §2e.

**Internal:** `research/channel-name-seo-v1.md` (Decree 147, handle research), `.agents/skills/creator-launch/references/packaging.md`, `artifacts/release/youtube-upload-v1.md`, `artifacts/release/release-0{1,2,3}-v1/package.md`, `artifacts/content/release-0{1,2,3}-lines-v1.json`.
