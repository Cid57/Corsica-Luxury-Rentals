import { villas } from '@/data/villas';

export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
