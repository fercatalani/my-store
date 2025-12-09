import { ReactNode } from "react";
import { ErrorStatus } from "@/components/common/ErrorStatus";

type AsyncStatusProps = {
  isLoading: boolean;
  isError: boolean;
  skeleton: ReactNode;
  errorState: string;
  retryLabel: string;
  onRetry: () => void | Promise<void>;
  children: ReactNode;
};

export function AsyncStatus({
  isLoading,
  isError,
  skeleton,
  errorState,
  retryLabel,
  onRetry,
  children,
}: AsyncStatusProps): React.ReactNode {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  if (isError) {
    return (
      <ErrorStatus
        errorState={errorState}
        retryLabel={retryLabel}
        onRetry={onRetry}
      />
    );
  }

  return <>{children}</>;
}
