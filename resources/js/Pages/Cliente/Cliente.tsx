import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
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

export default function Cliente({ clientes, auth, mustVerifyEmail, status }: PageProps<{ clientes: Array<any>, mustVerifyEmail: boolean, status?: string }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clientes</h2>}
    >
      <Head title="Clientes" />
      <section className='container'>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Link href={route('cliente.create')}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Adicionar Cliente</button>
            </Link>
          </div>
          {/* Renderize a tabela de clientes aqui */}
        </div>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <Table>
              <TableCaption>Listagem dos clientes cadastrados.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Data de Nascimento</TableHead>
                  <TableHead className="text-right">Telefone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.nome}</TableCell>
                    <TableCell>{cliente.cpf}</TableCell>
                    <TableCell>{cliente.endereco}</TableCell>
                    <TableCell>{cliente.data_nascimento}</TableCell>
                    <TableCell className="text-right">{cliente.telefone}</TableCell>
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