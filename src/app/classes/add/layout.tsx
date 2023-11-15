import Tabs from "./tabs";

export default function AddLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container flex grow flex-col p-8">
      <h2 className="text-xl font-medium tracking-tight">Add classes</h2>
      <p className="font-light text-neutral-500/90">
        Add class details, times, and locations.
      </p>
      <Tabs />
      <div
        data-orientation="horizontal"
        role="none"
        className=" my-4 h-[1px] w-full shrink-0 bg-neutral-200"
      ></div>
      {children}
    </section>
  );
}
