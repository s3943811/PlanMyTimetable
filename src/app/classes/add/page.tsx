export default function Page() {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium">Automatic data gathering</h3>
      <p className="text-base">
        If your university uses Allocate+ for timetable purposes, you can gather
        the data automatically using the following steps (currently this is
        known to work for RMIT Unversity only):
      </p>
      <ol className="list-inside list-decimal space-y-3 text-sm marker:font-medium">
        <li>
          Bookmark the following code ( drag this into the bookmarks bar or
          right click and bookmark link ) :
        </li>
        <div className="overflow-auto rounded-md border p-2 text-sm dark:border-neutral-600">
          <a
            id="Bookmarklet"
            href={`javascript:(() => {
    let script = document.createElement("script");
    script.src = "https://planmytimetable.vercel.app/bookmarklet.js";
    document.body.append(script);
})();`}
          >
            <code id="Bookmarklet" className="my-2 whitespace-pre p-2">
              Bookmark me:
              <br />
              &nbsp;
              {`javascript:(() => {
    let script = document.createElement("script");
    script.src = "https://planmytimetable.vercel.app/bookmarklet.js";
    document.body.append(script);
})();`}
            </code>
          </a>
        </div>
        <p>
          If you have concerns regarding privacy and security,&nbsp;
          <a
            href="https://planmytimetable.vercel.app/bookmarklet.js"
            className="font-medium underline underline-offset-4 after:content-['_↗']"
          >
            checkout the source code
          </a>
          . All data is stored locally and never leaves your computer.
        </p>
        <li>Navigate to your Allocate+ system and login.</li>
        <li>Click and run the bookmarklet on this page.</li>
        <li>Select the semester you wish to plan for.</li>
        <li>You will then be redirected to a new page with your data.</li>
      </ol>
    </div>
  );
}
