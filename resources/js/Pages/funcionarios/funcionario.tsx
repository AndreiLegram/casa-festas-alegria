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

export default function Funcionarios({ funcionario, auth }: PageProps<{ funcionario: any, auth: any }>) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: funcionario?.id || null,
      name: funcionario?.name || '',
      password: funcionario?.password || '',
      telefone: funcionario?.telefone || '',
      cpf: funcionario?.cpf || '',
      email: funcionario?.email || '',
      permission_level: funcionario?.permission_level || ''
    }
  });


  const [message, setMessage] = useState("");
  const { post, put, processing } = useInertiaForm();

  const submitForm = (data: any) => {
    if (funcionario?.id) {
      router.put(`/funcionariosUpdate/${funcionario.id}`, data, {
        onSuccess: (response) => {
          setMessage('Funcionario atualizado com sucesso!');
        },
        onError: (errors: any) => {
          setMessage(errors.message || "Ocorreu um erro inesperado.");
        },
      });
    } else {
      router.post('/funcionariosSave', data, {
        onSuccess: (response) => {
          setMessage('Funcionario cadastrado com sucesso!');
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
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastro de Funcionarios</h2>}
    >
      <div className="container mx-auto mt-5">
        <Head title="Cadastro de funcionarios" />
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Nome</label>
              <Input
                id="name"
                className="w-full"
                {...register("name", { required: "O nome é obrigatório" })}
              />
              {errors.name && <p className="text-red-500 text-sm">{(errors.name as FieldError)?.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <Input
                id="email"
                className="w-full"
                {...register("email", { required: "O email é obrigatório" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{(errors.email as FieldError)?.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="cpf" className="block text-sm font-medium">CPF</label>
              <Input
                id="cpf"
                className="w-full"
                {...register("cpf", { required: "O cpf é obrigatório" })}
              />
              {errors.cpf && <p className="text-red-500 text-sm">{(errors.cpf as FieldError)?.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="permission_level" className="block text-sm font-medium">Nível de permissão</label>
              <select
                id="permission_level"
                className="w-full"
                {...register("permission_level", { required: "O Nível de permissão é obrigatório" })}
              >
                <option value="">Selecione o Nível</option>
                <option value="gerente">Gerente</option>
                <option value="almoxarife">Almoxarife</option>
                <option value="caixa">Caixa</option>
                <option value="analista_cadastro">Analista de cadastro</option>
                <option value="agente_locacao">Agente de locação</option>
              </select>
              {errors.permission_level && <p className="text-red-500 text-sm">{(errors.permission_level as FieldError)?.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="telefone" className="block text-sm font-medium">Telefone</label>
              <Input
                id="telefone"
                className="w-full"
                {...register("telefone", { maxLength: 50 })}
              />
              {errors.telefone && <p className="text-red-500 text-sm">{(errors.telefone as FieldError)?.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">Senha</label>
              <Input
                id="password"
                className="w-full"
                {...register("password", { required: "A senha é obrigatório" })}
              />
              {errors.password && <p className="text-red-500 text-sm">{(errors.password as FieldError)?.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={processing}>
              {funcionario?.id ? "Atualizar Funcionario" : "Cadastrar Funcionario"}
            </Button>
            </form>

            {message && <h3 className="mt-10 text-red-600 mt-20">{message}</h3>}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
