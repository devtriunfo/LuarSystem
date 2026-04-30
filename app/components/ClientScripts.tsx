'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // Inicializa o site quando os scripts estiverem carregados
    const checkAndInit = () => {
      if (typeof window !== 'undefined' && (window as any).initSite) {
        (window as any).initSite()
      }
    }
    
    // Tenta inicializar após um pequeno delay para garantir que os scripts carregaram
    const timer = setTimeout(checkAndInit, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
        strategy="beforeInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" 
        strategy="beforeInteractive"
      />
      <Script 
        src="https://unpkg.com/lenis@1.0.42/dist/lenis.min.js" 
        strategy="beforeInteractive"
      />
      <Script 
        src="/js/script.js" 
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).initSite) {
            (window as any).initSite()
          }
        }}
      />
    </>
  )
}
