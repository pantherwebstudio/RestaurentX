import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Preloader from '@/components/ui/Preloader';
import { RESTAURANT_INFO } from '@/data/restaurantData';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif-luxury',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-clean',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RestaurantX | Three Michelin Star Fine Dining in Bandra, Mumbai',
  description:
    'Experience haute cuisine and sensory gastronomy by Chef Antoine Laurent in Bandra West, Mumbai. Awarded 3 Michelin Stars. Book your table or private dining suite online.',
  keywords: [
    'RestaurantX',
    'Michelin Star Restaurant Mumbai',
    'Bandra Fine Dining',
    'Haute Cuisine India',
    'Chef Antoine Laurent',
    'Luxury Dining Room Mumbai',
    'Wagyu Rossini',
    'Private Dining Pavilion',
    'Subterranean Wine Vault',
  ],
  authors: [{ name: 'Chef Antoine Laurent' }],
  creator: 'RestaurantX',
  publisher: 'RestaurantX Mumbai',
  metadataBase: new URL('https://restaurantx.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RestaurantX | Three Michelin Star Fine Dining in Bandra, Mumbai',
    description:
      'Where classical French culinary heritage meets avant-garde minimalist art. Reserve your table at Mumbai’s premier 3-star Michelin venue.',
    url: 'https://restaurantx.com',
    siteName: 'RestaurantX',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'RestaurantX Michelin Dining',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestaurantX | 3 Michelin Star Gastronomy',
    description:
      'Haute cuisine by Chef Antoine Laurent in Bandra, Mumbai.',
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: RESTAURANT_INFO.name,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    '@id': 'https://restaurantx.com',
    url: 'https://restaurantx.com',
    telephone: RESTAURANT_INFO.phone,
    priceRange: '₹₹₹₹',
    servesCuisine: ['French', 'Haute Cuisine', 'Contemporary European'],
    starRating: {
      '@type': 'Rating',
      ratingValue: '5',
    },
    award: '3 Michelin Stars 2020-2025',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot 42, Pali Hill Road, Bandra West',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400050',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '12:00',
        closes: '15:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '18:00',
        closes: '23:30',
      },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0D0D0D] text-[#F6F2ED] font-sans-clean antialiased selection:bg-[#C6A15B]/30 selection:text-[#F6F2ED]">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
