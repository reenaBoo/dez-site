export interface VideoEmbed {
  provider: 'youtube' | 'vk' | 'rutube';
  embedUrl: string;
  thumbnail: string | null;
}

// Ссылка на ролик → адрес iframe. Поддерживаются YouTube, VK Видео и RuTube
export function parseVideoUrl(raw: string): VideoEmbed | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\.|^m\./, '');

  if (host === 'youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com') {
    const id = host === 'youtu.be'
      ? url.pathname.slice(1)
      : url.searchParams.get('v') ?? url.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/)?.[1];
    if (!id || !/^[\w-]{6,20}$/.test(id)) return null;
    return {
      provider: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }

  if (host === 'vk.com' || host === 'vkvideo.ru' || host === 'vk.ru') {
    if (url.pathname === '/video_ext.php') {
      const oid = url.searchParams.get('oid');
      const id = url.searchParams.get('id');
      if (!oid || !id) return null;
      return { provider: 'vk', embedUrl: `https://vk.com/video_ext.php?oid=${oid}&id=${id}&hd=2&autoplay=1`, thumbnail: null };
    }
    const match = (url.pathname + url.search).match(/video(-?\d+)_(\d+)/);
    if (!match) return null;
    return { provider: 'vk', embedUrl: `https://vk.com/video_ext.php?oid=${match[1]}&id=${match[2]}&hd=2&autoplay=1`, thumbnail: null };
  }

  if (host === 'rutube.ru') {
    const id = url.pathname.match(/^\/(?:video|play\/embed)\/([a-f0-9]{32})/)?.[1];
    if (!id) return null;
    return { provider: 'rutube', embedUrl: `https://rutube.ru/play/embed/${id}?autoplay=1`, thumbnail: null };
  }

  return null;
}

export const VIDEO_PROVIDER_LABEL: Record<VideoEmbed['provider'], string> = {
  youtube: 'YouTube',
  vk: 'VK Видео',
  rutube: 'RuTube',
};
