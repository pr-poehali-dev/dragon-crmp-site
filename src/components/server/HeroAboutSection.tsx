import Icon from "@/components/ui/icon";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('https://cdn.poehali.dev/projects/52949190-26fd-4571-99bd-793324fdf696/files/9109039d-f4f3-40e3-bd2e-ee36020d10d2.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#080808]" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(139,47,201,0.06) 0%, transparent 65%)" }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-purple-900/40 to-transparent"
            style={{
              left: `${5 + i * 6}%`,
              height: `${60 + (i % 4) * 10}px`,
              top: `${10 + (i % 6) * 12}%`,
              animation: `float ${2.5 + (i % 3) * 0.5}s ease-in-out ${i * 0.25}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-up-delay-1 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-purple-800/50 rounded-sm text-purple-400/80 text-xs font-['Golos_Text'] tracking-widest uppercase bg-purple-950/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            Мобильный RP сервер · Онлайн 24/7
          </span>
        </div>

        <h1 className="animate-fade-up-delay-2 font-['Oswald'] text-6xl md:text-8xl font-bold leading-none tracking-wider uppercase mb-2">
          <span className="text-white">DRAGON</span>
          <br />
          <span className="shimmer-text glow-text-red">CRMP</span>
        </h1>

        <div className="animate-fade-up-delay-2 red-line max-w-xs mx-auto my-5" />

        <p className="animate-fade-up-delay-3 text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10 font-['Golos_Text'] leading-relaxed">
          Живи по своим правилам. Стань боссом улиц, честным копом или теневым дельцом — выбор за тобой.
        </p>

        <div className="animate-fade-up-delay-4 flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="glow-red px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white font-['Oswald'] text-base tracking-widest uppercase transition-all duration-200 hover:scale-105"
          >
            Начать играть
          </button>

        </div>

        <div className="animate-fade-up-delay-4 inline-flex items-center gap-4 border border-purple-900/30 border-pulse px-6 py-3 bg-black/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-['Golos_Text'] text-gray-500 text-xs uppercase tracking-widest">Статус</span>
            <span className="font-['Oswald'] text-green-400 text-sm tracking-wide">ONLINE</span>
          </div>
          <div className="w-px h-5 bg-purple-900/40" />
          <div className="flex items-center gap-2">
            <Icon name="Users" size={13} className="text-purple-600" />
            <span className="font-['Oswald'] text-gray-300 text-sm tracking-wider">3 247 игроков</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 float opacity-40">
        <Icon name="ChevronDown" size={24} className="text-purple-600" />
      </div>
    </section>
  );
}

export function AboutSection() {
  const stats = [
    { icon: "Users", value: "3 200+", label: "Игроков" },
    { icon: "Calendar", value: "5", label: "Лет онлайн" },
    { icon: "Shield", value: "15+", label: "Фракций" },
    { icon: "Star", value: "4.9", label: "Рейтинг" },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-purple-700" />
          <div>
            <p className="text-purple-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Проект</p>
            <h2 className="font-['Oswald'] text-4xl font-bold text-white uppercase tracking-wider">О сервере</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-start mb-16">
          <div>
            <p className="text-gray-300 font-['Golos_Text'] leading-relaxed mb-4">
              Dragon CRMP — мобильный ролевой сервер, вдохновлённый духом Black Russia. Мы создали живой город с реальной экономикой, криминальными группировками, полицией и мирными профессиями.
            </p>
            <p className="text-gray-500 font-['Golos_Text'] leading-relaxed mb-7">
              Каждый день здесь кипит жизнь: захваты территорий, погони, бизнес-сделки и неожиданные встречи на улицах. Твой персонаж — это ты сам в этом городе без правил.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Живая экономика", "Криминал и закон", "Недвижимость", "Кастомные ивенты", "Активная админка"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-purple-950/40 border border-purple-900/40 text-purple-300/80 text-xs font-['Golos_Text'] tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="br-card p-6 text-center group cursor-default">
                <Icon name={s.icon} size={24} className="text-purple-600 mx-auto mb-3 group-hover:text-purple-400 transition-colors" />
                <div className="font-['Oswald'] text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="font-['Golos_Text'] text-gray-500 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="red-line" />
      </div>
    </section>
  );
}