import AdminAuthGuard from "@/components/guards/AdminAuthGuard";
import AdminSessionProvider from "@/components/wrappers/AdminSessionProvider";
import AdminUiLayout from "@/components/wrappers/AdminUiLayout";

export default function Layout({ children }) {
  return (
    <AdminSessionProvider>
      <AdminAuthGuard>
        <AdminUiLayout>{children}</AdminUiLayout>
      </AdminAuthGuard>
    </AdminSessionProvider>
  );
}
