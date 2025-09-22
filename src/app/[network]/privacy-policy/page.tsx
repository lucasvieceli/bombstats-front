import AdBanner from "@/components/AdsBanner";

function PrivacyPolice() {
  return (
    <div className="flex flex-col">
      {/* <div className="flex justify-center">
        <AdBanner
          dataAdFormat=""
          dataAdSlot="1113269798"
          dataFullWidthResponsive={false}
          style={{ width: "728px", height: "90px" }}
        />
      </div> */}
      <h1 className="text-30 font-bold mb-4">Privacy Policy</h1>
      <p className="text-14 mb-4">Last updated: July 1, 2024</p>

      <p className="text-14 mb-6">
        This Privacy Policy describes how we collect, use, and protect
        information related to the Bombcrypto game through our Chrome extension
        BombStats. By using our Extension, you agree to the collection and use
        of public information in accordance with this policy.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-18 font-semibold mb-2">
            1. Information Collection
          </h2>
          <p className="text-14">
            Our Extension collects the following information:
          </p>
          <p className="text-14 mt-2">
            <strong>1.1 Bombcrypto Game Information:</strong> Data related to
            your performance and progress in the Bombcrypto game.
          </p>
        </div>

        <div>
          <h2 className="text-18 font-semibold mb-2">2. Use of Information</h2>
          <p className="text-14">
            We use the collected information for the following purposes:
          </p>
          <p className="text-14 mt-2">
            <strong>2.1 Improve the Extension:</strong> Analyze Bombcrypto game
            data to identify and fix issues, improve functionality, and develop
            new features for the Extension.
          </p>
        </div>

        <div>
          <h2 className="text-18 font-semibold mb-2">3. Information Sharing</h2>
          <p className="text-14 font-normal">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties. We may share aggregated and
            non-identifiable information about the Bombcrypto game with third
            parties for analysis and improvement purposes.
          </p>
        </div>

        <div>
          <h2 className="text-18 font-semibold mb-2">
            4. Information Security
          </h2>
          <p className="text-14">
            We adopt reasonable measures to protect the information collected
            through the Extension against unauthorized access, use, and
            disclosure. However, no method of transmission over the Internet or
            electronic storage is 100% secure, so we cannot guarantee absolute
            security.
          </p>
        </div>

        <div>
          <h2 className="text-18 font-semibold mb-2">
            5. Changes to This Privacy Policy
          </h2>
          <p className="text-14">
            We reserve the right to update this Privacy Policy periodically. We
            will notify users of any significant changes through the Extension
            or by other appropriate means. We recommend that you review this
            policy regularly to stay informed about how we protect your
            information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolice;
