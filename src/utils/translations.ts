export type Language = 'ms' | 'en';

export const translations = {
  ms: {
    // Header & Meta
    appTitle: 'QR Studio',
    appBadge: 'Dinamik',
    appSubtitle: 'Penjana Kod QR Moden, Berwarna & Format PNG / SVG',
    bannerTitle: 'Penjana Kod QR Dinamik & Tersuai',
    bannerDesc: 'Cipta kod QR resolusi tinggi secara percuma dengan pilihan warna, kecerunan, logo jenama, muat turun vektor SVG & PNG, serta sokongan saiz fleksibel.',
    badgeSvgPng: 'Format Vektor SVG & PNG',
    badgeFree: '100% Percuma',
    scanQrBtn: 'Imbas QR',
    historyBtn: 'Sejarah',
    resetTooltip: 'Tetapkan Semula (Reset)',
    resetConfirm: 'Tetapkan semula borang dan gaya kod QR ke asal?',

    // Content Types
    chooseContentType: 'Pilih Jenis Kandungan Kod QR',
    availableFormats: '11 Jenis Format Tersedia',
    type_url: 'Pautan (URL)',
    type_url_sub: 'Laman web & pautan',
    type_text: 'Teks Bebas',
    type_text_sub: 'Mesej & nota',
    type_wifi: 'Wi-Fi',
    type_wifi_sub: 'Sambung automatik',
    type_whatsapp: 'WhatsApp',
    type_whatsapp_sub: 'Mesej terus',
    type_vcard: 'Kad Kenalan',
    type_vcard_sub: 'vCard perniagaan',
    type_email: 'E-mel',
    type_email_sub: 'Draf surat elektronik',
    type_phone: 'Panggilan',
    type_phone_sub: 'Dail nombor telefon',
    type_sms: 'SMS',
    type_sms_sub: 'Pesanan ringkas',
    type_social: 'Media Sosial',
    type_social_sub: 'IG, TikTok, FB, YT',
    type_event: 'Acara / Tarikh',
    type_event_sub: 'Simpan ke kalendar',
    type_crypto: 'Kripto / Wallet',
    type_crypto_sub: 'BTC, ETH, SOL',

    // URL Form
    urlLabel: 'Alamat Laman Web (URL)',
    urlPlaceholder: 'https://contoh-laman-web.com',
    urlHelper: 'Masukkan URL lengkap bersama https:// atau domain langsung.',
    quickLinks: 'Pilihan Pantas:',

    // Text Form
    textLabel: 'Teks Bebas / Catatan',
    textChars: 'aksara',
    textPlaceholder: 'Tuliskan sebarang mesej, nota, kata laluan, atau pengumuman di sini...',
    textHelper: 'Sesuai untuk sebarang teks biasa yang boleh dibaca terus oleh mana-mana aplikasi pengimbas QR.',

    // Wifi Form
    wifiSsid: 'Nama Rangkaian (SSID) *',
    wifiSsidPlaceholder: 'cth: HomieLab_5G',
    wifiEncryption: 'Jenis Keselamatan',
    wifiEncWpa: 'WPA / WPA2 / WPA3 (Biasa)',
    wifiEncWep: 'WEP (Lama)',
    wifiEncNone: 'Tiada Kata Laluan (Terbuka)',
    wifiPass: 'Kata Laluan Wi-Fi',
    wifiPassPlaceholder: 'Masukkan kata laluan',
    wifiHidden: 'Rangkaian SSID tersembunyi (Hidden Network)',
    wifiTip: 'Petua Pintar: Apabila tetamu atau pelanggan mengimbas QR ini, peranti mereka (iOS/Android) akan terus menawarkan sambungan automatik ke Wi-Fi tanpa perlu menaip kata laluan.',

    // vCard Form
    vcardFname: 'Nama Pertama *',
    vcardLname: 'Nama Akhir / Keluarga',
    vcardPhone: 'Nombor Telefon Utama *',
    vcardEmail: 'Alamat E-mel',
    vcardCompany: 'Syarikat / Organisasi',
    vcardTitle: 'Jawatan / Gelaran',
    vcardWebsite: 'Laman Web',
    vcardAddress: 'Lokasi / Alamat',
    vcardNote: 'Nota Tambahan (Pilihan)',
    vcardNotePlaceholder: 'cth: Hubungi melalui WhatsApp untuk urusan rasmi',

    // Email Form
    emailRecipient: 'Alamat E-mel Penerima *',
    emailRecipientPlaceholder: 'nama@syarikat.com',
    emailSubject: 'Subjek / Tajuk E-mel',
    emailSubjectPlaceholder: 'cth: Pertanyaan Sebut Harga Produk',
    emailBody: 'Kandungan Mesej',
    emailBodyPlaceholder: 'Tuliskan draf mesej di sini...',

    // Phone Form
    phoneLabel: 'Nombor Telefon (Panggilan Terus) *',
    phonePlaceholder: '+60123456789 atau 0198765432',
    phoneHelper: 'Imbasan akan terus membuka aplikasi pendail (phone dialer) telefon bimbit pengguna.',

    // SMS Form
    smsPhone: 'Nombor Telefon Penerima SMS *',
    smsMessage: 'Teks Mesej SMS',
    smsPlaceholder: 'cth: INFO PROMO DISKAUN20',

    // WhatsApp Form
    waCountryCode: 'Kod Negara',
    waPhone: 'Nombor Telefon (tanpa 0 di hadapan) *',
    waMessage: 'Mesej Automatik (Pra-isi)',
    waMessagePlaceholder: 'Hai, saya berminat untuk membuat tempahan...',
    waLinkPreview: 'Pautan:',

    // Social Form
    socialPlatformLabel: 'Pilih Platform Media Sosial',
    socialUsername: 'Nama Pengguna / Username *',
    socialPlaceholder: 'cth: username_anda',

    // Event Form
    eventTitle: 'Tajuk Acara / Mesyuarat *',
    eventTitlePlaceholder: 'cth: Majlis Pelancaran Produk',
    eventStart: 'Tarikh & Masa Mula *',
    eventEnd: 'Tarikh & Masa Tamat',
    eventLocation: 'Lokasi Acara',
    eventLocationPlaceholder: 'cth: Dewan Perdana KL / Google Meet',
    eventDesc: 'Keterangan Acara',
    eventDescPlaceholder: 'Keterangan ringkas atau agenda...',

    // Crypto Form
    cryptoCurrency: 'Mata Wang Kripto',
    cryptoAmount: 'Jumlah (Pilihan)',
    cryptoAddress: 'Alamat Dompet (Wallet Address) *',
    cryptoAddressPlaceholder: 'cth: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',

    // Style Customizer
    styleCustomizerTitle: 'Kustomasi & Reka Bentuk QR',
    styleCustomizerSub: 'Penyesuaian Visual Lengkap',
    tabPresets: 'Gaya Tema (24+)',
    tabShapes: 'Bentuk & Sudut',
    tabText: 'Teks & Tajuk',
    tabLayout: 'Susun Atur & Saiz',
    tabColors: 'Warna & Kecerunan',
    tabLogo: 'Logo / Ikon',

    // Style Categories
    catAll: 'Semua Gaya',
    catGradient: 'Kecerunan',
    catLuxury: 'Mewah & Elegan',
    catModern: 'Moden & Kreatif',
    catClassic: 'Klasik',
    catMinimal: 'Minimalis',
    presetDescHelper: 'Pilih daripada 24+ tema pratetap untuk menukar rupa visual QR serta-merta:',

    // Module Shapes & Finder Frames
    moduleShapeLabel: 'Bentuk Modul / Corak Titik (Module Shape)',
    moduleShapeDesc: 'Pilih corak bentuk titik piksel utama dalam kod QR.',
    finderFrameLabel: 'Bingkai Sudut (Finder Frame / Eye Box)',
    finderFrameDesc: 'Bentuk bingkai luar 3 sudut pengimbas QR.',
    finderCenterLabel: 'Pusat Titik Sudut (Finder Center / Eye Dot)',
    finderCenterDesc: 'Bentuk titik tengah dalam 3 sudut pengimbas QR.',

    dotPatternSquare: 'Petak (Klasik Matrix)',
    dotPatternRounded: 'Bucu Bulat Lembut',
    dotPatternDots: 'Titik Bulat Penuh',
    dotPatternExtraRounded: 'Bujur / Kapsul Pill',
    dotPatternClassy: 'Berlian Elegan',
    dotPatternClassyRounded: 'Bintang Moden',

    shapeSquare: 'Segi Empat Tepat',
    shapeExtraRounded: 'Bucu Bulat Melengkung',
    shapeDot: 'Bulatan Penuh (Ring)',
    shapeDotOnly: 'Titik Bulat Penuh',

    // Text & Typography Features
    textSectionTitle: 'Tambah Teks, Tajuk & Kapsyen',
    textSectionDesc: 'Letakkan tajuk atas (header) atau kapsyen penerangan di bawah kod QR anda.',
    topHeadingLabel: '1. Tambah Tajuk Atas (Top Heading)',
    topHeadingPlaceholder: 'cth: IMBAS SAYA / SCAN ME / MENU RESTORAN / WIFI PERCUMA',
    bottomCaptionLabel: '2. Tambah Kapsyen Bawah (Bottom Caption)',
    bottomCaptionPlaceholder: 'cth: Layari laman web rasmi kami / Diskaun 10% Hari Ini',
    fontFamilyLabel: '3. Jenis Fon (Font Family)',
    headingSizeLabel: 'Saiz Tajuk Atas',
    captionSizeLabel: 'Saiz Kapsyen Bawah',
    headingColorLabel: 'Warna Tajuk',
    captionColorLabel: 'Warna Kapsyen',
    textBoldLabel: 'Teks Tebal (Bold)',
    textUppercaseLabel: 'Huruf Besar (UPPERCASE)',
    quickHeadingIdeas: 'Cadangan Tajuk Pantas:',

    // Layout & Settings Features
    layoutSectionTitle: 'Susun Atur & Tetapan Saiz (Layout & Settings)',
    layoutSectionDesc: 'Kawal skala modul, kelengkungan bucu kad, resolusi kanvas, dan jarak padding.',
    moduleSizeLabel: '1. Saiz Modul / Skala Titik (Module Size)',
    moduleSizeDesc: 'Kepadatan dan saiz titik modul dalam kod QR (0.6x - 1.0x).',
    cardCornerRadiusLabel: '2. Kelengkungan Bucu Kad (Card Corner Radius)',
    cardCornerRadiusDesc: 'Kelengkungan bucu pada latar belakang kad (0px hingga 48px).',
    qrSizeLabel: '3. Saiz Resolusi Kanvas (Size in px)',
    cardPaddingLabel: '4. Ruang Jarak Dalaman Kad (Padding)',
    cardPaddingDesc: 'Jarak antara kod QR dan garisan luar bingkai kad (8px hingga 48px).',
    qrMarginLabel: 'Ruang Margin Tenang QR (Quiet Zone)',
    cardBgLabel: 'Warna Latar Belakang Kad',
    cardBorderLabel: 'Warna Garisan Sempadan Kad',
    cardBorderWidthLabel: 'Ketebalan Sempadan Kad',
    cardShadowLabel: 'Aktifkan Bayang Kad Halus (Soft Shadow)',
    exportModeLabel: 'Pilihan Muat Turun:',
    exportModeFull: 'Kad Lengkap (Bersama Teks & Bingkai)',
    exportModeQrOnly: 'Kod QR Sahaja',

    // Colors & Gradients
    fgColorLabel: 'Warna Corak Utama (Foreground)',
    bgColorLabel: 'Warna Latar Belakang QR',
    bgTransparent: 'Telus (Transparent)',
    bgTransparentNotice: 'Latar belakang telus (sesuai untuk fail PNG/SVG tanpa latar).',
    gradientEffect: 'Efek Kecerunan (Gradient Color)',
    enableGradient: 'Aktifkan Kecerunan',
    gradColor1: 'Warna 1',
    gradColor2: 'Warna 2',
    gradType: 'Jenis Kecerunan',
    gradLinear: 'Linear',
    gradRadial: 'Radial (Pusat)',
    gradRotation: 'Sudut Putaran (Rotation)',
    customCornerEyes: 'Warna Khas Sudut QR (Eye Colors)',
    useCustomCornerColors: 'Guna Warna Berasingan',
    cornerSquareFrame: 'Bingkai Sudut',
    cornerDotCenter: 'Titik Pusat Sudut',

    // Logo & Icons
    uploadLogoLabel: 'Muat Naik Logo Tersendiri',
    chooseImageFile: 'Pilih Fail Imej (PNG, JPG, SVG)',
    removeLogo: 'Buang Logo',
    presetIconsLabel: 'Atau Pilih Ikon Logo Popular',
    logoSizeLabel: 'Saiz Logo',
    hideDotsBehindLogo: 'Padam titik di belakang logo',

    // Resolutions & Error correction
    qrResolutionLabel: 'Resolusi Saiz QR (Piksel)',
    sizeSmall: 'Kecil (240px)',
    sizeStandard: 'Standard (360px)',
    sizeHd: 'Cetak HD (600px)',
    sizeUltra: 'Ultra 4K (1200px)',
    errorCorrectionLabel: 'Tahap Pembetulan Ralat (Error Correction)',
    ecTip: 'Tahap Q atau H memastikan kod QR masih boleh diimbas walaupun ditutup oleh logo atau jika cetakan sedikit rosak.',

    // Preview
    previewTitle: 'Pratonton Langsung Kod QR',
    previewDynamicBadge: 'Dinamik',
    previewFileRes: 'Resolusi Fail:',
    openExternal: 'Buka',
    downloadPng: 'Muat Turun PNG',
    downloadSvg: 'Muat Turun SVG',
    copyImage: 'Salin Imej',
    copiedImage: 'Disalin!',
    copyText: 'Salin Teks',
    copiedText: 'Disalin!',
    printQr: 'Cetak',

    // Checklist Card
    featuresHeading: 'Ciri-ciri Utama Penjana Kod QR',
    featureSvg: 'Format SVG: Vektor tajam tanpa pecah untuk reka bentuk grafik & cetakan.',
    featurePng: 'Format PNG: Resolusi tinggi fleksibel (200px hingga 1200px) untuk web & media sosial.',
    featureColor: 'Kustomasi Warna: Kecerunan Linear & Radial serta warna sudut khas.',
    featureScanner: 'Pengimbas Terbina: Imbas kod QR terus guna kamera atau muat naik imej.',

    // Scanner Modal
    scannerTitle: 'Pengimbas Kod QR (Scanner)',
    scannerSubtitle: 'Imbas guna kamera peranti atau muat naik fail imej',
    scannerModeCamera: 'Kamera Langsung',
    scannerModeUpload: 'Muat Naik Imej QR',
    cameraStarting: 'Memulakan kamera...',
    cameraHelp: 'Halakan kamera terus ke arah kod QR untuk membaca maklumat secara automatik.',
    uploadHelpTitle: 'Klik untuk pilih imej Kod QR',
    uploadHelpSub: 'Sokongan format PNG, JPG, WEBP, atau GIF',
    scanSuccess: 'Kod QR Berjaya Diimbas!',
    categoryLabel: 'Kategori:',
    useInEditor: 'Gunakan Dalam Penjana Kod QR',
    scanAgain: 'Imbas Lagi',
    noQrFound: 'Tiada Kod QR yang sah ditemui dalam imej yang dimuat naik.',
    cameraDenied: 'Kamera tidak dapat diakses. Sila berikan kebenaran kamera atau gunakan mod muat naik imej.',

    // History Drawer
    historyTitle: 'Sejarah Penjanaan & Imbasan',
    historySubtitle: 'rekod disimpan pada pelayar anda',
    searchHistoryPlaceholder: 'Cari dalam rekod sejarah...',
    filterAll: 'Semua',
    filterGenerated: 'Penjanaan',
    filterScanned: 'Imbasan',
    clearAll: 'Kosongkan',
    clearAllConfirm: 'Adakah anda pasti mahu memadam semua rekod sejarah?',
    noHistoryTitle: 'Tiada rekod ditemui',
    noHistoryDesc: 'Kod QR yang anda muat turun atau imbas akan disimpan secara automatik di sini.',
    badgeScanned: 'Imbasan',
    reloadRecord: 'Muatkan Semula',

    // Footer
    footerTitle: '2026 @ Aidee Creatives',
    footerSub: 'QR Studio oleh Aidee Creative • Reka bentuk responsif & Light Mode',
  },
  en: {
    // Header & Meta
    appTitle: 'QR Studio',
    appBadge: 'Dynamic',
    appSubtitle: 'Modern, Colorful QR Code Generator with PNG / SVG Export',
    bannerTitle: 'Dynamic & Custom QR Code Generator',
    bannerDesc: 'Create high-resolution QR codes for free with customizable colors, gradients, brand logos, vector SVG & PNG download, and flexible sizing support.',
    badgeSvgPng: 'SVG & PNG Vector Format',
    badgeFree: '100% Free',
    scanQrBtn: 'Scan QR',
    historyBtn: 'History',
    resetTooltip: 'Reset to Default',
    resetConfirm: 'Reset the form and QR styles back to defaults?',

    // Content Types
    chooseContentType: 'Choose QR Code Content Type',
    availableFormats: '11 Content Formats Available',
    type_url: 'Link (URL)',
    type_url_sub: 'Websites & links',
    type_text: 'Plain Text',
    type_text_sub: 'Messages & notes',
    type_wifi: 'Wi-Fi',
    type_wifi_sub: 'Auto-connect network',
    type_whatsapp: 'WhatsApp',
    type_whatsapp_sub: 'Direct chat message',
    type_vcard: 'Contact Card',
    type_vcard_sub: 'Business vCard',
    type_email: 'Email',
    type_email_sub: 'Draft an email',
    type_phone: 'Call',
    type_phone_sub: 'Dial phone number',
    type_sms: 'SMS',
    type_sms_sub: 'Short text message',
    type_social: 'Social Media',
    type_social_sub: 'IG, TikTok, FB, YT',
    type_event: 'Event / Date',
    type_event_sub: 'Save to calendar',
    type_crypto: 'Crypto / Wallet',
    type_crypto_sub: 'BTC, ETH, SOL',

    // URL Form
    urlLabel: 'Website Address (URL)',
    urlPlaceholder: 'https://example-website.com',
    urlHelper: 'Enter complete URL with https:// or domain directly.',
    quickLinks: 'Quick Presets:',

    // Text Form
    textLabel: 'Plain Text / Notes',
    textChars: 'characters',
    textPlaceholder: 'Type any message, note, password, or announcement here...',
    textHelper: 'Suitable for any standard text readable by any QR scanner app.',

    // Wifi Form
    wifiSsid: 'Network Name (SSID) *',
    wifiSsidPlaceholder: 'e.g. HomieLab_5G',
    wifiEncryption: 'Security Encryption',
    wifiEncWpa: 'WPA / WPA2 / WPA3 (Standard)',
    wifiEncWep: 'WEP (Legacy)',
    wifiEncNone: 'No Password (Open)',
    wifiPass: 'Wi-Fi Password',
    wifiPassPlaceholder: 'Enter Wi-Fi password',
    wifiHidden: 'Hidden SSID Network',
    wifiTip: 'Smart Tip: When guests scan this QR code, their mobile devices (iOS/Android) will automatically offer one-tap Wi-Fi connection without manually typing the password.',

    // vCard Form
    vcardFname: 'First Name *',
    vcardLname: 'Last / Family Name',
    vcardPhone: 'Primary Phone *',
    vcardEmail: 'Email Address',
    vcardCompany: 'Company / Organization',
    vcardTitle: 'Job Title / Role',
    vcardWebsite: 'Website URL',
    vcardAddress: 'Location / Address',
    vcardNote: 'Additional Notes (Optional)',
    vcardNotePlaceholder: 'e.g. Available on WhatsApp for official inquiries',

    // Email Form
    emailRecipient: 'Recipient Email Address *',
    emailRecipientPlaceholder: 'name@company.com',
    emailSubject: 'Email Subject',
    emailSubjectPlaceholder: 'e.g. Product Quotation Request',
    emailBody: 'Message Body',
    emailBodyPlaceholder: 'Write your message draft here...',

    // Phone Form
    phoneLabel: 'Phone Number (Direct Dial) *',
    phonePlaceholder: '+60123456789 or 0198765432',
    phoneHelper: 'Scanning will immediately launch the native phone dialer app on mobile devices.',

    // SMS Form
    smsPhone: 'Recipient Phone Number *',
    smsMessage: 'SMS Message Content',
    smsPlaceholder: 'e.g. INFO PROMO DISCOUNT20',

    // WhatsApp Form
    waCountryCode: 'Country Code',
    waPhone: 'Phone Number (without leading 0) *',
    waMessage: 'Pre-filled Automated Message',
    waMessagePlaceholder: 'Hi, I would like to make an inquiry...',
    waLinkPreview: 'Link:',

    // Social Form
    socialPlatformLabel: 'Select Social Media Platform',
    socialUsername: 'Username / Handle *',
    socialPlaceholder: 'e.g. your_username',

    // Event Form
    eventTitle: 'Event / Meeting Title *',
    eventTitlePlaceholder: 'e.g. Product Launch Ceremony',
    eventStart: 'Start Date & Time *',
    eventEnd: 'End Date & Time',
    eventLocation: 'Event Location',
    eventLocationPlaceholder: 'e.g. Convention Centre / Google Meet',
    eventDesc: 'Event Description',
    eventDescPlaceholder: 'Brief description or agenda...',

    // Crypto Form
    cryptoCurrency: 'Cryptocurrency',
    cryptoAmount: 'Amount (Optional)',
    cryptoAddress: 'Wallet Address *',
    cryptoAddressPlaceholder: 'e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',

    // Style Customizer
    styleCustomizerTitle: 'QR Customization & Design',
    styleCustomizerSub: 'Complete Visual Styling',
    tabPresets: 'Theme Styles (24+)',
    tabShapes: 'Shapes & Corners',
    tabText: 'Text & Captions',
    tabLayout: 'Layout & Settings',
    tabColors: 'Colors & Gradients',
    tabLogo: 'Logo / Icon',

    // Style Categories
    catAll: 'All Styles',
    catGradient: 'Gradients',
    catLuxury: 'Luxury & Gold',
    catModern: 'Modern & Pop',
    catClassic: 'Classic',
    catMinimal: 'Minimalist',
    presetDescHelper: 'Pick from 24+ curated preset styles to instantly transform your QR design:',

    // Module Shapes & Finder Frames
    moduleShapeLabel: 'Module Shape / Dots Style',
    moduleShapeDesc: 'Select the main pixel dot shape inside your QR code.',
    finderFrameLabel: 'Finder Frame Shape (Eye Box)',
    finderFrameDesc: 'Choose the outer frame shape of the 3 corner markers.',
    finderCenterLabel: 'Finder Center Shape (Eye Dot)',
    finderCenterDesc: 'Choose the inner center dot shape of the 3 corner markers.',

    dotPatternSquare: 'Square (Classic Matrix)',
    dotPatternRounded: 'Smooth Rounded',
    dotPatternDots: 'Solid Circle Dots',
    dotPatternExtraRounded: 'Pill / Capsule',
    dotPatternClassy: 'Classy Diamond',
    dotPatternClassyRounded: 'Modern Star',

    shapeSquare: 'Square',
    shapeExtraRounded: 'Curved Smooth',
    shapeDot: 'Full Circle (Ring)',
    shapeDotOnly: 'Solid Circle Dot',

    // Text & Typography Features
    textSectionTitle: 'Add Text, Heading & Caption',
    textSectionDesc: 'Place a top header or descriptive caption badge directly onto your QR code.',
    topHeadingLabel: '1. Add Top Heading',
    topHeadingPlaceholder: 'e.g. SCAN ME / RESTAURANT MENU / FREE WIFI / FOLLOW US',
    bottomCaptionLabel: '2. Add Bottom Caption',
    bottomCaptionPlaceholder: 'e.g. Visit our official website / 10% Off Today',
    fontFamilyLabel: '3. Font Family',
    headingSizeLabel: 'Top Heading Size',
    captionSizeLabel: 'Bottom Caption Size',
    headingColorLabel: 'Heading Color',
    captionColorLabel: 'Caption Color',
    textBoldLabel: 'Bold Text',
    textUppercaseLabel: 'UPPERCASE',
    quickHeadingIdeas: 'Quick Heading Ideas:',

    // Layout & Settings Features
    layoutSectionTitle: 'Layout, Spacing & Settings',
    layoutSectionDesc: 'Adjust module scale, card corner radius, canvas size, and padding.',
    moduleSizeLabel: '1. Module Size / Dot Scale',
    moduleSizeDesc: 'Scale and density of the QR code dots (0.6x - 1.0x).',
    cardCornerRadiusLabel: '2. Card Corner Radius',
    cardCornerRadiusDesc: 'Border radius on the QR card container background (0px to 48px).',
    qrSizeLabel: '3. Canvas Resolution Size (px)',
    cardPaddingLabel: '4. Card Inner Padding',
    cardPaddingDesc: 'Spacing between the QR code and card outer boundary (8px to 48px).',
    qrMarginLabel: 'QR Quiet Zone Margin',
    cardBgLabel: 'Card Background Color',
    cardBorderLabel: 'Card Border Line Color',
    cardBorderWidthLabel: 'Card Border Width',
    cardShadowLabel: 'Enable Soft Card Shadow',
    exportModeLabel: 'Download Mode:',
    exportModeFull: 'Full Card (With Text & Frame)',
    exportModeQrOnly: 'QR Code Only',

    // Colors & Gradients
    fgColorLabel: 'Main Pattern Color (Foreground)',
    bgColorLabel: 'QR Background Color',
    bgTransparent: 'Transparent Background',
    bgTransparentNotice: 'Transparent background (ideal for PNG/SVG overlays).',
    gradientEffect: 'Gradient Color Effect',
    enableGradient: 'Enable Gradient',
    gradColor1: 'Color 1',
    gradColor2: 'Color 2',
    gradType: 'Gradient Type',
    gradLinear: 'Linear',
    gradRadial: 'Radial (Center)',
    gradRotation: 'Rotation Angle',
    customCornerEyes: 'Custom QR Eye Colors',
    useCustomCornerColors: 'Use Separate Colors',
    cornerSquareFrame: 'Corner Frame',
    cornerDotCenter: 'Corner Center Dot',

    // Logo & Icons
    uploadLogoLabel: 'Upload Custom Brand Logo',
    chooseImageFile: 'Choose Image File (PNG, JPG, SVG)',
    removeLogo: 'Remove Logo',
    presetIconsLabel: 'Or Select a Popular Logo Icon',
    logoSizeLabel: 'Logo Size',
    hideDotsBehindLogo: 'Clear dots behind logo',

    // Resolutions & Error Correction
    qrResolutionLabel: 'QR Resolution Size (Pixels)',
    sizeSmall: 'Small (240px)',
    sizeStandard: 'Standard (360px)',
    sizeHd: 'HD Print (600px)',
    sizeUltra: 'Ultra 4K (1200px)',
    errorCorrectionLabel: 'Error Correction Level',
    ecTip: 'Levels Q or H guarantee the QR remains scannable even when partially covered by a logo or slightly damaged when printed.',

    // Preview
    previewTitle: 'Live QR Code Preview',
    previewDynamicBadge: 'Dynamic',
    previewFileRes: 'File Resolution:',
    openExternal: 'Open',
    downloadPng: 'Download PNG',
    downloadSvg: 'Download SVG',
    copyImage: 'Copy Image',
    copiedImage: 'Copied!',
    copyText: 'Copy Text',
    copiedText: 'Copied!',
    printQr: 'Print',

    // Checklist Card
    featuresHeading: 'Key Features of QR Studio',
    featureSvg: 'SVG Format: Crisp vector output without pixelation for graphic design & print.',
    featurePng: 'PNG Format: Flexible high resolution (200px up to 1200px) for web & social sharing.',
    featureColor: 'Color Customization: Linear & Radial gradients with individual eye coloring.',
    featureScanner: 'Built-in Scanner: Scan QR codes directly with device camera or image upload.',

    // Scanner Modal
    scannerTitle: 'QR Code Scanner',
    scannerSubtitle: 'Scan with device camera or upload an image file',
    scannerModeCamera: 'Live Camera',
    scannerModeUpload: 'Upload QR Image',
    cameraStarting: 'Initializing camera...',
    cameraHelp: 'Point camera steadily at the QR code to read the data automatically.',
    uploadHelpTitle: 'Click to select QR code image',
    uploadHelpSub: 'Supports PNG, JPG, WEBP, or GIF formats',
    scanSuccess: 'QR Code Successfully Scanned!',
    categoryLabel: 'Category:',
    useInEditor: 'Load into QR Generator',
    scanAgain: 'Scan Another',
    noQrFound: 'No valid QR code found in the uploaded image.',
    cameraDenied: 'Camera could not be accessed. Please grant camera permission or use image upload mode.',

    // History Drawer
    historyTitle: 'Generation & Scan History',
    historySubtitle: 'records saved in your browser',
    searchHistoryPlaceholder: 'Search in history records...',
    filterAll: 'All',
    filterGenerated: 'Generated',
    filterScanned: 'Scanned',
    clearAll: 'Clear All',
    clearAllConfirm: 'Are you sure you want to clear all history records?',
    noHistoryTitle: 'No records found',
    noHistoryDesc: 'QR codes that you generate or scan will automatically be saved here.',
    badgeScanned: 'Scanned',
    reloadRecord: 'Reload to Editor',

    // Footer
    footerTitle: '2026 @ Aidee Creatives',
    footerSub: 'QR Studio by Aidee Creative • Responsive Design & Light Mode',
  },
};

export function getTranslations(lang: Language) {
  return translations[lang] || translations.ms;
}
