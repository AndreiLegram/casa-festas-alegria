import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { FieldError, useForm } from "react-hook-form";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router } from "@inertiajs/react";
import { useMemo } from "react";

type LocacaoItem = {
  id_brinquedo: string;
  quantidade: number;
  valor_unitario: number;
};

type LocacaoFormData = {
  id_contato: string;
  data: string;
  data_devolucao: string;
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
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LocacaoFormData>({
    defaultValues: {
      id_contato: locacao?.id_contato ?? '',
      data: locacao?.data ?? today,
      data_devolucao: locacao?.data_devolucao ?? '',
      valor_total: locacao?.valor_total ?? '',
      itens: locacao?.itens ?? []
    },
  });

  const [itens, setItens] = useState<LocacaoItem[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [valorTotal, setValorTotal] = useState<number>(0);
  
  const brinquedosDisponiveis = useMemo(() => {
    const idsSelecionados = itens.map(item => item.id_brinquedo);
    return brinquedos.filter(brinquedo => !idsSelecionados.includes(brinquedo.id.toString()));
  }, [brinquedos, itens])

  useEffect(() => {
    if (locacao?.itens && locacao.itens.length > 0) {
      const formattedItens = locacao.itens.map((item) => {
        const brinquedo = brinquedos.find(b => b.id.toString() === item.id_brinquedo);
        return {
          id_brinquedo: item.id_brinquedo.toString(),
          quantidade: 1,
          valor_unitario: brinquedo ? parseFloat(brinquedo.valor_locacao) : 0
        };
      });
      setItens(formattedItens);
      setValue("itens", formattedItens);
  
      const total = formattedItens.reduce((acc, item) => acc + item.valor_unitario, 0);
      setValorTotal(total);
      setValue("valor_total", total.toFixed(2));
    }
  }, [locacao, brinquedos, setValue]);

  const atualizarValorTotal = (novosItens: LocacaoItem[]) => {
    const total = novosItens.reduce((acc, item) => acc + item.valor_unitario, 0);
    setValorTotal(total);
    setValue("valor_total", total.toFixed(2));
  };

  const adicionarItem = () => {
    if (itemSelecionado !== '') {
      const brinquedo = brinquedos.find(b => b.id.toString() === itemSelecionado);
      if (brinquedo) {
        const jaExiste = itens.some(i => i.id_brinquedo === itemSelecionado);
        if (!jaExiste) {
          const novoItem = {
            id_brinquedo: itemSelecionado,
            quantidade: 1,
            valor_unitario: parseFloat(brinquedo.valor_locacao)
          };
          const novosItens = [...itens, novoItem];
          setItens(novosItens);
          setValue("itens", novosItens);
          atualizarValorTotal(novosItens);
          setItemSelecionado('');
        }
      }
    }
  };

  const removerItem = (index: number) => {
    const novosItens = [...itens];
    novosItens.splice(index, 1);
    setItens(novosItens);
    setValue("itens", novosItens); // <-- fix
    atualizarValorTotal(novosItens);
  };

  const submitForm = (data: LocacaoFormData) => {
    if (itens.length === 0) {
      setMessage('É necessário adicionar ao menos um item à locação.');
      return;
    }

    setProcessing(true);
    const payload = {
      ...data,
      valor_total: valorTotal.toFixed(2),
      itens,
    };

    if (locacao?.id) {
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
                <label htmlFor="id_contato" className="block text-sm font-medium">Cliente</label>
                <select
                  id="id_contato"
                  {...register("id_contato", { required: "O cliente é obrigatório" })}
                  className="w-full"
                >
                  <option value="">Selecione o Cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                  ))}
                </select>
                {errors.id_contato && <p className="text-red-500 text-sm">{errors.id_contato.message}</p>}
              </div>

              {/* Datas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="data" className="block text-sm font-medium">Data de Início</label>
                  <Input
                    id="data"
                    type="date"
                    {...register("data", { required: "A Data de Início é obrigatória" })}
                  />
                  {errors.data && <p className="text-red-500 text-sm">{errors.data.message}</p>}
                </div>

                <div>
                  <label htmlFor="data_devolucao" className="block text-sm font-medium">Data de Devolução</label>
                  <Input
                    id="data_devolucao"
                    type="date"
                    {...register("data_devolucao", { required: "A Data de Devolução é obrigatória" })}
                  />
                  {errors.data_devolucao && <p className="text-red-500 text-sm">{errors.data_devolucao.message}</p>}
                </div>
              </div>

              {/* Valor Total */}
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

              {/* Itens */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Itens da Locação</h3>
                <div className="flex gap-4 mb-2">
                <select
                  value={itemSelecionado}
                  onChange={(e) => setItemSelecionado(e.target.value)}
                  className="w-full"
                >
                  <option value="">Selecione o Brinquedo</option>
                  {brinquedosDisponiveis.map((brinquedo) => (
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
                      const brinquedo = brinquedos.find(b => b.id == item.id_brinquedo);
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
