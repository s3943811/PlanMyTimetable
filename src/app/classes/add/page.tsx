import { RetainLink } from "~/components";

export default function Page() {
  return (
    <>
      <div className="mt-1 inline-flex h-10 w-fit items-center justify-center gap-3 rounded-lg ">
        <RetainLink
          href="/classes/add"
          className={`inline-flex w-full items-center justify-center rounded-md py-1.5 font-medium underline decoration-[1.5px] underline-offset-[7px] transition-all`}
        >
          Automatic
        </RetainLink>
        <span>/</span>
        <RetainLink
          href="/classes/add/manual"
          className={`inline-flex w-full items-center justify-center rounded-md py-1.5 pr-3 font-light text-neutral-500/90 transition-all`}
        >
          <p>Manual</p>
        </RetainLink>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className=" my-3 h-[1px] w-full shrink-0 bg-neutral-200"
      ></div>
      <div className="space-y-4">
        <h3 className="text-md font-medium">Automatic data gathering</h3>
        <p className="text-sm">
          If your university uses Allocate+ for timetable purposes, you can
          gather the data automatically using the following steps
        </p>
        <ol className="list-inside list-decimal space-y-3 text-sm marker:font-medium">
          <li>
            Bookmark the following code ( drag this into the bookmarks bar ) :
          </li>
          <div className="w-full rounded-md border p-2 text-sm">
            <a href="">
              <code className="prose-code: my-2 p-2">{`function Test() {
            do stuff }`}</code>
            </a>
          </div>
          <li>Navigate to your Allocate+ system and login.</li>
          <li>Click and run the bookmarklet on this page.</li>
          <li>You will then be redirected to a new page with your data.</li>
        </ol>
      </div>
    </>
  );
}
