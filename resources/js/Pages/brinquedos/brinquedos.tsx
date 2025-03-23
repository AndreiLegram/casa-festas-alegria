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
      <Link href="/brinquedosForm">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Cadastrar Novo Brinquedo
        </button>
      </Link>
      <section className="container">
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Table>
              <TableCaption>Listagem dos brinquedos cadastrados.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Data de Aquisição</TableHead>
                  <TableHead>Valor da Locação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brinquedos.map((brinquedo) => (
                  <TableRow key={brinquedo.id}>
                    <TableCell>{brinquedo.nome}</TableCell>
                    <TableCell>{brinquedo.tipo}</TableCell>
                    <TableCell>{brinquedo.marca}</TableCell>
                    <TableCell>{brinquedo.data_aquisicao}</TableCell>
                    <TableCell>{brinquedo.valor_locacao}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Link href={`/brinquedosForm/${brinquedo.id}`}>
                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">
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
