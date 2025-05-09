import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import axios from 'axios';
import { formatCPF, formatISOToPtBR } from '@/lib/utils';

const handleDelete = async (id: number) => {
  if (confirm('Tem certeza que deseja excluir esse cliente?')) {
    try {
      await axios.delete(`/clientesDelete/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Erro:", error);
      alert('Ocorreu um erro a deletar, tente novamente');
    }
  }
};

export default function Cliente({ clientes, auth, mustVerifyEmail, status }: PageProps<{ clientes: Array<any>, mustVerifyEmail: boolean, status?: string }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clientes</h2>}
    >
      <Head title="Clientes" />
      <section style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="py-12 w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Link href="/cliente">
          <button className="mt-4 px-4 py-2 mb-10 bg-blue-500 text-white rounded-md">
            Cadastrar cliente
          </button>
        </Link>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Table>
              <TableCaption>Listagem dos clientes cadastrados.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6">Nome</TableHead>
                  <TableHead className="px-6">CPF</TableHead>
                  <TableHead className="px-6">Endereço</TableHead>
                  <TableHead className="px-6">Data de Nascimento</TableHead>
                  <TableHead className="px-6 text-right">Telefone</TableHead>
                  <TableHead className="px-6 text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell className="px-6">{cliente.nome}</TableCell>
                    <TableCell className="px-6">{formatCPF(cliente.cpf)}</TableCell>
                    <TableCell className="px-6">{cliente.endereco}</TableCell>
                    <TableCell className="px-6">{formatISOToPtBR(cliente.data_nascimento)}</TableCell>
                    <TableCell className="px-6 text-right">{cliente.telefone}</TableCell>
                    <TableCell className="text-center flex space-x-2 justify-end px-6">
                      <Link href={`/cliente/${cliente.id}`}>
                        <button className="px-4 py-2 mr-10 bg-yellow-500 text-white rounded-md">
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(cliente.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                      >
                        Deletar
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
