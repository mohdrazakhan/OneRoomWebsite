import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './VerifyCertificatePage.css';

function VerifyCertificatePage() {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id');

  const [certificateId, setCertificateId] = useState(urlId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [certificateData, setCertificateData] = useState(null);

  // Auto-verify if ID is in URL
  useEffect(() => {
    if (urlId) {
      verifyCertificate(urlId);
    }
  }, [urlId]);

  const verifyCertificate = async (idToVerify) => {
    if (!idToVerify || !idToVerify.trim()) return;

    setLoading(true);
    setError(null);
    setCertificateData(null);

    try {
      // Replace slashes with hyphens to match the document ID format
      const docId = idToVerify.trim().replace(/\//g, '-');
      const docRef = doc(db, 'certificates', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCertificateData(docSnap.data());
      } else {
        setError("Certificate not found. Please check the ID and try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while verifying the certificate.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    verifyCertificate(certificateId);
  };

  return (
    <div className="verify-page">
      <div className="container">
        <div className="verify-header text-center section-header reveal">
          <h1>Verify Certificate</h1>
          <p>Enter a certificate ID to view details to ensure document authenticity.</p>
        </div>

        <div className="verify-card reveal">
          <form className="verify-form" onSubmit={handleVerify}>
            <div className="form-group">
              <label htmlFor="certificateId">Certificate ID</label>
              <input
                type="text"
                id="certificateId"
                placeholder="e.g. OR-2023-1002A"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>

          {error && (
            <div className="verify-message error">
              <span className="icon">⚠️</span>
              {error}
            </div>
          )}

          {certificateData && (
            <div className="verify-result success">
              <div className="verify-message success">
                <span className="icon">✅</span>
                Verified Successfully
              </div>
              <div className="certificate-details">
                {Object.entries(certificateData).map(([key, value]) => (
                  <div className="detail-row" key={key}>
                    <span className="detail-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    <span className="detail-value">
                      {key.toLowerCase() === 'email' 
                        ? (typeof value === 'string' 
                            ? value.replace(/(.{1})(.*)(@.*)/, (gp1, gp2, gp3, gp4) => gp2 + "*".repeat(gp3.length) + gp4)
                            : value)
                        : (typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value))
                      }
                    </span>
                  </div>
                ))}
              </div>

              <div className="qr-code-section" style={{ marginTop: '30px', textAlign: 'center' }}>
                <h4 style={{ marginBottom: '16px', color: 'var(--text-dark)' }}>Scan to Verify</h4>
                <div style={{ display: 'inline-block', padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <QRCodeSVG 
                    value={`${window.location.hostname === 'localhost' ? 'https://oneroom.app' : window.location.origin}/verify?id=${certificateId}`} 
                    size={160} 
                  />
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-light)', marginTop: '16px' }}>
                  Share this QR code or link to instantly verify this certificate.
                  <br />
                  <a 
                    href={`${window.location.hostname === 'localhost' ? 'https://oneroom.app' : window.location.origin}/verify?id=${certificateId}`} 
                    style={{ color: 'var(--primary-color)', textDecoration: 'none', wordBreak: 'break-all' }} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {`${window.location.hostname === 'localhost' ? 'https://oneroom.app' : window.location.origin}/verify?id=${certificateId}`}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyCertificatePage;
