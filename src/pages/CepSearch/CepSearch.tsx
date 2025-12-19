import './CepSearch.css';
import { CepForm } from './components/CepForm';
import { CepLoading } from './components/CepLoading';
import { CepError } from './components/CepError';
import { CepResult } from './components/CepResult';
import { useCepSearch } from './hooks/useCepSearch';

export function CepSearch() {
  const { state, cepInput, address, error, canSearch, onChangeCep, search, clear } = useCepSearch();

  return (
    <div className="page">
      <div className="container">
        <header className="pageHeader">
          <h1 className="pageTitle">Prova Técnica Frontend</h1>
          <p className="pageSubtitle">Consulta de endereço por CEP (ViaCEP)</p>
        </header>

        <CepForm
          cepInput={cepInput}
          isLoading={state === 'loading'}
          canSearch={canSearch}
          onChangeCep={onChangeCep}
          onSubmit={search}
          onClear={clear}
        />

        {state === 'loading' && <CepLoading />}

        {state === 'error' && error && <CepError message={error} />}

        {state === 'success' && address && <CepResult address={address} />}

        <footer className="pageFooter">
          <p className="pageFooterText">Fonte: ViaCEP</p>
        </footer>
      </div>
    </div>
  );
}
