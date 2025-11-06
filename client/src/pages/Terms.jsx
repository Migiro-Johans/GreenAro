import { FileText, AlertCircle, CheckCircle } from 'lucide-react';

function Terms() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">
            Last Updated: November 4, 2025
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">
                  Please read these terms and conditions carefully before using our services. 
                  By becoming a member or using any Green Aro SACCO services, you agree to 
                  be bound by these terms.
                </p>
              </div>
            </div>
          </section>

          {/* Membership */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Membership</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>1.1 Eligibility:</strong> Membership is open to any individual aged 18 years 
              and above who meets the eligibility criteria set by the SACCO.</p>
              
              <p><strong>1.2 Application:</strong> Applicants must complete the membership form, 
              provide required documentation, and pay the minimum share capital.</p>
              
              <p><strong>1.3 Approval:</strong> The SACCO reserves the right to accept or reject 
              any membership application at its discretion.</p>
              
              <p><strong>1.4 Rights and Obligations:</strong> Members have the right to participate 
              in SACCO activities, access services, and vote at general meetings. Members must 
              comply with SACCO by-laws and maintain good standing.</p>
            </div>
          </section>

          {/* Shares and Deposits */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Shares and Deposits</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>2.1 Minimum Share Capital:</strong> Members must maintain a minimum share 
              capital of KES 5,000, payable within six months of joining.</p>
              
              <p><strong>2.2 Shares:</strong> Shares are non-transferable and do not carry interest. 
              Dividends are declared annually based on SACCO performance.</p>
              
              <p><strong>2.3 Deposits:</strong> Members may make deposits into their savings accounts 
              at any time. Minimum balances apply as specified for each account type.</p>
              
              <p><strong>2.4 Withdrawals:</strong> Withdrawal requests must comply with notice periods 
              and minimum balance requirements. The SACCO may suspend withdrawals temporarily if 
              necessary to maintain liquidity.</p>
            </div>
          </section>

          {/* Loans */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Loans</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>3.1 Loan Eligibility:</strong> Members must have been active for at least 
              three months and maintain regular contributions to qualify for loans.</p>
              
              <p><strong>3.2 Loan Limits:</strong> Loan amounts are determined by savings balance, 
              guarantors, and repayment capacity as per the loan policy.</p>
              
              <p><strong>3.3 Interest Rates:</strong> Interest rates vary by loan product and are 
              subject to periodic review by the Board.</p>
              
              <p><strong>3.4 Repayment:</strong> Loans must be repaid according to the agreed schedule. 
              Late payments attract penalty fees. Default may result in recovery action including 
              legal proceedings.</p>
              
              <p><strong>3.5 Guarantors:</strong> Some loans require guarantors who must be active 
              members in good standing. Guarantors are liable for loan repayment in case of default.</p>
              
              <p><strong>3.6 Collateral:</strong> Certain loan products may require collateral. 
              The SACCO has the right to dispose of collateral in case of default.</p>
            </div>
          </section>

          {/* Fees and Charges */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Fees and Charges</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>4.1 Service Fees:</strong> The SACCO may charge fees for various services 
              including loan processing, statement requests, and special transactions.</p>
              
              <p><strong>4.2 Transparency:</strong> All fees are clearly disclosed before charging. 
              No hidden charges apply.</p>
              
              <p><strong>4.3 Changes:</strong> Fee structures may be reviewed periodically. Members 
              will be notified of any changes in advance.</p>
            </div>
          </section>

          {/* Account Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Account Security</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>5.1 Member Responsibility:</strong> Members are responsible for maintaining 
              the confidentiality of their account information, PINs, and passwords.</p>
              
              <p><strong>5.2 Unauthorized Transactions:</strong> Members must report any unauthorized 
              transactions or suspicious activities immediately.</p>
              
              <p><strong>5.3 SACCO Liability:</strong> The SACCO is not liable for losses resulting 
              from member negligence in safeguarding account information.</p>
            </div>
          </section>

          {/* Communication */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Communication</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>6.1 Contact Information:</strong> Members must provide accurate contact 
              information and update the SACCO promptly of any changes.</p>
              
              <p><strong>6.2 Notices:</strong> The SACCO may communicate with members via email, SMS, 
              postal mail, or website announcements.</p>
              
              <p><strong>6.3 Marketing:</strong> Members may receive promotional materials unless they 
              opt out of marketing communications.</p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Dispute Resolution</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>7.1 Internal Resolution:</strong> Disputes should first be raised with 
              SACCO management for internal resolution.</p>
              
              <p><strong>7.2 Formal Complaints:</strong> Unresolved issues may be escalated through 
              the formal complaints procedure.</p>
              
              <p><strong>7.3 Arbitration:</strong> If internal resolution fails, disputes may be 
              referred to arbitration as per Kenyan law.</p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination of Membership</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>8.1 Voluntary Withdrawal:</strong> Members may withdraw by giving 60 days 
              written notice and clearing all outstanding obligations.</p>
              
              <p><strong>8.2 Involuntary Termination:</strong> The SACCO may terminate membership for 
              breach of by-laws, fraudulent activity, or conduct detrimental to the SACCO.</p>
              
              <p><strong>8.3 Refund of Shares:</strong> Upon termination, share capital will be refunded 
              after deducting any outstanding liabilities.</p>
            </div>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <div className="space-y-3 text-gray-700">
              <p>The SACCO shall not be liable for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Losses arising from member negligence or misconduct</li>
                <li>Delays or failures due to circumstances beyond the SACCO's control (force majeure)</li>
                <li>System failures, network issues, or third-party service interruptions</li>
                <li>Consequential or indirect damages</li>
              </ul>
            </div>
          </section>

          {/* Amendments */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Amendments</h2>
            <p className="text-gray-700 leading-relaxed">
              The SACCO reserves the right to amend these terms and conditions at any time. 
              Members will be notified of material changes through official communication channels. 
              Continued use of services after amendments constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions are governed by the laws of Kenya. The SACCO operates 
              under the SACCO Societies Act and regulations by the SACCO Societies Regulatory 
              Authority (SASRA).
            </p>
          </section>

          {/* Acceptance */}
          <section className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  By becoming a member of Green Aro SACCO or using our services, you acknowledge 
                  that you have read, understood, and agree to be bound by these terms and conditions.
                </p>
                <p className="text-sm text-gray-600">
                  For questions about these terms, please contact us at <strong>greenarosacco@yahoo.com</strong> 
                  or call <strong>+254 700 000 000</strong>.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;