import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ERROR_MSG } from "~/lib/errors";

interface ErrorAlertProps {
  title: string;
  description?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, description }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description || ERROR_MSG["UNKNOWN"]}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
