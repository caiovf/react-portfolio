import { useOutletContext } from "react-router";

export default function PluginPrivacy() {
  const { project } = useOutletContext();

  return (
    <div className="vox-container" style={{ padding: "6rem 0", maxWidth: "800px" }}>
      <h1 className="vox-section-title" style={{ textAlign: "left", marginBottom: "2rem", fontSize: "3rem" }}>Privacy Policy</h1>
      <div className="vox-doc-section__desc" style={{ color: "#adaaaa", lineHeight: 1.8, fontSize: "1.1rem" }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>1. Information We Collect</h3>
        <p>We do not collect any personal data through the {project?.title || "VoxAI"} plugin itself. The plugin communicates directly between your WordPress server and the OpenAI API. Your API keys are stored locally in your WordPress database and are never transmitted to our servers.</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>2. Use of OpenAI Services</h3>
        <p>By using {project?.title || "VoxAI"}, you are subject to OpenAI's Privacy Policy and Terms of Use regarding the data sent for text-to-speech conversion. Please review OpenAI's policies to understand how they handle your data.</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>3. Analytics and Telemetry</h3>
        <p>We may collect anonymous usage data (such as plugin activation/deactivation and WordPress version) strictly to improve our products and services. You can opt out of this telemetry at any time via the plugin settings.</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>4. Third-Party Services</h3>
        <p>We use Freemius for secure payment processing and licensing. When you purchase a premium license, Freemius collects necessary billing and account information as outlined in their privacy policy.</p>
        <br />
        <h3 style={{ color: "#fff", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.5rem" }}>5. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at caioferreiradev@gmail.com</p>
      </div>
    </div>
  );
}
