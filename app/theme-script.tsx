export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = theme || (prefersDark ? 'dark' : 'light');
        
        const html = document.documentElement;
        html.setAttribute('data-theme', initialTheme);
        if (initialTheme === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  );
}
