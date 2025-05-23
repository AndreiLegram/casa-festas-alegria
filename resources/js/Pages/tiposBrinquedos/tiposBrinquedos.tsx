import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import axios from 'axios';

export default function TiposBrinquedos({ tiposBrinquedos, auth, mustVerifyEmail, status }: PageProps<{ tiposBrinquedos: Array<any>, mustVerifyEmail: boolean, status?: string }>) {

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esse tipo de brinquedo?')) {
      try {
        await axios.delete(route('tipoBrinquedoDelete', id));
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
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tipos de Brinquedos</h2>}
    >
      <Head title="Tipos de Brinquedos" />
      <section style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div className="py-12 w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Link href="/tipoBrinquedo">
          <button className="mt-4 px-4 py-2 mb-10 bg-blue-500 text-white rounded-md">
            Cadastrar Tipo de Brinquedo
          </button>
        </Link>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <Table>
            <TableCaption>Listagem dos tipos de brinquedos cadastrados.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="px-6 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiposBrinquedos.map((tipoBrinquedo) => (
                <TableRow key={tipoBrinquedo.id}>
                  <TableCell>{tipoBrinquedo.codigo}</TableCell>
                  <TableCell>{tipoBrinquedo.nome}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/tipoBrinquedo/${tipoBrinquedo.id}`}>
                      <button className="px-4 py-2 mr-10 bg-yellow-500 text-white rounded-md">
                        Editar
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(tipoBrinquedo.id)}
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
