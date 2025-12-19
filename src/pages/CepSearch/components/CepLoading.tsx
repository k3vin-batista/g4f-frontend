export function CepLoading() {
  return (
    <div className="cepFeedback" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <div>
        <p className="cepFeedbackTitle">Consultando CEP</p>
        <p className="cepFeedbackText">Aguarde um instante.</p>
      </div>
    </div>
  );
}
