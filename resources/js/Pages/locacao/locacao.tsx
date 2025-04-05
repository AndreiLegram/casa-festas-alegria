import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { FieldError, useForm } from "react-hook-form";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router } from "@inertiajs/react";

type LocacaoItem = {
  brinquedo_id: string;
};

type LocacaoFormData = {
  cliente_id: string;
  data_inicio: string;
  data_fim: string;
  valor_total: string;
  itens: LocacaoItem[];
};

export default function Locacoes({
  locacao,
  clientes,
  brinquedos,
  auth,
}: PageProps<{ 
  locacao?: Partial<LocacaoFormData> & { id?: number; itens?: LocacaoItem[] },
  clientes: Array<any>, 
  brinquedos: Array<any>, 
  auth: any 
}>) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LocacaoFormData>({
    defaultValues: {
      cliente_id: locacao?.cliente_id ?? '',
      data_inicio: locacao?.data_inicio ?? '',
      data_fim: locacao?.data_fim ?? '',
      valor_total: locacao?.valor_total ?? '',
      itens: [],
    },
  });

  const [itens, setItens] = useState<LocacaoItem[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState<number | ''>('');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [valorTotal, setValorTotal] = useState<number>(0);

  // Se estiver editando, carregar itens e recalcular valorTotal
  useEffect(() => {
    if (locacao?.itens && locacao.itens.length > 0) {
      setItens(locacao.itens);
      const total = locacao.itens.reduce((acc, item) => {
        const brinquedo = brinquedos.find(b => b.id === item.brinquedo_id);
        return brinquedo ? acc + parseFloat(brinquedo.valor_locacao) : acc;
      }, 0);
      setValorTotal(total);
      setValue("valor_total", total.toFixed(2));
    }
  }, [locacao, brinquedos, setValue]);

  const atualizarValorTotal = (novosItens: LocacaoItem[]) => {
    const total = novosItens.reduce((acc, item) => {
      const brinquedo = brinquedos.find(b => b.id === item.brinquedo_id);
      return brinquedo ? acc + parseFloat(brinquedo.valor_locacao) : acc;
    }, 0);
    setValorTotal(total);
    setValue("valor_total", total.toFixed(2));
  };

  const adicionarItem = () => {
    if (itemSelecionado !== '') {
      const brinquedo = brinquedos.find(b => b.id === itemSelecionado);
      if (brinquedo) {
        const novosItens = [...itens, { brinquedo_id: brinquedo.id }];
        setItens(novosItens);
        atualizarValorTotal(novosItens);
        setItemSelecionado('');
      }
    }
  };

  const removerItem = (index: number) => {
    const novosItens = [...itens];
    novosItens.splice(index, 1);
    setItens(novosItens);
    atualizarValorTotal(novosItens);
  };

  const submitForm = (data: LocacaoFormData) => {
    setProcessing(true);
    const payload = {
      ...data,
      valor_total: valorTotal.toFixed(2),
      itens,
    };

    if (locacao?.id) {
      // Atualização
      router.put(route('locacaoUpdate', locacao.id), payload, {
        onSuccess: () => {
          setMessage('Locação atualizada com sucesso!');
          setProcessing(false);
        },
        onError: (errors: any) => {
          setMessage(errors.message || 'Erro ao atualizar locação.');
          setProcessing(false);
        },
      });
    } else {
      // Criação
      router.post(route('locacaoStore'), payload, {
        onSuccess: () => {
          setMessage('Locação cadastrada com sucesso!');
          setProcessing(false);
          setItens([]);
          setValorTotal(0);
        },
        onError: (errors: any) => {
          setMessage(errors.message || 'Erro ao cadastrar locação.');
          setProcessing(false);
        },
      });
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
        {locacao?.id ? 'Editar Locação' : 'Cadastrar Locação'}
      </h2>}
    >
      <div className="container mx-auto mt-5">
        <Head title={locacao?.id ? "Editar Locação" : "Cadastro de Locações"} />
        <Card>
          <CardHeader />
          <CardContent>
            <form onSubmit={handleSubmit(submitForm)}>
              {/* Cliente */}
              <div className="mb-4">
                <label htmlFor="cliente_id" className="block text-sm font-medium">Cliente</label>
                <select
                  id="cliente_id"
                  {...register("cliente_id", { required: "O cliente é obrigatório" })}
                  className="w-full"
                >
                  <option value="">Selecione o Cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                  ))}
                </select>
                {errors.cliente_id && <p className="text-red-500 text-sm">{(errors.cliente_id as FieldError)?.message}</p>}
              </div>

              {/* Datas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="data_inicio" className="block text-sm font-medium">Data de Início</label>
                  <Input
                    id="data_inicio"
                    type="date"
                    {...register("data_inicio", { required: "A data de início é obrigatória" })}
                  />
                  {errors.data_inicio && <p className="text-red-500 text-sm">{(errors.data_inicio as FieldError)?.message}</p>}
                </div>

                <div>
                  <label htmlFor="data_fim" className="block text-sm font-medium">Data de Fim</label>
                  <Input
                    id="data_fim"
                    type="date"
                    {...register("data_fim", { required: "A data de fim é obrigatória" })}
                  />
                  {errors.data_fim && <p className="text-red-500 text-sm">{(errors.data_fim as FieldError)?.message}</p>}
                </div>
              </div>

              {/* Valor Total (readonly) */}
              <div className="mt-4">
                <label htmlFor="valor_total" className="block text-sm font-medium">Valor Total</label>
                <Input
                  id="valor_total"
                  type="number"
                  step="0.01"
                  value={valorTotal.toFixed(2)}
                  readOnly
                />
              </div>

              {/* Seção de Itens da Locação */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Itens da Locação</h3>
                <div className="flex gap-4 mb-2">
                  <select
                    value={itemSelecionado}
                    onChange={(e) => setItemSelecionado(e.target.value ? parseInt(e.target.value) : '')}
                    className="w-full"
                  >
                    <option value="">Selecione o Brinquedo</option>
                    {brinquedos.map((brinquedo) => (
                      <option key={brinquedo.id} value={brinquedo.id}>
                        {brinquedo.nome} - R$ {parseFloat(brinquedo.valor_locacao).toFixed(2)}
                      </option>
                    ))}
                  </select>
                  <Button type="button" onClick={adicionarItem}>Adicionar</Button>
                </div>

                {itens.length > 0 && (
                  <ul className="mt-2 border rounded p-2 bg-gray-50">
                    {itens.map((item, index) => {
                      const brinquedo = brinquedos.find(b => b.id === item.brinquedo_id);
                      return (
                        <li key={index} className="flex justify-between items-center mb-1">
                          <span>
                            {brinquedo?.nome || "Brinquedo desconhecido"} - R$ {parseFloat(brinquedo?.valor_locacao || '0').toFixed(2)}
                          </span>
                          <Button type="button" variant="destructive" onClick={() => removerItem(index)}>Remover</Button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Botão de Enviar */}
              <div className="mt-6">
                <Button type="submit" className="w-full" disabled={processing}>
                  {locacao?.id ? 'Atualizar Locação' : 'Cadastrar Locação'}
                </Button>
              </div>

              {message && <p className="mt-4 text-green-600">{message}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
