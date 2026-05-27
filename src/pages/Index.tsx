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
  { num: "02", title: "РП обязательно", text: "Ты обязан соблюдать ролевой режим в пределах игровой зоны. Выход из роли — только в особых случаях." },
  { num: "03", title: "Без читов", text: "Использование модов, читов и сторонних программ, дающих преимущество — немедленный бан без права апелляции." },
  { num: "04", title: "Деньги = РП", text: "Запрещено продавать внутриигровые ценности за реальные деньги вне официального магазина." },
  { num: "05", title: "Чат и связь", text: "Общий чат — только IC (в образе). OOC-общение строго в отведённых каналах. Спам запрещён." },
  { num: "06", title: "Администрация", text: "Решения администрации окончательны. Обжалование через официальный Discord-тикет." },
];

const DONATE_TIERS = [
  {
    name: "Авантюрист",
    price: "199₽",
    period: "/ мес",
    color: "from-zinc-800 to-zinc-900",
    border: "border-zinc-600",
    features: ["Уникальный тег [Авантюрист]", "x1.2 к получаемому опыту", "10 000 игровых монет", "Доступ к особому скину"],
    popular: false,
  },
  {
    name: "Дракон",
    price: "499₽",
    period: "/ мес",
    color: "from-purple-900 to-violet-950",
    border: "border-purple-500",
    features: ["Уникальный тег [Дракон] 🐉", "x1.5 к опыту и деньгам", "35 000 игровых монет", "Эксклюзивный транспорт", "VIP-зона и особые команды"],
    popular: true,
  },
  {
    name: "Повелитель",
    price: "999₽",
    period: "/ мес",
    color: "from-violet-950 to-purple-950",
    border: "border-violet-400",
    features: ["Тег [Повелитель] ⚡", "x2.0 ко всем бонусам", "100 000 игровых монет", "Личный особняк", "Приоритетный вход на сервер", "Прямая связь с адм."],
    popular: false,
  },
];

const FAQ_ITEMS = [
  { q: "Как зайти на сервер?", a: "Установи SA-MP 0.3.7, в списке серверов введи IP: play.dragoncrmp.ru:7777 и нажми Подключиться." },
  { q: "Игра бесплатная?", a: "Да, базовая игра абсолютно бесплатна. Донат даёт лишь косметические и небольшие игровые бонусы, не нарушая баланс." },
  { q: "Что такое РП (ролевая игра)?", a: "Это формат, где ты играешь за своего персонажа, а не за себя. Ты сам решаешь его профессию, биографию и поступки." },
  { q: "Как создать персонажа?", a: "При первом входе тебя встретит мастер создания персонажа — выбери имя, внешность и стартовую профессию." },
  { q: "Есть ли мобильное приложение?", a: "Нет, Dragon CRMP — это PC-сервер для GTA San Andreas с модом SA-MP. Мобильная версия не поддерживается." },
  { q: "Как связаться с администрацией?", a: "Через Discord-сервер (ссылка в разделе Контакты) или командой /report прямо в игре." },
  { q: "Меня забанили — что делать?", a: "Подай апелляцию в Discord в канал #апелляции. Укажи ник, причину и своё объяснение ситуации." },
  { q: "Можно ли создать фракцию/банду?", a: "Да! Для этого нужно минимум 5 активных игроков и одобрение администрации. Подробнее — в Discord." },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-purple-900/40" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => handleNav("home")} className="flex items-center gap-2 group">
          <span className="text-2xl">🐉</span>
          <span className="font-['Oswald'] text-xl font-bold text-white group-hover:text-purple-400 transition-colors tracking-widest uppercase">Dragon CRMP</span>
        </button>
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-4 py-2 text-sm font-['Oswald'] tracking-wider uppercase transition-all duration-200 rounded
                ${active === item.id
                  ? "text-purple-400 bg-purple-900/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-purple-900/30 px-4 pb-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="block w-full text-left px-4 py-3 font-['Oswald'] tracking-wider uppercase text-gray-300 hover:text-purple-400 transition-colors"
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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://cdn.poehali.dev/projects/52949190-26fd-4571-99bd-793324fdf696/files/1342cac4-4b13-436a-97ce-f57fd9848888.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/30 via-transparent to-purple-950/30" />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-400/40"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 5) * 15}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-up-delay-1 mb-4">
          <span className="inline-block px-4 py-1.5 border border-purple-600/50 rounded-full text-purple-300 text-sm font-['Golos_Text'] tracking-widest uppercase bg-purple-900/20">
            ✦ Ролевой сервер GTA:SA ✦
          </span>
        </div>
        <h1 className="animate-fade-up-delay-2 font-['Oswald'] text-6xl md:text-8xl font-bold text-white leading-none tracking-wider uppercase mb-4">
          DRAGON
          <span className="block glow-text text-purple-400">CRMP</span>
        </h1>
        <p className="animate-fade-up-delay-3 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-['Golos_Text'] leading-relaxed">
          Живи своей жизнью. Создай свою историю. Стань легендой в мире, где правят драконы.
        </p>
        <div className="animate-fade-up-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="glow-purple px-8 py-3.5 bg-purple-700 hover:bg-purple-600 text-white font-['Oswald'] text-lg tracking-widest uppercase rounded transition-all duration-200 hover:scale-105"
          >
            Начать играть
          </button>
          <button
            onClick={() => document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 border border-purple-600/60 hover:border-purple-400 text-gray-300 hover:text-white font-['Oswald'] text-lg tracking-widest uppercase rounded transition-all duration-200 hover:bg-purple-900/20"
          >
            Донат
          </button>
        </div>
        <div className="mt-12 animate-fade-up-delay-4">
          <p className="text-gray-500 text-sm mb-2 font-['Golos_Text'] tracking-widest uppercase">IP сервера</p>
          <div className="inline-flex items-center gap-3 bg-black/60 border border-purple-800/50 rounded px-6 py-3 border-animated">
            <Icon name="Server" size={16} className="text-purple-400" />
            <span className="font-['Oswald'] text-purple-300 tracking-widest text-lg">play.dragoncrmp.ru:7777</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 float opacity-60">
        <Icon name="ChevronDown" size={28} className="text-purple-400" />
      </div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { icon: "Users", value: "3 200+", label: "Игроков" },
    { icon: "Clock", value: "5", label: "Лет online" },
    { icon: "MapPin", value: "24/7", label: "Онлайн" },
    { icon: "Star", value: "4.9", label: "Рейтинг" },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-purple-400 font-['Golos_Text'] tracking-widest uppercase text-sm mb-3">О проекте</p>
          <h2 className="font-['Oswald'] text-5xl font-bold text-white uppercase tracking-wider">О сервере</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4" />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="font-['Oswald'] text-3xl text-purple-400 uppercase mb-6 tracking-wide">Добро пожаловать в Dragon CRMP</h3>
            <p className="text-gray-300 font-['Golos_Text'] leading-relaxed mb-4 text-base">
              Dragon CRMP — это уникальный ролевой сервер GTA San Andreas, который существует с 2019 года. Мы создали живой мир с богатой экономикой, десятками фракций и тысячами игроков.
            </p>
            <p className="text-gray-400 font-['Golos_Text'] leading-relaxed mb-6 text-base">
              У нас ты сможешь стать полицейским, бандитом, бизнесменом, врачом или водителем. Твоя история — только в твоих руках. Каждый день в Dragon CRMP происходят новые события, войны банд, деловые сделки и случайные встречи.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Уникальная экономика", "15+ фракций", "Система недвижимости", "Живые ивенты"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-purple-900/30 border border-purple-800/50 text-purple-300 text-sm font-['Golos_Text'] rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-gradient-to-br from-purple-950/60 to-black/40 border border-purple-800/30 rounded-lg p-6 text-center hover:border-purple-600/50 transition-colors">
                <Icon name={s.icon} size={28} className="text-purple-400 mx-auto mb-3" />
                <div className="font-['Oswald'] text-3xl font-bold text-white mb-1">{s.value}</div>
                <div className="font-['Golos_Text'] text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RulesSection() {
  return (
    <section id="rules" className="py-28 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-purple-400 font-['Golos_Text'] tracking-widest uppercase text-sm mb-3">Кодекс чести</p>
          <h2 className="font-['Oswald'] text-5xl font-bold text-white uppercase tracking-wider">Правила</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 font-['Golos_Text'] mt-4 max-w-xl mx-auto">Нарушение правил ведёт к предупреждению, кику или бану. Незнание правил не освобождает от ответственности.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RULES.map((rule) => (
            <div key={rule.num} className="group relative border border-purple-900/40 rounded-lg p-6 bg-gradient-to-br from-purple-950/30 to-black/60 hover:border-purple-600/60 transition-all duration-300 hover:-translate-y-0.5">
              <div className="absolute top-4 right-4 font-['Oswald'] text-4xl font-bold text-purple-900/40 group-hover:text-purple-800/60 transition-colors">
                {rule.num}
              </div>
              <div className="w-8 h-0.5 bg-purple-600 mb-4" />
              <h3 className="font-['Oswald'] text-xl font-semibold text-white uppercase tracking-wide mb-3">{rule.title}</h3>
              <p className="text-gray-400 font-['Golos_Text'] text-sm leading-relaxed">{rule.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-gray-500 font-['Golos_Text'] text-sm">Полный свод правил доступен на Discord-сервере проекта</p>
        </div>
      </div>
    </section>
  );
}

function DonateSection() {
  return (
    <section id="donate" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-purple-400 font-['Golos_Text'] tracking-widest uppercase text-sm mb-3">Поддержи сервер</p>
          <h2 className="font-['Oswald'] text-5xl font-bold text-white uppercase tracking-wider">Донат</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 font-['Golos_Text'] mt-4 max-w-xl mx-auto">Донат не влияет на игровой баланс — только бонусы и косметика. Спасибо, что поддерживаешь проект!</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {DONATE_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative border rounded-xl p-7 bg-gradient-to-br ${tier.color} ${tier.border} flex flex-col transition-all duration-300 hover:scale-[1.02] ${tier.popular ? "glow-purple" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-['Oswald'] tracking-widest uppercase">
                    Популярный
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-['Oswald'] text-2xl font-bold text-white uppercase tracking-wider mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-['Oswald'] text-4xl font-bold text-purple-300">{tier.price}</span>
                  <span className="text-gray-400 font-['Golos_Text'] text-sm">{tier.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-gray-300 font-['Golos_Text'] text-sm">
                    <Icon name="Check" size={16} className="text-purple-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 font-['Oswald'] text-base tracking-widest uppercase rounded transition-all duration-200 
                ${tier.popular
                  ? "bg-purple-600 hover:bg-purple-500 text-white"
                  : "border border-purple-700/60 hover:border-purple-500 text-gray-300 hover:text-white hover:bg-purple-900/30"
                }`}>
                Купить
              </button>
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
    <section id="faq" className="py-28 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-purple-400 font-['Golos_Text'] tracking-widest uppercase text-sm mb-3">Вопросы и ответы</p>
          <h2 className="font-['Oswald'] text-5xl font-bold text-white uppercase tracking-wider">FAQ</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4" />
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`border rounded-lg transition-all duration-200 overflow-hidden
                ${openIndex === i ? "border-purple-600/60 bg-purple-950/30" : "border-purple-900/40 bg-black/30 hover:border-purple-800/60"}`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-['Oswald'] text-base text-white uppercase tracking-wide pr-4">{item.q}</span>
                <Icon
                  name={openIndex === i ? "ChevronUp" : "ChevronDown"}
                  size={18}
                  className={`shrink-0 transition-colors ${openIndex === i ? "text-purple-400" : "text-gray-500"}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-400 font-['Golos_Text'] text-sm leading-relaxed">{item.a}</p>
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
    { icon: "MessageCircle", label: "Discord", sub: "discord.gg/dragoncrmp", color: "from-indigo-900/40 to-purple-950/40", border: "border-indigo-700/40" },
    { icon: "Send", label: "Telegram", sub: "@dragoncrmp", color: "from-sky-900/30 to-purple-950/40", border: "border-sky-700/40" },
    { icon: "Globe", label: "Форум", sub: "forum.dragoncrmp.ru", color: "from-purple-900/40 to-violet-950/40", border: "border-purple-700/40" },
    { icon: "Youtube", label: "YouTube", sub: "Dragon CRMP Official", color: "from-red-900/30 to-purple-950/40", border: "border-red-800/40" },
  ];

  return (
    <section id="contacts" className="py-28 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-purple-400 font-['Golos_Text'] tracking-widest uppercase text-sm mb-3">Мы везде</p>
          <h2 className="font-['Oswald'] text-5xl font-bold text-white uppercase tracking-wider">Контакты</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {links.map((link) => (
            <button
              key={link.label}
              className={`group border rounded-xl p-6 bg-gradient-to-br ${link.color} ${link.border} text-center hover:border-purple-500/60 hover:scale-105 transition-all duration-200`}
            >
              <Icon name={link.icon} size={32} className="text-purple-300 mx-auto mb-4 group-hover:text-purple-200" />
              <div className="font-['Oswald'] text-lg text-white uppercase tracking-wider mb-1">{link.label}</div>
              <div className="font-['Golos_Text'] text-gray-400 text-xs">{link.sub}</div>
            </button>
          ))}
        </div>
        <div className="border border-purple-900/40 rounded-xl p-8 bg-gradient-to-br from-purple-950/30 to-black/50">
          <h3 className="font-['Oswald'] text-2xl text-white uppercase tracking-wider mb-6">Написать нам</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Ваш никнейм"
              className="bg-black/50 border border-purple-900/50 rounded px-4 py-3 text-white font-['Golos_Text'] text-sm placeholder:text-gray-600 focus:outline-none focus:border-purple-500/80 transition-colors"
            />
            <input
              type="email"
              placeholder="Email (необязательно)"
              className="bg-black/50 border border-purple-900/50 rounded px-4 py-3 text-white font-['Golos_Text'] text-sm placeholder:text-gray-600 focus:outline-none focus:border-purple-500/80 transition-colors"
            />
          </div>
          <textarea
            placeholder="Ваше сообщение..."
            rows={4}
            className="w-full bg-black/50 border border-purple-900/50 rounded px-4 py-3 text-white font-['Golos_Text'] text-sm placeholder:text-gray-600 focus:outline-none focus:border-purple-500/80 transition-colors resize-none mb-4"
          />
          <button className="glow-purple px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white font-['Oswald'] tracking-widest uppercase rounded transition-all duration-200 hover:scale-105">
            Отправить
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-purple-900/30 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐉</span>
          <span className="font-['Oswald'] text-white tracking-widest uppercase">Dragon CRMP</span>
        </div>
        <p className="font-['Golos_Text'] text-gray-600 text-sm">© 2019–2026 Dragon CRMP. Все права защищены.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="font-['Golos_Text'] text-gray-500 hover:text-purple-400 text-sm transition-colors"
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
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="noise min-h-screen bg-[#0a0a0f]">
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