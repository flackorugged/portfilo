import { GlobalLayout } from "@/components/layout/GlobalLayout";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalLayout requireAuth={true}>
      {children}
    </GlobalLayout>
  );
}
