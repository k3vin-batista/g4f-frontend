import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CepSearch } from '../src/pages/CepSearch';
import * as viacepService from '../src/services/viacep.service';

describe('CEP Search – BDD', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Given a valid CEP', () => {
    it('When the user searches, Then the address is displayed', async () => {
      // Given
      vi.spyOn(viacepService, 'fetchAddressByCep').mockResolvedValueOnce({
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      } as any);

      render(<CepSearch />);

      fireEvent.change(screen.getByLabelText(/cep/i), {
        target: { value: '01001000' },
      });

      // When
      fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

      // Then
      await waitFor(() => {
        expect(screen.getByText(/praça da sé/i)).toBeInTheDocument();
        expect(screen.getByText(/são paulo/i)).toBeInTheDocument();
        expect(screen.getByText(/sp/i)).toBeInTheDocument();
      });
    });
  });

  describe('Given an invalid CEP', () => {
    it('When the user types an invalid CEP, Then the search button is disabled', async () => {
      render(<CepSearch />);

      // Given
      const input = screen.getByLabelText(/cep/i);
      fireEvent.change(input, { target: { value: '123' } });

      // Then
      const searchButton = screen.getByRole('button', { name: /buscar/i });
      expect(searchButton).toBeDisabled();
    });
  });

  describe('Given a non-existing CEP', () => {
    it('When the API returns erro=true, Then a not found message is shown', async () => {
      // Given
      vi.spyOn(viacepService, 'fetchAddressByCep').mockResolvedValueOnce({
        erro: true,
      } as any);

      render(<CepSearch />);

      fireEvent.change(screen.getByLabelText(/cep/i), {
        target: { value: '00000000' },
      });

      // When
      fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

      // Then
      await waitFor(() => {
        expect(screen.getByText(/cep não encontrado/i)).toBeInTheDocument();
      });
    });
  });
});
