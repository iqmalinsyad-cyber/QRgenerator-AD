export type QRContentType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'whatsapp'
  | 'social'
  | 'event'
  | 'crypto';

export type DotType =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
export type CornerDotType = 'dot' | 'square';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type FontFamily =
  | 'Plus Jakarta Sans'
  | 'Inter'
  | 'Outfit'
  | 'Montserrat'
  | 'Poppins'
  | 'Playfair Display'
  | 'Merriweather'
  | 'Oswald'
  | 'Roboto Mono'
  | 'Space Grotesk';

export interface GradientConfig {
  enabled: boolean;
  type: 'linear' | 'radial';
  rotation: number; // 0 - 360
  color1: string;
  color2: string;
}

export interface QRStyleConfig {
  // Colors & Gradients
  dotColor: string;
  backgroundColor: string;
  isTransparentBg: boolean;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  cornerSquareColor: string;
  cornerDotColor: string;
  customCornerColors: boolean;
  gradient: GradientConfig;

  // Logo / Icon
  logoUrl: string | null;
  logoSize: number; // ratio 0.1 to 0.4
  logoMargin: number;
  hideBackgroundDots: boolean;

  // Typography & Text (Headings & Captions)
  topHeading: string;
  topHeadingSize: number; // 12 - 36
  topHeadingColor: string;
  topHeadingFont: FontFamily;
  topHeadingBold: boolean;
  topHeadingCase: 'none' | 'uppercase';

  bottomCaption: string;
  bottomCaptionSize: number; // 10 - 28
  bottomCaptionColor: string;
  bottomCaptionFont: FontFamily;
  bottomCaptionBold: boolean;
  bottomCaptionCase: 'none' | 'uppercase';

  // Layout & Settings
  moduleSize: number; // 0.6 to 1.0 (dot scale)
  cardCornerRadius: number; // 0 to 48px
  cardPadding: number; // 8 to 48px
  cardBorderWidth: number; // 0 to 8px
  cardBorderColor: string;
  cardBgColor: string;
  cardShadow: boolean;
  size: number; // in pixels (e.g. 360)
  margin: number; // quiet zone / inner padding (0 to 40)
  errorCorrectionLevel: ErrorCorrectionLevel;
}

export interface WifiData {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  mobile?: string;
  email: string;
  company?: string;
  title?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  note?: string;
}

export interface EmailData {
  recipient: string;
  subject: string;
  body: string;
}

export interface SmsData {
  phone: string;
  message: string;
}

export interface WhatsAppData {
  countryCode: string;
  phone: string;
  message: string;
}

export interface SocialData {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'twitter' | 'linkedin' | 'telegram' | 'github';
  username: string;
}

export interface EventData {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  allDay?: boolean;
}

export interface CryptoData {
  currency: 'bitcoin' | 'ethereum' | 'solana' | 'usdt' | 'tron';
  address: string;
  amount?: string;
  label?: string;
}

export interface QRFormState {
  type: QRContentType;
  url: string;
  text: string;
  wifi: WifiData;
  vcard: VCardData;
  email: EmailData;
  phone: string;
  sms: SmsData;
  whatsapp: WhatsAppData;
  social: SocialData;
  event: EventData;
  crypto: CryptoData;
}

export interface HistoryRecord {
  id: string;
  timestamp: number;
  title: string;
  type: QRContentType;
  displayValue: string;
  rawValue: string;
  styleConfig: QRStyleConfig;
  formState: QRFormState;
  isScanned?: boolean;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  category?: 'classic' | 'gradient' | 'luxury' | 'modern' | 'minimal';
  dotColor: string;
  backgroundColor: string;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  gradient?: GradientConfig;
  cornerSquareColor?: string;
  cornerDotColor?: string;
  customCornerColors?: boolean;
  cardBgColor?: string;
  cardBorderColor?: string;
  cardCornerRadius?: number;
  topHeadingColor?: string;
  bottomCaptionColor?: string;
  topHeadingFont?: FontFamily;
}
