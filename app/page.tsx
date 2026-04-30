import Link from "next/link";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      {/* Cursor */}
      <div className="cursor-ring" id="cursorRing" aria-hidden="true"></div>
      <div className="cursor-dot" id="cursorDot" aria-hidden="true"></div>

      {/* Navigation */}
      <nav className="navbar" role="navigation" aria-label="Menu Principal">
        <div className="container nav-container">
          <Link href="/" className="logo">
            <img src="/logo.png" alt="LuarSystem Logo" />
          </Link>
          <ul className="nav-links" id="navLinks">
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#equipe">Equipe</a></li>
            <li><a href="#contato">Contato</a></li>
            <li>
              <Link href="/admin" className="nav-cta">
                Admin
              </Link>
            </li>
          </ul>
          <button className="hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className="menu-backdrop" id="menuBackdrop" aria-hidden="true"></div>

      {/* Hero Section */}
      <section className="hero" aria-label="Seção Principal">
        <canvas id="heroCanvas" aria-hidden="true"></canvas>
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="grid-overlay" aria-hidden="true"></div>
        <div className="floating-shapes" aria-hidden="true">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse"></span>
            Desenvolvimento digital sob medida
          </div>
          <h1 className="hero-title">
            <span className="line">Construímos</span>
            <span className="line"><span className="gradient">Soluções</span></span>
            <span className="line">Digitais</span>
          </h1>
          <p className="hero-description">
            Da estratégia à entrega: criamos sites, sistemas e automações
            com IA que colocam sua marca à frente da concorrência.
          </p>
          <div className="hero-cta">
            <a href="#contato" className="btn"><span>Iniciar Projeto</span></a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" id="servicos" aria-labelledby="servicos-title">
        <div className="container">
          <div className="section-header">
            <span className="section-label">O QUE FAZEMOS</span>
            <h2 className="section-title" id="servicos-title">
              Soluções que transformam negócios
            </h2>
          </div>
          <div className="services-grid">
            <article className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>Sites Premium</h3>
              <p>Websites de alta performance, design único e arquitetura focada em conversão.</p>
              <a href="https://wa.me/5511925703863?text=Quero%20um%20site%20sobre%20medida" className="btn" target="_blank" rel="noopener">
                <span>Quero um site</span>
              </a>
            </article>
            <article className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3>Sistemas Web</h3>
              <p>Plataformas robustas e escaláveis para gestão e automação de operações.</p>
              <a href="https://wa.me/5511925056089?text=Quero%20um%20sistema%20Web" className="btn" target="_blank" rel="noopener">
                <span>Quero um sistema</span>
              </a>
            </article>
            <article className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h3>E-commerce</h3>
              <p>Lojas virtuais completas com infraestrutura de vendas e gestão integrada.</p>
              <a href="https://wa.me/5511925703863?text=Quero%20uma%20loja%20virtual" className="btn" target="_blank" rel="noopener">
                <span>Quero uma loja</span>
              </a>
            </article>
            <article className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                  <path d="M12 2a10 10 0 0 1 10 10h-10V2z" opacity="0.5"></path>
                </svg>
              </div>
              <h3>IA & Automação</h3>
              <p>Bots inteligentes e processos automatizados com inteligência artificial.</p>
              <a href="https://wa.me/5511925056089?text=Quero%20automatizar%20um%20processo" className="btn" target="_blank" rel="noopener">
                <span>Quero automatizar</span>
              </a>
            </article>
            <article className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h3>Dashboards & BI</h3>
              <p>Visualização de dados em tempo real e métricas estratégicas.</p>
              <a href="https://wa.me/5511925703863?text=Quero%20uma%20analise%20de%20dados/BI" className="btn" target="_blank" rel="noopener">
                <span>Quero análise</span>
              </a>
            </article>
            <article className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3>Landing Pages</h3>
              <p>Páginas otimizadas para conversão e engajamento do público-alvo.</p>
              <a href="https://wa.me/5511925056089?text=Quero%20uma%20landing%20page" className="btn" target="_blank" rel="noopener">
                <span>Quero uma LP</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-wrapper">
          <div className="marquee-item"><span className="dot"></span>Sites Premium</div>
          <div className="marquee-item"><span className="dot"></span>Sistemas Web</div>
          <div className="marquee-item"><span className="dot"></span>E-commerce</div>
          <div className="marquee-item"><span className="dot"></span>IA & Automação</div>
          <div className="marquee-item"><span className="dot"></span>Dashboards</div>
          <div className="marquee-item"><span className="dot"></span>Landing Pages</div>
          <div className="marquee-item"><span className="dot"></span>Sites Premium</div>
          <div className="marquee-item"><span className="dot"></span>Sistemas Web</div>
          <div className="marquee-item"><span className="dot"></span>E-commerce</div>
          <div className="marquee-item"><span className="dot"></span>IA & Automação</div>
          <div className="marquee-item"><span className="dot"></span>Dashboards</div>
          <div className="marquee-item"><span className="dot"></span>Landing Pages</div>
        </div>
      </div>

      {/* Projects Section */}
      <section className="section" id="portfolio" aria-labelledby="projects-title">
        <div className="container">
          <div className="section-header">
            <span className="section-label">PORTFÓLIO</span>
            <h2 className="section-title" id="projects-title">
              Nossos Projetos
            </h2>
          </div>
          <div className="projects-grid">
            <a href="https://blasterchef.vercel.app" target="_blank" rel="noopener" className="project-card">
              <img src="/projeto1.jpg" alt="Blasterchef" />
              <div className="project-info">
                <span className="project-tag">Website</span>
                <h3>Blasterchef</h3>
                <p>Site de receitas moderno e interativo</p>
              </div>
            </a>
            <a href="https://guileless-eclair-991a18.netlify.app" target="_blank" rel="noopener" className="project-card">
              <img src="/projeto2.jpg" alt="Marrakech Tabacaria" />
              <div className="project-info">
                <span className="project-tag">E-commerce</span>
                <h3>Marrakech Tabacaria</h3>
                <p>Loja virtual completa</p>
              </div>
            </a>
            <a href="#" className="project-card">
              <img src="/projeto3.jpg" alt="Ótica Vip" />
              <div className="project-info">
                <span className="project-tag">Website</span>
                <h3>Ótica Vip</h3>
                <p>Site institucional moderno</p>
              </div>
            </a>
            <a href="https://rp-rust.vercel.app/" target="_blank" rel="noopener" className="project-card">
              <img src="/projeto4.jpg" alt="Projeto Academia" />
              <div className="project-info">
                <span className="project-tag">Sistema</span>
                <h3>Projeto Academia</h3>
                <p>Sistema de gestão fitness</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="section" id="equipe" aria-labelledby="developers-title">
        <div className="container">
          <div className="section-header">
            <span className="section-label">EQUIPE</span>
            <h2 className="section-title" id="developers-title">
              Nossos Desenvolvedores
            </h2>
          </div>
          <div className="developers-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", maxWidth: "600px", margin: "0 auto" }}>
            <div className="developer-card">
              <div className="developer-avatar">
                <img src="/raul.png" alt="Raul" />
              </div>
              <h4>Raul</h4>
              <p className="role">Desenvolvedor Full Stack</p>
              <div className="developer-social">
                <a href="https://wa.me/5511925056089" target="_blank" rel="noopener" aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="developer-card">
              <div className="developer-avatar">
                <img src="/lucas.png" alt="Lucas" />
              </div>
              <h4>Lucas</h4>
              <p className="role">Desenvolvedor Full Stack</p>
              <div className="developer-social">
                <a href="https://wa.me/5511925703863" target="_blank" rel="noopener" aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contato" aria-labelledby="contato-title">
        <div className="container">
          <div className="cta-content" style={{ opacity: 1 }}>
            <h2 className="cta-title" id="contato-title">
              Pronto para transformar seu negócio?
            </h2>
            <p className="cta-description">
              Vamos conversar sobre como a tecnologia pode acelerar seus resultados
            </p>
            <div className="cta-buttons">
              <a href="https://wa.me/5511925703863?text=Quero%20conversar%20sobre%20um%20projeto" className="btn" target="_blank" rel="noopener">
                <span>Falar com Especialista</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="logo">
                <img src="/logo.png" alt="LuarSystem" style={{ height: "40px" }} />
                <span className="logo-text">LuarSystem</span>
              </Link>
              <p>Desenvolvimento digital de alto impacto para empresas que querem liderar seus mercados.</p>
            </div>
            <div className="footer-column">
              <h4>Serviços</h4>
              <ul>
                <li><a href="#servicos">Sites Premium</a></li>
                <li><a href="#servicos">Sistemas Web</a></li>
                <li><a href="#servicos">E-commerce</a></li>
                <li><a href="#servicos">IA & Automação</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#equipe">Equipe</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contato</h4>
              <ul>
                <li><a href="mailto:contato@luarsystem.com">contato@luarsystem.com</a></li>
                <li><a href="https://wa.me/5511925703863">Lucas: +55 11 92570-3863</a></li>
                <li><a href="https://wa.me/5511925056089">Raul: +55 11 92505-6089</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 LuarSystem. Todos os direitos reservados.</p>
            <div className="footer-social">
              <a href="https://wa.me/5511925703863" target="_blank" rel="noopener" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js" strategy="beforeInteractive" />
      <Script src="/js/script.js" strategy="afterInteractive" />
    </>
  );
}
