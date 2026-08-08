"use client";
import React, { useMemo, useState } from "react";
import { Car } from "./types";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import CarGrid from "./components/CarGrid";
import SortDropdown from "./components/SortDropdown";

const MOCK_CARS: Car[] = [
  {
    id: "1",
    title: "Toyota Land Cruiser 300",
    category: "Luxury SUV",
    seats: 7,
    fuel: "V8",
    transmission: "Auto",
    pricePerDay: 55,
    image: "/pictures/land-cruiser.jpg",
  },
  {
    id: "2",
    title: "Mercedes GLE",
    category: "Luxury SUV",
    seats: 5,
    fuel: "Diesel",
    transmission: "Auto",
    pricePerDay: 70,
    image: "/pictures/benz.jpg",
  },
  {
    id: "3",
    title: "Range Rover Vogue",
    category: "Luxury SUV",
    seats: 5,
    fuel: "Hybrid",
    transmission: "Auto",
    pricePerDay: 90,
    image: "/pictures/range-rover.jpeg",
  },
  {
    id: "4",
    title: "Nissan Patrol",
    category: "Full-size SUV",
    seats: 8,
    fuel: "V8",
    transmission: "Auto",
    pricePerDay: 48,
    image: "/pictures/nissan-patrol.jpg",
  },
  {
    id: "5",
    title: "Hyundai Ioniq 5",
    category: "Electric",
    seats: 5,
    fuel: "Electric",
    transmission: "Auto",
    pricePerDay: 28,
    image: "/pictures/hyundai.jpg",
  },
];

export default function CatalogClient() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(() => {
    const set = new Set(MOCK_CARS.map((c) => c.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const base = MOCK_CARS.filter((c) => {
      if (active !== "All" && c.category !== active) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });

    const sorted = [...base];
    if (sort === "price-asc") {
      sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === "price-desc") {
      sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return sorted;
  }, [query, active, sort]);

  return (
    <div>
      <div className="mb-6">
        <div className="rounded-xl border border-[var(--color-border-card)] bg-[var(--color-background-card)] p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-9">
              <SearchBar value={query} onChange={setQuery} />
            </div>

            <div className="lg:col-span-3 flex items-center justify-end gap-4">
              <SortDropdown value={sort} onChange={setSort} />
            </div>
          </div>

          <div className="mt-4">
            <Filters
              categories={categories}
              active={active}
              onSelect={setActive}
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-zinc-400">
          Showing {filtered.length} of {MOCK_CARS.length} cars
        </div>
      </div>

      <CarGrid cars={filtered} />

      <div className="mt-10 ">
        <div className="flex gap-4">
          {[
            {
              key: "insurance",
              title: "Full insurance",
              subtitle: "Included with every booking",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#39866d"
                >
                  <g clipPath="url(#clip0_4418_7076)">
                    <path
                      d="M11.9999 22.7595C10.9099 22.7595 9.8299 22.4395 8.9799 21.8095L4.6799 18.5995C3.5399 17.7495 2.6499 15.9695 2.6499 14.5595V7.11945C2.6499 5.57945 3.7799 3.93945 5.2299 3.39945L10.2199 1.52945C11.2099 1.15945 12.7699 1.15945 13.7599 1.52945L18.7499 3.39945C20.1999 3.93945 21.3299 5.57945 21.3299 7.11945V14.5495C21.3299 15.9695 20.4399 17.7395 19.2999 18.5895L14.9999 21.7995C14.1699 22.4395 13.0899 22.7595 11.9999 22.7595ZM10.7499 2.93945L5.7599 4.80945C4.9099 5.12945 4.1599 6.20945 4.1599 7.12945V14.5595C4.1599 15.5095 4.8299 16.8395 5.5799 17.3995L9.8799 20.6095C11.0299 21.4695 12.9699 21.4695 14.1299 20.6095L18.4299 17.3995C19.1899 16.8295 19.8499 15.5095 19.8499 14.5595V7.11945C19.8499 6.20945 19.0999 5.12945 18.2499 4.79945L13.2599 2.92945C12.5799 2.68945 11.4199 2.68945 10.7499 2.93945Z"
                      fill="white"
                      style={{ fill: "var(--fillg)" }}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_7076">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ),
            },
            {
              key: "delivery",
              title: "Free delivery",
              subtitle: "To any location in Kuwait",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#39866d"
                >
                  <g clipPath="url(#clip0_4418_7010)">
                    <path
                      d="M6.19005 22.0598C5.19005 22.0598 4.22005 21.6698 3.45005 20.9198C2.20005 19.6998 1.90005 17.8998 2.68005 16.3398L4.30005 13.0998C4.64005 12.4198 4.64005 11.5998 4.30005 10.9098L2.68005 7.65985C1.90005 6.09985 2.20005 4.29985 3.45005 3.07985C4.70005 1.85985 6.50005 1.58985 8.05005 2.40985L19.6401 8.50985C20.9401 9.18985 21.7501 10.5298 21.7501 11.9998C21.7501 13.4698 20.9401 14.8098 19.6401 15.4898L8.05005 21.5898C7.45005 21.9098 6.82005 22.0598 6.19005 22.0598ZM6.20005 3.43985C5.51005 3.43985 4.91005 3.75985 4.50005 4.15985C3.88005 4.75985 3.44005 5.82985 4.02005 6.99985L5.64005 10.2398C6.19005 11.3498 6.19005 12.6598 5.64005 13.7698L4.02005 17.0098C3.43005 18.1798 3.88005 19.2498 4.50005 19.8498C5.12005 20.4498 6.19005 20.8798 7.35005 20.2698L18.9401 14.1698C19.7601 13.7398 20.2501 12.9298 20.2501 12.0098C20.2501 11.0898 19.7601 10.2798 18.9401 9.84985L7.35005 3.72985C6.95005 3.51985 6.56005 3.43985 6.20005 3.43985Z"
                      fill="white"
                      style={{ fill: "var(--fillg)" }}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_7010">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ),
            },
            {
              key: "payment",
              title: "Secure payment",
              subtitle: "KNET · Visa · Mastercard",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#39866d"
                >
                  <g clipPath="url(#clip0_4418_169691)">
                    <path
                      d="M22 9.25H2C1.59 9.25 1.25 8.91 1.25 8.5C1.25 8.09 1.59 7.75 2 7.75H22C22.41 7.75 22.75 8.09 22.75 8.5C22.75 8.91 22.41 9.25 22 9.25Z"
                      fill="white"
                      style={{ fill: "var(--fillg)" }}
                    />
                    <path
                      d="M8 17.25H6C5.59 17.25 5.25 16.91 5.25 16.5C5.25 16.09 5.59 15.75 6 15.75H8C8.41 15.75 8.75 16.09 8.75 16.5C8.75 16.91 8.41 17.25 8 17.25Z"
                      fill="white"
                      style={{ fill: "var(--fillg)" }}
                    />
                    <path
                      d="M14.5 17.25H10.5C10.09 17.25 9.75 16.91 9.75 16.5C9.75 16.09 10.09 15.75 10.5 15.75H14.5C14.91 15.75 15.25 16.09 15.25 16.5C15.25 16.91 14.91 17.25 14.5 17.25Z"
                      fill="white"
                      style={{ fill: "var(--fillg)" }}
                    />
                    <path
                      d="M17.56 21.25H6.44C2.46 21.25 1.25 20.05 1.25 16.11V7.89C1.25 3.95 2.46 2.75 6.44 2.75H17.55C21.53 2.75 22.74 3.95 22.74 7.89V16.1C22.75 20.05 21.54 21.25 17.56 21.25ZM6.44 4.25C3.3 4.25 2.75 4.79 2.75 7.89V16.1C2.75 19.2 3.3 19.74 6.44 19.74H17.55C20.69 19.74 21.24 19.2 21.24 16.1V7.89C21.24 4.79 20.69 4.25 17.55 4.25H6.44Z"
                      fill="white"
                      style={{ fill: "var(--fillg)" }}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_169691">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ),
            },
            {
              key: "support",
              title: "24/7 support",
              subtitle: "AI assistant + human team",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#39866d"
                >
                  <g clipPath="url(#clip0_4418_7442)">
                    <path
                      d="M12 22.7498C11.3 22.7498 10.59 22.4797 10.06 21.9497L8.35001 20.2598C7.92001 19.8398 7.35999 19.6097 6.75999 19.6097H6C3.93 19.6097 2.25 17.9398 2.25 15.8898V4.97974C2.25 2.92974 3.93 1.25977 6 1.25977H18C20.07 1.25977 21.75 2.92974 21.75 4.97974V15.8898C21.75 17.9398 20.07 19.6097 18 19.6097H17.24C16.64 19.6097 16.07 19.8398 15.65 20.2598L13.94 21.9497C13.41 22.4797 12.7 22.7498 12 22.7498ZM6 2.74976C4.76 2.74976 3.75 3.74973 3.75 4.96973V15.8798C3.75 17.1098 4.76 18.0997 6 18.0997H6.75999C7.75999 18.0997 8.7 18.4897 9.41 19.1897L11.12 20.8798C11.61 21.3598 12.4 21.3598 12.89 20.8798L14.6 19.1897C15.31 18.4897 16.25 18.0997 17.25 18.0997H18C19.24 18.0997 20.25 17.0998 20.25 15.8798V4.96973C20.25 3.73973 19.24 2.74976 18 2.74976H6Z"
                      fill="white"
                      style={{ fill: "var(--fillg)" }}
                    />
                    <path
                      d="M10.3802 14.511H7.70023C7.26023 14.511 6.85023 14.3009 6.59023 13.9409C6.34023 13.6009 6.28022 13.181 6.40022 12.781C6.75022 11.711 7.61022 11.131 8.37022 10.611C9.17022 10.071 9.62022 9.731 9.62022 9.151C9.62022 8.631 9.20022 8.21094 8.68022 8.21094C8.16022 8.21094 7.74023 8.631 7.74023 9.151C7.74023 9.561 7.40023 9.901 6.99023 9.901C6.58023 9.901 6.24023 9.561 6.24023 9.151C6.24023 7.811 7.33022 6.71094 8.68022 6.71094C10.0302 6.71094 11.1202 7.801 11.1202 9.151C11.1202 10.561 10.0602 11.281 9.21024 11.861C8.68024 12.221 8.18022 12.561 7.93022 13.011H10.3702C10.7802 13.011 11.1202 13.351 11.1202 13.761C11.1202 14.171 10.7902 14.511 10.3802 14.511Z"
                      fill="white"
                      style={{ fill: "var(--fillg)" }}
                    />
                    <path
                      d="M16.0399 14.5109C15.6299 14.5109 15.2899 14.1709 15.2899 13.7609V13.0709H13.3299C13.3299 13.0709 13.3299 13.0709 13.3199 13.0709C12.8299 13.0709 12.3799 12.8109 12.1299 12.3909C11.8799 11.9609 11.8799 11.4309 12.1299 11.0109C12.8099 9.84092 13.5999 8.51089 14.3199 7.35089C14.6399 6.84089 15.2499 6.61093 15.8199 6.77093C16.3899 6.94093 16.7899 7.46097 16.7799 8.06097V11.5809H16.9999C17.4099 11.5809 17.7499 11.9209 17.7499 12.3309C17.7499 12.7409 17.4099 13.0809 16.9999 13.0809H16.7899V13.7709C16.7899 14.1809 16.4599 14.5109 16.0399 14.5109ZM15.2899 8.64093C14.6999 9.60093 14.0899 10.6309 13.5399 11.5709H15.2899V8.64093Z"
                      fill="white"
                      style={{ fill: "var(--fillg)" }}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_7442">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ),
            },
          ].map((f) => (
            <div
              key={f.key}
              className="flex items-center gap-3 bg-background-card border border-border-card rounded-lg px-4 py-4 text-xs w-full"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-background-icon-card border border-border-card flex items-center justify-center text-icon-card">
                {f.icon}
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-zinc-100">
                  {f.title}
                </div>
                <div className="text-xs text-zinc-400">{f.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
