# Images

Only concepts that are easier to see than to read get an image. Diagrams that must be exact (folders to URLs, the proxy flow, the file boundaries of a route) are drawn in code on the page instead.

## Shared style (paste before every prompt)

> Minimal flat vector illustration, thin uniform line art, mostly neutral gray strokes (#8f8f8f) with a single soft indigo accent (#7d8cff) used only on the key element. Transparent background, no gradients, no shadows, no 3D. Clean, calm, generous whitespace, like a modern developer-docs illustration. Any labels are short, lowercase, in a clean monospace font. 16:9, 1600x900 px.

## How to use

1. Open ChatGPT (image generation), paste the shared style, then the prompt for one image.
2. Download as PNG with a transparent background.
3. Save it with the exact file name into `public/images/`.
4. Reload the lesson. The placeholder is replaced by your image (after `npm run build` in production).

## 1. `server-vs-client.png`

Used in: lesson 04, Server vs Client.

> Two side-by-side panels. Left panel titled "server component": a kitchen where a chef plates a finished meal and sends it out on a tray; the chef has access to a pantry and a locked safe labeled "secrets". Right panel titled "client component": at the dining table, a diner receives the meal plus a small interactive salt shaker drawn in the indigo accent that they can use themselves. Conveys: the server prepares everything it can, only the interactive bits run in the browser.

## 2. `streaming.png`

Used in: lesson 05, Data Fetching.

> A restaurant table seen from above, shown in three moments left to right. First: the plates, cutlery, and bread arrive immediately (labeled "shell"), with one empty placeholder plate outlined in dashes. Second: a waiter is on the way with a dish. Third: the dish, drawn in the indigo accent, fills the placeholder. Conveys: the page shows up instantly and slow parts stream in when ready.

## 3. `caching.png`

Used in: lesson 08, Caching.

> A meal-prep scene: on the left, a cook prepares one big batch and fills labeled containers ("use cache"), stacking them in a fridge. On the right, several customers each get a container instantly, while one customer in the corner gets a dish cooked fresh to order, labeled "dynamic". A small tag on the fridge door, drawn in the indigo accent, is labeled "updateTag" as if it clears the shelf. Conveys: cached work is done once and reused, dynamic work is done per request.
