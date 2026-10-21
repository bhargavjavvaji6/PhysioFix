from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path


def replace_once(text: str, pattern: str, replacement: str, label: str) -> str:
    updated, count = re.subn(pattern, lambda _: replacement, text, count=1, flags=re.S)
    if count != 1:
        raise RuntimeError(f"Could not safely locate {label}; found {count} matching blocks. No file was changed.")
    return updated


def main() -> int:
    css_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("src/styles.css")
    if not css_path.is_file():
        print(f"Cannot find {css_path}. Run this script from the PhysioFix project root, or pass the CSS path.")
        return 1

    original = css_path.read_text(encoding="utf-8")
    text = original

    # Remove the two experimental hero background sections as one bounded range.
    start_marker = "/* =========================================\n   PHYSIOFIX HERO BACKGROUND\n   Applies ONLY to the header/hero section"
    end_marker = "/* =========================================\n   PATIENT REVIEW CARDS"
    start = text.find(start_marker)
    end = text.find(end_marker, start + 1)
    if start < 0 or end < 0:
        print("Could not safely locate the duplicated hero blocks. No file was changed.")
        return 1
    text = text[:start] + text[end:]

    # Replace the original base hero block. All other sections are preserved.
    hero_pattern = (
        r"/\* =========================\s*\n\s*HERO\s*\n\s*========================= \*/"
        r"[\s\S]*?"
        r"/\* =========================\s*\n\s*QUICK BENEFITS"
    )
    hero_css = r'''/* =========================
   HERO — SINGLE SOURCE OF TRUTH
========================= */
.hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: 72px 0 28px;
    background: #f6f9fb;
}
.hero::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -2;
    background: url("/images/Header-background.jpg") center right / cover no-repeat;
    filter: brightness(.98) contrast(1.08) saturate(1.04);
}
.hero::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(90deg,
        rgba(247,250,252,.99) 0%,
        rgba(247,250,252,.96) 29%,
        rgba(247,250,252,.88) 46%,
        rgba(247,250,252,.58) 64%,
        rgba(247,250,252,.18) 82%,
        rgba(247,250,252,.06) 100%);
}
.hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) .9fr;
    align-items: center;
    gap: 70px;
}
.hero-copy {
    position: relative;
    z-index: 1;
    min-width: 0;
    max-width: 680px;
}
.hero h2 {
    max-width: 660px;
    margin: 0;
    color: var(--navy);
    font-family: var(--font-heading);
    font-size: clamp(48px, 5.2vw, 76px);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -.052em;
    text-wrap: balance;
}
.hero h2 span { color: var(--blue); }
.hero h3 {
    margin: 0 0 20px;
    color: var(--navy);
    font-family: var(--font-heading);
    font-size: clamp(18px, 1.6vw, 25px);
    font-weight: 700;
    line-height: 1.42;
}
.hero-lede {
    max-width: 630px;
    margin: 24px 0 28px;
    color: #344b61;
    font-size: 15px;
    line-height: 1.9;
}
.hero-lede strong { color: var(--navy); font-weight: 700; }
.hero-buttons { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
.hero .btn-primary { box-shadow: 0 8px 22px rgba(20,122,168,.18); }
.hero .btn-primary:hover { box-shadow: 0 12px 28px rgba(20,122,168,.24); }
.hero-assurance { position: relative; z-index: 1; margin-top: 30px; }
.hero-bottom { position: relative; z-index: 1; margin-top: 32px; }

/* =========================
   QUICK BENEFITS'''
    text = replace_once(text, hero_pattern, hero_css, "the base hero CSS")

    # Final design tokens and high-contrast body text. This is intentionally at file end
    # so old utility/section selectors cannot wash text out later in the cascade.
    polish = r'''

/* =========================
   PHYSIOFIX PREMIUM FINISH
   High-contrast type + one responsive hero background
========================= */
:root {
    --navy: #10243a;
    --navy-dark: #091727;
    --blue: #147aa8;
    --blue-light: #e8f4f8;
    --text: #1b3046;
    --muted: #52677b;
    --border: #d8e3ea;
}
body { color: #1b3046; background: #fff; }

/* Prevent pale, low-contrast descriptions on light surfaces. */
.about-copy .lead,
.about-copy > p:not(.lead),
.section-heading > p,
.section-heading p,
.process-grid > div:first-child > p,
.treatment-card p,
.review-card > p,
.review-disclaimer,
.faq-item p,
.faq-answer {
    color: #52677b;
}
.nav > a:not(.nav-appointment) { color: #40566a; }
.brand-word small { color: #5d7186; }
input, select, textarea { color: #192f45; }

/* Disable legacy element-level background images; ::before owns the image now. */
.hero { background-image: none !important; }
.hero::before {
    background-image: url("/images/Header-background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center right;
    filter: brightness(.98) contrast(1.08) saturate(1.04);
}
.hero::after {
    background: linear-gradient(90deg,
        rgba(247,250,252,.99) 0%,
        rgba(247,250,252,.96) 29%,
        rgba(247,250,252,.88) 46%,
        rgba(247,250,252,.58) 64%,
        rgba(247,250,252,.18) 82%,
        rgba(247,250,252,.06) 100%);
}

.treatment-card,
.review-card,
.faq-item,
.contact-form { border-color: #dce6ed; }
.treatment-card,
.review-card { box-shadow: 0 8px 24px rgba(17,36,59,.045); }
.treatment-card:hover,
.review-card:hover {
    border-color: #badce8;
    box-shadow: 0 16px 36px rgba(17,36,59,.095);
}
.btn-primary { background: #147aa8; border-color: #147aa8; }
.btn-primary:hover { background: #0e638b; }
.btn-outline { color: #10243a; border-color: #c6d5df; }
:focus-visible { outline: 3px solid #1689b6; outline-offset: 3px; }

@media (max-width: 1100px) {
    .hero { padding-top: 58px; }
    .hero-grid { gap: 34px; }
    .hero h2 { font-size: clamp(45px, 5.8vw, 66px); }
}
@media (max-width: 760px) {
    .hero { padding: 48px 0 28px; }
    .hero::before {
        background-position: 64% center;
        filter: brightness(.98) contrast(1.06) saturate(1.02);
    }
    .hero::after {
        background: linear-gradient(90deg,
            rgba(247,250,252,.98) 0%,
            rgba(247,250,252,.93) 58%,
            rgba(247,250,252,.76) 100%);
    }
    .hero-grid { grid-template-columns: minmax(0,1fr); gap: 18px; }
    .hero-copy { max-width: 100%; }
    .hero h2 {
        max-width: 100%;
        font-size: clamp(39px, 9vw, 58px);
        line-height: 1.08;
        letter-spacing: -.045em;
    }
    .hero h3 { margin-bottom: 16px; font-size: clamp(17px,4.4vw,22px); }
    .hero-lede { margin: 20px 0 24px; font-size: 14px; line-height: 1.85; }
    .hero-assurance { margin-top: 24px; }
    .hero-bottom { flex-wrap: wrap; margin-top: 24px; }
}
@media (prefers-reduced-motion: reduce) {
    .hero::before { transform: none; }
}
'''
    # Idempotent: don't add the cleanup footer again if run more than once.
    marker = "PHYSIOFIX PREMIUM FINISH"
    if marker not in text:
        text = text.rstrip() + "\n" + polish

    backup = css_path.with_suffix(css_path.suffix + ".before-premium-fix.bak")
    if not backup.exists():
        shutil.copy2(css_path, backup)
    css_path.write_text(text, encoding="utf-8")

    hero_headers = len(re.findall(r"PHYSIOFIX HERO BACKGROUND", text, flags=re.I))
    bg_refs = len(re.findall(r"Header-background\.jpg", text, flags=re.I))
    print(f"Updated: {css_path}")
    print(f"Backup:  {backup}")
    print(f"Removed duplicated hero CSS sections. Remaining old hero section headers: {hero_headers}.")
    print(f"The single active background source is /images/Header-background.jpg (CSS mentions: {bg_refs}, including responsive rules).")
    print("Next: run npm run dev, then hard-refresh with Ctrl+Shift+R.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
