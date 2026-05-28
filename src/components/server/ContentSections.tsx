import { useState } from "react";
import Icon from "@/components/ui/icon";
import { RULES, DONATE_TIERS, FAQ_ITEMS } from "./constants";

export function RulesSection() {
  return (
    <section id="rules" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-purple-700" />
          <div>
            <p className="text-purple-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Обязательно к прочтению</p>
            <h2 className="font-['Oswald'] text-4xl font-bold text-white uppercase tracking-wider">Правила</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {RULES.map((rule) => (
            <div key={rule.num} className="br-card p-6 group relative overflow-hidden">
              <div className="absolute -top-2 -right-1 font-['Oswald'] text-6xl font-bold text-purple-950/50 select-none pointer-events-none group-hover:text-purple-900/60 transition-colors">
                {rule.num}
              </div>
              <div className="w-6 h-px bg-purple-700 mb-4" />
              <h3 className="font-['Oswald'] text-lg font-semibold text-white uppercase tracking-wider mb-2">{rule.title}</h3>
              <p className="text-gray-500 font-['Golos_Text'] text-sm leading-relaxed">{rule.text}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-4 border border-purple-900/30 bg-purple-950/10">
          <Icon name="AlertTriangle" size={16} className="text-purple-600 shrink-0" />
          <p className="text-gray-500 font-['Golos_Text'] text-sm">Полный свод правил — на официальном форуме. Незнание правил не освобождает от ответственности.</p>
        </div>
      </div>
    </section>
  );
}

export function DonateSection() {
  return (
    <section id="donate" className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(139,47,201,0.04) 0%, transparent 60%)" }} />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-purple-700" />
          <div>
            <p className="text-purple-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Поддержать проект</p>
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
                <div className="absolute -top-px left-0 right-0 h-px bg-purple-600" />
              )}
              {tier.popular && (
                <div className="bg-purple-700 text-white text-center py-1.5 font-['Oswald'] text-xs tracking-widest uppercase">
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
                    ? "bg-purple-700 hover:bg-purple-600 text-white glow-red"
                    : "border border-current text-gray-500 hover:text-white hover:border-purple-700 hover:bg-purple-950/30"
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-purple-700" />
          <div>
            <p className="text-purple-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Частые вопросы</p>
            <h2 className="font-['Oswald'] text-4xl font-bold text-white uppercase tracking-wider">FAQ</h2>
          </div>
        </div>

        <div className="space-y-1">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`border-b border-white/5 ${openIndex === i ? "bg-purple-950/10" : ""} transition-colors`}>
              <button
                className="w-full flex items-center justify-between px-0 py-4 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-['Oswald'] text-xs text-purple-800 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-['Oswald'] text-base uppercase tracking-wide transition-colors ${openIndex === i ? "text-purple-400" : "text-gray-300 group-hover:text-white"}`}>
                    {item.q}
                  </span>
                </div>
                <Icon
                  name={openIndex === i ? "Minus" : "Plus"}
                  size={16}
                  className={`shrink-0 ml-4 transition-colors ${openIndex === i ? "text-purple-500" : "text-gray-600"}`}
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

export function ContactsSection() {
  const links = [
    { icon: "Send", label: "Telegram", sub: "t.me/crmpdragon", url: "https://t.me/crmpdragon", color: "hover:border-sky-700/50" },
    { icon: "Crown", label: "Макс", sub: "max.ru", url: "https://max.ru/join/5E0z0gwJB8arY8_9kdcjdmid4nJmUSY7mfMpGhBIzYw", color: "hover:border-purple-700/50" },
    { icon: "MessageCircle", label: "Discord", sub: "discord.gg/uZ5GX8BZ", url: "https://discord.gg/uZ5GX8BZ", color: "hover:border-indigo-700/50" },
  ];

  return (
    <section id="contacts" className="py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-1 h-10 bg-purple-700" />
          <div>
            <p className="text-purple-600 font-['Golos_Text'] tracking-widest uppercase text-xs mb-1">Связь</p>
            <h2 className="font-['Oswald'] text-4xl font-bold text-white uppercase tracking-wider">Контакты</h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`br-card group p-6 text-center ${link.color} transition-all duration-200 block`}
            >
              <Icon name={link.icon} size={32} className="text-purple-700 mx-auto mb-3 group-hover:text-purple-500 transition-colors" />
              <div className="font-['Oswald'] text-base text-white uppercase tracking-wider mb-1">{link.label}</div>
              <div className="font-['Golos_Text'] text-gray-600 text-xs">{link.sub}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}