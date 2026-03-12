import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const GATE_PASSWORD = "serenitea2026";

const translations = {
  en: {
    title: "Coming Soon",
    subtitle: "We're brewing something special. Enter the password to preview.",
    placeholder: "Enter password",
    button: "Enter",
    wrong: "Incorrect password, please try again.",
  },
  nl: {
    title: "Binnenkort beschikbaar",
    subtitle: "We brouwen iets bijzonders. Voer het wachtwoord in om een preview te bekijken.",
    placeholder: "Voer wachtwoord in",
    button: "Verder",
    wrong: "Onjuist wachtwoord, probeer het opnieuw.",
  },
};

export const ComingSoonGate = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem("serenitea_unlocked") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === GATE_PASSWORD) {
      sessionStorage.setItem("serenitea_unlocked", "true");
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground tracking-tight">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder={t.placeholder}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-center text-lg tracking-widest"
            autoFocus
          />
          {error && (
            <p className="text-destructive text-sm">{t.wrong}</p>
          )}
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            {t.button}
          </button>
        </form>

        <p className="text-xs text-muted-foreground/60">SereniTea © 2026</p>
      </div>
    </div>
  );
};
