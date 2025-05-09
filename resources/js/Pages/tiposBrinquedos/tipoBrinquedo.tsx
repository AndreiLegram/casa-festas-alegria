import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { FieldError, useForm } from "react-hook-form";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router } from "@inertiajs/react";
import { useForm as useInertiaForm } from '@inertiajs/react';


export default function TipoBrinquedo({ tipoBrinquedo, auth }: PageProps<{ tipoBrinquedo: any, auth: any }>) {
  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      codigo: tipoBrinquedo?.codigo || '',
      nome: tipoBrinquedo?.nome || ''
    }
  });
  
  // Message state for success or error
  const [message, setMessage] = useState("");

  // Inertia Form for submission
  const { post, put, processing } = useInertiaForm();

  // Submit form
  const submitForm = (data: any) => {
    if (tipoBrinquedo) {
      router.put(`/tiposBrinquedos/${tipoBrinquedo.id}`, data);
    } else {
      router.post('/tipoBrinquedoSave', data);
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cadastro de Tipo de Brinquedo</h2>}
    >
      <div className="container mx-auto mt-5">
        <Head title="Cadastro de tipos de brinquedos" />
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(submitForm)}>
              
              <div className="mb-4">
                <label htmlFor="codigo" className="block text-sm font-medium">Código</label>
                <Input
                  id="codigo"
                  className="w-full"
                  {...register("codigo", { required: "O codigo é obrigatório" })}
                />
                {errors.codigo && <p className="text-red-500 text-sm">{(errors.codigo as FieldError)?.message}</p>}
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

                <Button type="submit" className="w-full bg-blue-500 " disabled={processing}>
                  {tipoBrinquedo ? "Atualizar tipo de brinquedo" : "Cadastrar tipo de brinquedo"}
                </Button>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}