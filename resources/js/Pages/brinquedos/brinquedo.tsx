import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { FieldError, useForm } from "react-hook-form";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from "@inertiajs/react";
import { useForm as useInertiaForm } from '@inertiajs/react';
import { router } from '@inertiajs/react'

export default function Brinquedos({ brinquedo, tipos, auth }: PageProps<{ brinquedo: any, tipos: Array<any>, auth: any }>) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: brinquedo?.id || null,
      codigo_unico: brinquedo?.codigo_unico || '',
      nome: brinquedo?.nome || '',
      tipo: brinquedo?.tipo || '',
      marca: brinquedo?.marca || '',
      data_aquisicao: brinquedo?.data_aquisicao || '',
      valor_locacao: brinquedo?.valor_locacao || '',
    }
  });


  const [message, setMessage] = useState("");
  const { post, put, processing } = useInertiaForm();

  const submitForm = (data: any) => {
    if (brinquedo?.id) {
      router.put(`/brinquedosUpdate/${brinquedo.id}`, data, {
        onSuccess: (response) => {
          setMessage('Brinquedo atualizado com sucesso!');
        },
        onError: (errors: any) => {
          setMessage(errors.message || "Ocorreu um erro inesperado.");
        },
      });
    } else {
      router.post('/brinquedosStore', data, {
        onSuccess: (response) => {
          setMessage('Brinquedo cadastrado com sucesso!');
        },
        onError: (errors: any) => {
          setMessage(errors.message || "Ocorreu um erro inesperado.");
        },
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
              <label htmlFor="codigo_unico" className="block text-sm font-medium">Código</label>
              <Input
                id="codigo_unico"
                className="w-full"
                {...register("codigo_unico", { required: "O código é obrigatório" })}
              />
              {errors.codigo_unico && <p className="text-red-500 text-sm">{(errors.codigo_unico as FieldError)?.message}</p>}
            </div>

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
              {brinquedo?.id ? "Atualizar Brinquedo" : "Cadastrar Brinquedo"}
            </Button>
            </form>

            {message && <h3 className="mt-10 text-red-600 mt-20">{message}</h3>}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
