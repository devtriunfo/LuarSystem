"use client";

import { useState } from "react";
import { Cliente } from "@/lib/types";

interface ClienteModalProps {
  cliente: Cliente | null;
  onSave: (data: Partial<Cliente>) => void;
  onClose: () => void;
}

export default function ClienteModal({ cliente, onSave, onClose }: ClienteModalProps) {
  const [formData, setFormData] = useState({
    nome: cliente?.nome || "",
    email: cliente?.email || "",
    telefone: cliente?.telefone || "",
    projeto: cliente?.projeto || "",
    status: cliente?.status || "pendente",
    valor: cliente?.valor?.toString() || "",
    data_inicio: cliente?.data_inicio || "",
    prazo_entrega: cliente?.prazo_entrega || "",
    observacoes: cliente?.observacoes || "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data: Partial<Cliente> = {
      nome: formData.nome,
      email: formData.email || null,
      telefone: formData.telefone || null,
      projeto: formData.projeto,
      status: formData.status as Cliente["status"],
      valor: formData.valor ? parseFloat(formData.valor) : null,
      data_inicio: formData.data_inicio || null,
      prazo_entrega: formData.prazo_entrega || null,
      observacoes: formData.observacoes || null,
    };

    await onSave(data);
    setLoading(false);
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">
            {cliente ? "Editar Cliente" : "Novo Cliente"}
          </h2>
          <button className="admin-modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label htmlFor="nome">Nome *</label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Nome do cliente"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemplo.com"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="projeto">Projeto *</label>
            <input
              type="text"
              id="projeto"
              value={formData.projeto}
              onChange={(e) => setFormData({ ...formData, projeto: e.target.value })}
              placeholder="Nome do projeto"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label htmlFor="valor">Valor (R$)</label>
            <input
              type="number"
              id="valor"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              placeholder="0,00"
              step="0.01"
              min="0"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="data_inicio">Data de Início</label>
            <input
              type="date"
              id="data_inicio"
              value={formData.data_inicio}
              onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="prazo_entrega">Prazo de Entrega</label>
            <input
              type="date"
              id="prazo_entrega"
              value={formData.prazo_entrega}
              onChange={(e) => setFormData({ ...formData, prazo_entrega: e.target.value })}
            />
          </div>

          <div className="admin-form-group full-width">
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Observações sobre o cliente ou projeto..."
            />
          </div>

          <div className="full-width" style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "20px" }}>
            <button type="button" onClick={onClose} className="admin-btn admin-btn-edit">
              Cancelar
            </button>
            <button type="submit" className="btn" disabled={loading}>
              <span>{loading ? "Salvando..." : cliente ? "Atualizar" : "Criar"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
