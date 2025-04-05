import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { FieldError, useForm } from "react-hook-form";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router, useForm as useInertiaForm } from "@inertiajs/react";
import { formatCPF, maskPhone } from "@/lib/utils";

export default function ClienteForm({ cliente, auth }: PageProps<{ cliente: any, auth: any }>) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      id: cliente?.id || null,
      cpf: cliente?.cpf || '',
      nome: cliente?.nome || '',
      endereco: cliente?.endereco || '',
      data_nascimento: cliente?.data_nascimento || '',
      telefone: cliente?.telefone || '',
    }
  });

  const [message, setMessage] = useState("");
  const { post, put, processing } = useInertiaForm();

  const submitForm = (data: any) => {
    if (cliente?.id) {
      router.put(`/clienteUpdate/${cliente.id}`, data, {
        onSuccess: () => setMessage('Cliente atualizado com sucesso!'),
        onError: (errors: any) => setMessage(errors.message || "Erro ao atualizar."),
      });
    } else {
      router.post('/clienteStore', data, {
        onSuccess: () => setMessage('Cliente cadastrado com sucesso!'),
        onError: (errors: any) => setMessage(errors.message || "Erro ao cadastrar."),
      });
    }
  };  

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setValue('cpf', formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = maskPhone(e.target.value);
    setValue('telefone', formatted);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastro de Clientes</h2>}
    >
      <div className="container mx-auto mt-5">
        <Head title="Cadastro de Clientes" />
        <Card>
          <CardHeader />
          <CardContent>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-4">
                <label htmlFor="cpf" className="block text-sm font-medium">CPF</label>
                <Input
                  id="cpf"
                  className="w-full"
                  {...register("cpf", { required: "O CPF é obrigatório" })}
                  onChange={handleCpfChange}
                />
                {errors.cpf && <p className="text-red-500 text-sm">{(errors.cpf as FieldError)?.message}</p>}
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
                <label htmlFor="endereco" className="block text-sm font-medium">Endereço</label>
                <Input
                  id="endereco"
                  className="w-full"
                  {...register("endereco", { required: "O endereço é obrigatório" })}
                />
                {errors.endereco && <p className="text-red-500 text-sm">{(errors.endereco as FieldError)?.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="data_nascimento" className="block text-sm font-medium">Data de Nascimento</label>
                <Input
                  id="data_nascimento"
                  type="date"
                  className="w-full"
                  {...register("data_nascimento", { required: "A data de nascimento é obrigatória" })}
                />
                {errors.data_nascimento && <p className="text-red-500 text-sm">{(errors.data_nascimento as FieldError)?.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="telefone" className="block text-sm font-medium">Telefone</label>
                <Input
                  id="telefone"
                  className="w-full"
                  {...register("telefone", { required: "O telefone é obrigatório" })}
                  onChange={handlePhoneChange}
                />
                {errors.telefone && <p className="text-red-500 text-sm">{(errors.telefone as FieldError)?.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={processing}>
                {cliente?.id ? "Atualizar Cliente" : "Cadastrar Cliente"}
              </Button>
            </form>

            {message && <h3 className="mt-10 text-green-600">{message}</h3>}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
