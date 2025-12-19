type Props = {
  message: string;
};

export function NoticiasError({ message }: Props) {
  return <div className="error">{message}</div>;
}
