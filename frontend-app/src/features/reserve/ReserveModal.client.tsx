"use client";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/components/ui/Modal";
import { useReserve } from "./ReserveProvider";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";

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

  const { t } = useTranslation("reserve");

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

  return (
    <Modal isOpen={r.isOpen} onClose={r.close} title={t("modalTitle")}>
      <div className="modal-h mb-3 flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400 mt-1">{`${r.step + 1} / ${TOTAL_STEPS} · ${stepLabel}`}</p>
        </div>
      </div>

      <div className="wiz-steps mb-4 flex gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${i <= r.step ? "bg-emerald-500" : "bg-zinc-700"}`}
          />
        ))}
      </div>

      <div className="modal-body">
        {r.step === 0 && (
          <div className="wiz-pane" data-step="0">
            <div className="trust-note p-4 rounded-md border border-emerald-700 bg-emerald-900/20 text-emerald-200">
              <span className="ti mr-2">●</span>
              <span>{t("trustNote")}</span>
            </div>
            <p className="text-sm text-zinc-400 mt-4">{t("createAccount")}</p>
            <div className="mt-6">
              <button
                className="w-full py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                onClick={openRegister}
              >
                {t("createAccount")}
              </button>
            </div>
          </div>
        )}

        {r.step === 1 && (
          <div className="wiz-pane" data-step="1">
            <p className="text-sm text-zinc-400 mb-4">{t("upload.civil")}</p>
            <div
              className="upload-box cursor-pointer rounded-lg border-2 border-dashed border-zinc-700 p-4 text-center"
              onClick={() => onSelectFile(fileCivilRef, setCivilFile)}
            >
              <div className="ub-ic text-2xl">📄</div>
              <div className="ub-t font-semibold mt-2">{t("step.civil")}</div>
              <div className="ub-s text-sm text-zinc-400 mt-1">
                {t("upload.civil")}
              </div>
            </div>
            <input
              ref={fileCivilRef}
              type="file"
              accept="image/*"
              className="hide"
            />
            <div className="verify-row mt-3 text-sm text-emerald-300">
              {civilFile ? t("fileSelected") : ""}
            </div>
          </div>
        )}

        {r.step === 2 && (
          <div className="wiz-pane" data-step="2">
            <p className="text-sm text-zinc-400 mb-4">{t("upload.license")}</p>
            <div
              className="upload-box cursor-pointer rounded-lg border-2 border-dashed border-zinc-700 p-4 text-center"
              onClick={() => onSelectFile(fileLicRef, setLicFile)}
            >
              <div className="ub-ic text-2xl">📄</div>
              <div className="ub-t font-semibold mt-2">{t("step.license")}</div>
              <div className="ub-s text-sm text-zinc-400 mt-1">
                {t("upload.hint")}
              </div>
            </div>
            <input
              ref={fileLicRef}
              type="file"
              accept="image/*"
              className="hide"
            />
            <div className="field mt-4">
              <label className="block text-sm text-zinc-400 mb-2">
                License or Civil No
              </label>
              <input
                value={licNo}
                onChange={(e) => setLicNo(e.target.value)}
                placeholder="123456789012"
                className="w-full rounded-md p-2 bg-[rgba(255,255,255,0.02)] border border-zinc-700"
              />
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-3">
                <button
                  className="w-full py-2 rounded-md border border-zinc-700 text-sm"
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
          <div className="wiz-pane" data-step="3">
            <div className="sel-car mb-4 flex items-center gap-4">
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
                <div className="text-sm text-zinc-400">
                  KWD {r.car?.pricePerDay}
                </div>
              </div>
            </div>
            <div className="field-row grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  {t("label.startDate")}
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-md p-2 bg-[rgba(255,255,255,0.02)] border border-zinc-700"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  {t("label.days")}
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value) || 1)}
                  className="w-full rounded-md p-2 bg-[rgba(255,255,255,0.02)] border border-zinc-700"
                />
              </div>
            </div>
            <div className="verify-row mt-3 text-sm text-zinc-400">
              {t("pickupNote")}
            </div>
            <div className="summary-row total mt-4 flex items-center justify-between">
              <span>{t("estimated")}</span>
              <span className="sv font-serif">KWD {estTotal}</span>
            </div>
          </div>
        )}

        {r.step === 4 && (
          <div className="wiz-pane" data-step="4">
            <div className="summary-card mb-4 rounded-md border border-zinc-800 p-4 bg-[rgba(255,255,255,0.02)]">
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
                  <div className="text-sm text-zinc-400">
                    KWD {r.car?.pricePerDay} / day
                  </div>
                </div>
              </div>
            </div>

            <div className="feature-list space-y-3 mb-4">
              <div className="fl flex items-center gap-3">
                <span className="fc text-emerald-400">✓</span>
                <span>{t("features.insurance")}</span>
              </div>
              <div className="fl flex items-center gap-3">
                <span className="fc text-emerald-400">✓</span>
                <span>{t("features.delivery")}</span>
              </div>
              <div className="fl flex items-center gap-3">
                <span className="fc text-emerald-400">✓</span>
                <span>{t("features.roadside")}</span>
              </div>
              <div className="fl flex items-center gap-3">
                <span className="fc text-emerald-400">✓</span>
                <span>{t("features.tracking")}</span>
              </div>
            </div>

            <div className="divide-y divide-zinc-700 text-sm text-zinc-300">
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

            <div className="summary-row mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold">{t("label.total")}</span>
              <span className="sv font-serif text-xl text-amber-400">
                KWD {estTotal}
              </span>
            </div>
          </div>
        )}

        {r.step === 5 && (
          <div className="wiz-pane" data-step="5">
            <div className="tc-box p-4 text-sm bg-[rgba(255,255,255,0.02)] rounded-md">
              {t("termsText")}
            </div>
            <label className="check-row mt-3 flex items-start gap-3">
              <input
                type="checkbox"
                id="tcCheck"
                className="mt-1"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />{" "}
              <span>{t("agree")}</span>
            </label>
          </div>
        )}

        {r.step === 6 && (
          <div className="wiz-pane" data-step="6">
            <p className="text-sm text-zinc-400 mb-3">{t("signatureNotice")}</p>
            <label className="font-mono text-xs text-zinc-400">
              Digital signature
            </label>
            <div className="mt-2">
              <SignatureCanvas
                ref={sigCanvasRef}
                penColor="#ffffff"
                canvasProps={{
                  className:
                    "w-full h-32 bg-[rgba(255,255,255,0.02)] rounded-md",
                }}
                onEnd={() => {
                  const data = sigCanvasRef.current?.toDataURL?.();
                  setSignature(data ?? null);
                }}
              />
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  className="py-1 px-3 rounded-md border border-zinc-700 text-sm"
                  onClick={clearSignature}
                >
                  Clear
                </button>
                {signature ? (
                  <div className="text-sm text-emerald-400">
                    {t("signatureSaved")}
                  </div>
                ) : (
                  <div className="text-sm text-zinc-400">
                    {t("drawSignature")}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3">
              <div
                className="upload-box cursor-pointer rounded-lg border-2 border-dashed border-zinc-700 p-4 text-center"
                onClick={() => onSelectFile(fileSelfieRef, setSelfieFile)}
              >
                <div className="ub-ic text-2xl">📸</div>
                <div className="ub-t font-semibold mt-2">
                  {t("upload.selfie")}
                </div>
                <div className="ub-s text-sm text-zinc-400 mt-1">
                  {t("upload.selfie")}
                </div>
              </div>
              <input
                ref={fileSelfieRef}
                type="file"
                accept="image/*"
                className="hide"
              />
            </div>
          </div>
        )}

        {r.step === 7 && (
          <div className="wiz-pane" data-step="7">
            <div className="summary-row total flex items-center justify-between">
              <span className="text-lg">{t("amountDue")}</span>
              <span className="sv font-serif text-2xl text-amber-400">
                KWD {estTotal}
              </span>
            </div>

            <label className="block mt-4 text-sm text-zinc-400">
              {t("choosePayment")}
            </label>
            <div className="pay-methods mt-2 grid grid-cols-2 gap-3">
              {["knet", "visa", "paypal", "apple"].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPayMethod(key)}
                  className={`py-3 rounded-md border text-sm ${payMethod === key ? "border-emerald-500 bg-emerald-800 text-emerald-200" : "border-zinc-800 text-zinc-200"}`}
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
              <label className="block text-sm text-zinc-400 mb-2">
                {t("cardNumber")}
              </label>
              <input
                placeholder="•••• •••• •••• ••••"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full rounded-md p-3 bg-[rgba(255,255,255,0.02)] border border-zinc-700 text-lg"
              />

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    {t("expiry")}
                  </label>
                  <input
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full rounded-md p-2 bg-[rgba(255,255,255,0.02)] border border-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    {t("cvv")}
                  </label>
                  <input
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full rounded-md p-2 bg-[rgba(255,255,255,0.02)] border border-zinc-700"
                  />
                </div>
              </div>
            </div>
            <div className="secure-note mt-4 p-3 rounded-md border border-emerald-700 bg-emerald-900/10 flex items-center gap-3 text-sm text-emerald-200">
              <span className="text-2xl">🔒</span>
              <span>{t("secureNote")}</span>
            </div>
          </div>
        )}

        {r.step === 8 && (
          <div className="wiz-pane" data-step="8">
            <div className="success-wrap text-center">
              <div className="sc-ic text-4xl">✅</div>
              <h3 className="mt-3 text-xl font-semibold">
                {t("doneMsgTitle")}
              </h3>
              <p className="text-sm text-zinc-400 mt-2" id="rsvDoneMsg">
                {t("doneMsgBody")}
              </p>
            </div>
          </div>
        )}

        {r.step !== 0 && (
          <div className="wiz-nav mt-6 flex gap-3">
            <button
              className="btn btn-ghost"
              onClick={() => r.back()}
              disabled={r.step === 0}
            >
              {t("back")}
            </button>
            <button
              className={`ml-auto py-2 px-4 rounded-md text-sm font-semibold ${canAdvance ? "" : "opacity-50 cursor-not-allowed"}`}
              onClick={() => {
                if (r.step === 8) return r.close();
                if (!canAdvance) return;
                return r.next();
              }}
              style={
                canAdvance
                  ? {
                      background: "linear-gradient(90deg,#2f9b6e,#6ad29a)",
                      color: "#07110a",
                    }
                  : { background: "transparent", color: "#9ca3af" }
              }
              aria-disabled={!canAdvance}
            >
              {r.step === 8 ? t("done") : t("next")}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
