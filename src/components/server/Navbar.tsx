import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./constants";

export function Navbar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (id: string) => {
    onNav(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080808]/95 backdrop-blur-md border-b border-purple-900/30" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => handleNav("home")} className="flex items-center gap-3 group">
          <img
            src="https://cdn.poehali.dev/projects/52949190-26fd-4571-99bd-793324fdf696/bucket/43a6a535-7ae3-442e-aefb-948ec375ed45.jpg"
            alt="Dragon CRMP"
            className="w-9 h-9 rounded-sm object-cover glow-red"
          />
          <div className="text-left">
            <div className="font-['Oswald'] text-base font-bold text-white leading-none tracking-widest uppercase group-hover:text-purple-400 transition-colors">
              Dragon CRMP
            </div>
            <div className="text-[10px] text-gray-500 tracking-widest uppercase leading-none mt-0.5">Mobile RP Server</div>
          </div>
        </button>

        <div className="hidden md:flex items-center">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-4 py-2 text-sm font-['Oswald'] tracking-wider uppercase transition-all duration-200 relative
                ${active === item.id ? "text-purple-400" : "text-gray-500 hover:text-gray-200"}`}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-purple-600" />
              )}
            </button>
          ))}
        </div>

        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#080808]/98 border-t border-purple-900/20 px-4 pb-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="block w-full text-left px-4 py-3 font-['Oswald'] tracking-wider uppercase text-gray-400 hover:text-purple-400 transition-colors border-b border-white/5 last:border-0"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-purple-900/20 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-purple-800 flex items-center justify-center">
            <span className="font-['Oswald'] text-white font-bold text-xs">BR</span>
          </div>
          <span className="font-['Oswald'] text-gray-500 tracking-widest uppercase text-sm">Dragon CRMP</span>
        </div>
        <p className="font-['Golos_Text'] text-gray-700 text-xs">© 2019–2026 Dragon CRMP. Все права защищены.</p>
        <div className="flex flex-wrap justify-center gap-5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="font-['Golos_Text'] text-gray-600 hover:text-purple-500 text-xs uppercase tracking-widest transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}