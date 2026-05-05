import { useOutletContext } from "react-router";

export default function PluginTerms() {
  const { project } = useOutletContext();

  return (
    <div className="vox-container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <h1 className="vox-section-title" style={{ textAlign: "left", marginBottom: "2rem", fontSize: "3rem" }}>Terms of Service</h1>
      <div className="vox-doc-section__desc" style={{ color: "#adaaaa", lineHeight: 1.8, fontSize: "1.1rem" }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>1. Acceptance of Terms</h3>
        <p>By downloading, installing, or using the {project?.title || "VoxAI"} plugin, you agree to be bound by these Terms of Service. If you do not agree with these terms, do not use the plugin.</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>2. License</h3>
        <p>{project?.title || "VoxAI"} is licensed under the GNU General Public License v2.0 or later. Premium features require a valid license key, which is granted on a per-site basis depending on your subscription plan.</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>3. API Usage and Costs</h3>
        <p>{project?.title || "VoxAI"} acts as an interface between your WordPress site and the OpenAI API. You are solely responsible for providing a valid API key and for any costs, fees, or charges incurred from your use of the OpenAI API.</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>4. Limitation of Liability</h3>
        <p>The plugin is provided "as is" without warranty of any kind. We shall not be liable for any damages, including but not limited to direct, indirect, special, or consequential damages arising out of the use or inability to use the plugin.</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>5. Modifications to the Service</h3>
        <p>We reserve the right to modify or discontinue the plugin (or any part thereof) temporarily or permanently, with or without notice.</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>6. Contact Information</h3>
        <p>For questions regarding these Terms of Service, please reach out to us at caioferreiradev@gmail.com.</p>
      </div>
    </div>
  );
}
