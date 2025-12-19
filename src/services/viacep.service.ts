import { httpClient } from './httpClient';
import type { ViaCepResponse } from '../types/cep';

const VIA_CEP_BASE_URL = 'https://viacep.com.br/ws/';

export async function fetchAddressByCep(rawCep: string): Promise<ViaCepResponse> {
  const url = `${VIA_CEP_BASE_URL}${rawCep}/json/`;

  const response = await httpClient.get<ViaCepResponse>(url);
  return response.data;
}
