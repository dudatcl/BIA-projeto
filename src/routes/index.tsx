import { createFileRoute } from "@tanstack/react-router";
import { useState, type ElementType } from "react";
import {
  ArrowLeftRight,
  Zap,
  Barcode,
  CreditCard,
  Landmark,
  TrendingUp,
  Network,
  SlidersHorizontal,
  Eye,
  Bell,
  Search,
  ChevronRight,
  ChevronDown,
  Send,
  ArrowLeft,
  Shield,
  Lock,
  FileText,
  Sparkles,
  BookOpen,
  HandHeart,
  Camera,
  Check,
  AlertCircle,
  Phone,
  ShieldCheck,
  X,
  BadgeCheck,
  Wallet,
  ScrollText,
  Compass,
  LifeBuoy,
  Heart,
  MapPin,
  Navigation,
  Scale,
  Building2,
  Briefcase,
  GraduationCap,
  Users,
  Gavel,
  Home as HomeIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Prototype,
});

type ScreenId =
  | "1"
  | "2"
  | "2b"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "pix1"
  | "pix2"
  | "9"
  | "10a"
  | "10b";

const SCREENS: { id: ScreenId; label: string; group: string }[] = [
  { id: "1", label: "1. Home + alerta discreto", group: "Fluxo de apoio" },
  { id: "2", label: "2. BIA — pergunta de controle", group: "Fluxo de apoio" },
  { id: "2b", label: "2b. BIA — resposta acolhedora", group: "Fluxo de apoio" },
  { id: "3", label: "3. Cartilha (índice)", group: "Fluxo de apoio" },
  { id: "4", label: "4. Cartilha (detalhe)", group: "Fluxo de apoio" },
  { id: "5", label: "5. Passo a passo aprofundado", group: "Fluxo de apoio" },
  {
    id: "6",
    label: "6. Encaminhamento (geolocalizado)",
    group: "Fluxo de apoio",
  },
  { id: "7", label: "7. Onboarding / LGPD", group: "Ativação" },
  {
    id: "pix1",
    label: "P1. Pix — valor/destinatário",
    group: "Fluxo Pix + verificação",
  },
  { id: "pix2", label: "P2. Pix — revisão", group: "Fluxo Pix + verificação" },
  {
    id: "9",
    label: "9. Verificação de identidade",
    group: "Fluxo Pix + verificação",
  },
  { id: "10a", label: "10a. Pix concluído", group: "Fluxo Pix + verificação" },
  {
    id: "10b",
    label: "10b. Erro genérico (coação)",
    group: "Fluxo Pix + verificação",
  },
];

function Prototype() {
  const [screen, setScreen] = useState<ScreenId>("1");
  const groups = Array.from(new Set(SCREENS.map((s) => s.group)));

  return (
    <div className="min-h-screen bg-muted/40 font-sans text-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-10 lg:flex-row">
        <aside className="lg:w-72 lg:shrink-0">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary-dark to-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold leading-tight">
                  BIA Protege
                </div>
                <div className="text-xs text-muted-foreground">
                  Protótipo · v2
                </div>
              </div>
            </div>
          </div>
          <nav className="space-y-6">
            {groups.map((g) => (
              <div key={g}>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {g}
                </div>
                <ul className="space-y-1">
                  {SCREENS.filter((s) => s.group === g).map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => setScreen(s.id)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          screen === s.id
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "hover:bg-accent text-foreground/80"
                        }`}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex flex-1 items-start justify-center">
          <div className="sticky top-10">
            <PhoneFrame>
              <ScreenRouter screen={screen} onNavigate={setScreen} />
            </PhoneFrame>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Tela {screen} · toque nos elementos interativos para navegar
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[48px] border-[10px] border-neutral-900 bg-white shadow-2xl">
      <div className="pointer-events-none absolute left-1/2 top-0 z-30 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-neutral-900" />
      <div className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-white">
        {children}
      </div>
    </div>
  );
}

function ScreenRouter({
  screen,
  onNavigate,
}: {
  screen: ScreenId;
  onNavigate: (s: ScreenId) => void;
}) {
  switch (screen) {
    case "1":
      return <Screen1Home go={onNavigate} />;
    case "2":
      return <Screen2Chat go={onNavigate} />;
    case "2b":
      return <Screen2bChatDeclined go={onNavigate} />;
    case "3":
      return <Screen3Index go={onNavigate} />;
    case "4":
      return <Screen4Article go={onNavigate} />;
    case "5":
      return <Screen5Steps go={onNavigate} />;
    case "6":
      return <Screen6Referral go={onNavigate} />;
    case "7":
      return <Screen7Onboarding go={onNavigate} />;
    case "pix1":
      return <ScreenPix1 go={onNavigate} />;
    case "pix2":
      return <ScreenPix2 go={onNavigate} />;
    case "9":
      return <Screen9Biometry go={onNavigate} />;
    case "10a":
      return <Screen10Success go={onNavigate} />;
    case "10b":
      return <Screen10Decoy go={onNavigate} />;
  }
}

/* ============ SHARED ============ */
function StatusBar() {
  return (
    <div className="flex h-11 items-end justify-between px-8 pb-1 text-[13px] font-semibold text-white">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="tracking-wider">•••</span>
        <span>5G</span>
        <span className="ml-1 inline-block h-2.5 w-4 rounded-[2px] border border-white/80" />
      </span>
    </div>
  );
}

function BrandHeader({
  children,
  curve = true,
}: {
  children?: React.ReactNode;
  curve?: boolean;
}) {
  return (
    <div className="relative" style={{ background: "var(--gradient-brand)" }}>
      <StatusBar />
      <div className="px-5 pb-8 pt-2">{children}</div>
      {curve && (
        <svg
          viewBox="0 0 390 40"
          preserveAspectRatio="none"
          className="block h-10 w-full"
          aria-hidden
        >
          <path d="M0,0 Q195,80 390,0 L390,40 L0,40 Z" fill="white" />
        </svg>
      )}
    </div>
  );
}

function SimpleHeader({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  return (
    <div className="relative" style={{ background: "var(--gradient-brand)" }}>
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pb-5 pt-1 text-white">
        {onBack && (
          <button
            onClick={onBack}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      <svg
        viewBox="0 0 390 40"
        preserveAspectRatio="none"
        className="block h-10 w-full"
        aria-hidden
      >
        <path d="M0,0 Q195,80 390,0 L390,40 L0,40 Z" fill="white" />
      </svg>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-[0_4px_14px_-4px_oklch(0.48_0.19_12/0.5)] transition-transform active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-full border-2 border-primary bg-transparent py-3 text-sm font-bold text-primary transition-colors active:bg-primary/5 ${className}`}
    >
      {children}
    </button>
  );
}

function FavIcon({
  icon: Icon,
  label,
  onClick,
}: {
  icon: ElementType;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[var(--shadow-icon)] ring-1 ring-black/5">
        <Icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
      </div>
      <span className="text-[11px] font-semibold text-foreground/80">
        {label}
      </span>
    </button>
  );
}

/* ============ SCREEN 1 — HOME ============ */
function Screen1Home({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="min-h-full bg-white pb-24">
      <BrandHeader>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-primary font-bold">
              M
            </div>
            <div className="text-[15px] font-bold">Maria Luiza do Carmo</div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5" />
            <span className="text-sm font-semibold">Sair</span>
          </div>
        </div>
        <div className="mt-5 flex items-end justify-between text-white">
          <div>
            <div className="text-xs opacity-90">Saldo</div>
            <div className="mt-1 flex items-center gap-3">
              <div className="h-4 w-28 rounded bg-white/25" />
              <Eye className="h-4 w-4 opacity-90" />
            </div>
          </div>
          <button className="border-b border-white/80 pb-0.5 text-sm font-semibold">
            Ver extrato
          </button>
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-full bg-white px-2 py-1.5 shadow-md">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-dark">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <input
            className="flex-1 bg-transparent text-[13px] text-foreground/80 outline-none placeholder:text-foreground/50"
            placeholder="Buscar serviço ou falar com a BIA"
            readOnly
          />
          <Search className="mr-2 h-4 w-4 text-foreground/60" />
        </div>
      </BrandHeader>

      <div className="-mt-2 px-5">
        <h2 className="mb-3 text-[15px] font-extrabold">Favoritos</h2>
        <div className="grid grid-cols-4 gap-y-4">
          <FavIcon icon={ArrowLeftRight} label="Transferências" />
          <FavIcon icon={Zap} label="Pix" onClick={() => go("pix1")} />
          <FavIcon icon={Barcode} label="Pagamentos" />
          <FavIcon icon={CreditCard} label="Cartões" />
          <FavIcon icon={Landmark} label="Empréstimos" />
          <FavIcon icon={TrendingUp} label="Investimentos" />
          <FavIcon icon={Network} label="Open Finance" />
          <FavIcon icon={SlidersHorizontal} label="Personalizar" />
        </div>
      </div>

      {/* Discreet alert card — the "padrão" trigger */}
      <div className="mt-6 px-5">
        <button
          onClick={() => go("2")}
          className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-[var(--shadow-card)] ring-1 ring-black/5"
        >
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary-light to-primary">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold leading-tight">
              Notamos um padrão nas suas movimentações
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              Toque para conversar com a BIA
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>
        <div className="mt-3 flex justify-center gap-1.5">
          <span className="h-1.5 w-4 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/25" />
        </div>
      </div>

      <div className="mt-6 px-5">
        <h2 className="mb-3 text-[15px] font-extrabold">
          Benefícios e parcerias
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              t: "Mimos para você aproveitar!",
              s: "Descontos, cashback e ofertas",
            },
            { t: "Tag de pedágio", s: "Com condições exclusivas" },
          ].map((c, i) => (
            <div
              key={i}
              className="rounded-2xl p-3 text-white shadow-md"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/15">
                <BadgeCheck className="h-4 w-4" />
              </div>
              <div className="mt-2 text-[13px] font-bold leading-tight">
                {c.t}
              </div>
              <div className="mt-1 text-[10px] opacity-90">{c.s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Persistent discreet shortcut (for users who chose "não quero falar agora") */}
      <button
        onClick={() => go("3")}
        className="fixed left-1/2 bottom-4 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-foreground/70 shadow-md backdrop-blur"
        style={{ position: "absolute" }}
        aria-label="Retomar conversa de apoio"
      >
        <Heart className="h-3.5 w-3.5 text-primary" />
        Conteúdos guardados para você
      </button>
    </div>
  );
}

/* ============ SCREEN 2 — CHAT (with 3-option control question) ============ */
function Screen2Chat({ go }: { go: (s: ScreenId) => void }) {
  const [answered, setAnswered] = useState<
    null | "yes" | "control" | "decline"
  >(null);

  return (
    <div className="flex min-h-full flex-col bg-muted/30">
      <SimpleHeader title="BIA" onBack={() => go("1")} />

      <div className="flex-1 space-y-3 px-4 pb-4 pt-2">
        <BiaBubble>
          Oi, Maria 💗 Tudo bem? Passei rapidinho pra conversar sobre uma coisa
          que percebi.
        </BiaBubble>
        <BiaBubble>
          Notei que, nos últimos 3 meses, cerca de <b>90% do seu salário</b> tem
          saído via Pix para o mesmo destinatário logo após cair na conta.
        </BiaBubble>
        <BiaBubble>
          Como esse valor representa <b>quase toda a sua renda</b>, queremos
          garantir que você está confortável com isso.
          <br />
          <br />
          Você tem <b>controle</b> sobre como esse dinheiro é usado?
        </BiaBubble>

        {answered === null && (
          <div className="flex flex-col items-start gap-2 pt-1">
            <Chip onClick={() => setAnswered("yes")}>
              Sim, eu decido como usar
            </Chip>
            <Chip highlight onClick={() => setAnswered("control")}>
              Gostaria de ter mais controle
            </Chip>
            <Chip onClick={() => setAnswered("decline")}>
              Não quero falar sobre isso
            </Chip>
          </div>
        )}

        {answered === "yes" && (
          <>
            <UserBubble>Sim, eu decido como usar</UserBubble>
            <BiaBubble>Que bom! 💗 Qualquer coisa, estou por aqui.</BiaBubble>
            <div className="pt-2">
              <PrimaryButton onClick={() => go("1")}>
                Voltar ao início
              </PrimaryButton>
            </div>
          </>
        )}

        {answered === "control" && (
          <>
            <UserBubble>Gostaria de ter mais controle</UserBubble>
            <BiaBubble>
              Obrigada por confiar em mim. Preparei alguns conteúdos e um passo
              a passo pensado pra sua situação. Vamos juntas, no seu tempo.
            </BiaBubble>
            <div className="pt-2">
              <PrimaryButton onClick={() => go("3")}>
                Ver conteúdos de apoio
              </PrimaryButton>
            </div>
          </>
        )}

        {answered === "decline" && (
          <>
            <UserBubble>Não quero falar sobre isso</UserBubble>
            <div className="pt-2">
              <PrimaryButton onClick={() => go("2b")}>Continuar</PrimaryButton>
            </div>
          </>
        )}
      </div>

      <div className="sticky bottom-0 flex items-center gap-2 border-t border-border bg-white px-3 py-2.5">
        <input
          className="flex-1 rounded-full bg-muted px-4 py-2.5 text-[13px] outline-none placeholder:text-muted-foreground"
          placeholder="Escreva uma mensagem"
          readOnly
        />
        <button className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ============ SCREEN 2b — CHAT DECLINED (soft acknowledgment) ============ */
function Screen2bChatDeclined({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex min-h-full flex-col bg-muted/30">
      <SimpleHeader title="BIA" onBack={() => go("2")} />
      <div className="flex-1 space-y-3 px-4 pb-4 pt-2">
        <BiaBubble>
          Tudo bem, sem problemas. Se quiser conversar sobre isso depois, é só
          me chamar. 💗
        </BiaBubble>
        <BiaBubble>
          Vou deixar um atalho discreto na sua tela inicial, caso mude de ideia.
          Ninguém mais consegue vê-lo.
        </BiaBubble>
      </div>
      <div className="border-t border-border bg-white p-4">
        <PrimaryButton onClick={() => go("1")}>Voltar ao início</PrimaryButton>
      </div>
    </div>
  );
}

function BiaBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-dark">
        <Sparkles className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="max-w-[78%] rounded-2xl rounded-bl-md border border-border bg-white px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm">
        {children}
      </div>
    </div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-[13px] font-semibold leading-relaxed text-primary-foreground shadow-sm">
        {children}
      </div>
    </div>
  );
}

function Chip({
  children,
  onClick,
  highlight = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-colors ${
        highlight
          ? "border-primary bg-primary text-primary-foreground"
          : "border-primary/40 bg-white text-primary hover:bg-primary/5"
      }`}
    >
      {children}
    </button>
  );
}

/* ============ SCREEN 3 — CARTILHA INDEX ============ */
function Screen3Index({ go }: { go: (s: ScreenId) => void }) {
  const items = [
    {
      icon: Wallet,
      t: "Como identificar sinais de controle financeiro",
      s: "Sinais sutis que costumam passar despercebidos",
      recommended: true,
    },
    {
      icon: BookOpen,
      t: "O que é violência patrimonial",
      s: "Conceitos, direitos e como a lei protege você",
    },
    {
      icon: ScrollText,
      t: "Como reunir provas com segurança",
      s: "Documentos, prints e onde guardar",
    },
    {
      icon: Compass,
      t: "Caminhos para independência financeira",
      s: "Microcrédito, auxílios e recomeço",
    },
    {
      icon: LifeBuoy,
      t: "Se você precisa de apoio agora",
      s: "Canais de ajuda próximos a você",
    },
  ];
  return (
    <div className="min-h-full bg-white pb-8">
      <SimpleHeader title="Cartilha" onBack={() => go("2")} />
      <div className="px-5">
        <p className="mb-4 text-[13px] text-muted-foreground">
          Conteúdos preparados com apoio de especialistas. Toque em um tema para
          ler.
        </p>
        <div className="space-y-3">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => go("4")}
              className={`flex w-full items-center gap-3 rounded-2xl p-3.5 text-left shadow-[var(--shadow-card)] transition-transform active:scale-[0.99] ${
                it.recommended
                  ? "border-2 border-primary bg-primary/5"
                  : "border border-border bg-white"
              }`}
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10">
                <it.icon className="h-5 w-5 text-primary" strokeWidth={2} />
              </div>
              <div className="flex-1">
                {it.recommended && (
                  <span className="mb-1 inline-block rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary-foreground">
                    Recomendado para você
                  </span>
                )}
                <div className="text-[13px] font-bold leading-tight">
                  {it.t}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {it.s}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ SCREEN 4 — ARTICLE ============ */
function Screen4Article({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="min-h-full bg-white pb-8">
      <SimpleHeader title="Cartilha" onBack={() => go("3")} />
      <div className="px-5">
        <div className="mb-5 grid h-40 place-items-center rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <div className="relative">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-white shadow-md">
              <Wallet className="h-10 w-10 text-primary" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-1 -right-2 grid h-9 w-9 place-items-center rounded-full bg-primary text-white shadow-md">
              <Lock className="h-4 w-4" />
            </div>
          </div>
        </div>
        <h1 className="text-[22px] font-extrabold leading-tight">
          Sinais de controle financeiro
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Reconhecer padrões é o primeiro passo. Nenhuma dessas situações é sua
          culpa, e você não precisa lidar com isso sozinha.
        </p>
        <div className="mt-5 space-y-3">
          {[
            {
              icon: Lock,
              t: "Alguém controla o acesso às suas contas ou senhas",
            },
            {
              icon: Wallet,
              t: "Seu salário é transferido logo que cai, sem seu consentimento real",
            },
            {
              icon: FileText,
              t: "Contratos e cartões são feitos em seu nome sem você saber",
            },
            {
              icon: Shield,
              t: "Você precisa 'prestar contas' de qualquer gasto pequeno",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-muted/50 p-3"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <p className="pt-1 text-[13px] leading-snug">{s.t}</p>
            </div>
          ))}
        </div>
        <div className="mt-7 space-y-2.5">
          <PrimaryButton onClick={() => go("5")}>
            Isso é o que estou vivendo
          </PrimaryButton>
          <SecondaryButton onClick={() => go("3")}>
            Só quero me informar por enquanto
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

/* ============ SCREEN 5 — STEP BY STEP (6 detailed steps) ============ */
type StepDef = {
  icon: ElementType;
  short: string;
  title: string;
  body: React.ReactNode;
};

function Screen5Steps({ go }: { go: (s: ScreenId) => void }) {
  const [step, setStep] = useState(0);
  const [openCard, setOpenCard] = useState<string | null>(null);

  const steps: StepDef[] = [
    {
      icon: FileText,
      short: "Registre o que está vivendo",
      title: "Passo 1 — Registre o que está vivendo",
      body: (
        <>
          <p className="text-[13px] leading-relaxed text-foreground/80">
            Antes de qualquer ação, reúna o que puder:{" "}
            <b>prints de mensagens</b>, <b>comprovantes financeiros</b>,{" "}
            <b>fotos de documentos retidos</b> e nomes de <b>testemunhas</b>, se
            houver.
          </p>
          <div className="mt-3 rounded-xl bg-primary/5 p-3 text-[12px] leading-relaxed text-foreground/80">
            <b>Importante:</b> seu <b>relato sozinho já basta</b> para iniciar
            um pedido. Você não precisa ter prova documental completa para agir.
          </div>
          <ul className="mt-3 space-y-2 text-[12px]">
            {[
              "Prints de conversas (WhatsApp, SMS, e-mail)",
              "Extratos e comprovantes de Pix / TED",
              "Fotos de documentos que estão sendo retidos",
              "Nome e contato de pessoas que presenciaram",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{" "}
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      icon: Scale,
      short: "Peça uma Medida Protetiva",
      title: "Passo 2 — Peça uma Medida Protetiva de Urgência",
      body: (
        <>
          <p className="text-[13px] leading-relaxed text-foreground/80">
            Você <b>não precisa de advogado</b>. O pedido pode ser feito em
            vários canais e o juiz tem até <b>48 horas</b> para decidir.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {[
              {
                i: Building2,
                t: "Delegacia da Mulher (ou Delegacia Comum, se não houver na cidade)",
              },
              { i: Gavel, t: "Ministério Público ou Defensoria Pública" },
              {
                i: Phone,
                t: "Delegacia Virtual / Medida Protetiva Online (em vários estados)",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border p-3"
              >
                <c.i className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-[12px] leading-snug">{c.t}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-primary/5 p-3 text-[12px] leading-relaxed">
            <b>O juiz pode determinar:</b> afastamento do agressor do lar,
            proibição de aproximação e contato, e <b>proteção patrimonial</b> —
            impedindo-o de movimentar bens ou contas em seu nome.
          </div>
        </>
      ),
    },
    {
      icon: ScrollText,
      short: "Boletim de Ocorrência",
      title: "Passo 3 — Registre o Boletim de Ocorrência",
      body: (
        <>
          <p className="text-[13px] leading-relaxed text-foreground/80">
            Reter, esconder ou destruir seus <b>documentos, dinheiro ou bens</b>{" "}
            é <b>crime específico</b> previsto na Lei Maria da Penha (Art. 7º,
            IV).
          </p>
          <div className="mt-3 rounded-xl bg-muted/60 p-3 text-[12px] leading-relaxed">
            O BO pode ser registrado{" "}
            <b>mesmo sem provas documentais completas</b>. O relato dos fatos já
            é suficiente para instaurar a investigação.
          </div>
        </>
      ),
    },
    {
      icon: Gavel,
      short: "Apoio jurídico gratuito",
      title: "Passo 4 — Busque apoio jurídico gratuito",
      body: (
        <>
          <p className="text-[13px] leading-relaxed text-foreground/80">
            A <b>Defensoria Pública</b> do seu estado oferece orientação
            gratuita sobre:
          </p>
          <ul className="mt-3 space-y-2 text-[12px]">
            {[
              "Divórcio e partilha de bens",
              "Guarda dos filhos e pensão",
              "Pedido de medida protetiva",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{" "}
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 flex w-full items-center justify-between rounded-xl border-2 border-primary bg-white p-3 text-left">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-[12px] font-bold text-primary">
                Ver Defensoria na minha cidade
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-primary" />
          </button>
        </>
      ),
    },
    {
      icon: Wallet,
      short: "Reconstrua sua autonomia",
      title: "Passo 5 — Reconstrua sua autonomia financeira",
      body: (
        <>
          <p className="text-[13px] leading-relaxed text-foreground/80">
            Existem caminhos concretos. Toque em cada card para ver o que é,
            quem pode acessar e como solicitar.
          </p>
          <div className="mt-3 space-y-2">
            <ExpandCard
              id="micro"
              openId={openCard}
              setOpen={setOpenCard}
              icon={Wallet}
              title="Microcrédito para mulheres em situação de violência"
            >
              <p>
                <b>O que é:</b> linhas municipais e estaduais com juros baixos e
                capacitação inclusa.
              </p>
              <p className="mt-1">
                <b>Valores:</b> até R$ 10 mil (pessoa física) ou R$ 20 mil
                (MEI).
              </p>
              <p className="mt-1">
                <b>Elegibilidade:</b> comprovar situação de violência (BO,
                medida protetiva ou encaminhamento social).
              </p>
              <LocateButton>Ver como solicitar na minha cidade</LocateButton>
            </ExpandCard>

            <ExpandCard
              id="aluguel"
              openId={openCard}
              setOpen={setOpenCard}
              icon={HomeIcon}
              title="Auxílio-aluguel"
            >
              <p>
                <b>O que é:</b> benefício mensal para custear moradia após a
                saída de casa.
              </p>
              <p className="mt-1">
                <b>Valor:</b> a partir de R$ 400/mês (varia por município).
              </p>
              <p className="mt-1">
                <b>Elegibilidade:</b> medida protetiva vigente e renda familiar
                de até 2 salários mínimos antes da separação.
              </p>
              <LocateButton>Ver como solicitar na minha cidade</LocateButton>
            </ExpandCard>

            <ExpandCard
              id="cad"
              openId={openCard}
              setOpen={setOpenCard}
              icon={FileText}
              title="Cadastro Único (CadÚnico)"
            >
              <p>
                <b>O que é:</b> porta de entrada para transferência de renda e
                programas de qualificação.
              </p>
              <p className="mt-1">
                <b>Benefício:</b> prioridade para mulheres vítimas de violência.
              </p>
              <p className="mt-1">
                <b>Onde:</b> CRAS do seu município.
              </p>
              <LocateButton>Ver CRAS mais próximo</LocateButton>
            </ExpandCard>

            <ExpandCard
              id="cap"
              openId={openCard}
              setOpen={setOpenCard}
              icon={Briefcase}
              title="Capacitação e recolocação profissional"
            >
              <p>
                <b>O que é:</b> programas como <b>Emprega Mais Mulheres</b> e
                redes de apoio a empreendedoras.
              </p>
              <p className="mt-1">
                <b>Inclui:</b> microcrédito com mentoria e encaminhamento a
                vagas.
              </p>
              <LocateButton>Ver programas na minha região</LocateButton>
            </ExpandCard>

            <ExpandCard
              id="fb"
              openId={openCard}
              setOpen={setOpenCard}
              icon={GraduationCap}
              title="Educação e capacitação gratuita — Fundação Bradesco"
              highlight
            >
              <p>
                <b>O que é:</b> a Fundação Bradesco oferece cursos gratuitos{" "}
                <b>presenciais e a distância</b> — educação básica,
                profissionalizante e digital — voltados à empregabilidade e
                geração de renda.
              </p>
              <p className="mt-2 text-foreground/70 text-[11px] italic">
                Um caminho estruturado de qualificação para reconstruir renda
                própria, complementando as linhas de microcrédito e auxílio.
              </p>
              <LocateButton>Ver escola/curso mais próximo</LocateButton>
              <p className="mt-2 text-[10px] text-muted-foreground">
                * Nomes de cursos, unidades e requisitos deste card são{" "}
                <b>placeholder</b> — validar com a fonte oficial da Fundação
                Bradesco antes de publicar.
              </p>
            </ExpandCard>
          </div>
        </>
      ),
    },
    {
      icon: Heart,
      short: "Apoio psicológico",
      title: "Passo 6 — Apoio psicológico",
      body: (
        <>
          <p className="text-[13px] leading-relaxed text-foreground/80">
            Cuidar da sua saúde emocional é parte do processo. A mesma rede que
            oferece apoio social e jurídico também oferece{" "}
            <b>atendimento psicológico gratuito</b>.
          </p>
          <div className="mt-3 space-y-2 text-[12px]">
            {[
              "Casa da Mulher Brasileira (quando existir no município)",
              "Centro de Referência de Atendimento à Mulher (CRM)",
              "CREAS — Centro de Referência Especializado de Assistência Social",
              "SUS — via CAPS ou Unidade Básica de Saúde",
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-xl bg-muted/60 p-3"
              >
                <Heart className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  const cur = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="flex min-h-full flex-col bg-white pb-8">
      <SimpleHeader title="Caminhos possíveis" onBack={() => go("4")} />
      <div className="px-5">
        <div className="mb-4 flex items-center gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
          Passo {step + 1} de {steps.length}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10">
            <cur.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
          </div>
          <h2 className="text-[18px] font-extrabold leading-tight">
            {cur.title}
          </h2>
        </div>
        <div className="mt-4">{cur.body}</div>
      </div>

      <div className="mt-6 space-y-2.5 px-5">
        {isLast ? (
          <PrimaryButton onClick={() => go("6")}>
            Ver pontos de apoio perto de mim
          </PrimaryButton>
        ) : (
          <PrimaryButton
            onClick={() => {
              setOpenCard(null);
              setStep(step + 1);
            }}
          >
            Próximo passo
          </PrimaryButton>
        )}
        {step > 0 && (
          <SecondaryButton
            onClick={() => {
              setOpenCard(null);
              setStep(step - 1);
            }}
          >
            Voltar
          </SecondaryButton>
        )}
      </div>
    </div>
  );
}

function ExpandCard({
  id,
  openId,
  setOpen,
  icon: Icon,
  title,
  children,
  highlight = false,
}: {
  id: string;
  openId: string | null;
  setOpen: (v: string | null) => void;
  icon: ElementType;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  const open = openId === id;
  return (
    <div
      className={`overflow-hidden rounded-xl border ${highlight ? "border-primary bg-primary/5" : "border-border bg-white"}`}
    >
      <button
        onClick={() => setOpen(open ? null : id)}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 text-[12px] font-bold leading-snug">{title}</div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-border/60 bg-white px-3 pb-3 pt-2 text-[12px] leading-relaxed text-foreground/80">
          {children}
        </div>
      )}
    </div>
  );
}

function LocateButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="mt-3 flex w-full items-center justify-between rounded-lg border-2 border-primary bg-white px-3 py-2 text-left">
      <span className="flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-bold text-primary">{children}</span>
      </span>
      <ChevronRight className="h-3.5 w-3.5 text-primary" />
    </button>
  );
}

/* ============ SCREEN 6 — REFERRAL (multi-option, geolocalizado) ============ */
function Screen6Referral({ go }: { go: (s: ScreenId) => void }) {
  const [confirmingIdx, setConfirmingIdx] = useState<number | null>(null);
  const places = [
    {
      icon: HandHeart,
      name: "Casa da Mulher Brasileira",
      dist: "2,3 km",
      services: ["jur", "psi", "soc", "abr"],
    },
    {
      icon: Users,
      name: "CREAS — Centro de Referência",
      dist: "3,1 km",
      services: ["psi", "soc"],
    },
    {
      icon: Building2,
      name: "Delegacia da Mulher (5ª DDM)",
      dist: "4,7 km",
      services: ["jur"],
    },
    {
      icon: Gavel,
      name: "Defensoria Pública — Núcleo da Mulher",
      dist: "5,2 km",
      services: ["jur"],
    },
    {
      icon: Heart,
      name: "ONG Mulheres em Rede",
      dist: "6,0 km",
      services: ["psi", "soc"],
    },
  ];
  const serviceLabels: Record<string, { i: ElementType; t: string }> = {
    jur: { i: Scale, t: "Jurídico" },
    psi: { i: Heart, t: "Psicológico" },
    soc: { i: Users, t: "Social" },
    abr: { i: HomeIcon, t: "Abrigo" },
  };

  if (confirmingIdx !== null) {
    const p = places[confirmingIdx];
    return (
      <div className="min-h-full bg-white pb-8">
        <SimpleHeader
          title="Confirmar contato"
          onBack={() => setConfirmingIdx(null)}
        />
        <div className="px-5">
          <div className="rounded-2xl border-2 border-primary bg-primary/5 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[14px] font-bold leading-tight">
                  {p.name}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {p.dist} de você
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              O que será compartilhado
            </div>
            <ul className="mt-3 space-y-2 text-[13px]">
              {[
                "Seu nome e telefone de contato",
                "Cidade e bairro (para direcionar unidade)",
                "Resumo genérico do padrão detectado",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-white p-2.5 text-[11px] text-muted-foreground">
              <X className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                Nenhum dado bancário ou histórico de transações será enviado.
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-2.5">
            <PrimaryButton onClick={() => go("1")}>
              Confirmar contato
            </PrimaryButton>
            <SecondaryButton onClick={() => setConfirmingIdx(null)}>
              Cancelar
            </SecondaryButton>
          </div>
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Você pode revogar esse consentimento a qualquer momento em
            Configurações.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white pb-8">
      <SimpleHeader title="Encaminhamento" onBack={() => go("5")} />
      <div className="px-5">
        <h2 className="text-[18px] font-extrabold leading-tight">
          Encontramos esses pontos de apoio perto de você
        </h2>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> Ordenados por proximidade ·{" "}
          <button className="underline">alterar CEP</button>
        </div>

        <div className="mt-4 space-y-3">
          {places.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-white p-3.5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-bold leading-tight">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {p.dist} de você
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.services.map((s) => {
                      const sv = serviceLabels[s];
                      return (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                        >
                          <sv.i className="h-3 w-3" />
                          {sv.t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary bg-white py-2 text-[11px] font-bold text-primary">
                  <Navigation className="h-3.5 w-3.5" /> Ver rota
                </button>
                <button
                  onClick={() => setConfirmingIdx(i)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary py-2 text-[11px] font-bold text-primary-foreground"
                >
                  <Phone className="h-3.5 w-3.5" /> Iniciar contato
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-primary/40 bg-primary/5 p-3 text-[12px] leading-relaxed">
          <b>Se você está em risco imediato:</b> ligue <b>190</b> (Polícia
          Militar) ou <b>180</b> (Central de Atendimento à Mulher).
        </div>
      </div>
    </div>
  );
}

/* ============ SCREEN 7 — ONBOARDING / LGPD (no trusted contact) ============ */
function Screen7Onboarding({ go }: { go: (s: ScreenId) => void }) {
  const [feature, setFeature] = useState(true);
  const [bio, setBio] = useState(false);
  return (
    <div className="min-h-full bg-white pb-8">
      <SimpleHeader title="Configurações" onBack={() => go("1")} />
      <div className="px-5">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10">
          <ShieldCheck className="h-8 w-8 text-primary" strokeWidth={1.6} />
        </div>
        <h1 className="mt-4 text-[22px] font-extrabold leading-tight">
          Ativar proteção contra violência patrimonial
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Um recurso desenhado para identificar padrões incomuns nas suas
          movimentações e oferecer apoio, com respeito à sua privacidade.
        </p>

        <div className="mt-5 flex items-center justify-between rounded-2xl border-2 border-primary bg-primary/5 p-4">
          <div className="pr-4">
            <div className="text-[14px] font-bold">Proteção BIA</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">
              Ativar detecção discreta
            </div>
          </div>
          <Toggle on={feature} onChange={setFeature} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3">
          <div className="rounded-xl bg-muted/50 p-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
              O que faz
            </div>
            <ul className="mt-2 space-y-1.5 text-[12px]">
              <li className="flex gap-2">
                <Check className="h-4 w-4 shrink-0 text-primary" /> Analisa
                padrões só no seu aparelho
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 shrink-0 text-primary" /> Sugere
                conteúdos da cartilha
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 shrink-0 text-primary" /> Conecta você
                à rede pública de apoio, se você quiser
              </li>
            </ul>
          </div>
          <div className="rounded-xl bg-muted/50 p-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              O que NÃO faz
            </div>
            <ul className="mt-2 space-y-1.5 text-[12px]">
              <li className="flex gap-2">
                <X className="h-4 w-4 shrink-0 text-muted-foreground" /> Nunca
                aciona a polícia sem sua autorização
              </li>
              <li className="flex gap-2">
                <X className="h-4 w-4 shrink-0 text-muted-foreground" /> Não
                avisa nenhum contato pessoal
              </li>
              <li className="flex gap-2">
                <X className="h-4 w-4 shrink-0 text-muted-foreground" /> Não
                compartilha dados com terceiros
              </li>
              <li className="flex gap-2">
                <X className="h-4 w-4 shrink-0 text-muted-foreground" /> Não
                bloqueia suas transações
              </li>
            </ul>
          </div>
        </div>

        <button className="mt-4 text-[12px] font-semibold text-primary underline">
          Saiba como seus dados são usados
        </button>

        <div className="mt-6 rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[13px] font-bold">
                Uso de biometria facial
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                Consentimento específico para esta finalidade, separado do
                login.
              </div>
            </div>
            <Toggle on={bio} onChange={setBio} />
          </div>
        </div>

        <div className="mt-6">
          <PrimaryButton onClick={() => go("1")}>Salvar e voltar</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

/* ============ SCREEN Pix 1 — value + recipient ============ */
function ScreenPix1({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex min-h-full flex-col bg-white pb-8">
      <SimpleHeader title="Pix" onBack={() => go("1")} />
      <div className="px-5">
        <label className="text-[12px] font-bold text-foreground/70">
          Valor
        </label>
        <div className="mt-1 flex items-baseline gap-2 rounded-xl border border-border bg-muted/40 px-4 py-4">
          <span className="text-[14px] font-bold text-muted-foreground">
            R$
          </span>
          <span className="text-[26px] font-extrabold">3.850,00</span>
        </div>

        <label className="mt-5 block text-[12px] font-bold text-foreground/70">
          Destinatário
        </label>
        <div className="mt-1 flex items-center gap-3 rounded-xl border border-border p-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary font-bold">
            J
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold leading-tight">
              João S. (destinatário frequente)
            </div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">
              Chave: ***.456.789-**
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>

        <label className="mt-5 block text-[12px] font-bold text-foreground/70">
          Descrição (opcional)
        </label>
        <input
          readOnly
          placeholder="Ex.: aluguel, mercado…"
          className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-[13px] outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-auto px-5 pt-6">
        <PrimaryButton onClick={() => go("pix2")}>Continuar</PrimaryButton>
      </div>
    </div>
  );
}

/* ============ SCREEN Pix 2 — review ============ */
function ScreenPix2({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex min-h-full flex-col bg-white pb-8">
      <SimpleHeader title="Revisar transferência" onBack={() => go("pix1")} />
      <div className="px-5">
        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <div className="text-center">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Você vai transferir
            </div>
            <div className="mt-1 text-[28px] font-extrabold text-primary">
              R$ 3.850,00
            </div>
          </div>
          <div className="mt-4 space-y-2 text-[13px]">
            <Row k="Para" v="João S." />
            <Row k="Chave" v="***.456.789-**" />
            <Row k="Instituição" v="Banco XYZ" />
            <Row k="Data" v="Hoje, 09:41" />
            <Row k="Tipo" v="Pix" />
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-primary/5 p-3 text-[11px] leading-relaxed text-foreground/70">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            Por segurança, esta transferência exigirá{" "}
            <b>confirmação de identidade</b> na próxima etapa.
          </span>
        </div>
      </div>

      <div className="mt-auto space-y-2.5 px-5 pt-6">
        <PrimaryButton onClick={() => go("9")}>Confirmar</PrimaryButton>
        <SecondaryButton onClick={() => go("pix1")}>Editar</SecondaryButton>
      </div>
    </div>
  );
}

/* ============ SCREEN 9 — BIOMETRY ============ */
function Screen9Biometry({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <SimpleHeader title="Confirme sua identidade" onBack={() => go("pix2")} />
      <div className="flex flex-1 flex-col items-center px-6 pt-4">
        <p className="text-center text-[13px] text-muted-foreground">
          Para concluir a transferência, posicione seu rosto no centro do
          quadro.
        </p>

        <div className="relative mt-8 h-64 w-64">
          <span className="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-primary rounded-tl-2xl" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-primary rounded-tr-2xl" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />
          <div className="absolute inset-4 grid place-items-center rounded-full bg-muted/60">
            <Camera
              className="h-16 w-16 text-muted-foreground"
              strokeWidth={1.2}
            />
          </div>
        </div>

        <p className="mt-8 text-center text-[12px] text-muted-foreground">
          Verificação criptografada e usada apenas para esta transação.
        </p>

        <div className="mt-auto w-full space-y-2.5 pb-8 pt-8">
          <PrimaryButton onClick={() => go("10a")}>
            Simular verificação normal
          </PrimaryButton>
          <SecondaryButton onClick={() => go("10b")}>
            Simular gesto alternativo
          </SecondaryButton>
          <p className="pt-1 text-center text-[10px] text-muted-foreground">
            (Botões de simulação exclusivos do protótipo)
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============ SCREEN 10a — SUCCESS ============ */
function Screen10Success({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <SimpleHeader title="Transferência" onBack={() => go("1")} />
      <div className="flex flex-1 flex-col items-center px-6 pt-10">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-success/15">
          <Check
            className="h-12 w-12"
            style={{ color: "var(--success)" }}
            strokeWidth={3}
          />
        </div>
        <h1 className="mt-6 text-[22px] font-extrabold">
          Transferência realizada
        </h1>
        <p className="mt-2 text-center text-[13px] text-muted-foreground">
          Seu Pix de R$ 3.850,00 foi enviado com sucesso.
        </p>

        <div className="mt-6 w-full rounded-2xl border border-border bg-muted/40 p-4 text-[13px]">
          <Row k="Para" v="João S." />
          <Row k="Valor" v="R$ 3.850,00" />
          <Row k="Data" v="Hoje, 09:41" />
          <Row k="Comprovante" v="123.456.789" />
        </div>

        <div className="mt-auto w-full space-y-2.5 pb-8 pt-8">
          <PrimaryButton onClick={() => go("1")}>
            Voltar ao início
          </PrimaryButton>
          <SecondaryButton>Compartilhar comprovante</SecondaryButton>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2 last:border-b-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}

/* ============ SCREEN 10b — DECOY (silent referral in background) ============ */
function Screen10Decoy({ go }: { go: (s: ScreenId) => void }) {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <SimpleHeader title="Transferência" onBack={() => go("1")} />
      <div className="flex flex-1 flex-col items-center px-6 pt-12">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-primary/10">
          <AlertCircle className="h-12 w-12 text-primary" strokeWidth={1.6} />
        </div>
        <h1 className="mt-6 text-center text-[20px] font-extrabold leading-tight">
          Não foi possível confirmar sua identidade
        </h1>
        <p className="mt-3 text-center text-[13px] leading-relaxed text-muted-foreground">
          Tente novamente mais tarde.
        </p>

        <div className="mt-8 w-full rounded-xl border border-border bg-muted/40 p-3 text-center text-[11px] text-muted-foreground">
          Código: BIO-4013 · Se o problema persistir, contate o SAC.
        </div>

        <div className="mt-auto w-full space-y-2.5 pb-8 pt-8">
          <PrimaryButton onClick={() => go("1")}>
            Voltar ao início
          </PrimaryButton>
          <SecondaryButton onClick={() => go("9")}>
            Tentar novamente
          </SecondaryButton>
          <p className="pt-1 text-center text-[10px] text-muted-foreground italic">
            (Em segundo plano: a tela de encaminhamento institucional é aberta
            silenciosamente — sem notificar contato pessoal.)
          </p>
        </div>
      </div>
    </div>
  );
}
