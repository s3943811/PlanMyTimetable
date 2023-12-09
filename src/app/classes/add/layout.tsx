export default function AddLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container flex grow flex-col p-8 dark:bg-neutral-900 dark:text-white">
      <h2 className="text-xl font-medium tracking-tight">Add classes</h2>
      <p className=" text-neutral-500 dark:text-neutral-400">
        Add class details, times, and locations.
      </p>
      {children}
    </section>
  );
}
