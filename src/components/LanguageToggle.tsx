import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
          language === 'en'
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground/70 hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('nl')}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
          language === 'nl'
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground/70 hover:text-foreground"
        )}
      >
        NL
      </button>
    </div>
  );
};
