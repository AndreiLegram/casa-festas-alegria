import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
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


export default function Brinquedos({ brinquedos, auth, mustVerifyEmail, status }: PageProps<{ brinquedos: Array<any>, mustVerifyEmail: boolean, status?: string }>) {
    return (
<AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Brinquedos</h2>}
    >
      <Head title="Clientes" />
      <section className='container'>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            {/* Aqui fica a tabela */}
            <Table>
              <TableCaption>Listagem dos produtos cadastrados.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>tipo</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Data de Aquisicao</TableHead>
                  <TableHead>Valor da Locação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brinquedos.map((brinquedos) => (
                  <TableRow key={brinquedos.id}>
                    <TableCell>{brinquedos.nome}</TableCell>
                    <TableCell>{brinquedos.tipo}</TableCell>
                    <TableCell>{brinquedos.marca}</TableCell>
                    <TableCell>{brinquedos.data_aquisicao}</TableCell>
                    <TableCell>{brinquedos.valor_locacao}</TableCell>
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
