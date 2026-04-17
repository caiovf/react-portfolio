import React, { useEffect, useRef, useState } from 'react';

const LOG = (...args) => console.log('[GTranslate]', ...args);

export const GTranslate = ({ className = 'button', style = {} }) => {
    const [isPt, setIsPt] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);

    const isTranslatingRef = useRef(false);
    const targetLangRef    = useRef(null);

    const releaseTranslating = (source = 'unknown') => {
        if (!isTranslatingRef.current) {
            LOG(`releaseTranslating called from [${source}] but lock was already released — no-op`);
            return;
        }
        LOG(`✅ Lock released by [${source}] | targetLang was: ${targetLangRef.current}`);
        isTranslatingRef.current = false;
        targetLangRef.current   = null;
        setIsTranslating(false);
    };

    const checkIsPt = () => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo && combo.value) {
            LOG(`checkIsPt → combo.value = "${combo.value}"`);
            return combo.value === 'pt';
        }
        LOG(`checkIsPt → combo not found or empty, using html.lang = "${document.documentElement.lang}"`);
        return document.documentElement.lang === 'pt';
    };

    useEffect(() => {
        LOG('useEffect mounted');

        if (!document.querySelector('#google-translate-script')) {
            LOG('Injecting Google Translate script...');
            const globalDiv = document.createElement('div');
            globalDiv.id = 'google_translate_element_global';
            globalDiv.style.display = 'none';
            document.body.appendChild(globalDiv);

            const addScript = document.createElement('script');
            addScript.id = 'google-translate-script';
            addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            addScript.async = true;
            document.body.appendChild(addScript);

            const styleBlock = document.createElement('style');
            styleBlock.innerHTML = `
                iframe.skiptranslate { display: none !important; }
                .VIpgJd-ZVi9od-lYIUee-oKtt4b,
                .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
                .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc { display: none !important; }
                body { top: 0 !important; position: static !important; margin-top: 0 !important; }
                html { position: static !important; top: 0 !important; }
                #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
                .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
            `;
            document.head.appendChild(styleBlock);

            window.googleTranslateElementInit = () => {
                LOG('googleTranslateElementInit called — widget initializing');
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', includedLanguages: 'en,pt', autoDisplay: false },
                    'google_translate_element_global'
                );
            };
        } else {
            LOG('Script already injected — skipping');
        }

        // ── isReady ───────────────────────────────────────────────────────────
        let comboWatcher = null;

        const onComboReady = () => {
            const isPtNow = checkIsPt();
            LOG(`Combo ready! isPt = ${isPtNow}`);
            setIsPt(isPtNow);
            setIsReady(true);
        };

        if (document.querySelector('.goog-te-combo')) {
            LOG('Combo already in DOM (SPA back-nav)');
            onComboReady();
        } else {
            LOG('Combo not found yet — setting up comboWatcher MutationObserver');
            const container =
                document.getElementById('google_translate_element_global') ||
                document.body;

            comboWatcher = new MutationObserver((_, obs) => {
                if (document.querySelector('.goog-te-combo')) {
                    LOG('comboWatcher: combo appeared in DOM');
                    obs.disconnect();
                    comboWatcher = null;
                    onComboReady();
                }
            });
            comboWatcher.observe(container, { childList: true, subtree: true });
        }

        // ── Signal A: PerformanceObserver (EN→PT) ─────────────────────────────
        let perfObserver = null;
        if (window.PerformanceObserver) {
            try {
                perfObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        const isLogUrl = entry.name.includes('translate.googleapis.com/element/log');
                        const isTranslateUrl = entry.name.includes('translate');
                        if (isTranslateUrl) {
                            LOG(`PerformanceObserver resource: ${entry.name} | target=${targetLangRef.current}`);
                        }
                        if (isLogUrl && targetLangRef.current === 'pt') {
                            LOG('PerformanceObserver: element/log detected — checking if page was actually translated');
                            queueMicrotask(() => {
                                const htmlEl  = document.documentElement;
                                const lang    = htmlEl.lang;
                                const hasTr   = htmlEl.classList.contains('translated-ltr');
                                LOG(`queueMicrotask fired | html.lang="${lang}" | translated-ltr=${hasTr}`);

                                if (lang === 'pt') {
                                    // Fast path: Google set lang='pt' normally
                                    LOG('  → lang=pt confirmed, releasing normally');
                                    setIsPt(true);
                                    releaseTranslating('PerformanceObserver/element/log');
                                } else {
                                    // Slow "auto" cycle: element/log fired but the page was NOT
                                    // translated (lang is "auto" or "en", no translated-ltr).
                                    // Google just finished its internal state-reset cycle.
                                    // Re-dispatch the 'pt' translation — after the reset, Google
                                    // translates in ~5ms (confirmed by click-4 behaviour in logs).
                                    LOG(`  → slow cycle detected (lang="${lang}"), re-dispatching PT after reset`);
                                    const combo = document.querySelector('.goog-te-combo');
                                    if (combo) {
                                        combo.value = 'pt';
                                        combo.dispatchEvent(new Event('change', { bubbles: true }));
                                        LOG('  → re-dispatched | lock held, MutationObserver will release on lang=pt');
                                        // Lock stays held. The MutationObserver (lang==='pt') will
                                        // call setIsPt(true) + releaseTranslating when Google finishes.
                                    } else {
                                        LOG('  → combo not found after slow cycle, releasing as-is');
                                        setIsPt(true);
                                        releaseTranslating('PerformanceObserver/element/log (no combo)');
                                    }
                                }
                            });
                            break;
                        }
                    }
                });
                perfObserver.observe({ type: 'resource', buffered: false });
                LOG('PerformanceObserver registered for resource entries');
            } catch (e) {
                LOG('PerformanceObserver not supported:', e.message);
            }
        } else {
            LOG('window.PerformanceObserver not available');
        }

        // ── Signal B: MutationObserver on html[lang] ──────────────────────────
        //
        // CONFIRMED from debug logs:
        //   EN→PT: Google sets lang='pt' (translated-ltr also added, same tick)
        //   PT→EN: Google sets lang='en' BUT does NOT remove translated-ltr!
        //
        // Therefore:
        //   EN→PT done → lang === 'pt'  (translated-ltr check is redundant)
        //   PT→EN done → lang !== 'pt'  (CANNOT require !hasTranslatedLtr)
        //
        // targetLangRef scopes each branch so they never cross-fire:
        //   during EN→PT processing target='pt' → EN branch never runs
        //   during PT→EN processing target='en' → PT branch never runs
        const mainObserver = new MutationObserver(() => {
            const target = targetLangRef.current;
            const html   = document.documentElement;
            const lang   = html.lang;
            const hasTranslatedLtr = html.classList.contains('translated-ltr');

            LOG(`MutationObserver fired | target="${target}" | lang="${lang}" | translated-ltr=${hasTranslatedLtr}`);

            if (!target) {
                LOG('  → no target in flight, ignoring');
                return;
            }

            if (target === 'pt' && lang === 'pt') {
                LOG('  → EN→PT lang=pt condition MET → releasing');
                setIsPt(true);
                releaseTranslating('MutationObserver/EN→PT');
            } else if (target === 'en' && lang !== 'pt') {
                // lang !== 'pt' covers 'en' (explicit) and '' (no lang attr in HTML).
                //
                // Google does NOT remove translated-ltr after restoration — we remove it.
                LOG('  → PT→EN lang!=pt condition MET → cleaning Google state → releasing');
                // Remove translated-ltr — Google keeps it after restoration, which would
                // confuse Google on the next EN→PT if left in place.
                document.documentElement.classList.remove('translated-ltr');
                // Reset combo to '' (initial state). This prevents Google's slow
                // auto-detect cycle on the very next EN→PT dispatch. Do NOT touch
                // html.lang here — any explicit lang= assignment fires the MutationObserver
                // asynchronously and could race with an in-progress click-3 operation.
                const resetCombo = document.querySelector('.goog-te-combo');
                if (resetCombo) {
                    LOG(`  → resetting combo.value from "${resetCombo.value}" to ""`);
                    resetCombo.value = '';
                }
                setIsPt(false);
                releaseTranslating('MutationObserver/PT→EN');


            } else {
                LOG(`  → condition not yet met, waiting`);
            }
        });


        mainObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang', 'class'],
        });
        LOG('mainObserver registered on html[lang, class]');

        return () => {
            LOG('useEffect cleanup — disconnecting observers');
            mainObserver.disconnect();
            if (perfObserver) perfObserver.disconnect();
            if (comboWatcher) comboWatcher.disconnect();
        };
    }, []);

    const handleToggle = () => {
        LOG(`handleToggle | isTranslatingRef=${isTranslatingRef.current} | isReady=${isReady}`);
        if (isTranslatingRef.current) {
            LOG('  → BLOCKED (already translating)');
            return;
        }

        const combo = document.querySelector('.goog-te-combo');
        if (!combo) {
            LOG('  → BLOCKED (combo not found)');
            return;
        }

        const targetIsPt = !checkIsPt();
        const targetLang  = targetIsPt ? 'pt' : 'en';

        LOG(`  → dispatching | combo.value="${combo.value}" → "${targetLang}"`);

        isTranslatingRef.current = true;
        targetLangRef.current    = targetLang;
        setIsTranslating(true);

        combo.value = targetLang;
        combo.dispatchEvent(new Event('change', { bubbles: true }));

        setIsPt(targetIsPt);
        LOG(`  → dispatched | lock=true | optimistic isPt=${targetIsPt}`);
    };

    const activeColor   = '#124559';
    const inactiveColor = className === 'button' ? '#fff' : 'inherit';
    const textColor1    = isPt ? inactiveColor : activeColor;
    const textColor2    = isPt ? activeColor  : inactiveColor;
    const isDisabled    = !isReady || isTranslating;

    return (
        <div style={{ display: 'flex', alignItems: 'center', ...style }}>
            <button
                onClick={handleToggle}
                disabled={isDisabled}
                className={className}
                aria-label="Toggle language"
                title={!isReady ? 'Loading translator…' : undefined}
                style={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    width: '74px',
                    height: '34px',
                    minHeight: '34px',
                    padding: '0',
                    margin: '0',
                    border: 'none',
                    cursor: isDisabled ? 'wait' : 'pointer',
                    display: 'block',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    opacity: isDisabled ? 0.6 : 1,
                    transition: 'opacity 0.2s',
                    color: className === 'button' ? '#124559' : 'currentColor',
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '4px', left: '4px',
                    width: '26px', height: '26px',
                    borderRadius: '50%',
                    background: '#fff',
                    transform: isPt ? 'translateX(40px)' : 'translateX(0)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 1,
                }} />

                <div style={{
                    position: 'absolute', top: '0', left: '4px',
                    width: '26px', height: '34px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none', zIndex: 2,
                }}>
                    <span className="notranslate" style={{
                        fontSize: '0.8rem', fontWeight: 'bold', lineHeight: '1',
                        color: textColor1, transition: 'color 0.3s',
                    }}>EN</span>
                </div>

                <div style={{
                    position: 'absolute', top: '0', left: '44px',
                    width: '26px', height: '34px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none', zIndex: 2,
                }}>
                    <span className="notranslate" style={{
                        fontSize: '0.8rem', fontWeight: 'bold', lineHeight: '1',
                        color: textColor2, transition: 'color 0.3s',
                    }}>PT</span>
                </div>
            </button>
        </div>
    );
};
