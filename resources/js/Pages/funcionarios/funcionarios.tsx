import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import axios from 'axios';

export default function Funcionarios({ funcionarios, auth, mustVerifyEmail, status }: PageProps<{ funcionarios: Array<any>, mustVerifyEmail: boolean, status?: string }>) {

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esse funcionario?')) {
      try {
        await axios.delete(route('funcionariosDelete', id));
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
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Funcionarios</h2>}
    >
      <Head title="Funcionarios" />
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="py-12">
          <Link href="/funcionario">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md mb-10">
              Cadastrar Novo Funcionario
            </button>
          </Link>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Table>
              <TableCaption>Listagem dos funcionarios cadastrados.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6">Nome</TableHead>
                  <TableHead className="px-6">Permissão</TableHead>
                  <TableHead className="px-6 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {funcionarios.map((funcionario) => (
                  <TableRow key={funcionario.id}>
                    <TableCell className="px-6">{funcionario.name}</TableCell>
                    <TableCell className="px-6">{funcionario.permission_level}</TableCell>
                    <TableCell className="text-right flex space-x-2 justify-end px-6">
                      <Link href={`/funcionario/${funcionario.id}`}>
                        <button className="px-4 py-2 mr-10 bg-yellow-500 text-white rounded-md">
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(funcionario.id)}
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
