import { normalizeCep } from '../../../utils/cep';

type Props = {
  cepInput: string;
  isLoading: boolean;
  canSearch: boolean;
  onChangeCep: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
};

export function CepForm({ cepInput, isLoading, canSearch, onChangeCep, onSubmit, onClear }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit();
  };

  return (
    <div className="cepCard">
      <div className="cepHeader">
        <h2 className="cepTitle">Buscar endereço por CEP</h2>
        <p className="cepSubtitle">Digite um CEP com 8 dígitos para consultar na ViaCEP.</p>
      </div>

      <div className="cepFormRow">
        <label className="cepLabel" htmlFor="cep">
          CEP
        </label>

        <input
          id="cep"
          className="cepInput"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="Ex: 01001000"
          value={cepInput}
          onChange={(e) => onChangeCep(normalizeCep(e.target.value))}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-disabled={isLoading}
        />

        <div className="cepActions">
          <button className="btnPrimary" type="button" onClick={onSubmit} disabled={!canSearch}>
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>

          <button
            className="btnSecondary"
            type="button"
            onClick={onClear}
            disabled={isLoading && !cepInput}
          >
            Limpar
          </button>
        </div>
      </div>

      <p className="cepHint">Dica: só números. Exemplo válido: 01001000.</p>
    </div>
  );
}
