import { ActionButton } from "@/components/common/ActionButton";

type ErrorStatusProps = {
  errorState: string;
  retryLabel: string;
  onRetry: () => void | Promise<void>;
};

export function ErrorStatus({
  errorState,
  retryLabel,
  onRetry,
}: ErrorStatusProps) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-2xl p-6 text-center text-sm text-red-800"
      role="status"
    >
      <p>{errorState}</p>
      <ActionButton
        variant="error"
        fullWidth={false}
        onClick={onRetry}
        className="rounded-md py-2"
      >
        {retryLabel}
      </ActionButton>
    </div>
  );
}
