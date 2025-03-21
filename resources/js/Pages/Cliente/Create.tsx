import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';

// Schema de validação com Zod
const formSchema = z.object({
  cpf: z.string().min(1, "CPF é obrigatório").regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  nome: z.string().min(1, "Nome é obrigatório").max(255),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  data_nascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  telefone: z.string().min(1, "Telefone é obrigatório").max(15),
});

type FormData = z.infer<typeof formSchema>;

export default function Create() {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Envia o formulário para o servidor
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/cliente'); // Envia para a rota do controlador
  };

  return (
    <div>
      <Head title="Criar Cliente" />
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">Criar Cliente</h2>

      <form onSubmit={handleSubmit}>
        {/* CPF */}
        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={data.cpf}
            onChange={(e) => setData('cpf', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.cpf && <div className="text-red-500 text-sm">{errors.cpf}</div>}
        </div>

        {/* Nome */}
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={data.nome}
            onChange={(e) => setData('nome', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.nome && <div className="text-red-500 text-sm">{errors.nome}</div>}
        </div>

        {/* Endereço */}
        <div className="mb-4">
          <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={data.endereco}
            onChange={(e) => setData('endereco', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.endereco && <div className="text-red-500 text-sm">{errors.endereco}</div>}
        </div>

        {/* Data de Nascimento */}
        <div className="mb-4">
          <label htmlFor="data_nascimento" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
          <input
            type="date"
            id="data_nascimento"
            name="data_nascimento"
            value={data.data_nascimento}
            onChange={(e) => setData('data_nascimento', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.data_nascimento && <div className="text-red-500 text-sm">{errors.data_nascimento}</div>}
        </div>

        {/* Telefone */}
        <div className="mb-4">
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={data.telefone}
            onChange={(e) => setData('telefone', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.telefone && <div className="text-red-500 text-sm">{errors.telefone}</div>}
        </div>

        {/* Botão de Envio */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {processing ? 'Criando...' : 'Criar Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
}