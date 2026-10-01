import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  Sparkles,
  TerminalSquare,
  Users,
  X,
} from "lucide-react";

type Plan = {
  name: string;
  monthly: number;
  annual: number;
  description: string;
  features: string[];
  action: string;
  featured?: boolean;
  icon: typeof Sparkles;
};

const plans: Plan[] = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    description: "A clean start for individual API work.",
    features: [
      "JSON to TypeScript generation",
      "Interactive field explorer",
      "Copy and share outputs",
    ],
    action: "Start for free",
    icon: Sparkles,
  },
  {
    name: "Pro",
    monthly: 12,
    annual: 9,
    description: "More room for your growing API catalog.",
    features: [
      "Everything in Starter",
      "Expanded document limits*",
      "Saved API collections*",
      "Priority support*",
    ],
    action: "Preview Pro checkout",
    featured: true,
    icon: TerminalSquare,
  },
  {
    name: "Team",
    monthly: 29,
    annual: 22,
    description: "A shared reference point for your team.",
    features: [
      "Everything in Pro",
      "Shared workspaces*",
      "Team seats*",
      "Shared API references*",
    ],
    action: "Preview Team checkout",
    icon: Users,
  },
];

type PaymentMethod = "card" | "paypal";

export default function Pricing() {
  const navigate = useNavigate();
  const [annualBilling, setAnnualBilling] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [confirmed, setConfirmed] = useState(false);
  const [complete, setComplete] = useState(false);

  const openCheckout = (plan: Plan) => {
    setCheckoutPlan(plan);
    setPaymentMethod("card");
    setConfirmed(false);
    setComplete(false);
  };

  const closeCheckout = () => {
    setCheckoutPlan(null);
    setComplete(false);
  };

  const handleCheckout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComplete(true);
  };

  const checkoutPrice = checkoutPlan
    ? annualBilling
      ? checkoutPlan.annual
      : checkoutPlan.monthly
    : 0;

  return (
    <div className="pricing-shell min-h-screen">
      <header className="pricing-nav">
        <Link to="/" className="pricing-brand" aria-label="CleanDocs home">
          <span className="pricing-brand-icon">
            <TerminalSquare size={18} />
          </span>
          CleanDocs
        </Link>
        <nav aria-label="Main navigation">
          <Link to="/#workflow">How it works</Link>
          <Link to="/workspace">Workspace</Link>
        </nav>
        <Link to="/workspace" className="pricing-nav-cta">
          Open workspace <ArrowUpRight size={15} />
        </Link>
      </header>

      <main className="pricing-main">
        <section className="pricing-intro">
          <div className="pricing-overline">
            <span /> CLEAN, CLEAR, NO SURPRISES
          </div>
          <h1>
            Plans for clearer
            <br />
            <span>API documentation.</span>
          </h1>
          <p>
            Pick a plan preview and explore the checkout flow. The product is
            still free to use.
          </p>
          <div className="pricing-preview-notice">
            <LockKeyhole size={15} />
            <span>
              <strong>UI preview only.</strong> Prices and paid features are
              illustrative; payments are not processed.
            </span>
          </div>
        </section>

        <div
          className="billing-control"
          role="group"
          aria-label="Billing period"
        >
          <button
            type="button"
            aria-pressed={!annualBilling}
            className={!annualBilling ? "selected" : ""}
            onClick={() => setAnnualBilling(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={annualBilling}
            className={annualBilling ? "selected" : ""}
            onClick={() => setAnnualBilling(true)}
          >
            Yearly <span>Save 25%</span>
          </button>
        </div>

        <section className="plan-grid" aria-label="Plan previews">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = annualBilling ? plan.annual : plan.monthly;
            return (
              <article
                className={`plan-card ${plan.featured ? "plan-featured" : ""}`}
                key={plan.name}
                style={{ "--plan-index": index } as React.CSSProperties}
              >
                {plan.featured && (
                  <span className="plan-badge">MOST POPULAR</span>
                )}
                <div className="plan-heading">
                  <span className="plan-icon">
                    <Icon size={17} />
                  </span>
                  <h2>{plan.name}</h2>
                </div>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  <strong>{price === 0 ? "$0" : `$${price}`}</strong>
                  <span>{price === 0 ? "forever" : "/ month"}</span>
                </div>
                {price > 0 && (
                  <p className="plan-billing-note">
                    {annualBilling
                      ? "Billed yearly · UI preview"
                      : "Billed monthly · UI preview"}
                  </p>
                )}
                <button
                  type="button"
                  className={`plan-action ${plan.featured ? "plan-action-primary" : ""}`}
                  onClick={() =>
                    plan.monthly === 0
                      ? navigate("/workspace")
                      : openCheckout(plan)
                  }
                >
                  {plan.action} <ArrowRight size={15} />
                </button>
                <div className="plan-includes">WHAT'S INCLUDED</div>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} /> <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.name === "Team" && (
                  <p className="plan-footnote">
                    * Illustrative feature preview
                  </p>
                )}
              </article>
            );
          })}
        </section>
        <p className="pricing-footnote">
          * Paid tiers and marked features are mock UI only and are not
          available in the current product.
        </p>
      </main>

      <footer className="pricing-footer">
        <Link to="/" className="pricing-footer-brand">
          <TerminalSquare size={16} /> CleanDocs
        </Link>
        <span>No payment details are collected or saved.</span>
        <Link to="/" className="pricing-footer-home">
          <ArrowLeft size={14} /> Back to home
        </Link>
      </footer>

      {checkoutPlan && (
        <div
          className="checkout-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCheckout();
          }}
        >
          <section
            className="checkout-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
          >
            <header className="checkout-header">
              <div>
                <span className="checkout-lock">
                  <LockKeyhole size={15} />
                </span>
                <div>
                  <h2 id="checkout-title">Checkout preview</h2>
                  <p>Secure payment UI · demo only</p>
                </div>
              </div>
              <button
                className="checkout-close"
                type="button"
                onClick={closeCheckout}
                aria-label="Close checkout"
              >
                <X size={18} />
              </button>
            </header>

            {complete ? (
              <div className="checkout-success">
                <span>
                  <CheckCircle2 size={31} />
                </span>
                <h3>Preview complete</h3>
                <p>
                  No payment was processed and no payment details were sent or
                  saved.
                </p>
                <button
                  type="button"
                  className="checkout-submit"
                  onClick={closeCheckout}
                >
                  Back to plans <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <>
                <div className="checkout-summary">
                  <div>
                    <span>{checkoutPlan.name} plan</span>
                    <small>
                      {annualBilling
                        ? `$${checkoutPrice}/mo equivalent · billed yearly`
                        : "Monthly billing preview"}
                    </small>
                  </div>
                  <strong>
                    ${annualBilling ? checkoutPrice * 12 : checkoutPrice}
                    <small>/{annualBilling ? "year" : "month"}</small>
                  </strong>
                </div>
                <div className="checkout-warning" role="note">
                  This is only a visual demo. Do not enter real payment details.
                  Nothing is transmitted or stored.
                </div>

                <div
                  className="payment-methods"
                  role="group"
                  aria-label="Payment method"
                >
                  <button
                    type="button"
                    className={paymentMethod === "card" ? "active" : ""}
                    aria-pressed={paymentMethod === "card"}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard size={16} /> Card
                  </button>
                  <button
                    type="button"
                    className={paymentMethod === "paypal" ? "active" : ""}
                    aria-pressed={paymentMethod === "paypal"}
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    PayPal
                  </button>
                </div>

                <form className="checkout-form" onSubmit={handleCheckout}>
                  <label>
                    Email for receipt preview
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                  {paymentMethod === "card" ? (
                    <>
                      <label>
                        Name on card
                        <input
                          type="text"
                          name="cardholder"
                          autoComplete="cc-name"
                          placeholder="Full name"
                          required
                        />
                      </label>
                      <label>
                        Card number
                        <input
                          type="text"
                          name="card-number"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="0000 0000 0000 0000"
                          pattern="[0-9 ]{12,23}"
                          maxLength={23}
                          required
                        />
                      </label>
                      <div className="checkout-form-row">
                        <label>
                          Expiry
                          <input
                            type="text"
                            name="expiry"
                            autoComplete="cc-exp"
                            placeholder="MM / YY"
                            pattern="(0[1-9]|1[0-2])\s*/\s*[0-9]{2}"
                            required
                          />
                        </label>
                        <label>
                          Security code
                          <input
                            type="password"
                            name="security-code"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            placeholder="CVC"
                            pattern="[0-9]{3,4}"
                            maxLength={4}
                            required
                          />
                        </label>
                      </div>
                    </>
                  ) : (
                    <div className="paypal-preview">
                      <span className="paypal-wordmark">PayPal</span>
                      <span>Continue with PayPal preview</span>
                    </div>
                  )}
                  <label className="checkout-consent">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(event) => setConfirmed(event.target.checked)}
                      required
                    />
                    <span>
                      I understand this is a demo and I will not enter real
                      payment details.
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="checkout-submit"
                    disabled={!confirmed}
                  >
                    Simulate checkout <ArrowRight size={15} />
                  </button>
                  <p className="checkout-legal">
                    <LockKeyhole size={12} /> Demo only. No charge will be made.
                  </p>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
