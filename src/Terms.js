export default function Terms() {
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
    highlight: { background:"#fbbf2410", border:"1px solid #fbbf2430", borderRadius:10, padding:"14px 18px", marginBottom:16 },
    footer: { marginTop:48, paddingTop:24, borderTop:"1px solid #1a1a2e", fontSize:12, color:"#374151", textAlign:"center" },
    link: { color:"#6366f1" },
  };

  return (
    <div style={s.wrap}>
      <div style={s.inner}>
        <button style={s.back} onClick={() => window.location.href = "/"}>← Back to VoteStar 2026</button>

        <div style={s.badge}>Legal</div>
        <h1 style={s.h1}>Terms of Service</h1>
        <p style={s.date}>Last updated: January 1, 2026</p>

        <div style={s.highlight}>
          <p style={{...s.p, marginBottom:0, color:"#fbbf24"}}>
            ⚠️ Please read these Terms of Service carefully before using VoteStar 2026. By accessing or using our service, you agree to be bound by these terms.
          </p>
        </div>

        <h2 style={s.h2}>1. Acceptance of Terms</h2>
        <p style={s.p}>
          By accessing and using <strong style={{color:"#f1f5f9"}}>VoteStar 2026</strong> ("the Service", "the Site") at votestar2026.com, you accept and agree to be bound by these Terms of Service and our <a href="/privacy" style={s.link}>Privacy Policy</a>.
        </p>
        <p style={s.p}>
          If you do not agree to these terms, please do not use our Service.
        </p>

        <h2 style={s.h2}>2. Description of Service</h2>
        <p style={s.p}>
          VoteStar 2026 is a free online fan voting platform that allows users to vote for their favorite global celebrities, athletes, content creators, and public figures. The Service includes:
        </p>
        <ul style={s.ul}>
          <li style={s.li}>Real-time fan voting with live leaderboards</li>
          <li style={s.li}>200+ candidates across multiple categories (K-Pop, Sports, Creator, Pop, etc.)</li>
          <li style={s.li}>Daily vote limits to ensure fair participation</li>
          <li style={s.li}>Social sharing features</li>
        </ul>

        <h2 style={s.h2}>3. Voting Rules</h2>
        <div style={s.box}>
          <ul style={s.ul}>
            <li style={s.li}><strong style={{color:"#f1f5f9"}}>1 vote per day per device</strong> — Each device may cast one free vote per day. The limit resets at midnight (local time).</li>
            <li style={s.li}><strong style={{color:"#f1f5f9"}}>No automated voting</strong> — Use of bots, scripts, VPNs, or any automated tools to cast multiple votes is strictly prohibited.</li>
            <li style={s.li}><strong style={{color:"#f1f5f9"}}>No manipulation</strong> — Attempting to manipulate vote counts through technical means is a violation of these terms.</li>
            <li style={s.li}><strong style={{color:"#f1f5f9"}}>Results are for entertainment</strong> — Voting results represent fan engagement and are not official rankings or endorsements.</li>
          </ul>
        </div>
        <p style={s.p}>We reserve the right to reset, adjust, or remove votes if manipulation is detected.</p>

        <h2 style={s.h2}>4. User Conduct</h2>
        <p style={s.p}>When using VoteStar 2026, you agree NOT to:</p>
        <ul style={s.ul}>
          <li style={s.li}>Use the Service for any unlawful purpose</li>
          <li style={s.li}>Attempt to gain unauthorized access to any part of the Service</li>
          <li style={s.li}>Use bots or automated systems to interact with the Service</li>
          <li style={s.li}>Interfere with or disrupt the Service or servers connected to the Service</li>
          <li style={s.li}>Collect or harvest any information from the Service</li>
          <li style={s.li}>Impersonate any person or entity</li>
        </ul>

        <h2 style={s.h2}>5. Intellectual Property</h2>
        <p style={s.p}>
          The VoteStar 2026 website, including its design, code, graphics, and content created by us, is owned by VoteStar 2026 and protected by intellectual property laws.
        </p>
        <p style={s.p}>
          Candidate names, images, and likenesses belong to the respective individuals or rights holders. VoteStar 2026 does not claim ownership of any celebrity, athlete, or public figure's name or likeness featured on this site.
        </p>
        <p style={s.p}>
          You may share links to our Service on social media. You may not reproduce, distribute, or create derivative works from our original content without permission.
        </p>

        <h2 style={s.h2}>6. Disclaimer of Warranties</h2>
        <div style={s.box}>
          <p style={{...s.p, marginBottom:0}}>
            The Service is provided on an <strong style={{color:"#f1f5f9"}}>"AS IS" and "AS AVAILABLE"</strong> basis without any warranties of any kind, either express or implied. We do not warrant that:
          </p>
          <ul style={{...s.ul, marginTop:10}}>
            <li style={s.li}>The Service will be uninterrupted or error-free</li>
            <li style={s.li}>Vote counts are 100% accurate or tamper-proof</li>
            <li style={s.li}>The Service will meet your requirements</li>
            <li style={s.li}>Any errors in the Service will be corrected</li>
          </ul>
        </div>

        <h2 style={s.h2}>7. Limitation of Liability</h2>
        <p style={s.p}>
          To the fullest extent permitted by law, VoteStar 2026 shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of or inability to use the Service.
        </p>

        <h2 style={s.h2}>8. Third-Party Content & Advertising</h2>
        <p style={s.p}>
          Our Service displays advertisements served by <strong style={{color:"#f1f5f9"}}>Google AdSense</strong> and may include links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites or services. Clicking on third-party advertisements is at your own risk.
        </p>

        <h2 style={s.h2}>9. Modifications to Service</h2>
        <p style={s.p}>
          We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
        </p>
        <p style={s.p}>
          We may add or remove candidates, change voting rules, or update the platform at any time.
        </p>

        <h2 style={s.h2}>10. Changes to Terms</h2>
        <p style={s.p}>
          We reserve the right to update these Terms of Service at any time. We will notify users by updating the "Last updated" date at the top of this page. Continued use of the Service after any changes constitutes your acceptance of the new terms.
        </p>

        <h2 style={s.h2}>11. Governing Law</h2>
        <p style={s.p}>
          These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or use of the Service shall be resolved through good-faith negotiation.
        </p>

        <h2 style={s.h2}>12. Contact Us</h2>
        <p style={s.p}>
          If you have any questions about these Terms of Service, please contact us at:<br/>
          <strong style={{color:"#f1f5f9"}}>votestar2026.com</strong>
        </p>

        <div style={s.footer}>
          © 2026 VoteStar 2026 · <a href="/privacy" style={s.link}>Privacy Policy</a> · <a href="/" style={s.link}>Back to Home</a>
        </div>
      </div>
    </div>
  );
}
