import React, { useEffect, useState } from 'react';

export const GTranslate = ({ className = 'button', style = {} }) => {
    const [isPt, setIsPt] = useState(false);

    const checkIsPt = () => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo && combo.value) {
            return combo.value === 'pt';
        }
        
        // Fallback for when script is just loaded and combo isn't fully initialized
        const html = document.documentElement;
        return html.classList.contains('translated-ltr') && html.lang === 'pt';
    };

    useEffect(() => {
        if (!document.querySelector('#google-translate-script')) {
            // Inject a global invisible container for Google Translate to live in safely across SPA navigations
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
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,pt',
                        autoDisplay: false
                    },
                    'google_translate_element_global'
                );
            };
        }

        // Check on mount
        setTimeout(() => setIsPt(checkIsPt()), 500);

        const observer = new MutationObserver(() => {
             setIsPt(checkIsPt());
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'class'] });

        return () => observer.disconnect();
    }, []);

    const handleToggle = () => {
        const combo = document.querySelector('.goog-te-combo');
        if (!combo) return;

        const isCurrentlyPt = checkIsPt();
        
        combo.value = isCurrentlyPt ? 'en' : 'pt';
        combo.dispatchEvent(new Event('change'));
        
        setIsPt(!isCurrentlyPt);
        
        // Google translation is async, ensure state stays synced after it processes
        setTimeout(() => setIsPt(checkIsPt()), 600);
        setTimeout(() => setIsPt(checkIsPt()), 1500);
    };

    // Define colors so text is always readable over the white switch thumb
    const activeColor = '#124559'; // Dark color for text sitting on the white thumb
    const inactiveColor = className === 'button' ? '#fff' : 'inherit'; // Light color for text sitting on the background

    const textColor1 = isPt ? inactiveColor : activeColor; // "EN" is active when isPt is false
    const textColor2 = isPt ? activeColor : inactiveColor; // "PT" is active when isPt is true

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '12px' }}>
            <button 
                onClick={handleToggle} 
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
                    cursor: 'pointer',
                    display: 'block',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    color: className === 'button' ? '#124559' : 'currentColor',
                    ...style
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
