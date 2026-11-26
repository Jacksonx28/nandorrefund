# NANDorRefund: circuit interface

## Direction

Graphite, brushed metal, warm copper light. A bespoke isometric processor makes the circuit tangible; large Manrope typography and compact IBM Plex Mono labels separate explanation from evidence. Motion is limited to a slow processor float and control feedback, with reduced-motion support.

Reference research covered the public galleries at [21st](https://21st.dev/), [Godly](https://godly.design/), [Lapa Ninja](https://www.lapa.ninja/), [Mobbin](https://mobbin.com/), and [Refero](https://refero.design/search). The visual cues used are dimensional controls, layered dark surfaces, editorial spacing, and clear product states. Refero's full catalog requires an account. No paid assets, copied component source, or third-party illustration assets are included. The processor SVG is original.

## Product boundaries

The live bench is the existing two-input NAND proof circuit #50 on X Layer. The homepage settlement selector is explicitly illustrative; it does not execute escrow. Production escrow, the five-input referee, and TapeRelay delivery remain in development. Original transaction links, contract addresses, proof records, and legacy tools remain accessible.

## Implementation

Static HTML, CSS, and JavaScript; no framework migration or build step. Serve this folder with `python3 -m http.server 8765 --bind 127.0.0.1`. The main pages are index.html, bench.html, how.html, and proof.html. Archived v1/v2 and spike pages retain their existing implementation.

The bench uses the existing pinned ethers CDN dependency and X Layer RPC. Reads have a 15-second timeout, disable conflicting input changes while pending, and reset stale results when inputs change. An unavailable RPC is reported as an error, never replaced with a simulated live answer.

## Verification

- Browser checked all four main pages at widths 320, 768, and 1440: no horizontal overflow; all images loaded.
- Visual inspection of desktop homepage and how-it-works, mobile homepage and live bench.
- Settlement preview checked for release, split, and refund.
- Mobile menu opening, Escape dismissal, and focus return checked.
- Live RPC verified: inputs 1,1 returned 0; inputs 0,0 returned 1.
- JavaScript syntax and local resource/link checks pass.

## Motion and color modes

The header now includes a light/dark control on all four main pages. Initial mode follows the OS preference; explicit selections persist across reloads and page navigation, synchronize across tabs, and remain usable when browser storage is unavailable. Light mode uses porcelain surfaces, graphite typography, and copper accents.

The original SVG contains five animated signal traces and a breathing processor edge. Buttons have press feedback and a hover sheen; settlement changes animate into place. Same-origin page links use native cross-document view transitions where supported, with normal navigation as fallback. Reduced-motion settings disable these effects.

Follow-up verification: checked all four pages in light mode at 320px; confirmed the theme survives navigation and reload, exercised the outcome selector, inspected desktop light/dark pages, and observed changing SVG stroke offsets. Fixed the narrow bench layout to wrap controls when necessary.
