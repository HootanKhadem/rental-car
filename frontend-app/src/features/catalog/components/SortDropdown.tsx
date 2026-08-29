"use client";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";
import SelectField from "@/components/ui/selectField/selectField";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  const mounted = useClientI18n();
  const { t } = useTranslation();

  const OPTIONS: { value: string; label: string }[] = [
    { value: "featured", label: mounted ? t("catalog.sort.featured") : "" },
    { value: "price-asc", label: mounted ? t("catalog.sort.priceAsc") : "" },
    { value: "price-desc", label: mounted ? t("catalog.sort.priceDesc") : "" },
  ];

  return (
    <SelectField
      value={value}
      onValueChange={onChange}
      options={OPTIONS}
      triggerProps={{
        "aria-label": mounted ? t("catalog.sort.sortBy") : "Sort",
      }}
      triggerClassName="w-full bg-ink border-line text-ivory font-mono py-5"
      popupClassName="w-56 mt-2 bg-ink border-line rounded-md shadow-lg"
      listClassName="py-1"
      itemClassName="px-3 py-2 text-sm data-[state=checked]:text-gold"
      itemIndicatorClassName="hidden"
      valueClassName="text-start"
    />
  );
}
