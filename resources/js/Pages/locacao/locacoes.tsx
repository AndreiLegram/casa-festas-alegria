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

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/dialog";
import axios from 'axios';
import { useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { formatISOToPtBR } from '@/lib/utils';

const handleDelete = async (id: number) => {
  if (confirm('Tem certeza que deseja excluir essa locação?')) {
    try {
      await axios.delete(route('locacaoDelete', id));
      window.location.reload();
    } catch (error) {
      console.error("Erro:", error);
      alert('Ocorreu um erro ao deletar, tente novamente');
    }
  }
};

export default function Locacoes({ locacoes, auth }: PageProps<{ locacoes: Array<any> }>) {
  const [selectedLocacao, setSelectedLocacao] = useState<any | null>(null);
  const [dataPagamento, setDataPagamento] = useState<string>(new Date().toISOString().split("T")[0]);

  const handleConfirmarPagamento = async () => {
    if (!selectedLocacao) return;

    try {
      axios.post(route('pagamentosStore', selectedLocacao.id), {
        valor_total: selectedLocacao.valor_total,
        data_pagamento: dataPagamento
      })
      .then((res) => {
        console.log(res);
        setSelectedLocacao(null);
        window.location.reload();
      })
      .catch((res) => {
        console.log(res);
        alert('Erro ao confirmar pagamento. Verifique os dados e tente novamente.');
      })
    } catch (error: any) {
      console.error("Erro ao confirmar pagamento:", error);
      alert('Erro ao confirmar pagamento. Verifique os dados e tente novamente.');
    }
  };

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
                  <TableHead className="px-6 text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locacoes.map((locacao) => (
                  <TableRow key={locacao.id}>
                    <TableCell className="px-6">{locacao.codigo}</TableCell>
                    <TableCell className="px-6">{formatISOToPtBR(locacao.data)}</TableCell>
                    <TableCell className="px-6">{locacao.id_contato ? locacao.id_contato : 'N/A'}</TableCell>
                    <TableCell className="px-6">R$ {Number(locacao.valor_total).toFixed(2)}</TableCell>
                    <TableCell className="px-6">{formatISOToPtBR(locacao.data_devolucao)}</TableCell>
                    <TableCell className="px-6">{locacao.data_pagamento ? formatISOToPtBR(locacao.data_pagamento) : 'Pendente'}</TableCell>
                    <TableCell className="text-right flex space-x-2 justify-end px-6">
                      {!locacao.data_pagamento && (
                        <>
                          <button
                            className="px-4 py-2 mr-10 bg-green-500 text-white rounded-md"
                            onClick={() => setSelectedLocacao(locacao)}
                          >
                            Pagar
                          </button>
                          <Link href={`/locacao/${locacao.id}`}>
                            <button className="px-4 py-2 mr-10 bg-yellow-500 text-white rounded-md">
                              Editar
                            </button>
                          </Link>
                          <button onClick={() => handleDelete(locacao.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">
                            Deletar
                          </button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog open={!!selectedLocacao} onOpenChange={() => setSelectedLocacao(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pagamento da Locação</DialogTitle>
                </DialogHeader>

                {selectedLocacao && (
                  <div className="space-y-4">
                    <p><strong>Código:</strong> {selectedLocacao.codigo}</p>
                    <p><strong>Valor Total:</strong> R$ {Number(selectedLocacao.valor_total).toFixed(2)}</p>
                    <br />
                    <label htmlFor="data_pagamento">Data do Pagamento
                      <Input
                        id="data_pagamento"
                        type="date"
                        value={dataPagamento}
                        onChange={(e) => setDataPagamento(e.target.value)}
                      />
                    </label>

                    <DialogFooter className="mt-4">
                      <Button onClick={handleConfirmarPagamento}>
                        Confirmar Pagamento
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
