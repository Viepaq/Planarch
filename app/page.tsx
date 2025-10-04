"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeImage, setActiveImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const scrollToCenter = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
      window.scrollTo({
        top: middle,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const projectsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setProjectsVisible(true);
        }
      });
    }, observerOptions);

    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
        }
      });
    }, observerOptions);

    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setServicesVisible(true);
        }
      });
    }, observerOptions);

    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setContactVisible(true);
        }
      });
    }, observerOptions);

    const projectsSection = document.getElementById("projects");
    const aboutSection = document.getElementById("about");
    const servicesSection = document.getElementById("services");
    const contactSection = document.getElementById("contact");

    if (projectsSection) projectsObserver.observe(projectsSection);
    if (aboutSection) aboutObserver.observe(aboutSection);
    if (servicesSection) servicesObserver.observe(servicesSection);
    if (contactSection) contactObserver.observe(contactSection);

    return () => {
      if (projectsSection) projectsObserver.unobserve(projectsSection);
      if (aboutSection) aboutObserver.unobserve(aboutSection);
      if (servicesSection) servicesObserver.unobserve(servicesSection);
      if (contactSection) contactObserver.unobserve(contactSection);
    };
  }, []);

  const projects = [
    {
      id: 1,
      image: "/images/Reschenhof .jpg",
      title: "Reschenhof",
    },
    {
      id: 2,
      image: "/images/pardatschgrat 2.jpg",
      title: "Pardatschgrat",
    },
    {
      id: 3,
      image: "/images/dreiseenhaus.jpg",
      title: "Dreiseenhaus",
    },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/Reschenhof .jpg"
          alt="Planarch Background"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
            scrolled ? "bg-black/30 backdrop-blur-sm shadow-lg shadow-black/20" : ""
          }`}
        >
          <div className={`w-full px-8 flex justify-between items-center transition-all duration-500 ${
            scrolled ? "py-4" : "py-6"
          }`}>
            <h1 className="text-2xl font-light tracking-[0.3em] text-white">
              PLANARCH
            </h1>
            <div className="flex items-center gap-10">
              <a
                href="#projects"
                onClick={(e) => scrollToCenter(e, "projects")}
                className="text-sm font-light tracking-wider text-white/80 hover:text-white transition-colors duration-200"
              >
                PROJEKTE
              </a>
              <a
                href="#services"
                onClick={(e) => scrollToCenter(e, "services")}
                className="text-sm font-light tracking-wider text-white/80 hover:text-white transition-colors duration-200"
              >
                LEISTUNGEN
              </a>
              <a
                href="#about"
                onClick={(e) => scrollToCenter(e, "about")}
                className="text-sm font-light tracking-wider text-white/80 hover:text-white transition-colors duration-200"
              >
                ÜBER UNS
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToCenter(e, "contact")}
                className="text-sm font-light tracking-wider text-[var(--color-planarch-blue)] hover:text-white transition-colors duration-200"
              >
                KONTAKT
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h2 className="text-6xl md:text-8xl font-extralight tracking-wider mb-8">
              PLANARCH
            </h2>
            <div className="h-px w-64 bg-[var(--color-planarch-blue)] mx-auto mb-6" />
            <a
              href="#projects"
              onClick={(e) => scrollToCenter(e, "projects")}
              className="inline-block text-white/60 hover:text-[var(--color-planarch-blue)] hover:scale-105 transition-all duration-300 font-light tracking-[0.15em] text-sm"
            >
              PROJEKTE ENTDECKEN
            </a>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`py-32 px-6 bg-black/60 backdrop-blur-sm transition-all duration-1000 ${
            projectsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl font-light tracking-wider mb-16 text-center">
              AUSGEWÄHLTE PROJEKTE
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group cursor-pointer transition-all duration-700 ${
                    projectsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setActiveImage(index)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 border border-white/0 group-hover:border-[var(--color-planarch-blue)] transition-colors duration-300" />
                  </div>
                  <h4 className="mt-4 text-lg font-light tracking-wide text-gray-300 group-hover:text-[var(--color-planarch-blue)] transition-colors">
                    {project.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`py-32 px-6 transition-all duration-1000 ${
            aboutVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-4xl font-light tracking-wider mb-8">
              ÜBER UNS
            </h3>
            <div className="h-px w-32 bg-[var(--color-planarch-blue)] mx-auto mb-12" />
            <p className="text-lg font-light text-gray-300 leading-relaxed">
              Planarch steht für exzellente Architektur, die Funktionalität mit
              zeitlosem Design verbindet. Wir schaffen Räume, die inspirieren
              und nachhaltig beeindrucken.
            </p>
            <p className="text-lg font-light text-gray-300 leading-relaxed">
              Mit einem Fokus auf innovative Lösungen und höchste
              Qualitätsstandards realisieren wir Projekte, die Architektur auf
              ein neues Level heben.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className={`py-32 px-6 bg-black/60 backdrop-blur-sm transition-all duration-1000 ${
            servicesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-4xl font-light tracking-wider mb-8">
              LEISTUNGEN
            </h3>
            <div className="h-px w-32 bg-[var(--color-planarch-blue)] mx-auto mb-12" />
            <div className="grid md:grid-cols-2 gap-y-6 gap-x-16 max-w-2xl mx-auto">
              {[
                "Ausführungsplanung",
                "Örtliche Bauaufsicht",
                "Ausschreibung",
                "Entwurf",
                "Einreichung",
                "Studie",
              ].map((service, index) => (
                <div
                  key={service}
                  className={`text-lg font-light text-white transition-all duration-[800ms] ease-out text-center ${
                    servicesVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-16"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <span className="text-[var(--color-planarch-blue)] mr-3">—</span>
                  {service}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`py-32 px-6 border-t border-white/10 transition-all duration-1000 ${
            contactVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8 mt-8">
            <h3 className="text-4xl font-light tracking-wider mb-8">KONTAKT</h3>
            <div className="h-px w-32 bg-[var(--color-planarch-blue)] mx-auto mb-12" />
            <div className="space-y-4 text-gray-300 font-light">
              <p className="text-lg">Karl-Kapferer-Strasse 5</p>
              <p className="text-lg">6020 Innsbruck</p>
              <p className="text-lg mt-6">
                <a href="tel:+436605096336" className="hover:text-white transition-colors">
                  +43 660 5096336
                </a>
              </p>
              <p className="text-lg">
                <a href="mailto:Stephan.neumair@planarch.at" className="hover:text-white transition-colors">
                  Stephan.neumair@planarch.at
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm font-light">
            <p>© 2025 Planarch. Alle Rechte vorbehalten.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}

