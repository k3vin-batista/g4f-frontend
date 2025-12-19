import type { AddressViewModel } from '../../../types/cep';

type Props = {
  address: AddressViewModel;
};

export function CepResult({ address }: Props) {
  return (
    <div className="cepCard">
      <h3 className="cepSectionTitle">Resultado</h3>

      <div className="resultGrid">
        <div className="resultItem">
          <span className="resultLabel">CEP</span>
          <span className="resultValue">{address.cep}</span>
        </div>

        <div className="resultItem">
          <span className="resultLabel">Logradouro</span>
          <span className="resultValue">{address.logradouro || 'Não informado'}</span>
        </div>

        <div className="resultItem">
          <span className="resultLabel">Bairro</span>
          <span className="resultValue">{address.bairro || 'Não informado'}</span>
        </div>

        <div className="resultItem">
          <span className="resultLabel">Cidade</span>
          <span className="resultValue">{address.localidade}</span>
        </div>

        <div className="resultItem">
          <span className="resultLabel">UF</span>
          <span className="resultValue">{address.uf}</span>
        </div>

        <div className="resultItem">
          <span className="resultLabel">Complemento</span>
          <span className="resultValue">{address.complemento || 'Não informado'}</span>
        </div>
      </div>
    </div>
  );
}
