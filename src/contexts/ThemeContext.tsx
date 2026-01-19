import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Language = 'es' | 'en';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Intentar leer del localStorage primero (tiene prioridad)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      
      // Si hay un tema guardado, usar ese (el toggle manual tiene prioridad)
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
      
      // Si no hay guardado, usar prefers-color-scheme SOLO UNA VEZ al inicializar
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'es';
  });

  // Aplicar tema cuando cambie y guardar en localStorage
  // Esto SOBRESCRIBE completamente el prefers-color-scheme del sistema
  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar clase dark o light para controlar Tailwind CSS
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    
    // Guardar la preferencia en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Prevenir que prefers-color-scheme sincronice automáticamente después del primer render
  useEffect(() => {
    // Crear un listener para detectar cambios de prefers-color-scheme
    // y rechazarlos (ignorar completamente después del primer render)
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (_e: MediaQueryListEvent) => {
      // NO cambiar el tema automáticamente
      // El usuario ya ha establecido su preferencia manual
      console.log('prefers-color-scheme cambió, pero ignorando porque el usuario controla el tema');
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};
