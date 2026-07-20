import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans overflow-x-hidden">
      <Navbar />

      <main className="grow">
        <Section className="relative pt-16 pb-20 bg-slate-50/50">
          <div className="mx-auto max-w-4xl px-4 relative z-10">
            <p className="mb-3 text-sm font-semibold text-emerald-600 uppercase tracking-widest">
              Legal Documents
            </p>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 leading-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500">
              Last Updated: July 12, 2026
            </p>
          </div>
        </Section>

        <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">1. Agreement to Terms</h2>
              <p className="text-sm">
                Welcome to Cash Connect. These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Cash Connect ("we," "us," or "our"), concerning your access to and use of our website, mobile application, and digital currency, gift card, and payment processing services (collectively, the "Services").
              </p>
              <p className="text-sm mt-3">
                By accessing or using our Services, you agree that you have read, understood, and agree to be bound by all of these Terms. If you do not agree with all of these Terms, you are prohibited from using the Services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">2. Eligibility & Account Verification</h2>
              <p className="text-sm">
                To register for an account and use our Services, you must be at least 18 years of age. You represent and warrant that you have the legal capacity to enter into a binding contract and have not been previously suspended or removed from our Services.
              </p>
              <p className="text-sm mt-3">
                In compliance with international regulations on Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF), we require all users to complete our Know Your Customer (KYC) identity verification procedures. You agree to provide accurate, current, and complete information, and promptly update your records if they change.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">3. Services & Trading Rules</h2>
              <p className="text-sm">
                Cash Connect provides a secure platform allowing users to purchase and sell digital assets (cryptocurrency), exchange gift cards for fiat currency, and receive international payments.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm">
                <li>
                  <strong>Crypto Trading:</strong> All crypto purchases and sales are final. Transactions depend on prevailing market rates and network confirmation speeds.
                </li>
                <li>
                  <strong>Gift Card Exchange:</strong> You represent that you are the lawful owner of any gift cards uploaded for trade. Uploading depleted, invalid, or fraudulent gift cards is strictly prohibited and will lead to account suspension and referral to authorities.
                </li>
                <li>
                  <strong>Payouts:</strong> Users are responsible for providing correct bank details. Cash Connect is not liable for funds sent to incorrect accounts provided by the user.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">4. Transaction Limits & Fees</h2>
              <p className="text-sm">
                We reserve the right to impose transaction limits on your wallet or trading volume based on your KYC verification level and risk profile. All applicable fees, rates, and conversion costs are transparently detailed during the trade confirmation process.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">5. Prohibited Activities</h2>
              <p className="text-sm">
                You may not use the Services for any unlawful activities, including but not limited to fraud, money laundering, financing terrorism, selling illicit materials, or attempting to bypass our security measures. We reserve the right to suspend or terminate accounts engaging in suspicious or high-risk activity immediately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">6. Limitation of Liability</h2>
              <p className="text-sm">
                To the maximum extent permitted by law, Cash Connect, its directors, employees, or agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses resulting from your access to or use of the Services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">7. Governing Law</h2>
              <p className="text-sm">
                These Terms shall be governed by and construed in accordance with international financial regulations and the laws of the jurisdiction in which Cash Connect operates, without regard to conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">8. Changes to Terms</h2>
              <p className="text-sm">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will notify you of any material changes by posting the updated Terms on this page. Your continued use of our Services following any modifications constitutes acceptance of the new Terms.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-800 mb-2">Contact Us</h3>
              <p className="text-sm">
                If you have any questions or concerns about these Terms, please contact us at <a href="mailto:support@cashconnectworld.com" className="text-emerald-600 hover:underline">support@cashconnectworld.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
