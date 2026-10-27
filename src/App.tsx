import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import LoadingScreen from "./LoadingScreen";
import { router } from "./routes";

export default function App() {
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), 1400);
    const completeTimer = window.setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      {isLoading && <LoadingScreen isExiting={isExiting} />}
    </>
  );
}
