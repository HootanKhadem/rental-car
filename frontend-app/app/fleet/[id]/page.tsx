import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/custom/badge/badge";
import CarCard from "@/src/features/catalog/components/CarCard";
import ReserveButton from "./reserveButton.client";
import sampleCars from "@/src/data/catalog";
import {
  Users,
  Fuel,
  Settings,
  ArrowLeft,
  Calendar,
  MapPin,
  Shield,
  Star,
} from "lucide-react";

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const car = sampleCars.find((c) => c.id === id);

  if (!car) {
    return { title: "Car Not Found | CityDrive" };
  }

  return {
    title: `${car.title} | CityDrive Kuwait`,
    description: `Rent ${car.title} - ${car.category} starting from ${car.pricePerDay} KWD/day. Premium car rental service in Kuwait.`,
  };
}

// SSG
export async function generateStaticParams() {
  return sampleCars.map((car) => ({ id: car.id }));
}

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = sampleCars.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  const similarCars = sampleCars
    .filter((c) => c.id !== id && c.category === car.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-smoke">
          <Link
            href="/fleet"
            className="flex items-center gap-1.5 hover:text-gold-bright transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Fleet
          </Link>
          <span className="text-line">/</span>
          <span className="text-ivory/70">{car.category}</span>
          <span className="text-line">/</span>
          <span className="text-gold-bright font-medium">{car.title}</span>
        </nav>

        {/* ===== Main Grid ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ===== Left Column: Images & Specs (8 cols) ===== */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Image */}
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-obsidian border border-line">
              {car.image ? (
                <Image
                  src={car.image}
                  alt={car.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-smoke">
                  No image available
                </div>
              )}
              <div className="absolute top-4 left-4">
                <Badge className="bg-emerald/20 text-emerald border-emerald/30 uppercase tracking-widest text-xs">
                  {car.category}
                </Badge>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`relative aspect-4/3 overflow-hidden rounded-lg border transition-all ${
                    i === 1
                      ? "border-gold-bright ring-2 ring-gold-bright/20"
                      : "border-line bg-obsidian opacity-60 hover:opacity-100"
                  }`}
                >
                  {car.image && i === 1 ? (
                    <Image
                      src={car.image}
                      alt={`${car.title} view ${i}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-graphite" />
                  )}
                </div>
              ))}
            </div>

            {/* Technical Specifications */}
            <section className="rounded-2xl border border-line bg-obsidian p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-serif text-ivory">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {car.seats && (
                  <div className="flex items-center gap-4 rounded-xl bg-graphite/50 border border-line-soft p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald/10">
                      <Users className="h-5 w-5 text-emerald" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-smoke">
                        Seats
                      </div>
                      <div className="text-lg font-semibold text-ivory">
                        {car.seats}
                      </div>
                    </div>
                  </div>
                )}

                {car.fuel && (
                  <div className="flex items-center gap-4 rounded-xl bg-graphite/50 border border-line-soft p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald/10">
                      <Fuel className="h-5 w-5 text-emerald" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-smoke">
                        Fuel
                      </div>
                      <div className="text-lg font-semibold text-ivory">
                        {car.fuel}
                      </div>
                    </div>
                  </div>
                )}

                {car.transmission && (
                  <div className="flex items-center gap-4 rounded-xl bg-graphite/50 border border-line-soft p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald/10">
                      <Settings className="h-5 w-5 text-emerald" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-smoke">
                        Transmission
                      </div>
                      <div className="text-lg font-semibold text-ivory">
                        {car.transmission}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Included Features */}
            <section className="rounded-2xl border border-line bg-obsidian p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-serif text-ivory">
                Included Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Shield,
                    title: "Full Insurance Coverage",
                    desc: "Comprehensive protection included",
                  },
                  {
                    icon: MapPin,
                    title: "Free Delivery in Kuwait",
                    desc: "To any location within 60 minutes",
                  },
                  {
                    icon: Calendar,
                    title: "Flexible Booking",
                    desc: "Free cancellation up to 24h before",
                  },
                  {
                    icon: Star,
                    title: "Premium Support",
                    desc: "24/7 AI + human assistance",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-xl bg-graphite/50 border border-line-soft p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <feature.icon className="h-5 w-5 text-gold-bright" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ivory">
                        {feature.title}
                      </div>
                      <div className="text-xs text-smoke mt-1">
                        {feature.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ===== Right Column: Sticky Sidebar (4 cols) ===== */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-4">
              {/* Pricing Card */}
              <div className="rounded-2xl border border-line bg-obsidian p-6">
                <h1 className="mb-1 text-2xl md:text-3xl font-serif text-ivory">
                  {car.title}
                </h1>
                <p className="mb-6 text-sm text-smoke">
                  Premium {car.category.toLowerCase()} vehicle
                </p>

                {/* Price Display */}
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gold-bright">
                    {car.pricePerDay}
                  </span>
                  <span className="text-sm text-smoke">KWD / day</span>
                </div>

                {/* Price Breakdown */}
                <div className="mb-6 space-y-3 border-t border-line pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-smoke">Daily rate</span>
                    <span className="font-medium text-ivory">
                      {car.pricePerDay} KWD
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-smoke">Insurance</span>
                    <span className="font-medium text-emerald">Included</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-smoke">Delivery</span>
                    <span className="font-medium text-emerald">Free</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-line pt-3">
                    <span className="font-semibold text-ivory">Total</span>
                    <span className="text-lg font-bold text-gold-bright">
                      {car.pricePerDay} KWD
                    </span>
                  </div>
                </div>

                {/* Reserve Button */}
                <ReserveButton
                  carId={car.id}
                  carTitle={car.title}
                  pricePerDay={car.pricePerDay}
                  image={car.image}
                />

                <p className="mt-3 text-center text-xs text-smoke">
                  No payment required today
                </p>
              </div>

              {/* Trust Card */}
              <div className="rounded-2xl border border-line-soft bg-graphite/30 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald" />
                  <span className="text-sm font-semibold text-ivory">
                    Book with confidence
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-smoke">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald" />
                    Free cancellation up to 24h before
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald" />
                    Verified & inspected vehicles
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald" />
                    Secure payment via KNET / Visa
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* ===== Similar Vehicles ===== */}
        {similarCars.length > 0 && (
          <section className="mt-20 border-t border-line pt-12">
            <h2 className="mb-8 text-3xl font-serif text-ivory">
              Similar Vehicles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCars.map((similarCar) => (
                <CarCard key={similarCar.id} car={similarCar} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
