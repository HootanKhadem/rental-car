"use client";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  addNotification,
  acknowledgeNotification,
} from "../notifications/notifications";
import { Modal } from "@/components/ui/custom/modal";
import { useReserve } from "./ReserveProvider";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";

const TOTAL_STEPS = 9;

export default function ReserveModal() {
  const r = useReserve();

  const [civilFile, setCivilFile] = useState<File | null>(null);
  const [licFile, setLicFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [licNo, setLicNo] = useState("");
  const [licenseVerified, setLicenseVerified] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [days, setDays] = useState<number>(1);
  const [payMethod, setPayMethod] = useState<string>("knet");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  //   const [processingPayment, setProcessingPayment] = useState(false);

  const fileCivilRef = useRef<HTMLInputElement | null>(null);
  const fileLicRef = useRef<HTMLInputElement | null>(null);
  const fileSelfieRef = useRef<HTMLInputElement | null>(null);
  //eslint-disable-next-line
  const sigCanvasRef = useRef<any>(null);

  const { t, i18n } = useTranslation("reserve");

  if (!r) return null;

  const price = r.car?.pricePerDay ?? 0;
  const estTotal = price * Math.max(1, days);

  const stepLabel = (() => {
    switch (r.step) {
      case 0:
        return t("step.signin");
      case 1:
        return t("step.civil");
      case 2:
        return t("step.license");
      case 3:
        return t("step.pickup");
      case 4:
        return t("step.review");
      case 5:
        return t("step.terms");
      case 6:
        return t("step.signature");
      case 7:
        return t("step.payment");
      case 8:
        return t("step.done");
      default:
        return "";
    }
  })();

  const canAdvance = (() => {
    if (r.step === 1) return !!civilFile;
    if (r.step === 2) return !!licFile;
    if (r.step === 6) return !!selfieFile && !!signature;
    if (r.step === 5) return agreeTerms;
    if (r.step === 7) {
      if (payMethod === "visa" || payMethod === "knet") {
        return (
          cardNumber.trim().replace(/\s+/g, "").length >= 12 &&
          expiry.trim().length > 0 &&
          cvv.trim().length >= 3
        );
      }
      return true;
    }
    return true;
  })();

  function onSelectFile(
    ref: React.RefObject<HTMLInputElement | null>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
  ) {
    ref.current?.click();
    ref.current!.onchange = () => {
      const f = ref.current?.files?.[0] ?? null;
      setter(f);
    };
  }

  function openRegister() {
    window.dispatchEvent(new Event("open-register-modal"));
    r.close();
  }

  function clearSignature() {
    sigCanvasRef.current?.clear();
    setSignature(null);
  }

  function shortName(f: File | null | undefined) {
    if (!f) return "";
    return f.name.length > 36 ? f.name.slice(0, 33) + "..." : f.name;
  }

  return (
    <Modal open={r.isOpen} onOpenChange={r.close} title={t("modalTitle")}>
      <div className="modal-h mb-3 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gold mt-1 tracking-[3px]">{`${r.step + 1} / ${TOTAL_STEPS} · ${stepLabel}`}</p>
        </div>
      </div>

      <div className="wiz-steps mb-4 flex gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${i <= r.step ? "bg-emerald-400" : "bg-line"}`}
          />
        ))}
      </div>

      <div className="modal-body">
        {r.step === 0 && (
          <div className="wiz-pane" data-step="0">
            <div className="trust-note flex justify-start mt-7 mb-5 items-center gap-2 p-3 rounded-lg border border-emerald-700 bg-emerald-900/20 text-emerald-200">
              <p className="mb-0.5 text-xs">●</p>
              <p className="text-sm text-zinc-200">{t("trustNote")}</p>
            </div>
            <p className="text-sm text-zinc-400 mt-4">{t("createAccount")}</p>
            <div className="mt-6">
              <button
                className="w-full cursor-pointer py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                onClick={openRegister}
              >
                {t("createAccountButton")}
              </button>
            </div>
          </div>
        )}

        {r.step === 1 && (
          <div className="wiz-pane" data-step="1">
            <p className="text-sm text-zinc-400 mb-4">{t("upload.civil")}</p>
            <div
              className={`upload-box cursor-pointer rounded-xl border-2 border-dotted ${civilFile ? "border-emerald-700 bg-emerald-950/30" : "border-neutral-700 hover:border-gold bg-background-main"} py-8 px-5 text-center`}
              onClick={() => onSelectFile(fileCivilRef, setCivilFile)}
            >
              <div className="text-2xl flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#C6A664"
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
              </div>
              {civilFile ? (
                <div>
                  <div className="ub-t font-semibold mt-2">
                    {shortName(civilFile)}
                  </div>
                  <div className="ub-s text-sm text-emerald-300 mt-1">
                    {t("fileSelected")}
                  </div>
                </div>
              ) : (
                <>
                  <div className="ub-t font-semibold mt-2">
                    {t("step.civil")}
                  </div>
                  <div className="ub-s text-xs text-zinc-400 mt-1">
                    {t("upload.civil")}
                  </div>
                </>
              )}
            </div>
            <input
              ref={fileCivilRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
            {/* <div className="verify-row mt-3 text-sm text-emerald-300">
              {civilFile ? t("fileSelected") : ""}
            </div> */}
          </div>
        )}

        {r.step === 2 && (
          <div className="wiz-pane" data-step="2">
            <p className="text-sm text-zinc-400 mb-4">{t("upload.license")}</p>
            <div
              className={`upload-box cursor-pointer rounded-xl border-2 border-dotted ${licFile ? "border-emerald-700 bg-emerald-950/30" : "border-neutral-700 hover:border-gold bg-background-main"} py-8 px-5 text-center`}
              onClick={() => onSelectFile(fileLicRef, setLicFile)}
            >
              <div className="text-2xl flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#C6A664"
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
              </div>
              {licFile ? (
                <div>
                  <div className="ub-t font-semibold mt-2">
                    {shortName(licFile)}
                  </div>
                  <div className="ub-s text-sm text-emerald-300 mt-1">
                    {t("fileSelected")}
                  </div>
                </div>
              ) : (
                <>
                  <div className="ub-t font-semibold mt-2">
                    {t("step.license")}
                  </div>
                  <div className="ub-s text-sm text-zinc-400 mt-1">
                    {t("upload.hint")}
                  </div>
                </>
              )}
            </div>
            <input
              ref={fileLicRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <div className="field mt-4">
              <label className="text-xs text-neutral-400 mb-2 block">
                License or Civil No
              </label>
              <input
                value={licNo}
                onChange={(e) => setLicNo(e.target.value)}
                placeholder="123456789012"
                className="w-full bg-ink border border-background-icon-card rounded-lg text-sm p-3"
              />
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-3">
                <button
                  className="w-full py-2 rounded-md border text-neutral-300 border-emerald-900 cursor-pointer hover:border-gold hover:text-gold text-sm"
                  onClick={() => {
                    const v = licNo.trim();
                    if (!v || !/^\d+$/.test(v)) {
                      setLicenseVerified(false);
                      setVerifyMsg(t("verify.numericError"));
                      return;
                    }
                    setLicenseVerified(true);
                    setVerifyMsg(t("verify.verified"));
                  }}
                >
                  {t("verify.verifyBtn")}
                </button>
                {verifyMsg ? (
                  <div
                    className={`text-sm ${licenseVerified ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {verifyMsg}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {r.step === 3 && (
          <div data-step="3">
            <div className="mb-4 flex items-center gap-4 bg-background-main border border-background-icon-card p-3 rounded-lg">
              {r.car?.image ? (
                <div className="w-28 h-16 relative rounded-md overflow-hidden bg-zinc-800">
                  <Image
                    src={r.car.image}
                    alt={r.car.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div>
                <div className="font-serif text-lg">{r.car?.title}</div>
                <div className="text-xs text-gold">
                  KWD {r.car?.pricePerDay} / day
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-neutral-400 mb-2 block">
                  {t("label.startDate").toUpperCase()}
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-ink border border-background-icon-card rounded-lg text-sm p-3"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 mb-2 block">
                  {t("label.days").toUpperCase()}
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value) || 1)}
                  className="w-full bg-ink border border-background-icon-card rounded-lg text-sm p-3"
                />
              </div>
            </div>
            <div className="verify-row mt-3 text-sm text-zinc-400 border-b border-zinc-400 pb-2">
              {t("pickupNote")}
            </div>
            <div className="text-lg mt-4 flex items-center justify-between">
              <span>{t("estimated")}</span>
              <span className="font-serif text-gold font-semibold">
                KWD {estTotal}
              </span>
            </div>
          </div>
        )}

        {r.step === 4 && (
          <div data-step="4">
            <div className="mb-4 flex items-center gap-4 bg-background-main border border-background-icon-card p-3 rounded-lg">
              <div className="flex items-center gap-4">
                {r.car?.image ? (
                  <div className="w-28 h-16 relative rounded-md overflow-hidden bg-zinc-800">
                    <Image
                      src={r.car.image}
                      alt={r.car.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex-1">
                  <div className="font-serif text-lg">{r.car?.title}</div>
                  <div className="text-xs text-gold">
                    KWD {r.car?.pricePerDay} / day
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">✓</span>
                <span>{t("features.insurance")}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">✓</span>
                <span>{t("features.delivery")}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">✓</span>
                <span>{t("features.roadside")}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">✓</span>
                <span>{t("features.tracking")}</span>
              </div>
            </div>

            <div className="divide-y divide-divider-line text-sm text-zinc-300">
              <div className="py-3 flex justify-between">
                <span>{t("label.car")}</span>
                <span className="text-right">{r.car?.title}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>{t("label.period")}</span>
                <span className="text-right">
                  {days} {t("label.days")}
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span>{t("label.dailyRate")}</span>
                <span className="text-right">KWD {r.car?.pricePerDay}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gold/30 pt-2">
              <span className="text-lg font-semibold">{t("label.total")}</span>
              <span className="font-serif text-xl text-amber-400">
                KWD {estTotal}
              </span>
            </div>
          </div>
        )}

        {r.step === 5 && (
          <div data-step="5">
            <div className="p-4 text-sm text-emerald-100 rounded-lg bg-background-main border border-background-icon-card">
              {t("termsText")}
            </div>
            <label className="mt-3 flex items-start gap-3">
              <input
                type="checkbox"
                id="tcCheck"
                className="mt-1 w-4.5 h-4.5 accent-emerald-600"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />{" "}
              <span>{t("agree")}</span>
            </label>
          </div>
        )}

        {r.step === 6 && (
          <div data-step="6">
            <p className="text-sm text-zinc-400 mb-3">{t("signatureNotice")}</p>
            <label className="font-mono text-xs text-zinc-400">
              Digital signature
            </label>
            <div>
              <SignatureCanvas
                ref={sigCanvasRef}
                penColor="black"
                canvasProps={{
                  className:
                    "w-full h-40 bg-neutral-200 rounded-lg border border-background-icon-card",
                }}
                onEnd={() => {
                  const data = sigCanvasRef.current?.toDataURL?.();
                  setSignature(data ?? null);
                }}
              />
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  className="py-1 px-3 rounded-lg cursor-pointer hover:border-gold hover:text-gold border border-neutral-700 text-xs text-neutral-300"
                  onClick={clearSignature}
                >
                  Clear
                </button>
                {/* {signature ? (
                  <div className="text-sm text-emerald-400">
                    {t("signatureSaved")}
                  </div>
                ) : (
                  <div className="text-sm text-zinc-400">
                    {t("drawSignature")}
                  </div>
                )} */}
              </div>
            </div>
            <div className="mt-3">
              <div
                className={`upload-box cursor-pointer rounded-xl border-2 border-dotted ${selfieFile ? "border-emerald-700 bg-emerald-950/30" : "border-neutral-700 hover:border-gold bg-background-main"} py-8 px-5 text-center`}
                onClick={() => onSelectFile(fileSelfieRef, setSelfieFile)}
              >
                <div className="text-2xl flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#C6A664"
                  >
                    <g clipPath="url(#clip0_4418_6760)">
                      <path
                        d="M17.2399 22.75H6.75993C3.95993 22.75 2.17993 21.08 2.01993 18.29L1.49993 10.04C1.41993 8.79 1.84993 7.59 2.70993 6.68C3.55993 5.77 4.75993 5.25 5.99993 5.25C6.31993 5.25 6.62993 5.06 6.77993 4.76L7.49993 3.33C8.08993 2.16 9.56993 1.25 10.8599 1.25H13.1499C14.4399 1.25 15.9099 2.16 16.4999 3.32L17.2199 4.78C17.3699 5.06 17.6699 5.25 17.9999 5.25C19.2399 5.25 20.4399 5.77 21.2899 6.68C22.1499 7.6 22.5799 8.79 22.4999 10.04L21.9799 18.3C21.7999 21.13 20.0699 22.75 17.2399 22.75ZM10.8599 2.75C10.1199 2.75 9.17993 3.33 8.83993 4L8.11993 5.44C7.69993 6.25 6.88993 6.75 5.99993 6.75C5.15993 6.75 4.37993 7.09 3.79993 7.7C3.22993 8.31 2.93993 9.11 2.99993 9.94L3.51993 18.2C3.63993 20.22 4.72993 21.25 6.75993 21.25H17.2399C19.2599 21.25 20.3499 20.22 20.4799 18.2L20.9999 9.94C21.0499 9.11 20.7699 8.31 20.1999 7.7C19.6199 7.09 18.8399 6.75 17.9999 6.75C17.1099 6.75 16.2999 6.25 15.8799 5.46L15.1499 4C14.8199 3.34 13.8799 2.76 13.1399 2.76H10.8599V2.75Z"
                        fill="white"
                        style={{ fill: "var(--fillg)" }}
                      />
                      <path
                        d="M13.5 8.75H10.5C10.09 8.75 9.75 8.41 9.75 8C9.75 7.59 10.09 7.25 10.5 7.25H13.5C13.91 7.25 14.25 7.59 14.25 8C14.25 8.41 13.91 8.75 13.5 8.75Z"
                        fill="white"
                        style={{ fill: "var(--fillg)" }}
                      />
                      <path
                        d="M12 18.75C9.79 18.75 8 16.96 8 14.75C8 12.54 9.79 10.75 12 10.75C14.21 10.75 16 12.54 16 14.75C16 16.96 14.21 18.75 12 18.75ZM12 12.25C10.62 12.25 9.5 13.37 9.5 14.75C9.5 16.13 10.62 17.25 12 17.25C13.38 17.25 14.5 16.13 14.5 14.75C14.5 13.37 13.38 12.25 12 12.25Z"
                        fill="white"
                        style={{ fill: "var(--fillg)" }}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_6760">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {selfieFile ? (
                  <div>
                    <div className="ub-t font-semibold mt-2">
                      {shortName(selfieFile)}
                    </div>
                    <div className="ub-s text-sm text-emerald-300 mt-1">
                      {t("fileSelected")}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="ub-t font-semibold mt-2">
                      {t("upload.selfie")}
                    </div>
                    <div className="ub-s text-sm text-zinc-400 mt-1">
                      {t("upload.selfie")}
                    </div>
                  </>
                )}
              </div>

              <input
                ref={fileSelfieRef}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        )}

        {r.step === 7 && (
          <div data-step="7">
            <div className="flex items-center justify-between my-7">
              <span className="text-lg font-semibold">{t("amountDue")}</span>
              <span className="sv font-serif text-xl text-gold">
                KWD {estTotal}
              </span>
            </div>

            <label className="text-xs text-neutral-400 mb-2 block">
              {t("choosePayment")}
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {["knet", "visa", "paypal", "apple"].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPayMethod(key)}
                  className={`py-3 rounded-lg cursor-pointer border hover:border-emerald-700 text-sm ${payMethod === key ? "border-emerald-500 bg-emerald-950 text-emerald-200" : "border-background-icon-card text-zinc-200"}`}
                >
                  {key === "knet"
                    ? "KNET · كـ نت"
                    : key === "visa"
                      ? "Visa / Master"
                      : key === "paypal"
                        ? "PayPal"
                        : "Apple Pay"}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="text-xs text-neutral-400 mb-2 block">
                {t("cardNumber")}
              </label>
              <input
                placeholder="•••• •••• •••• ••••"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-ink border border-background-icon-card rounded-lg text-sm p-3"
              />

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-xs text-neutral-400 mb-2 block">
                    {t("expiry")}
                  </label>
                  <input
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-ink border border-background-icon-card rounded-lg text-sm p-3"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 mb-2 block">
                    {t("cvv")}
                  </label>
                  <input
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-ink border border-background-icon-card rounded-lg text-sm p-3"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg border border-emerald-700 bg-emerald-950 flex items-center gap-3 text-sm text-emerald-100">
              <span className="text-sm">🔒</span>
              <span>{t("secureNote")}</span>
            </div>
          </div>
        )}

        {r.step === 8 && (
          <div data-step="8">
            <div className="success-wrap text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-900/40 flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="mt-4 text-2xl font-serif text-emerald-50 font-semibold">
                {t("doneMsgTitle")}
              </h3>

              <p
                className="text-sm text-emerald-100 mt-3 max-w-xl mx-auto"
                id="rsvDoneMsg"
              >
                {r.car?.title
                  ? i18n.language === "ar"
                    ? `${r.car.title} در راه است. دستیار هوش مصنوعی اطلاعات تحویل و زمان رسیدن را برایتان ارسال می‌کند.`
                    : `${r.car.title} is on its way. The AI assistant will message you delivery details and arrival time.`
                  : t("doneMsgBody")}
              </p>
            </div>
          </div>
        )}

        {r.step !== 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {r.step !== 8 && (
              <Button
                variant="ghost"
                className="w-full hover:border-gold hover:text-gold bg-transparent text-gold hover:bg-transparent"
                onClick={() => r.back()}
                disabled={r.step === 0}
              >
                {t("back")}
              </Button>
            )}

            {r.step === 8 ? (
              <Button
                variant="default"
                className="w-full bg-emerald col-span-2 hover:bg-emerald-deep"
                onClick={() => {
                  try {
                    const n = addNotification({
                      titleKey: "reserve:doneMsgTitle",
                      subtitleKey: "reserve:doneMsgBodyWithCar",
                      subtitleParams: { car: r.car?.title ?? "" },
                    });
                    // mark acknowledged (OK) for the user as requested
                    acknowledgeNotification(n.id);
                    //eslint-disable-next-line
                  } catch (e) {
                    // ignore storage errors
                  }
                  return r.close();
                }}
              >
                {t("done")}
              </Button>
            ) : (
              <Button
                type="button"
                className={`w-full h-auto rounded-lg text-sm font-semibold border ${canAdvance ? "bg-emerald border-emerald text-white hover:bg-emerald-deep hover:border-emerald-deep" : "bg-transparent border-line text-zinc-400 hover:bg-transparent opacity-50"}`}
                onClick={() => {
                  if (!canAdvance) return;
                  return r.next();
                }}
                disabled={r.step !== 8 && !canAdvance}
                aria-disabled={!canAdvance}
              >
                {t("next")}
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
