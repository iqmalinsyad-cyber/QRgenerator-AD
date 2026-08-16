import { QRContentType, QRFormState } from '../types';

export function generateQRPayload(formState: QRFormState): { raw: string; display: string; title: string } {
  switch (formState.type) {
    case 'url': {
      let url = formState.url.trim();
      if (url && !url.match(/^[a-zA-Z]+:\/\//)) {
        url = 'https://' + url;
      }
      return {
        raw: url || 'https://homielab.com',
        display: url || 'https://homielab.com',
        title: url ? `Pautan: ${url.replace(/^https?:\/\//, '')}` : 'Pautan Web',
      };
    }

    case 'text': {
      const text = formState.text.trim() || 'Selamat Datang ke QR Code Generator!';
      const preview = text.length > 40 ? text.substring(0, 37) + '...' : text;
      return {
        raw: text,
        display: preview,
        title: `Teks: ${preview}`,
      };
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = formState.wifi;
      // Format: WIFI:S:MySSID;T:WPA;P:MyPassword;H:false;;
      const escape = (str: string) => str.replace(/([\\;,:"])/g, '\\$1');
      const safeSsid = escape(ssid || 'Nama_WiFi');
      const safePass = password ? escape(password) : '';
      const raw = `WIFI:S:${safeSsid};T:${encryption || 'WPA'};P:${safePass};H:${hidden ? 'true' : 'false'};;`;
      return {
        raw,
        display: `SSID: ${ssid || 'Nama_WiFi'} (${encryption})`,
        title: `Wi-Fi: ${ssid || 'Rangkaian Wi-Fi'}`,
      };
    }

    case 'vcard': {
      const v = formState.vcard;
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName || ''};${v.firstName || ''};;;`,
        `FN:${`${v.firstName || ''} ${v.lastName || ''}`.trim() || 'Kenalan'}`,
      ];
      if (v.company) lines.push(`ORG:${v.company}`);
      if (v.title) lines.push(`TITLE:${v.title}`);
      if (v.phone) lines.push(`TEL;TYPE=WORK,VOICE:${v.phone}`);
      if (v.mobile) lines.push(`TEL;TYPE=CELL,VOICE:${v.mobile}`);
      if (v.email) lines.push(`EMAIL;TYPE=PREF,INTERNET:${v.email}`);
      if (v.website) lines.push(`URL:${v.website}`);
      if (v.address || v.city || v.country) {
        lines.push(`ADR;TYPE=WORK:;;${v.address || ''};${v.city || ''};;;${v.country || ''}`);
      }
      if (v.note) lines.push(`NOTE:${v.note}`);
      lines.push('END:VCARD');

      const fullName = `${v.firstName || ''} ${v.lastName || ''}`.trim() || 'Kad Kenalan';
      return {
        raw: lines.join('\n'),
        display: `${fullName} (${v.phone || v.email || 'vCard'})`,
        title: `vCard: ${fullName}`,
      };
    }

    case 'email': {
      const { recipient, subject, body } = formState.email;
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (body) params.append('body', body);
      const query = params.toString() ? `?${params.toString()}` : '';
      const raw = `mailto:${recipient || ''}${query}`;
      return {
        raw: recipient ? raw : 'mailto:contoh@email.com',
        display: recipient ? `Kepada: ${recipient} | Tajuk: ${subject || '(tiada)'}` : 'mailto:contoh@email.com',
        title: `E-mel: ${recipient || 'contoh@email.com'}`,
      };
    }

    case 'phone': {
      const cleanPhone = formState.phone.trim().replace(/[^\d+]/g, '');
      return {
        raw: cleanPhone ? `tel:${cleanPhone}` : 'tel:+60123456789',
        display: cleanPhone || '+60123456789',
        title: `Panggilan: ${cleanPhone || '+60123456789'}`,
      };
    }

    case 'sms': {
      const { phone, message } = formState.sms;
      const cleanPhone = phone.trim().replace(/[^\d+]/g, '');
      const raw = `smsto:${cleanPhone}:${message || ''}`;
      return {
        raw: cleanPhone ? raw : 'smsto:+60123456789:Mesej',
        display: `${cleanPhone || '+60123456789'} - ${message || '(tiada mesej)'}`,
        title: `SMS: ${cleanPhone || '+60123456789'}`,
      };
    }

    case 'whatsapp': {
      const { countryCode, phone, message } = formState.whatsapp;
      const cleanCode = countryCode.replace('+', '').trim() || '60';
      let cleanNum = phone.trim().replace(/\D/g, '');
      if (cleanNum.startsWith('0')) {
        cleanNum = cleanNum.substring(1);
      }
      const fullNumber = `${cleanCode}${cleanNum}`;
      const url = `https://wa.me/${fullNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
      return {
        raw: fullNumber ? url : 'https://wa.me/60123456789',
        display: `+${fullNumber} ${message ? `("${message}")` : ''}`,
        title: `WhatsApp: +${fullNumber || '60123456789'}`,
      };
    }

    case 'social': {
      const { platform, username } = formState.social;
      const cleanUser = username.trim().replace(/^@/, '');
      const urls: Record<string, string> = {
        instagram: `https://instagram.com/${cleanUser}`,
        tiktok: `https://tiktok.com/@${cleanUser}`,
        youtube: `https://youtube.com/@${cleanUser}`,
        facebook: `https://facebook.com/${cleanUser}`,
        twitter: `https://x.com/${cleanUser}`,
        linkedin: `https://linkedin.com/in/${cleanUser}`,
        telegram: `https://t.me/${cleanUser}`,
        github: `https://github.com/${cleanUser}`,
      };
      const raw = cleanUser ? urls[platform] || `https://${platform}.com/${cleanUser}` : `https://instagram.com/`;
      return {
        raw,
        display: `@${cleanUser} (${platform})`,
        title: `${platform.toUpperCase()}: @${cleanUser || 'username'}`,
      };
    }

    case 'event': {
      const ev = formState.event;
      const formatICalDate = (dateStr: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      const start = formatICalDate(ev.startDate) || '20261231T090000Z';
      const end = formatICalDate(ev.endDate) || '20261231T170000Z';

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${ev.title || 'Acara Baru'}`,
        `LOCATION:${ev.location || ''}`,
        `DESCRIPTION:${ev.description || ''}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        'END:VEVENT',
        'END:VCALENDAR',
      ];
      return {
        raw: lines.join('\n'),
        display: `${ev.title || 'Acara'} - ${ev.location || 'Lokasi'}`,
        title: `Acara: ${ev.title || 'Acara Baru'}`,
      };
    }

    case 'crypto': {
      const { currency, address, amount, label } = formState.crypto;
      let raw = address;
      if (currency === 'bitcoin') {
        const params = new URLSearchParams();
        if (amount) params.append('amount', amount);
        if (label) params.append('label', label);
        raw = `bitcoin:${address}${params.toString() ? `?${params.toString()}` : ''}`;
      } else if (currency === 'ethereum') {
        const params = new URLSearchParams();
        if (amount) params.append('value', amount);
        raw = `ethereum:${address}${params.toString() ? `?${params.toString()}` : ''}`;
      } else {
        raw = `${currency}:${address}`;
      }

      return {
        raw: address ? raw : 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        display: `${currency.toUpperCase()}: ${address ? address.substring(0, 10) + '...' : 'Alamat Kripto'}`,
        title: `Kripto: ${currency.toUpperCase()}`,
      };
    }

    default:
      return {
        raw: 'https://homielab.com',
        display: 'https://homielab.com',
        title: 'Kod QR',
      };
  }
}

export function parseDecodedQR(content: string): {
  type: QRContentType;
  title: string;
  display: string;
} {
  const trimmed = content.trim();

  if (trimmed.startsWith('WIFI:')) {
    const ssidMatch = trimmed.match(/S:([^;]+)/);
    const ssid = ssidMatch ? ssidMatch[1] : 'Rangkaian Wi-Fi';
    return {
      type: 'wifi',
      title: `Wi-Fi: ${ssid}`,
      display: `Kata Laluan & Rangkaian (${ssid})`,
    };
  }

  if (trimmed.startsWith('BEGIN:VCARD')) {
    const fnMatch = trimmed.match(/FN:([^\n\r]+)/);
    const name = fnMatch ? fnMatch[1].trim() : 'Kad Kenalan';
    return {
      type: 'vcard',
      title: `vCard: ${name}`,
      display: name,
    };
  }

  if (trimmed.startsWith('mailto:')) {
    const email = trimmed.replace('mailto:', '').split('?')[0];
    return {
      type: 'email',
      title: `E-mel: ${email}`,
      display: email,
    };
  }

  if (trimmed.startsWith('tel:')) {
    const phone = trimmed.replace('tel:', '');
    return {
      type: 'phone',
      title: `Panggilan: ${phone}`,
      display: phone,
    };
  }

  if (trimmed.startsWith('smsto:')) {
    const parts = trimmed.replace('smsto:', '').split(':');
    return {
      type: 'sms',
      title: `SMS: ${parts[0]}`,
      display: parts[0],
    };
  }

  if (trimmed.includes('wa.me/') || trimmed.includes('whatsapp.com/send')) {
    return {
      type: 'whatsapp',
      title: 'WhatsApp Chat',
      display: trimmed,
    };
  }

  if (trimmed.startsWith('BEGIN:VCALENDAR') || trimmed.includes('BEGIN:VEVENT')) {
    const sumMatch = trimmed.match(/SUMMARY:([^\n\r]+)/);
    return {
      type: 'event',
      title: sumMatch ? `Acara: ${sumMatch[1]}` : 'Acara Kalendar',
      display: sumMatch ? sumMatch[1] : 'Acara Kalendar',
    };
  }

  if (trimmed.match(/^(bitcoin|ethereum|solana):/i)) {
    return {
      type: 'crypto',
      title: 'Dompet Kripto',
      display: trimmed,
    };
  }

  if (trimmed.match(/^https?:\/\//i) || trimmed.match(/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i)) {
    return {
      type: 'url',
      title: `Pautan Web`,
      display: trimmed,
    };
  }

  return {
    type: 'text',
    title: 'Teks Biasa',
    display: trimmed.length > 40 ? trimmed.substring(0, 37) + '...' : trimmed,
  };
}
