import { Shield, Lock, Eye, FileText } from 'lucide-react';

function Privacy() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last Updated: November 4, 2025
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed">
              At Green Arrow SACCO, we are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy explains how we 
              collect, use, disclose, and safeguard your information when you use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><strong>Personal Information:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name, ID number, and date of birth</li>
                <li>Contact information (address, phone, email)</li>
                <li>Employment and income information</li>
                <li>Bank account and financial information</li>
                <li>Photograph for identification purposes</li>
              </ul>
              
              <p className="mt-4"><strong>Transaction Information:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account balances and transaction history</li>
                <li>Loan applications and repayment records</li>
                <li>Savings and deposit activities</li>
              </ul>

              <p className="mt-4"><strong>Technical Information:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Usage data and website analytics</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Process membership applications and maintain member records</li>
              <li>Evaluate and approve loan applications</li>
              <li>Process financial transactions and payments</li>
              <li>Communicate with you about your accounts and services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Detect and prevent fraud and unauthorized activities</li>
              <li>Improve our services and customer experience</li>
              <li>Send important updates and promotional materials (with your consent)</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>With your consent:</strong> When you authorize us to share information</li>
              <li><strong>Service providers:</strong> Third-party vendors who assist in our operations (under strict confidentiality agreements)</li>
              <li><strong>Credit reference bureaus:</strong> For credit assessment and reporting purposes</li>
              <li><strong>Legal requirements:</strong> When required by law, court order, or regulatory authorities</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement robust security measures to protect your information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Encryption of sensitive data during transmission and storage</li>
              <li>Secure servers with firewall protection</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Restricted access to personal information on a need-to-know basis</li>
              <li>Employee training on data protection and privacy</li>
              <li>Multi-factor authentication for online accounts</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your data (subject to legal obligations)</li>
              <li><strong>Objection:</strong> Object to certain processing of your information</li>
              <li><strong>Withdrawal:</strong> Withdraw consent for marketing communications at any time</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services 
              and comply with legal obligations. Member records are typically maintained for the 
              duration of membership plus seven years as required by financial regulations. 
              Transaction records are kept for at least six years for audit and compliance purposes.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website uses cookies and similar technologies to enhance your experience, 
              analyze usage patterns, and deliver relevant content. You can control cookie 
              preferences through your browser settings. Disabling cookies may affect website functionality.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our 
              practices or legal requirements. We will notify you of any material changes by 
              posting the updated policy on our website with a new "Last Updated" date. 
              Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have questions about this Privacy Policy or wish to exercise your rights, 
              please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@greenarrow.co.ke</p>
              <p><strong>Phone:</strong> +254 700 000 000</p>
              <p><strong>Address:</strong> 123 Financial Street, Nairobi, Kenya</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;