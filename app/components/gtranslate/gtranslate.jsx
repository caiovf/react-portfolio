import React, { useEffect, useRef, useState } from 'react';

export const GTranslate = ({ className = 'button', style = {} }) => {
    const [isPt, setIsPt] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);

    const isTranslatingRef = useRef(false);
    const targetLangRef    = useRef(null);

    const releaseTranslating = () => {
        if (!isTranslatingRef.current) return;
        isTranslatingRef.current = false;
        targetLangRef.current   = null;
        setIsTranslating(false);
    };

    const checkIsPt = () => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo && combo.value) {
            return combo.value === 'pt';
        }
        return document.documentElement.lang === 'pt';
    };

    useEffect(() => {
        if (!document.querySelector('#google-translate-script')) {
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
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', includedLanguages: 'en,pt', autoDisplay: false },
                    'google_translate_element_global'
                );
            };
        }

        let comboWatcher = null;

        const onComboReady = () => {
            const isPtNow = checkIsPt();
            setIsPt(isPtNow);
            setIsReady(true);
        };

        if (document.querySelector('.goog-te-combo')) {
            onComboReady();
        } else {
            const container =
                document.getElementById('google_translate_element_global') ||
                document.body;

            comboWatcher = new MutationObserver((_, obs) => {
                if (document.querySelector('.goog-te-combo')) {
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
                        if (isLogUrl && targetLangRef.current === 'pt') {
                            queueMicrotask(() => {
                                const htmlEl  = document.documentElement;
                                const lang    = htmlEl.lang;

                                if (lang === 'pt') {
                                    setIsPt(true);
                                    releaseTranslating();
                                } else {
                                    // Slow "auto" cycle detected. Google finished a reset but did 
                                    // not translate yet. Re-dispatch the 'pt' translation.
                                    const combo = document.querySelector('.goog-te-combo');
                                    if (combo) {
                                        combo.value = 'pt';
                                        combo.dispatchEvent(new Event('change', { bubbles: true }));
                                    } else {
                                        setIsPt(true);
                                        releaseTranslating();
                                    }
                                }
                            });
                            break;
                        }
                    }
                });
                perfObserver.observe({ type: 'resource', buffered: false });
            } catch (e) {
                // Ignore
            }
        }

        // ── Signal B: MutationObserver on html[lang] ──────────────────────────
        const mainObserver = new MutationObserver(() => {
            const target = targetLangRef.current;
            const html   = document.documentElement;
            const lang   = html.lang;

            if (!target) return;

            if (target === 'pt' && lang === 'pt') {
                setIsPt(true);
                releaseTranslating();
            } else if (target === 'en' && lang !== 'pt') {
                document.documentElement.classList.remove('translated-ltr');
                const resetCombo = document.querySelector('.goog-te-combo');
                if (resetCombo) {
                    resetCombo.value = '';
                }
                setIsPt(false);
                releaseTranslating();
            }
        });

        mainObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang', 'class'],
        });

        return () => {
            mainObserver.disconnect();
            if (perfObserver) perfObserver.disconnect();
            if (comboWatcher) comboWatcher.disconnect();
        };
    }, []);

    const handleToggle = () => {
        if (isTranslatingRef.current) return;

        const combo = document.querySelector('.goog-te-combo');
        if (!combo) return;

        const targetIsPt = !checkIsPt();
        const targetLang  = targetIsPt ? 'pt' : 'en';

        isTranslatingRef.current = true;
        targetLangRef.current    = targetLang;
        setIsTranslating(true);

        combo.value = targetLang;
        combo.dispatchEvent(new Event('change', { bubbles: true }));

        setIsPt(targetIsPt);
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
