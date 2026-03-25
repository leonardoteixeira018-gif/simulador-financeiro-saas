import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { CashFlowProvider } from "./contexts/CashFlowContext";

export default function App() {
  return (
    <AuthProvider>
      <CashFlowProvider>
        <RouterProvider router={router} />
      </CashFlowProvider>
    </AuthProvider>
  );
}