"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Cliente } from "@/lib/types";
import ClienteModal from "./ClienteModal";
import DeleteModal from "./DeleteModal";

interface AdminDashboardProps {
  initialClientes: Cliente[];
  userId: string;
}

export default function AdminDashboard({ initialClientes, userId }: AdminDashboardProps) {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [deletingCliente, setDeletingCliente] = useState<Cliente | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const router = useRouter();

  const stats = useMemo(() => {
    const total = clientes.length;
    const emAndamento = clientes.filter(c => c.status === "em_andamento").length;
    const concluidos = clientes.filter(c => c.status === "concluido").length;
    const valorTotal = clientes.reduce((acc, c) => acc + (c.valor || 0), 0);
    return { total, emAndamento, concluidos, valorTotal };
  }, [clientes]);

  const filteredClientes = useMemo(() => {
    return clientes.filter(cliente => {
      const matchesSearch = 
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cliente.email?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === "todos" || cliente.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [clientes, searchTerm, statusFilter]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleAddCliente = () => {
    setEditingCliente(null);
    setIsModalOpen(true);
  };

  const handleEditCliente = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setIsModalOpen(true);
  };

  const handleDeleteCliente = (cliente: Cliente) => {
    setDeletingCliente(cliente);
    setIsDeleteModalOpen(true);
  };

  const handleSaveCliente = async (clienteData: Partial<Cliente>) => {
    const supabase = createClient();
    
    if (editingCliente) {
      const { data, error } = await supabase
        .from("clientes")
        .update(clienteData)
        .eq("id", editingCliente.id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar cliente:", error);
        return;
      }

      setClientes(clientes.map(c => c.id === editingCliente.id ? data : c));
    } else {
      const { data, error } = await supabase
        .from("clientes")
        .insert({ ...clienteData, user_id: userId })
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar cliente:", error);
        return;
      }

      setClientes([data, ...clientes]);
    }

    setIsModalOpen(false);
    setEditingCliente(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingCliente) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", deletingCliente.id);

    if (error) {
      console.error("Erro ao excluir cliente:", error);
      return;
    }

    setClientes(clientes.filter(c => c.id !== deletingCliente.id));
    setIsDeleteModalOpen(false);
    setDeletingCliente(null);
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return "-";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      em_andamento: "Em Andamento",
      concluido: "Concluído",
      pendente: "Pendente",
      cancelado: "Cancelado",
    };
    return labels[status] || status;
  };

  return (
    <div className="admin-container">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Painel de Clientes</h1>
            <p style={{ color: "rgba(245, 245, 245, 0.6)", marginTop: "8px" }}>
              Gerencie seus clientes e projetos
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/" className="admin-btn admin-btn-edit">
              Voltar ao Site
            </Link>
            <button onClick={handleLogout} className="admin-btn admin-btn-danger">
              Sair
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-value">{stats.total}</div>
            <div className="admin-stat-label">Total de Clientes</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value">{stats.emAndamento}</div>
            <div className="admin-stat-label">Em Andamento</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value">{stats.concluidos}</div>
            <div className="admin-stat-label">Concluídos</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value">{formatCurrency(stats.valorTotal)}</div>
            <div className="admin-stat-label">Valor Total</div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-card">
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "16px", flex: 1, flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Buscar por nome, projeto ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  padding: "12px 18px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(106, 168, 200, 0.2)",
                  borderRadius: "12px",
                  color: "var(--white)",
                  fontSize: "15px",
                }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: "12px 18px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(106, 168, 200, 0.2)",
                  borderRadius: "12px",
                  color: "var(--white)",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                <option value="todos">Todos os status</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
                <option value="pendente">Pendente</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <button onClick={handleAddCliente} className="btn">
              <span>+ Novo Cliente</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="admin-card" style={{ overflowX: "auto" }}>
          {filteredClientes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "rgba(245, 245, 245, 0.6)", fontSize: "16px" }}>
                {clientes.length === 0 
                  ? "Nenhum cliente cadastrado ainda. Clique em \"+ Novo Cliente\" para começar."
                  : "Nenhum cliente encontrado com os filtros aplicados."}
              </p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Projeto</th>
                  <th>Status</th>
                  <th>Valor</th>
                  <th>Prazo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>
                      <div>
                        <div style={{ fontWeight: 600 }}>{cliente.nome}</div>
                        <div style={{ fontSize: "13px", color: "rgba(245, 245, 245, 0.5)" }}>
                          {cliente.email || "-"}
                        </div>
                      </div>
                    </td>
                    <td>{cliente.projeto}</td>
                    <td>
                      <span className={`status-badge status-${cliente.status}`}>
                        {getStatusLabel(cliente.status)}
                      </span>
                    </td>
                    <td>{formatCurrency(cliente.valor)}</td>
                    <td>{formatDate(cliente.prazo_entrega)}</td>
                    <td>
                      <div className="admin-actions">
                        <button
                          onClick={() => handleEditCliente(cliente)}
                          className="admin-btn admin-btn-edit"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteCliente(cliente)}
                          className="admin-btn admin-btn-danger"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <ClienteModal
          cliente={editingCliente}
          onSave={handleSaveCliente}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCliente(null);
          }}
        />
      )}

      {isDeleteModalOpen && deletingCliente && (
        <DeleteModal
          clienteName={deletingCliente.nome}
          onConfirm={handleConfirmDelete}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingCliente(null);
          }}
        />
      )}
    </div>
  );
}
