import React, { useEffect, useRef, useState } from 'react';

export const GTranslate = ({ className = 'button', style = {} }) => {
    const [isPt, setIsPt] = useState(false);
    // State for visual feedback (disabled + opacity on the button)
    const [isTranslating, setIsTranslating] = useState(false);
    // Ref-based sync guard: blocks clicks immediately, before React's re-render
    // commits the `disabled` prop — preventing double-dispatch in the same frame.
    const isTranslatingRef = useRef(false);
    // The language we are aiming for ('pt' | 'en' | null).
    // Observer only releases the lock when lang matches this exactly.
    const targetLangRef = useRef(null);
    // Safety release ref: clears itself in releaseTranslating
    const safetyTimerRef = useRef(null);

    const releaseTranslating = () => {
        isTranslatingRef.current = false;
        targetLangRef.current = null;
        setIsTranslating(false);
        if (safetyTimerRef.current) {
            clearTimeout(safetyTimerRef.current);
            safetyTimerRef.current = null;
        }
    };

    const checkIsPt = () => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo && combo.value) {
            return combo.value === 'pt';
        }
        // Fallback: read the lang attribute Google sets on <html>
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

        // One-time init sync: wait for the widget to inject its DOM
        setTimeout(() => setIsPt(checkIsPt()), 500);

        // Watch only `lang` on <html>.
        //
        // Why not `translated-ltr` class?
        // Google removes `translated-ltr` as the FIRST step of EN restoration
        // (before restoring text nodes), which caused premature lock release and
        // the partial-translation / comma-disappearing bug.
        //
        // `html.lang` is set only when the operation is complete:
        //   EN→PT done: lang === 'pt'
        //   PT→EN done: lang === 'en'
        //
        // We intentionally ignore lang === '' (intermediate state during restoration)
        // and only react when lang matches our exact target.
        // The 5 s safety timer is the last-resort release if Google never sets 'en'
        // (rare: e.g. very old Google Translate behaviour that leaves lang empty).
        const observer = new MutationObserver(() => {
            const target = targetLangRef.current;
            if (!target) return; // no operation in flight

            const lang = document.documentElement.lang;

            if (target === 'pt' && lang === 'pt') {
                setIsPt(true);
                releaseTranslating();
            } else if (target === 'en' && lang === 'en') {
                // Only 'en' — NOT '' — to avoid releasing during the intermediate
                // empty-string phase of English restoration.
                setIsPt(false);
                releaseTranslating();
            }
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang'],
        });

        return () => observer.disconnect();
    }, []);

    const handleToggle = () => {
        // Sync guard: isTranslatingRef takes effect immediately (before React
        // re-renders the disabled prop), blocking any click in the same frame.
        if (isTranslatingRef.current) return;

        const combo = document.querySelector('.goog-te-combo');
        if (!combo) return;

        const targetIsPt = !checkIsPt();
        const targetLang  = targetIsPt ? 'pt' : 'en';

        // Lock synchronously via ref, then via state for visual feedback
        isTranslatingRef.current = true;
        targetLangRef.current = targetLang;
        setIsTranslating(true);

        // Safety: release lock after 5s if observer never fires
        safetyTimerRef.current = setTimeout(releaseTranslating, 5000);

        combo.value = targetLang;

        // Native browser change events on <select> always bubble.
        // Google Translate uses event delegation (listener above the combo),
        // so { bubbles: true } is required — otherwise it never receives the event.
        combo.dispatchEvent(new Event('change', { bubbles: true }));

        // Immediate visual feedback — observer confirms once Google sets html[lang]
        setIsPt(targetIsPt);
    };

    // Define colors so text is always readable over the white switch thumb
    const activeColor = '#124559'; // Dark color for text sitting on the white thumb
    const inactiveColor = className === 'button' ? '#fff' : 'inherit'; // Light color for text sitting on the background

    const textColor1 = isPt ? inactiveColor : activeColor; // "EN" is active when isPt is false
    const textColor2 = isPt ? activeColor : inactiveColor; // "PT" is active when isPt is true

    return (
        <div style={{ display: 'flex', alignItems: 'center', ...style }}>
            <button 
                onClick={handleToggle} 
                disabled={isTranslating}
                className={className}
                aria-label="Toggle language"
                style={{
                    position: 'relative',
                    boxSizing: 'border-box',
                    width: '74px',
                    height: '34px',
                    minHeight: '34px',
                    padding: '0',
                    margin: '0',
                    border: 'none',
                    cursor: isTranslating ? 'wait' : 'pointer',
                    display: 'block',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    opacity: isTranslating ? 0.7 : 1,
                    transition: 'opacity 0.2s',
                    color: className === 'button' ? '#124559' : 'currentColor'
                }}
            >
                {/* White Thumb */}
                <div style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#fff',
                    transform: isPt ? 'translateX(40px)' : 'translateX(0)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 1
                }} />
                
                {/* EN Container */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '4px',
                    width: '26px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 2
                }}>
                    <span className="notranslate" style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold',
                        lineHeight: '1',
                        color: textColor1,
                        transition: 'color 0.3s' 
                    }}>EN</span>
                </div>
                
                {/* PT Container */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '44px',
                    width: '26px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 2
                }}>
                    <span className="notranslate" style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold',
                        lineHeight: '1',
                        color: textColor2,
                        transition: 'color 0.3s' 
                    }}>PT</span>
                </div>
            </button>
        </div>
    );
};
