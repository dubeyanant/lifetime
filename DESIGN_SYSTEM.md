# Lifetime Design System & Style Guide

## 1. Core Philosophy: "Quiet, Reflective, Timeless"

Lifetime is not a social media app. It is a digital sanctuary—a personal museum for one's life. every design decision must pass the "Quiet Test": does this feature or visual element demand attention, or does it invite reflection?

- **Calm over Clever**: Simplicity is the ultimate sophistication. Avoid unnecessary animations or complex interactions.
- **Whitespace is Volume**: Use empty space to give thoughts room to breathe.
- **No Metrics**: No view counts, no likes, no "streaks". The value is internal, not external.

## 2. Visual Foundation

### Color Palette

We use a restricted palette inspired by physical paper and ink.

| Variable       | Hex       | Usage                                                          |
| :------------- | :-------- | :------------------------------------------------------------- |
| **Canvas**     | `#FAFAF7` | Main background. Off-white, distinct from clinical `#FFFFFF`.  |
| **Ink**        | `#1F2933` | Primary text. Soft black, easier on the eyes than pure black.  |
| **Graphite**   | `#6B7280` | Secondary text, dates, minor details.                          |
| **Warm Amber** | `#B45309` | The _only_ accent. Used for primary actions and active states. |
| **Error**      | `#DC2626` | Critical errors only.                                          |

### Typography

The interplay between Serif and Sans-Serif maps to "Emotional" vs "Functional".

- **Primary (Serif)**: `Source Serif 4`
  - Used for: Headings, Body text (event descriptions), Quotes.
  - Why: It feels like a book or a newspaper. It signals "reading" mode.
- **Secondary (Sans)**: `Inter`
  - Used for: UI elements, buttons, dates, labels, settings.
  - Why: It is legible at small sizes and stays out of the way.

## 3. UI Components

### Buttons

Buttons should feel tactile but modest.

- **Primary**: Solid `#1F2933` background, White text. Rounded corners (`rounded-md`).
- **Ghost/Secondary**: Transparent background, `#6B7280` text, hover to `#1F2933`.
- **Interaction**: No bouncy spring animations. Simple fast transitions (`duration-200 ease-out`).

### Cards (Events)

Events are memories. They should look like slips of paper or index cards.

- **Background**: White (`#FFFFFF`) or transparent depending on importance.
- **Border**: Very subtle (`border-gray-100` or `border-gray-200`).
- **Shadow**: Minimal (`shadow-sm`). Depth should be reserved for "lifting" an item when interacting.

### The Timeline

The central spine of the application.

- **Line**: A thin, continuous vertical line (`w-px bg-gray-200`) running down the center (desktop) or left (mobile).
- **Flow**: Recent events at the top (or bottom, user configurable later).
- **Rhythm**: Events should not be equidistant. Using spacing to represent time gaps can be powerful (future consideration).

### Forms (The "Writing" Experience)

Writing an event is the core action. It must feel safe and private.

- **Inputs**: Minimal borders. Focus states use the Warm Amber ring (`ring-[#B45309]`).
- **Textareas**: Auto-expanding. Feels like a blank page.

## 4. Future Vision

- **Dark Mode**: A deep "midnight" blue-grey, not true black. Like reading with a flashlight under the covers.
- **Rich Media**: Photos and videos should be treated like artifacts—framed, not full-bleed "stories".
- **Printed Book**: The ultimate output of Lifetime is a physical book. The UI should subtly remind the user of this possibility (clean margins, print-like typography).
