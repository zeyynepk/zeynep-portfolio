import './App.css'
import zeynepAvatar from './assets/zeynep-avatar.webp'
import { useState, useEffect } from 'react'
import { projects } from './data/projects.js'
import CharacterGame from './Components/CharacterGame.jsx'
import './Components/CharacterGame.css'

function App() {

  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])


  const [isScrolled, setİsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setİsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <header className={isScrolled ? 'is-scrolled' : ''}> {/* isScrolled true ise header'a "is-scrolled" sınıfını ekler; değilse boş bırakır. */}
        <a href="#top" className='site-logo'>ZK</a>

        <nav>
          <a href="#about">Hakkımda</a>
          <a href="#skills">Yetenekler</a>
          <a href="#projects">Projeler</a>
          <a href="#experience">Deneyim</a>
          <a href="#contact">İletişim</a>
        </nav>

        <div className='theme-switch' data-theme={theme}>
          <button className='theme-toggle' type='button' aria-label='Açık temaya geç' title='Açık temaya geç' onClick={() => setTheme('light')} aria-pressed={theme === 'light'}>☀️</button>
          <button className='theme-toggle' type='button' aria-label='Koyu temaya geç' title='Koyu temaya geç' onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}>🌙</button>
        </div>

      </header>

      <main>
        <section id="home">
          <div className='hero-layout'>
            <div className="hero-content">
              <p className="eyebrow">
                <span className="eyebrow-heart" aria-hidden="true">♡</span>
                Merhaba, ben
                <span className="hero-spark" aria-hidden="true"></span>
              </p>
              <h1>Zeynep Kediz</h1>
              <p className="hero-description">
                Web arayüzleri ve küçük dijital deneyimler geliştiriyorum.
              </p>
              <a href="#projects">Projelerimi Gör</a>
            </div>

            <div className="scene-wrapper">
              <div className='pixel-scene'>
                <img src={zeynepAvatar} alt="Zeynep Kediz" />
              </div>
            </div>

            <span className="hero-doodle doodle-smile" aria-hidden="true"></span>
            <span className="hero-doodle doodle-coffee" aria-hidden="true"></span>
            <span className="hero-doodle doodle-heart-sticker" aria-hidden="true"></span>
            <span className="hero-doodle doodle-dots" aria-hidden="true"></span>
            <span className="hero-doodle doodle-dots-secondary" aria-hidden="true"></span>
            <span className="hero-doodle doodle-arrow" aria-hidden="true"></span>
            <span className="hero-doodle doodle-arrow-secondary" aria-hidden="true"></span>

            <CharacterGame/>

          </div>
        </section>

        <section id="about">
          <h2>Hakkımda</h2>
          <p>
            Bilgisayar Mühendisliği mezunuyum ve kullanıcı odaklı, sade dijital deneyimler geliştirmeye odaklanıyorum. React, JavaScript, HTML ve CSS ile arayüzler oluştururken; C#, SQL ve .NET/ASP.NET Core tarafında da kendimi geliştiriyorum. Junior Full-Stack Developer olarak hem tasarım hem geliştirme tarafını anlayan projeler üretmeyi seviyorum. Makine öğrenmesi üzerine bir proje geliştirdim; gelecekte mobil uygulamalar da geliştirip yayınlayarak farklı platformlarda faydalı ürünler ortaya koymak istiyorum.
          </p>
        </section>

        <section id="skills">
          <h2>Yetenekler</h2>
          <p>Şu anda odaklandığım teknolojiler:</p>

          <div className="skills-grid">
            <article className="skill-card">
              <span className='card-clip' aria-hidden="true">📎</span>
              <h3>Frontend</h3>
              <ul className="skills-tags">
                <li>React</li>
                <li>JavaScript</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>Figma</li>
              </ul>
            </article>

            <article className="skill-card">
              <span className='card-clip' aria-hidden="true">📎</span>
              <h3>Backend</h3>
              <ul className="skills-tags">
                <li>C#</li>
                <li>SQL</li>
                <li>.NET / ASP.NET Core</li>
                <li>Entity Framework</li>
              </ul>
            </article>

            <article className="skill-card">
              <span className='card-clip' aria-hidden="true">📎</span>
              <h3>İlgi Alanları & Programlama</h3>
              <ul className="skills-tags">
                <li>Makine Öğrenmesi</li>
                <li>Mobil Uygulama Geliştirme</li>
                <li>Python</li>
              </ul>
            </article>
          </div>

        </section>

        <section id="projects">
          <h2>Projeler</h2>

          <div className='projects-grid'>

            {projects.map((project) => (
              <article className='project-card' key={project.github}>
                <span className='card-pin' aria-hidden="true">📌</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className='skills-tags'>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <a href={project.github} target="_blank" rel="noreferrer">GitHub'da incele!</a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">Canlı deneyin!</a>
                )}
              </article>

            ))}

          </div>
        </section>

        <section id="experience">
          <h2>Deneyim</h2>
          <div className='experience-list'>
            <article className='experience-item'>
              <div className='experience-date'>Ağustos 2025 – Eylül 2025</div>
              <div className='experience-marker' aria-hidden="true"></div>
              <div className='experience-card'>
                <span className="experience-clip" aria-hidden="true">📎</span>
                <h3>Lobitek Yazılım A.Ş.</h3>
                <p>Yazılım Geliştirme Stajyeri</p>
                <ul className='experience-details'>
                  <li>Kütüphane stok yönetimi odaklı bir proje geliştirdim.</li>
                  <li>Stok takibi ve temel yönetim akışları üzerinde çalıştım.</li>
                </ul>
                <a className='experience-link' href='https://github.com/zeyynepk/LibraryStock' target='_blank' rel='noreferrer'>GitHub'da incele!</a>
              </div>
            </article>

            <article className='experience-item'>
              <div className='experience-date'>Temmuz 2026 – Ağustos 2026</div>
              <div className='experience-marker' aria-hidden="true"></div>
              <div className='experience-card'>
                <span className="experience-clip" aria-hidden="true">📎</span>
                <h3>Taç Teknoloji Geliştirme Sistemleri</h3>
                <p>Yazılım Geliştirme Stajyeri</p>
                <ul className='experience-details'>
                  <li>Stok yönetim paneli projesi geliştirdim.</li>
                  <li>Ürün, stok, satış ve iade süreçlerinin yönetim akışları üzerinde çalıştım.</li>
                </ul>
                <a className='experience-link' href='https://github.com/zeyynepk/StokYonetimPanel' target='_blank' rel='noreferrer'>GitHub'da incele!</a>
              </div>
            </article>
          </div>
        </section>

        <section id="contact">
          <h2>İletişim</h2>

          <div className='contact-grid'>
            <a className='contact-card contact-github' href='https://github.com/zeyynepk' target='_blank' rel='noreferrer'>
              <span className='contact-pin' aria-hidden="true">📍</span>

              <svg className='contact-icon' viewBox='0 0 24 24' aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.54 9.54 0 0 1 12 6.8c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.7-4.58 4.95.36.31.68.9.68 1.81v2.69c0 .26.18.57.69.48A10 10 0 0 0 12 2Z" />
              </svg>

              <span>GitHub</span>
            </a>

            <a className="contact-card contact-linkedin" href="https://www.linkedin.com/in/zeynepkediz/" target="_blank" rel="noreferrer">
              <span className="contact-pin" aria-hidden="true">📍</span>

              <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5.37 3.1A2.37 2.37 0 1 1 .63 3.1a2.37 2.37 0 0 1 4.74 0ZM.9 8.1h4.1V23H.9V8.1ZM7.6 8.1h3.93v2.03h.06c.55-1.04 1.88-2.14 3.88-2.14 4.15 0 4.92 2.73 4.92 6.28V23h-4.1v-7.75c0-1.85-.03-4.23-2.58-4.23-2.58 0-2.97 2.01-2.97 4.09V23H6.65V8.1H7.6Z" />
              </svg>

              <span>LinkedIn</span>
            </a>

            <a className="contact-card contact-email" href="https://mail.google.com/mail/?view=cm&fs=1&to=zeynep.kedizz@gmail.com" target="_blank" rel="noreferrer">
              <span className="contact-pin" aria-hidden="true">📍</span>

              <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.51l9 5.25 9-5.25V7H3Zm18 10V9.83l-8.5 4.96a1 1 0 0 1-1 0L3 9.83V17h18Z" />
              </svg>

              <span>E-posta</span>

            </a>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
