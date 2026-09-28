# Historical URL map

All six former article routes now have published destinations. This repository configures permanent redirects for requests that arrive on the new blog host; they take effect when that site is deployed. The old personal-site host owns the cross-domain redirects; this repository cannot configure them. Production deployment, DNS, and cross-domain redirect activation are outside TSB-02.

| Historical route                                    | Published destination                               | Redirect owner                                                       |
| --------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------- |
| `/post/2014/the-invisible-helper/`                  | `/writing/from-code-completion-to-architecture/`    | Same-host rule in this repo; cross-domain rule in personal-site repo |
| `/post/2014/the-turtle-story/`                      | `/writing/building-an-ai-visual-story/`             | Same-host rule in this repo; cross-domain rule in personal-site repo |
| `/post/2014/the-storytelling-marketing/`            | `/writing/storytelling-and-product-placement/`      | Same-host rule in this repo; cross-domain rule in personal-site repo |
| `/post/2014/gaming-studio-lifecycle/`               | `/writing/growth-culture-and-reinvention-in-games/` | Same-host rule in this repo; cross-domain rule in personal-site repo |
| `/post/2014/evolutionary-mismatches-in-modern-day/` | `/writing/fast-judgments-and-modern-decisions/`     | Same-host rule in this repo; cross-domain rule in personal-site repo |
| `/post/2014/the-observer-effect/`                   | `/writing/what-physics-means-by-observation/`       | Same-host rule in this repo; cross-domain rule in personal-site repo |
| `/blog/ai/`                                         | No direct equivalent                                | Retired; no route-level migration                                    |
| `/blog/storytelling/`                               | No direct equivalent                                | Retired; no route-level migration                                    |
| `/blog/programming/`                                | No direct equivalent                                | Retired; no route-level migration                                    |

The map records destinations and ownership; it does not claim that redirects are live. The legacy `astro-blog-2024` repository remains read-only and unarchived. No legacy images, generated illustrations, music, voices, or audio are reused.
