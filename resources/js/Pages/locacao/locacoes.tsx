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

const handleDelete = async (id: number) => {
  if (confirm('Tem certeza que deseja excluir essa locação?')) {
    try {
      await axios.delete(route('locacoes.destroy', id));
      window.location.reload();
    } catch (error) {
      console.error("Erro:", error);
      alert('Ocorreu um erro ao deletar, tente novamente');
    }
  }
};

export default function Locacoes({ locacoes, auth }: PageProps<{ locacoes: Array<any> }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Locações</h2>}
    >
      <Head title="Locações" />
      <section style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="py-12 w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Link href="/locacao">
            <button className="mt-4 px-4 py-2 mb-10 bg-blue-500 text-white rounded-md">
              Cadastrar locação
            </button>
          </Link>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Table>
              <TableCaption>Listagem das locações cadastradas.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6">Código</TableHead>
                  <TableHead className="px-6">Data</TableHead>
                  <TableHead className="px-6">Cliente</TableHead>
                  <TableHead className="px-6">Valor Total</TableHead>
                  <TableHead className="px-6">Data Devolução</TableHead>
                  <TableHead className="px-6">Data Pagamento</TableHead>
                  <TableHead className="px-6 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locacoes.map((locacao) => (
                  <TableRow key={locacao.id}>
                    <TableCell className="px-6">{locacao.codigo}</TableCell>
                    <TableCell className="px-6">{new Date(locacao.data).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="px-6">{locacao.contato?.nome || 'N/A'}</TableCell>
                    <TableCell className="px-6">R$ {Number(locacao.valor_total).toFixed(2)}</TableCell>
                    <TableCell className="px-6">{new Date(locacao.data_devolucao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="px-6">{new Date(locacao.data_pagamento).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="text-right flex space-x-2 justify-end px-6">
                      <Link href={`/locacoes/edit/${locacao.id}`}>
                        <button className="px-4 py-2 mr-10 bg-yellow-500 text-white rounded-md">
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(locacao.id)}
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
