import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import axios from 'axios';

export default function Brinquedos({ brinquedos, auth, mustVerifyEmail, status }: PageProps<{ brinquedos: Array<any>, mustVerifyEmail: boolean, status?: string }>) {

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esse brinquedo?')) {
      try {
        await axios.delete(route('brinquedosDelete', id));
        window.location.reload();
      } catch (error) {
        console.error("Erro:", error);
        alert('Ocorreu um erro a deletar, tente novamente');
      }
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Brinquedos</h2>}
    >
      <Head title="Brinquedos" />
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="py-12">
          <Link href="/brinquedo">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md mb-10">
              Cadastrar Novo Brinquedo
            </button>
          </Link>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Table>
              <TableCaption>Listagem dos brinquedos cadastrados.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6">Nome</TableHead>
                  <TableHead className="px-6">Código</TableHead>
                  <TableHead className="px-6">Tipo</TableHead>
                  <TableHead className="px-6">Marca</TableHead>
                  <TableHead className="px-6">Data de Aquisição</TableHead>
                  <TableHead className="px-6">Valor da Locação</TableHead>
                  <TableHead className="px-6 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brinquedos.map((brinquedo) => (
                  <TableRow key={brinquedo.id}>
                    <TableCell className="px-6">{brinquedo.nome}</TableCell>
                    <TableCell className="px-6">{brinquedo.codigo_unico}</TableCell>
                    <TableCell className="px-6">{brinquedo.tipo}</TableCell>
                    <TableCell className="px-6">{brinquedo.marca}</TableCell>
                    <TableCell className="px-6">
                      {new Date(brinquedo.data_aquisicao).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="px-6">{brinquedo.valor_locacao}</TableCell>
                    <TableCell className="text-right flex space-x-2 justify-end px-6">
                      <Link href={`/brinquedo/${brinquedo.id}`}>
                        <button className="px-4 py-2 mr-10 bg-yellow-500 text-white rounded-md">
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(brinquedo.id)}
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
