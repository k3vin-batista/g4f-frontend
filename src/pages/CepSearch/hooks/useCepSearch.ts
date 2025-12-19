import { useCallback, useMemo, useState } from 'react';
import type { AddressViewModel } from '../../../types/cep';
import { fetchAddressByCep } from '../../../services/viacep.service';
import { formatCep, isValidCep, normalizeCep } from '../../../utils/cep';

type UiState = 'idle' | 'loading' | 'success' | 'error';

function buildAddressViewModel(payload: any, normalizedCep: string): AddressViewModel {
  return {
    cep: payload.cep ?? formatCep(normalizedCep),
    logradouro: payload.logradouro ?? '',
    complemento: payload.complemento ?? '',
    bairro: payload.bairro ?? '',
    localidade: payload.localidade ?? '',
    uf: payload.uf ?? '',
  };
}

export function useCepSearch() {
  const [cepInput, setCepInput] = useState('');
  const [state, setState] = useState<UiState>('idle');
  const [address, setAddress] = useState<AddressViewModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const normalizedCep = useMemo(() => normalizeCep(cepInput), [cepInput]);
  const canSearch = useMemo(
    () => isValidCep(normalizedCep) && state !== 'loading',
    [normalizedCep, state],
  );

  const onChangeCep = useCallback((value: string) => {
    setCepInput(value);
    // UX: ao editar, limpamos o erro e resultado anterior, mas sem ser agressivo demais.
    setError(null);
    setAddress(null);
    setState('idle');
  }, []);

  const clear = useCallback(() => {
    setCepInput('');
    setAddress(null);
    setError(null);
    setState('idle');
  }, []);

  const search = useCallback(async () => {
    const cep = normalizeCep(cepInput);

    if (!isValidCep(cep)) {
      setState('error');
      setError('Informe um CEP válido com 8 dígitos.');
      setAddress(null);
      return;
    }

    try {
      setState('loading');
      setError(null);
      setAddress(null);

      const data = await fetchAddressByCep(cep);

      if (data?.erro) {
        setState('error');
        setError('CEP não encontrado. Verifique e tente novamente.');
        return;
      }

      const vm = buildAddressViewModel(data, cep);

      // Validação mínima de "sucesso real"
      if (!vm.localidade || !vm.uf) {
        setState('error');
        setError('Não foi possível interpretar a resposta do serviço. Tente novamente.');
        return;
      }

      setAddress(vm);
      setState('success');
    } catch (e: any) {
      setState('error');

      // Mensagens amigáveis (sem expor detalhe técnico)
      if (e?.code === 'ECONNABORTED') {
        setError('A requisição demorou demais. Tente novamente.');
        return;
      }

      setError('Não foi possível consultar o CEP agora. Verifique sua conexão e tente novamente.');
    }
  }, [cepInput]);

  return {
    // state
    state,
    cepInput,
    normalizedCep,
    address,
    error,

    // derived
    canSearch,

    // actions
    onChangeCep,
    search,
    clear,
  };
}
