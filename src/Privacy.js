export default function Privacy() {
  const s = {
    wrap: { minHeight:"100vh", background:"#06060e", color:"#e2e8f0", fontFamily:"'Syne',Arial,sans-serif", padding:"40px 20px" },
    inner: { maxWidth:760, margin:"0 auto" },
    back: { display:"inline-flex", alignItems:"center", gap:6, color:"#6366f1", fontSize:13, fontWeight:700, textDecoration:"none", marginBottom:32, cursor:"pointer", background:"none", border:"none" },
    badge: { display:"inline-block", background:"#6366f120", color:"#a78bfa", border:"1px solid #6366f140", borderRadius:20, padding:"4px 14px", fontSize:11, fontWeight:700, marginBottom:16 },
    h1: { fontSize:28, fontWeight:800, color:"#f1f5f9", marginBottom:8 },
    date: { fontSize:12, color:"#4b5563", marginBottom:40 },
    h2: { fontSize:16, fontWeight:800, color:"#f1f5f9", marginTop:36, marginBottom:10, paddingBottom:6, borderBottom:"1px solid #1a1a2e" },
    p: { fontSize:14, color:"#9ca3af", lineHeight:1.8, marginBottom:12 },
    li: { fontSize:14, color:"#9ca3af", lineHeight:1.8, marginBottom:6 },
    ul: { paddingLeft:20, marginBottom:12 },
    box: { background:"#0d0d1a", border:"1px solid #1a1a2e", borderRadius:10, padding:"16px 20px", marginTop:8, marginBottom:12 },
    footer: { marginTop:48, paddingTop:24, borderTop:"1px solid #1a1a2e", fontSize:12, color:"#374151", textAlign:"center" },
    link: { color:"#6366f1" },
  };

  return (
    <div style={s.wrap}>
      <div style={s.inner}>
        <button style={s.back} onClick={() => window.location.href = "/"}>← Back to VoteStar 2025</button>

        <div style={s.badge}>Legal</div>
        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={s.date}>Last updated: January 1, 2025</p>

        <p style={s.p}>
          Welcome to <strong style={{color:"#f1f5f9"}}>VoteStar 2025</strong> ("we", "our", or "us"). This Privacy Policy explains how we collect, use, and protect your information when you use our website at <strong style={{color:"#f1f5f9"}}>votestar2025.com</strong> (the "Service").
        </p>
        <p style={s.p}>By using our Service, you agree to the collection and use of information in accordance with this policy.</p>

        <h2 style={s.h2}>1. Information We Collect</h2>
        <p style={s.p}>We collect the following types of information:</p>
        <div style={s.box}>
          <p style={{...s.p, marginBottom:6, color:"#f1f5f9", fontWeight:700}}>Automatically Collected Data</p>
          <ul style={s.ul}>
            <li style={s.li}>Browser type and version</li>
            <li style={s.li}>Device type (mobile / desktop)</li>
            <li style={s.li}>Pages visited and time spent</li>
            <li style={s.li}>Referring URL (how you found us)</li>
            <li style={s.li}>Country / region (based on IP address)</li>
          </ul>
        </div>
        <div style={s.box}>
          <p style={{...s.p, marginBottom:6, color:"#f1f5f9", fontWeight:700}}>Local Storage Data</p>
          <ul style={s.ul}>
            <li style={s.li}>Your daily vote record (stored locally in your browser — never sent to our servers)</li>
            <li style={s.li}>This data resets automatically every day at midnight</li>
            <li style={s.li}>You can clear this at any time by clearing your browser data</li>
          </ul>
        </div>
        <p style={s.p}>We do <strong style={{color:"#f1f5f9"}}>not</strong> collect your name, email address, phone number, or any personally identifiable information unless you voluntarily contact us.</p>

        <h2 style={s.h2}>2. How We Use Your Information</h2>
        <ul style={s.ul}>
          <li style={s.li}>To operate and improve the VoteStar 2025 service</li>
          <li style={s.li}>To prevent vote fraud (daily vote limit enforcement)</li>
          <li style={s.li}>To analyze traffic and usage patterns via Google Analytics</li>
          <li style={s.li}>To display relevant advertisements via Google AdSense</li>
        </ul>

        <h2 style={s.h2}>3. Google AdSense & Advertising</h2>
        <p style={s.p}>
          We use <strong style={{color:"#f1f5f9"}}>Google AdSense</strong> to display advertisements on our website. Google may use cookies and similar technologies to show you personalized ads based on your browsing history.
        </p>
        <ul style={s.ul}>
          <li style={s.li}>Google's use of advertising cookies enables it to serve ads based on your visits to our site and other sites on the Internet</li>
          <li style={s.li}>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={s.link}>Google Ad Settings</a></li>
          <li style={s.li}>For more information, visit <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" style={s.link}>Google's Advertising Policies</a></li>
        </ul>

        <h2 style={s.h2}>4. Cookies</h2>
        <p style={s.p}>Our website uses cookies for the following purposes:</p>
        <ul style={s.ul}>
          <li style={s.li}><strong style={{color:"#f1f5f9"}}>Essential cookies:</strong> Required for the site to function (e.g., vote tracking)</li>
          <li style={s.li}><strong style={{color:"#f1f5f9"}}>Analytics cookies:</strong> Google Analytics to understand site traffic</li>
          <li style={s.li}><strong style={{color:"#f1f5f9"}}>Advertising cookies:</strong> Google AdSense to display relevant ads</li>
        </ul>
        <p style={s.p}>You can control cookies through your browser settings. Disabling cookies may affect some site functionality.</p>

        <h2 style={s.h2}>5. Third-Party Services</h2>
        <p style={s.p}>We use the following third-party services that may collect data independently:</p>
        <div style={s.box}>
          <ul style={s.ul}>
            <li style={s.li}><strong style={{color:"#f1f5f9"}}>Google Analytics</strong> — Website traffic analysis (<a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={s.link}>Privacy Policy</a>)</li>
            <li style={s.li}><strong style={{color:"#f1f5f9"}}>Google AdSense</strong> — Advertising (<a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={s.link}>Privacy Policy</a>)</li>
            <li style={s.li}><strong style={{color:"#f1f5f9"}}>Vercel</strong> — Website hosting (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer" style={s.link}>Privacy Policy</a>)</li>
          </ul>
        </div>

        <h2 style={s.h2}>6. Data Retention</h2>
        <p style={s.p}>
          Vote data stored in your browser's local storage is automatically cleared daily. We do not store personal data on our servers. Analytics data is retained according to Google Analytics' standard retention policies.
        </p>

        <h2 style={s.h2}>7. Children's Privacy</h2>
        <p style={s.p}>
          Our Service is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will promptly delete it.
        </p>

        <h2 style={s.h2}>8. Your Rights</h2>
        <p style={s.p}>You have the right to:</p>
        <ul style={s.ul}>
          <li style={s.li}>Access the data we hold about you</li>
          <li style={s.li}>Request deletion of your data</li>
          <li style={s.li}>Opt out of personalized advertising</li>
          <li style={s.li}>Clear your local browser storage at any time</li>
        </ul>

        <h2 style={s.h2}>9. Changes to This Policy</h2>
        <p style={s.p}>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date above.
        </p>

        <h2 style={s.h2}>10. Contact Us</h2>
        <p style={s.p}>
          If you have any questions about this Privacy Policy, please contact us at:<br/>
          <strong style={{color:"#f1f5f9"}}>votestar2025.com/contact</strong>
        </p>

        <div style={s.footer}>
          © 2025 VoteStar 2025 · <a href="/terms" style={s.link}>Terms of Service</a> · <a href="/" style={s.link}>Back to Home</a>
        </div>
      </div>
    </div>
  );
}
