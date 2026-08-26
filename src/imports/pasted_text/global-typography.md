# GLOBAL TYPOGRAPHY SYSTEM AND HIERARCHY RULES

Apply these rules **across the entire website**.

This is not a page-specific typography adjustment.

The goal is to establish a consistent, balanced and intentional typographic system while **preserving the existing typeface and overall visual identity of the website**.

The website should feel like it uses one coherent typographic system, regardless of the page, section or component.

---

# 01. DO NOT CHANGE THE TYPEFACE

Keep the existing typography family currently used by the website.

Do not introduce new fonts.

Do not replace the current typeface with another font.

Do not redesign the brand typography.

The objective is to improve:

* Hierarchy
* Scale
* Weight
* Alignment
* Line-height
* Letter-spacing
* Width
* Density
* Relationship between text elements
* Responsive behavior

The existing typeface is part of the brand and must remain consistent.

---

# 02. TYPOGRAPHY MUST BE TREATED AS A SYSTEM

Typography should never be adjusted as isolated elements.

Every text element must belong to a clear typographic role.

Examples:

* Display
* H1
* H2
* H3
* H4
* Body Large
* Body
* Body Small
* Caption
* Label
* Navigation
* Button
* Eyebrow
* Metadata

The exact categories should be based on the typography already present on the website.

Do not create unnecessary styles simply to increase the number of typography tokens.

---

# 03. GLOBAL TYPOGRAPHIC HIERARCHY

Every section should have a clear hierarchy.

A typical section should communicate:

1. Context
2. Main message
3. Supporting information
4. Action or additional information

Typography must visually communicate this hierarchy.

Do not allow:

* Eyebrows competing with headings
* Body text competing with headings
* Buttons looking like headings
* Secondary information becoming visually dominant
* Multiple elements having the same visual weight without a reason

When multiple text elements have similar importance, their visual hierarchy must make that relationship intentional.

---

# 04. HEADINGS

Headings should be visually strong but not unnecessarily heavy.

Do not increase font weight simply to make a heading feel more prominent.

Hierarchy should be achieved through a combination of:

* Size
* Weight
* Line-height
* Width
* Spacing
* Position
* Contrast

A heading that is too large is not necessarily stronger.

A heading that is too bold is not necessarily stronger.

The goal is **controlled visual authority**.

---

# 05. DISPLAY TYPOGRAPHY

Large display typography should be used intentionally.

For very large headlines:

* Control line length
* Control wrapping
* Control line-height
* Avoid unnecessary lines
* Avoid awkward orphan words
* Avoid excessive width
* Avoid visual collisions with adjacent elements

Large typography should feel deliberate rather than simply oversized.

When a display heading becomes too large for the composition, reduce its size before changing the overall layout.

---

# 06. LINE LENGTH

Text should have controlled measure.

Avoid excessively long paragraphs or text blocks spanning the entire viewport.

For readable body copy, establish an appropriate maximum width.

Example:

```css id="m2x8qa"
max-width: 65ch;
```

The exact value should follow the visual language of the existing site.

Do not apply the same width blindly to every text element.

Headlines may intentionally use wider or narrower measures.

---

# 07. LINE HEIGHT

Line-height must be proportional to font size.

Large display text should generally have tighter line-height.

Body text should have more breathing room.

Do not use one global line-height value for every typography style.

The relationship should feel intentional.

For example:

Display:

`1.0 - 1.1`

Heading:

`1.05 - 1.2`

Body:

`1.4 - 1.6`

These are reference ranges only.

Use the existing visual language as the final authority.

---

# 08. FONT WEIGHT

Weight must communicate hierarchy.

Avoid using the heaviest available weight everywhere.

Do not make:

* Headings
* Labels
* Buttons
* Navigation
* Body copy

all equally bold.

Use weight differences intentionally.

A common hierarchy might be:

Display → Bold / Semibold

Heading → Semibold / Medium

Body → Regular

Secondary → Regular / Medium

Label → Medium

Button → Medium / Semibold

But the existing site's actual font weights should take priority.

---

# 09. ALIGNMENT

Typography must respect the layout system.

Avoid arbitrary text alignment.

Use alignment intentionally:

* Left aligned for most editorial/content contexts
* Center aligned when the composition is intentionally centered
* Right aligned only when structurally justified

Do not center text simply because there is available space.

Text alignment should correspond with:

* Grid
* Container
* Images
* Buttons
* Section structure
* Visual hierarchy

A heading aligned to the left should normally establish a clear relationship with the content below it.

---

# 10. TEXT BLOCK ALIGNMENT

Elements inside the same content group should share a coherent alignment axis.

For example:

```text
Eyebrow
Heading
Description
CTA
```

These elements should not appear randomly offset from one another.

Unless the composition intentionally uses asymmetry, maintain a clear alignment relationship.

---

# 11. SPACING BETWEEN TYPOGRAPHIC ELEMENTS

Spacing must communicate hierarchy.

The relationship should generally be:

Small spacing:

Related elements.

Larger spacing:

Different hierarchy levels.

Example:

```text
EYEBROW
small gap
HEADING
medium gap
DESCRIPTION
larger gap
CTA
```

Do not use identical margins between every text element.

Avoid excessive spacing between elements that belong together.

Avoid insufficient spacing between independent content groups.

---

# 12. HEADING + BODY RELATIONSHIP

A heading and its supporting paragraph should feel like one typographic unit.

The relationship between:

* Size
* Weight
* Color
* Width
* Line-height
* Spacing

must make the hierarchy obvious.

If the paragraph visually competes with the heading, reduce its visual weight.

If the paragraph becomes too weak, increase its readability rather than making the heading larger.

---

# 13. EYEBROWS / LABELS

Eyebrows and labels should provide context, not compete with the main message.

Keep them visually subordinate to the heading.

Use:

* Smaller size
* Appropriate weight
* Controlled letter spacing
* Controlled contrast

Do not make an eyebrow look like another heading.

---

# 14. BODY COPY

Body text must prioritize readability.

Avoid:

* Excessively small text
* Excessively tight line-height
* Excessively wide text blocks
* Heavy font weights
* Poor contrast
* Long uninterrupted paragraphs

Body typography should remain comfortable at every breakpoint.

---

# 15. BUTTON TYPOGRAPHY

Buttons must follow the same typographic system.

Do not independently style button text without considering the rest of the hierarchy.

Button typography should be:

* Legible
* Controlled
* Consistent
* Visually distinct from body text
* Appropriate to the button size

Button weight should not unnecessarily exceed the visual weight of major headings.

---

# 16. NAVIGATION TYPOGRAPHY

Navigation should remain visually subordinate to the main page content unless the brand intentionally requires otherwise.

Avoid oversized navigation typography.

Maintain consistent:

* Font family
* Weight
* Size
* Letter spacing
* Alignment
* Vertical centering

across the entire site.

---

# 17. RESPONSIVE TYPOGRAPHY

Typography must scale according to the composition, not simply according to screen size.

Desktop typography should not automatically be copied to mobile.

Review:

* Font size
* Line-height
* Maximum width
* Line breaks
* Weight
* Alignment
* Spacing

at every breakpoint.

Large desktop headlines should be reduced when necessary to avoid:

* Excessive wrapping
* Single-word orphan lines
* Unbalanced compositions
* Excessive vertical height
* Collision with imagery

---

# 18. FLUID TYPOGRAPHY

Where appropriate, use fluid sizing.

Example:

```css id="t3m7qn"
font-size: clamp(min, fluid, max);
```

Use fluid typography only where it improves the existing system.

Do not introduce fluid sizing everywhere simply because it is technically possible.

---

# 19. LINE BREAKS

Typography should control line breaks intentionally.

Avoid accidental wrapping that creates visually weak compositions.

For important display headings, consider:

* Maximum width
* Controlled container width
* Responsive font sizing
* Intentional line breaks when appropriate

Do not insert manual `<br>` tags everywhere.

Only use intentional line breaks when they are part of the visual composition.

---

# 20. TYPOGRAPHY AND SECTION HEIGHT

Typography must work together with the global section-height rule.

A heading must not be made excessively small simply to force a section into `100svh`.

Likewise, typography must not be made excessively large simply to fill the viewport.

The relationship should be balanced.

The correct priority is:

**Content → Hierarchy → Composition → Viewport**

not:

**Viewport → Force content to fit**

---

# 21. TYPOGRAPHIC DENSITY

Every section should have a deliberate level of typographic density.

Avoid sections that feel:

* Too empty
* Too dense
* Too heavy
* Too fragmented
* Too repetitive

Balance:

Large type

with

Supporting text

with

Whitespace

with

Visual elements.

Typography should participate in the overall composition rather than exist independently from it.

---

# 22. TYPOGRAPHY SHOULD FOLLOW THE GRID

Text should respect the same layout grid used by the rest of the interface.

Avoid arbitrary widths and offsets.

Headings, paragraphs, labels and buttons should align with the underlying layout system unless there is an intentional visual reason not to.

---

# 23. GLOBAL CORRECTION RULE

Whenever a typography problem is identified on one page, **do not fix only that occurrence**.

Determine whether the problem represents a broader system issue.

For example:

If one H1 is too heavy:

Do not simply reduce that H1.

Review all H1 implementations.

If one heading is too large:

Review the entire heading scale.

If one paragraph is too wide:

Review the body text measure across the site.

If one section has poor text alignment:

Review the alignment rule for that section pattern.

The objective is to correct the **system**, not the symptom.

---

# 24. USER-PROVIDED EXAMPLES

The user may provide individual examples of typography that are incorrect.

These examples should be treated as **evidence of a global rule violation**.

When the user says something such as:

"this heading is too heavy"

interpret it as:

> Determine why this heading feels too heavy and establish a global rule that prevents similar typography from becoming too heavy elsewhere.

When the user says:

"this text is poorly aligned"

interpret it as:

> Review the alignment logic of the relevant typography pattern across the entire website.

When the user says:

"this title is too large"

interpret it as:

> Review the global scale and contextual sizing of equivalent titles across the site.

Do not make isolated fixes unless the element is genuinely an intentional exception.

---

# 25. DO NOT CREATE A NEW VISUAL LANGUAGE

The goal is not to make the website look like a generic modern Design System.

Do not introduce:

* New fonts
* New typography styles without evidence
* Random font weights
* Excessive letter spacing
* Arbitrary uppercase text
* Generic SaaS typography
* Excessive responsive scaling
* Unnecessary text effects

Preserve the personality of the existing website.

Improve its consistency and balance.

---

# 26. GLOBAL TYPOGRAPHIC TOKENS

Where appropriate, establish global variables/tokens for:

* Font family
* Font weights
* Display sizes
* Heading sizes
* Body sizes
* Line heights
* Letter spacing
* Text colors
* Text widths
* Responsive typography

Use the existing architecture.

Do not create duplicate typography systems.

---

# 27. FINAL TYPOGRAPHIC AUDIT

After implementing the global rules, review the entire website.

Check every major page and section.

Evaluate:

### Hierarchy

Can the user immediately understand what is most important?

### Weight

Are font weights appropriately distributed?

### Scale

Are text sizes proportional to the composition?

### Alignment

Do text elements follow the grid and visual structure?

### Spacing

Are relationships between text elements intentional?

### Line-height

Is text comfortable and visually balanced?

### Width

Are text blocks appropriately constrained?

### Responsive behavior

Does typography remain balanced across breakpoints?

### Consistency

Do equivalent components behave consistently across the website?

---

# FINAL PRINCIPLE

> **Keep the existing typeface. Standardize the way it behaves.**

Typography should feel:

**Consistent without becoming mechanical.**

**Expressive without becoming excessive.**

**Strong without becoming heavy.**

**Large without becoming oversized.**

**Structured without becoming rigid.**

Every typography decision must contribute to a clear visual hierarchy and a balanced composition across the entire website.
