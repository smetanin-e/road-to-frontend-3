import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cv8.litres.ru', // <- текущий источник
      'example.com', // <- добавляй другие нужные хосты
      'another-host.com',
    ],
  },
};

export default nextConfig;
