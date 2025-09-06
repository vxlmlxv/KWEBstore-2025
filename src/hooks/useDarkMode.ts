import { useState, useEffect } from "react";

const THEME_STORAGE_KEY = "kwebstore-theme";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // 로컬스토리지에서 테마 설정 로드
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setIsDarkMode(isDark);
      updateTheme(isDark);
    } else {
      // 시스템 테마 설정 확인
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
      updateTheme(prefersDark);
    }
  }, []);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    updateTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme ? "dark" : "light");
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
