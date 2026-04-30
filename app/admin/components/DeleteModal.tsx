"use client";

import { useState } from "react";

interface DeleteModalProps {
  clienteName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteModal({ clienteName, onConfirm, onClose }: DeleteModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div 
        className="admin-modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "450px", textAlign: "center" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <div style={{
            width: "60px",
            height: "60px",
            margin: "0 auto 20px",
            background: "rgba(255, 99, 71, 0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6347" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </div>
          <h2 className="admin-modal-title" style={{ marginBottom: "12px" }}>
            Excluir Cliente
          </h2>
          <p style={{ color: "rgba(245, 245, 245, 0.7)", fontSize: "15px" }}>
            Tem certeza que deseja excluir o cliente <strong style={{ color: "var(--white)" }}>{clienteName}</strong>? 
            Esta ação não pode ser desfeita.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button onClick={onClose} className="admin-btn admin-btn-edit">
            Cancelar
          </button>
          <button 
            onClick={handleConfirm} 
            className="admin-btn admin-btn-danger"
            disabled={loading}
            style={{ padding: "12px 24px" }}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}
