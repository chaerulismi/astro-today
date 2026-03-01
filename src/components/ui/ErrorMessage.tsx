interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
      {message}
    </div>
  );
}
