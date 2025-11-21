import { useRouter, usePathname } from 'next/navigation';

export const useScrollToSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    const isHomePage = pathname === '/' || pathname === '/dez-site' || pathname === '/dez-site/';

    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100;
        const top = element.offsetTop - offset;
        window.scrollTo({
          top, behavior: 'smooth',
        });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return { scrollToSection };
};
