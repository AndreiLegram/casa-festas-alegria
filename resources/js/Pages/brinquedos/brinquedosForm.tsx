import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/Components/ui/button";
import { FieldError, useForm } from "react-hook-form";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from "@inertiajs/react";
import { useForm as useInertiaForm } from '@inertiajs/react'; // Only use Inertia's useForm when needed

export default function BrinquedosForm({ brinquedo, tipos, auth }: PageProps<{ brinquedo: any, tipos: Array<any>, auth: any }>) {
  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      codigo: brinquedo?.codigo || '',
      nome: brinquedo?.nome || '',
      tipo: brinquedo?.tipo || '',
      marca: brinquedo?.marca || '',
      data_aquisicao: brinquedo?.data_aquisicao || '',
      valor_locacao: brinquedo?.valor_locacao || '',
    }
  });
  
  // Message state for success or error
  const [message, setMessage] = useState("");

  // Inertia Form for submission
  const { post, put, processing } = useInertiaForm();

  // Submit form
  const submitForm = (data: any) => {
    if (brinquedo) {
      put(route('brinquedosSave', brinquedo.id), {
        onSuccess: () => setMessage("Brinquedo atualizado com sucesso!"),
        onError: () => setMessage("Ocorreu um erro ao atualizar o brinquedo."),
      });
    } else {
      post(route('brinquedosSave'), {
        data,
        onSuccess: () => setMessage("Brinquedo cadastrado com sucesso!"),
        onError: () => setMessage("Ocorreu um erro ao cadastrar o brinquedo."),
      });
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastro de Brinquedos</h2>}
    >
      <div className="container mx-auto mt-5">
        <Head title="Cadastro de brinquedos" />
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-4">
              <label htmlFor="nome" className="block text-sm font-medium">Nome</label>
              <Input
                id="nome"
                className="w-full"
                {...register("nome", { required: "O nome é obrigatório" })}
              />
              {errors.nome && <p className="text-red-500 text-sm">{(errors.nome as FieldError)?.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="tipo" className="block text-sm font-medium">Tipo</label>
              <select
                id="tipo"
                className="w-full"
                {...register("tipo", { required: "O tipo é obrigatório" })}
              >
                <option value="">Selecione o Tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
              {errors.tipo && <p className="text-red-500 text-sm">{(errors.tipo as FieldError)?.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="marca" className="block text-sm font-medium">Marca</label>
              <Input
                id="marca"
                className="w-full"
                {...register("marca", { required: "A marca é obrigatória" })}
              />
              {errors.marca && <p className="text-red-500 text-sm">{(errors.marca as FieldError)?.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="data_aquisicao" className="block text-sm font-medium">Data de Aquisição</label>
              <Input
                id="data_aquisicao"
                type="date"
                className="w-full"
                {...register("data_aquisicao", { required: "A data de aquisição é obrigatória" })}
              />
              {errors.data_aquisicao && <p className="text-red-500 text-sm">{(errors.data_aquisicao as FieldError)?.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="valor_locacao" className="block text-sm font-medium">Valor de Locação</label>
              <Input
                id="valor_locacao"
                type="number"
                step="0.01"
                className="w-full"
                {...register("valor_locacao", { required: "O valor de locação é obrigatório" })}
              />
              {errors.valor_locacao && <p className="text-red-500 text-sm">{(errors.valor_locacao as FieldError)?.message}</p>}
            </div>


              <Button type="submit" className="w-full" disabled={processing}>
                {brinquedo ? "Atualizar Brinquedo" : "Cadastrar Brinquedo"}
              </Button>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
