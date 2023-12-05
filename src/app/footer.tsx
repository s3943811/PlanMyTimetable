import { ThemeOptions } from "~/components";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-t-neutral-50 px-8 py-5 dark:border-t-neutral-800 md:h-16 md:flex-row md:py-0">
      <div className="flex flex-row gap-2 text-center text-sm leading-loose">
        <p>
          <span className="font-medium">PlanMyTimetable.</span>&nbsp;Built by
          Maximus Dionyssopoulos.
          <a
            href="https://github.com/s3943811"
            className="font-medium underline underline-offset-4 after:content-['_↗']"
          >
            &nbsp;Github
          </a>
          .
        </p>
      </div>
      <ThemeOptions />
    </footer>
  );
}
