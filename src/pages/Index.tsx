import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О сервере" },
  { id: "rules", label: "Правила" },
  { id: "donate", label: "Донат" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты" },
];

const RULES = [
  { num: "01", title: "Уважение", text: "Относись к другим игрокам с уважением. Оскорбления, дискриминация и токсичное поведение — под запретом." },
  { num: "02", title: "РП обязательно", text: "Ты обязан соблюдать ролевой режим. Выход из образа допускается только в экстренных случаях." },
  { num: "03", title: "Без читов", text: "Использование стороннего ПО, дающего преимущество — немедленный бан без права апелляции." },
  { num: "04", title: "РП сделки", text: "Запрещено продавать внутриигровые ценности за реальные деньги вне официального магазина." },
  { num: "05", title: "Чат и связь", text: "Общий чат — только IC (в образе). OOC-общение строго в отведённых каналах. Спам запрещён." },
  { num: "06", title: "Администрация", text: "Решения администрации окончательны. Обжалование — через официальный тикет на форуме." },
];

const DONATE_TIERS = [
  {
    name: "Гражданин",
    price: "199₽",
    period: "/ мес",
    gradient: "from-zinc-900 to-zinc-950",
    border: "border-zinc-700",
    accent: "text-gray-300",
    features: ["Тег [Гражданин] в чате", "x1.2 к опыту", "10 000 игровых денег", "Уникальный скин"],
    popular: false,
  },
  {
    name: "Криминал",
    price: "499₽",
    period: "/ мес",
    gradient: "from-red-950 to-zinc-950",
    border: "border-red-700",
    accent: "text-red-400",
    features: ["Тег [Криминал] 🔫", "x1.5 к опыту и деньгам", "35 000 игровых денег", "Спецтранспорт", "VIP-зона сервера"],
    popular: true,
  },
  {
    name: "Босс",
    price: "999₽",
    period: "/ мес",
    gradient: "from-amber-950 to-zinc-950",
    border: "border-amber-700",
    accent: "text-amber-400",
    features: ["Тег [Босс] 👑", "x2.0 ко всем бонусам", "100 000 игровых денег", "Личная база", "Приоритетный вход", "Прямой контакт с адм."],
    popular: false,
  },
];

const FAQ_ITEMS = [
  { q: "Как зайти на сервер?", a: "Скачай приложение Black Russia из App Store или Google Play, создай аккаунт и начни играть. Сервер доступен 24/7." },
  { q: "Игра бесплатная?", a: "Да, базовая игра абсолютно бесплатна. Донат даёт лишь косметические бонусы и не влияет на баланс." },
  { q: "Что такое РП?", a: "Ролевая игра — формат, где ты играешь за своего персонажа. Ты сам решаешь его профессию, биографию и судьбу." },
  { q: "Как создать персонажа?", a: "При первом входе тебя встретит мастер создания — выбери имя, внешность и стартовую роль." },
  { q: "Есть ли форум?", a: "Да, официальный форум расположен на blackrussia.online — там можно обсудить игру, подать апелляцию и следить за новостями." },
  { q: "Как обратиться к администрации?", a: "Через раздел «Контакты», официальный Discord или командой /report прямо в игре." },
  { q: "Меня забанили — что делать?", a: "Подай апелляцию на форуме в разделе «Апелляции». Укажи ник, дату и обстоятельства." },
  { q: "Можно ли создать банду?", a: "Да! Нужно минимум 5 активных участников и одобрение администрации. Детали — на форуме." },
];

function Navbar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080808]/95 backdrop-blur-md border-b border-red-900/30" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button onClick={() => handleNav("home")} className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-red-700 flex items-center justify-center rounded-sm glow-red">
            <span className="font-['Oswald'] text-white font-bold text-sm">BR</span>
          </div>
          <div className="text-left">
            <div className="font-['Oswald'] text-base font-bold text-white leading-none tracking-widest uppercase group-hover:text-red-400 transition-colors">
              Dragon CRMP
            </div>
            <div className="text-[10px] text-gray-500 tracking-widest uppercase leading-none mt-0.5">Mobile RP Server</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-4 py-2 text-sm font-['Oswald'] tracking-wider uppercase transition-all duration-200 relative
                ${active === item.id ? "text-red-400" : "text-gray-500 hover:text-gray-200"}`}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-red-600" />
              )}
            </button>
          ))}
        </div>

        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#080808]/98 border-t border-red-900/20 px-4 pb-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="block w-full text-left px-4 py-3 font-['Oswald'] tracking-wider uppercase text-gray-400 hover:text-red-400 transition-colors border-b border-white/5 last:border-0"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('https://cdn.poehali.dev/projects/52949190-26fd-4571-99bd-793324fdf696/files/0fb07b61-2034-4675-abdf-e9bf0bc663c4.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#080808]" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(212,43,43,0.06) 0%, transparent 65%)" }} />

      {/* Rain streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-red-900/40 to-transparent"
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
        {/* Badge */}
        <div className="animate-fade-up-delay-1 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-red-800/50 rounded-sm text-red-400/80 text-xs font-['Golos_Text'] tracking-widest uppercase bg-red-950/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Мобильный RP сервер · Онлайн 24/7
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-up-delay-2 font-['Oswald'] text-6xl md:text-8xl font-bold leading-none tracking-wider uppercase mb-2">
          <span className="text-white">DRAGON</span>
          <br />
          <span className="shimmer-text glow-text-red">CRMP</span>
        </h1>

        <div className="animate-fade-up-delay-2 red-line max-w-xs mx-auto my-5" />

        <p className="animate-fade-up-delay-3 text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10 font-['Golos_Text'] leading-relaxed">
          Живи по своим правилам. Стань боссом улиц, честным копом или теневым дельцом — выбор за тобой.
        </p>

        {/* CTA */}
        <div className="animate-fade-up-delay-4 flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="glow-red px-8 py-3 bg-red-700 hover:bg-red-600 text-white font-['Oswald'] text-base tracking-widest uppercase transition-all duration-200 hover:scale-105"
          >
            Начать играть
          </button>
          <button
            onClick={() => document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 border border-red-800/50 hover:border-red-600/70 text-gray-400 hover:text-white font-['Oswald'] text-base tracking-widest uppercase transition-all duration-200 hover:bg-red-950/30"
          >
            Привилегии
          </button>
        </div>

        {/* Server info */}
        <div className="animate-fade-up-delay-4 inline-flex items-center gap-4 border border-red-900/30 border-pulse px-6 py-3 bg-black/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-['Golos_Text'] text-gray-500 text-xs uppercase tracking-widest">Статус</span>
            <span className="font-['Oswald'] text-green-400 text-sm tracking-wide">ONLINE</span>
          </div>
          <div className="w-px h-5 bg-red-900/40" />
          <div className="flex items-center gap-2">
            <Icon name="Users" size={13} className="text-red-600" />
            <span className="font-['Oswald'] text-gray-300 text-sm tracking-wider">3 247 игроков</span>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 float opacity-40">
        <Icon name="ChevronDown" size={24} className="text-red-600" />
      </div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { icon: "Users", value: "3 200+", label: "Игроков" },
    { icon: "Calendar", value: "5", label: "Лет онлайн" },
    { icon: "Shield", value: "15+", label: "Фракций" },
    { icon: "Star", value: "4.9", label: "Рейтинг" },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-red-700" />
          <div>
            <p className="text-red-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Проект</p>
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
                <span key={tag} className="px-3 py-1 bg-red-950/40 border border-red-900/40 text-red-300/80 text-xs font-['Golos_Text'] tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="br-card p-6 text-center group cursor-default">
                <Icon name={s.icon} size={24} className="text-red-600 mx-auto mb-3 group-hover:text-red-400 transition-colors" />
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

function RulesSection() {
  return (
    <section id="rules" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-red-700" />
          <div>
            <p className="text-red-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Обязательно к прочтению</p>
            <h2 className="font-['Oswald'] text-4xl font-bold text-white uppercase tracking-wider">Правила</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {RULES.map((rule) => (
            <div key={rule.num} className="br-card p-6 group relative overflow-hidden">
              {/* Number watermark */}
              <div className="absolute -top-2 -right-1 font-['Oswald'] text-6xl font-bold text-red-950/50 select-none pointer-events-none group-hover:text-red-900/60 transition-colors">
                {rule.num}
              </div>
              <div className="w-6 h-px bg-red-700 mb-4" />
              <h3 className="font-['Oswald'] text-lg font-semibold text-white uppercase tracking-wider mb-2">{rule.title}</h3>
              <p className="text-gray-500 font-['Golos_Text'] text-sm leading-relaxed">{rule.text}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-4 border border-red-900/30 bg-red-950/10">
          <Icon name="AlertTriangle" size={16} className="text-red-600 shrink-0" />
          <p className="text-gray-500 font-['Golos_Text'] text-sm">Полный свод правил — на официальном форуме. Незнание правил не освобождает от ответственности.</p>
        </div>
      </div>
    </section>
  );
}

function DonateSection() {
  return (
    <section id="donate" className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(212,43,43,0.04) 0%, transparent 60%)" }} />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-red-700" />
          <div>
            <p className="text-red-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Поддержать проект</p>
            <h2 className="font-['Oswald'] text-4xl font-bold text-white uppercase tracking-wider">Привилегии</h2>
          </div>
        </div>

        <p className="text-gray-500 font-['Golos_Text'] mb-10 max-w-lg">Донат не влияет на игровой баланс. Только внешние бонусы и удобства. Спасибо за поддержку сервера!</p>

        <div className="grid md:grid-cols-3 gap-5">
          {DONATE_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative border ${tier.border} bg-gradient-to-b ${tier.gradient} flex flex-col transition-all duration-300 hover:-translate-y-1 ${tier.popular ? "glow-red" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-px left-0 right-0 h-px bg-red-600" />
              )}
              {tier.popular && (
                <div className="bg-red-700 text-white text-center py-1.5 font-['Oswald'] text-xs tracking-widest uppercase">
                  Популярный выбор
                </div>
              )}
              <div className="p-7 flex flex-col flex-1">
                <div className="mb-6">
                  <h3 className={`font-['Oswald'] text-2xl font-bold uppercase tracking-wider mb-2 ${tier.accent}`}>{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Oswald'] text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-600 font-['Golos_Text'] text-sm">{tier.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-gray-400 font-['Golos_Text'] text-sm">
                      <Icon name="ChevronRight" size={14} className={`mt-0.5 shrink-0 ${tier.accent}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 font-['Oswald'] text-sm tracking-widest uppercase transition-all duration-200
                  ${tier.popular
                    ? "bg-red-700 hover:bg-red-600 text-white glow-red"
                    : "border border-current text-gray-500 hover:text-white hover:border-red-700 hover:bg-red-950/30"
                  }`}>
                  Приобрести
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-red-700" />
          <div>
            <p className="text-red-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Частые вопросы</p>
            <h2 className="font-['Oswald'] text-4xl font-bold text-white uppercase tracking-wider">FAQ</h2>
          </div>
        </div>

        <div className="space-y-1">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`border-b border-white/5 ${openIndex === i ? "bg-red-950/10" : ""} transition-colors`}>
              <button
                className="w-full flex items-center justify-between px-0 py-4 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-['Oswald'] text-xs text-red-800 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-['Oswald'] text-base uppercase tracking-wide transition-colors ${openIndex === i ? "text-red-400" : "text-gray-300 group-hover:text-white"}`}>
                    {item.q}
                  </span>
                </div>
                <Icon
                  name={openIndex === i ? "Minus" : "Plus"}
                  size={16}
                  className={`shrink-0 ml-4 transition-colors ${openIndex === i ? "text-red-500" : "text-gray-600"}`}
                />
              </button>
              {openIndex === i && (
                <div className="pb-4 pl-9 pr-8">
                  <p className="text-gray-500 font-['Golos_Text'] text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  const links = [
    { icon: "MessageCircle", label: "Discord", sub: "discord.gg/dragoncrmp", color: "hover:border-indigo-700/50" },
    { icon: "Send", label: "Telegram", sub: "@dragoncrmp", color: "hover:border-sky-700/50" },
    { icon: "Globe", label: "Форум", sub: "dragoncrmp.ru/forum", color: "hover:border-red-700/50" },
    { icon: "Youtube", label: "YouTube", sub: "Dragon CRMP Official", color: "hover:border-red-700/50" },
  ];

  return (
    <section id="contacts" className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-red-700" />
          <div>
            <p className="text-red-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Связь</p>
            <h2 className="font-['Oswald'] text-4xl font-bold text-white uppercase tracking-wider">Контакты</h2>
          </div>
        </div>

        {/* Social links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {links.map((link) => (
            <button
              key={link.label}
              className={`br-card group p-5 text-center ${link.color} transition-all duration-200`}
            >
              <Icon name={link.icon} size={28} className="text-red-700 mx-auto mb-3 group-hover:text-red-500 transition-colors" />
              <div className="font-['Oswald'] text-base text-white uppercase tracking-wider mb-1">{link.label}</div>
              <div className="font-['Golos_Text'] text-gray-600 text-xs">{link.sub}</div>
            </button>
          ))}
        </div>

        {/* Contact form */}
        <div className="br-card p-8">
          <h3 className="font-['Oswald'] text-xl text-white uppercase tracking-widest mb-1">Обратная связь</h3>
          <p className="text-gray-600 font-['Golos_Text'] text-sm mb-6">Напишите нам — ответим в течение 24 часов</p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Ваш ник"
              className="bg-black/70 border border-red-900/30 focus:border-red-700/60 px-4 py-3 text-white font-['Golos_Text'] text-sm placeholder:text-gray-700 outline-none transition-colors w-full"
            />
            <input
              type="email"
              placeholder="Email (необязательно)"
              className="bg-black/70 border border-red-900/30 focus:border-red-700/60 px-4 py-3 text-white font-['Golos_Text'] text-sm placeholder:text-gray-700 outline-none transition-colors w-full"
            />
          </div>
          <textarea
            placeholder="Ваше сообщение..."
            rows={4}
            className="w-full bg-black/70 border border-red-900/30 focus:border-red-700/60 px-4 py-3 text-white font-['Golos_Text'] text-sm placeholder:text-gray-700 outline-none transition-colors resize-none mb-4"
          />
          <button className="glow-red px-8 py-3 bg-red-700 hover:bg-red-600 text-white font-['Oswald'] text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105">
            Отправить
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-red-900/20 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-red-800 flex items-center justify-center">
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
              className="font-['Golos_Text'] text-gray-600 hover:text-red-500 text-xs uppercase tracking-widest transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="scanlines min-h-screen bg-[#080808]">
      <Navbar active={activeSection} onNav={setActiveSection} />
      <HeroSection />
      <AboutSection />
      <RulesSection />
      <DonateSection />
      <FAQSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
