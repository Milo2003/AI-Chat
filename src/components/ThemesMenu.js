// 'use client';

// import { Sun, Moon, Monitor } from 'lucide-react';
// import { useState, useEffect } from 'react';

// const THEMES = ['Light', 'Dark']; //'System'];

// export const ThemesMenu = () => {
//   const [theme, setTheme] = useState('light');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const storedTheme = localStorage.getItem('theme') || 'system';
//     setTheme(storedTheme);
//     updateTheme(storedTheme);
//   }, []);

//   const updateTheme = (themePreference) => {
//     const isDark =
//       themePreference === 'dark' ||
//       (themePreference === 'system' &&
//         window.matchMedia('(prefers-color-scheme: dark)').matches);

//     document.documentElement.classList.toggle('dark', isDark);
//     setTheme(themePreference);
//   };

//   const handleThemeChange = (newTheme) => {
//     localStorage.setItem('theme', newTheme.toLowerCase());
//     updateTheme(newTheme);
//     setIsMenuOpen(false);
//   };

//   return (
//     <div className="relative ml-1 mr-1">
//       <button
//         id="theme-toggle-btn"
//         className="appearance-none border-none flex hover:scale-150 transition"
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//       >
//         <Sun
//           className={`theme-toggle-icon size-5 transition-all ${
//             theme === 'light' ? 'scale-100' : 'scale-0'
//           }`}
//         />
//         <Moon
//           className={`theme-toggle-icon absolute size-5 transition-all ${
//             theme === 'dark' ? 'scale-100' : 'scale-0'
//           }`}
//         />
//         {/* <Monitor
//           className={`theme-toggle-icon absolute size-5 transition-all ${
//             theme === 'system' ? 'scale-100' : 'scale-0'
//           }`}
//         /> */}
//       </button>
//       {isMenuOpen && (
//         <div
//           id="themes-menu"
//           className="absolute scale-80 top-8 right-0 text-sm p-1 min-w-[8rem] rounded-md border border-gray-100 bg-white/90 dark:bg-gray-900/90 dark:border-gray-500/20 shadow-lg backdrop-blur-md"
//         >
//           <ul>
//             {THEMES.map((themeOption) => (
//               <li
//                 key={themeOption}
//                 className="themes-menu-option px-2 py-1.5 cursor-pointer hover:bg-neutral-400/40 dark:hover:bg-gray-500/50 rounded-sm"
//                 onClick={() => handleThemeChange(themeOption)}
//               >
//                 {themeOption}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
