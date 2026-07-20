import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500">
              Last Updated: July 12, 2026
            </p>
          </div>
        </Section>

        <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">1. Information We Collect</h2>
              <p className="text-sm">
                We collect personal information that you voluntarily provide to us when you register on our platform, submit identity documentation for KYC verification, perform transactions, or contact support. This information may include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm">
                <li>
                  <strong>Personal Identifiers:</strong> Your full name, email address, phone number, physical address, and country of residence.
                </li>
                <li>
                  <strong>KYC/Identity Documents:</strong> Government-issued ID card scans, passport numbers, driver's licenses, or proof of address documents.
                </li>
                <li>
                  <strong>Financial Data:</strong> Bank account numbers, payout account details, wallet transaction history, and proof of payment uploads.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">2. How We Use Your Information</h2>
              <p className="text-sm">
                We process your personal information for purposes based on legitimate business interests, compliance with legal obligations, and the execution of our services:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm">
                <li>To facilitate account creation, authentication, and secure login.</li>
                <li>To verify your identity and prevent fraudulent activities under global compliance policies.</li>
                <li>To process digital asset trades, payouts, and handle deposits/withdrawals.</li>
                <li>To send transactional emails, OTP security codes, and system notifications.</li>
                <li>To respond to user inquiries and offer customer support services.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">3. How We Share Your Information</h2>
              <p className="text-sm">
                We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our platform, performing KYC checks, or conducting financial processing, provided they agree to keep your details confidential and secure.
              </p>
              <p className="text-sm mt-3">
                We may also disclose information when required by law, subpoena, or request from financial regulatory authorities to comply with AML/CTF obligations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">4. Data Security</h2>
              <p className="text-sm">
                We implement comprehensive technical and organizational security measures, including End-to-End SSL encryption, secure hosting environments, and access controls, to safeguard your personal data from unauthorized access, alteration, or disclosure.
              </p>
              <p className="text-sm mt-3">
                However, no transmission of data over the internet can be guaranteed to be 100% secure. You are responsible for keeping your login credentials and OTP codes confidential.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">5. Data Retention</h2>
              <p className="text-sm">
                We retain your personal information only for as long as necessary to fulfill the business purposes outlined in this Policy, or as required by applicable tax, AML, or other legal regulations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">6. Your Privacy Rights</h2>
              <p className="text-sm">
                Depending on your location, you may have rights under regional data protection laws (such as GDPR or regional equivalents), including the right to request access to, correction of, or erasure of your personal data. To exercise these rights, please contact our support team.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">7. Updates to This Policy</h2>
              <p className="text-sm">
                We may update this Privacy Policy from time to time. The updated version will be indicated by a revised "Last Updated" date at the top of this page. We encourage you to review this policy periodically to stay informed of how we protect your information.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-800 mb-2">Contact Us</h3>
              <p className="text-sm">
                If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@cashconnectworld.com" className="text-emerald-600 hover:underline">privacy@cashconnectworld.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
