import { type NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "~/components/ui/button";

const Settings: NextPage = () => {
  const [, setStoredToken] = useLocalStorage("meter-token", "");

  function handleLogout() {
    setStoredToken("");
    window.location.href = "/login";
  }

  return (
    <div>
      <Button
        onClick={() => {
          void handleLogout();
        }}
      >
        Log out
      </Button>
    </div>
  );
};

export default Settings;
