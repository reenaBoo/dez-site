import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { theme } from '@/styles/theme';

export const OG_SIZE = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), 'src/assets/og-fonts');

// Шрифты и логотип читаются один раз на процесс
type OgFonts = NonNullable<NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts']>;
let assets: Promise<{ fonts: OgFonts; logo: string }> | null = null;

function loadAssets() {
  assets ??= (async () => {
    const file = (name: string) => readFile(join(fontDir, `${name}.woff`));
    const [m800c, m800l, m500c, m500l, monoC, monoL, logo] = await Promise.all([
      file('manrope-cyrillic-800-normal'),
      file('manrope-latin-800-normal'),
      file('manrope-cyrillic-500-normal'),
      file('manrope-latin-500-normal'),
      file('jetbrains-mono-cyrillic-500-normal'),
      file('jetbrains-mono-latin-500-normal'),
      readFile(join(process.cwd(), 'public/images/logo_transparent.png')),
    ]);
    return {
      fonts: [
        { name: 'Manrope', data: m800c, weight: 800 as const, style: 'normal' as const },
        { name: 'Manrope', data: m800l, weight: 800 as const, style: 'normal' as const },
        { name: 'Manrope', data: m500c, weight: 500 as const, style: 'normal' as const },
        { name: 'Manrope', data: m500l, weight: 500 as const, style: 'normal' as const },
        { name: 'Mono', data: monoC, weight: 500 as const, style: 'normal' as const },
        { name: 'Mono', data: monoL, weight: 500 as const, style: 'normal' as const },
      ],
      logo: `data:image/png;base64,${logo.toString('base64')}`,
    };
  })();
  return assets;
}

interface OgInput {
  title: string;
  kicker?: string;
  subtitle?: string;
  accent?: string;
}

// Фирменная OG-картинка: тёмный фон, золотой акцент, логотип, заголовок
export async function renderOgImage({ title, kicker, subtitle, accent = theme.colors.primary }: OgInput) {
  const { fonts, logo } = await loadAssets();
  const titleSize = title.length > 70 ? 54 : title.length > 40 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: `radial-gradient(circle at 85% 10%, ${accent}33 0%, transparent 45%), linear-gradient(160deg, #121216 0%, ${theme.colors.background} 60%)`,
          color: theme.colors.heading,
          fontFamily: 'Manrope',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 72, width: 220, height: 4, background: accent, display: 'flex' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={72} height={74} alt=''/>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 800, letterSpacing: 1 }}>
            НПП&nbsp;<span style={{ color: accent }}>«БИОХИММАШ»</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {kicker && (
            <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 22, letterSpacing: 5, color: accent, textTransform: 'uppercase' }}>
              {kicker}
            </div>
          )}
          <div style={{ display: 'flex', fontSize: titleSize, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1, maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 500, color: theme.colors.text, maxWidth: 980 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Mono', fontSize: 20, color: theme.colors.textLight, letterSpacing: 2 }}>
          <span>МОСКВА · МОСКОВСКАЯ ОБЛАСТЬ</span>
          <span style={{ color: accent }}>+7 (495) 956-48-55</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
