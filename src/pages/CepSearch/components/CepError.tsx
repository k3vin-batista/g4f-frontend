type Props = {
  message: string;
};

export function CepError({ message }: Props) {
  return (
    <div className="cepFeedback cepFeedbackError" role="alert" aria-live="assertive">
      <p className="cepFeedbackTitle">Não foi possível concluir</p>
      <p className="cepFeedbackText">{message}</p>
    </div>
  );
}
