export default function AssistantServer() {
  return (
    <section className="w-full text-white py-20 bg-background-green-section2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 flex flex-col gap-5">
          <p className="text-sm text-title-yellow font-mono tracking-[2px]">
            POWERED BY AI
          </p>
          <h1 className="text-5xl font-serif">
            A smart assistant working for you
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div
            className="rounded-xl p-6 bg-background-card border border-border-card hover:border-icon-card transform transition-transform duration-300 ease-out hover:-translate-y-1"
            style={{ willChange: "transform" }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--color-background-icon-card)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#39866d"
              >
                <g clip-path="url(#clip0_3111_32711)">
                  <path
                    d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
                    fill="white"
                    style={{ fill: "var(--fillg)" }}
                  />
                  <path
                    d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z"
                    fill="white"
                    style={{ fill: "var(--fillg)" }}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3111_32711">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="text-lg font-semibold">Instant chat assistant</div>
            <div className="text-sm text-zinc-400 mt-2">
              Chat with our AI 24/7 — it recommends the right car, books it, and
              tracks delivery, in Arabic and English.
            </div>
          </div>

          <div
            className="rounded-xl p-6 bg-background-card border border-border-card hover:border-icon-card transform transition-transform duration-300 ease-out hover:-translate-y-1"
            style={{ willChange: "transform" }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--color-background-icon-card)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#39866d"
              >
                <g clip-path="url(#clip0_4418_7470)">
                  <path
                    d="M12.0201 20.5299C9.69011 20.5299 7.36011 20.1599 5.15011 19.4199C4.31011 19.1299 3.67011 18.5399 3.39011 17.7699C3.10011 16.9999 3.20011 16.1499 3.66011 15.3899L4.81011 13.4799C5.05011 13.0799 5.27011 12.2799 5.27011 11.8099V8.91992C5.27011 5.19992 8.30011 2.16992 12.0201 2.16992C15.7401 2.16992 18.7701 5.19992 18.7701 8.91992V11.8099C18.7701 12.2699 18.9901 13.0799 19.2301 13.4899L20.3701 15.3899C20.8001 16.1099 20.8801 16.9799 20.5901 17.7699C20.3001 18.5599 19.6701 19.1599 18.8801 19.4199C16.6801 20.1599 14.3501 20.5299 12.0201 20.5299ZM12.0201 3.66992C9.13011 3.66992 6.77011 6.01992 6.77011 8.91992V11.8099C6.77011 12.5399 6.47011 13.6199 6.10011 14.2499L4.95011 16.1599C4.73011 16.5299 4.67011 16.9199 4.80011 17.2499C4.92011 17.5899 5.22011 17.8499 5.63011 17.9899C9.81011 19.3899 14.2401 19.3899 18.4201 17.9899C18.7801 17.8699 19.0601 17.5999 19.1901 17.2399C19.3201 16.8799 19.2901 16.4899 19.0901 16.1599L17.9401 14.2499C17.5601 13.5999 17.2701 12.5299 17.2701 11.7999V8.91992C17.2701 6.01992 14.9201 3.66992 12.0201 3.66992Z"
                    fill="white"
                    style={{ fill: "var(--fillg)" }}
                  />
                  <path
                    d="M13.8801 3.93969C13.8101 3.93969 13.7401 3.92969 13.6701 3.90969C13.3801 3.82969 13.1001 3.76969 12.8301 3.72969C11.9801 3.61969 11.1601 3.67969 10.3901 3.90969C10.1101 3.99969 9.81011 3.90969 9.62011 3.69969C9.43011 3.48969 9.37011 3.18969 9.48011 2.91969C9.89011 1.86969 10.8901 1.17969 12.0301 1.17969C13.1701 1.17969 14.1701 1.85969 14.5801 2.91969C14.6801 3.18969 14.6301 3.48969 14.4401 3.69969C14.2901 3.85969 14.0801 3.93969 13.8801 3.93969Z"
                    fill="white"
                    style={{ fill: "var(--fillg)" }}
                  />
                  <path
                    d="M12.02 22.8105C11.03 22.8105 10.07 22.4105 9.37002 21.7105C8.67002 21.0105 8.27002 20.0505 8.27002 19.0605H9.77002C9.77002 19.6505 10.01 20.2305 10.43 20.6505C10.85 21.0705 11.43 21.3105 12.02 21.3105C13.26 21.3105 14.27 20.3005 14.27 19.0605H15.77C15.77 21.1305 14.09 22.8105 12.02 22.8105Z"
                    fill="white"
                    style={{ fill: "var(--fillg)" }}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4418_7470">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="text-lg font-semibold">
              Interest-based notifications
            </div>
            <div className="text-sm text-zinc-400 mt-2">
              We learn from your activity and preferences to send timely offers
              and reminders — the car you love, when you need it.
            </div>
          </div>

          <div
            className="rounded-xl p-6 bg-background-card border border-border-card hover:border-icon-card transform transition-transform duration-300 ease-out hover:-translate-y-1"
            style={{ willChange: "transform" }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--color-background-icon-card)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#39866d"
              >
                <g clip-path="url(#clip0_4418_7010)">
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
            </div>
            <div className="text-lg font-semibold">Smart door delivery</div>
            <div className="text-sm text-zinc-400 mt-2">
              AI plans the fastest delivery route and gives you a live arrival
              time — the car comes to you anywhere in Kuwait.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
