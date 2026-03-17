import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Clock } from "lucide-react";

const translations = {
  en: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you. Drop us a message and we'll get back to you soon.",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",
    success: "Thank you! Your message has been sent.",
    error: "Something went wrong. Please try again.",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    subjectPlaceholder: "How can we help?",
    messagePlaceholder: "Tell us more...",
    info: {
      emailTitle: "Email",
      emailValue: "hello@serenitea.nl",
      locationTitle: "Location",
      locationValue: "The Netherlands",
      hoursTitle: "Response Time",
      hoursValue: "Within 24 hours",
    },
  },
  nl: {
    title: "Neem Contact Op",
    subtitle: "We horen graag van je. Stuur ons een bericht en we nemen snel contact op.",
    name: "Naam",
    email: "E-mail",
    subject: "Onderwerp",
    message: "Bericht",
    send: "Verstuur Bericht",
    sending: "Versturen...",
    success: "Bedankt! Je bericht is verzonden.",
    error: "Er ging iets mis. Probeer het opnieuw.",
    namePlaceholder: "Je naam",
    emailPlaceholder: "je@email.com",
    subjectPlaceholder: "Hoe kunnen we helpen?",
    messagePlaceholder: "Vertel ons meer...",
    info: {
      emailTitle: "E-mail",
      emailValue: "hello@serenitea.nl",
      locationTitle: "Locatie",
      locationValue: "Nederland",
      hoursTitle: "Reactietijd",
      hoursValue: "Binnen 24 uur",
    },
  },
};

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // mailto fallback — no backend needed
    const mailtoLink = `mailto:hello@serenitea.nl?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Info cards */}
            <div className="space-y-8">
              {[
                { icon: Mail, title: t.info.emailTitle, value: t.info.emailValue },
                { icon: MapPin, title: t.info.locationTitle, value: t.info.locationValue },
                { icon: Clock, title: t.info.hoursTitle, value: t.info.hoursValue },
              ].map(({ icon: Icon, title, value }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="text-muted-foreground text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.name}</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.email}</label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.subject}</label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder={t.subjectPlaceholder}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.message}</label>
                <textarea
                  required
                  maxLength={2000}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>

              {status === "success" && (
                <p className="text-primary text-sm font-medium">{t.success}</p>
              )}
              {status === "error" && (
                <p className="text-destructive text-sm font-medium">{t.error}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "sending" ? t.sending : t.send}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
