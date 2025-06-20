import SearchInput from "@/components/common/search-input";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-8 space-y-5 @container">
      {/* <div className="flex justify-between gap-5 flex-col @2xl:flex-row">
        <div className="flex items-center gap-5">
          <p className="text-text-primary font-semibold text-lg">Orders</p>
        </div>
        <SearchInput />
      </div> */}
      {children}
    </div>
  );
}
