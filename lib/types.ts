export interface Cliente {
  id: string;
  user_id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  projeto: string;
  status: 'em_andamento' | 'concluido' | 'pendente' | 'cancelado';
  valor: number | null;
  data_inicio: string | null;
  prazo_entrega: string | null;
  observacoes: string | null;
  created_at: string;
  updated_at: string;
}

export type ClienteInsert = Omit<Cliente, 'id' | 'created_at' | 'updated_at'>;
export type ClienteUpdate = Partial<Omit<Cliente, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
