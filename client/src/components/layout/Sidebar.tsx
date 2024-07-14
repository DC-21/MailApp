import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className="w-40 flex flex-col h-screen justify-center p-3">
      <div className="w-full flex flex-col h-full shadow-gray-400 border-gray-200 border bg-white shadow-lg p-2 rounded-xl">
        <p className="font-semibold text-lg text-slate-800">VoiceMailer</p>
        <div className="mt-4 flex flex-col">
          <Link
            to="/home"
            className="p-1 rounded-lg hover:bg-slate-800 hover:text-white flex items-center gap-1"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1.3em"
              width="1.3em"
            >
              <path d="M13 19c0-3.31 2.69-6 6-6 1.1 0 2.12.3 3 .81V6a2 2 0 00-2-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h9.09c-.05-.33-.09-.66-.09-1M4 8V6l8 5 8-5v2l-8 5-8-5m13.75 14.16l-2.75-3L16.16 18l1.59 1.59L21.34 16l1.16 1.41-4.75 4.75" />
            </svg>
            Inbox
          </Link>
          <Link
            to="/compose"
            className="p-1 rounded-lg hover:bg-slate-800 hover:text-white flex items-center gap-1"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1.3em"
              width="1.3em"
            >
              <path d="M13 19c0-.34.04-.67.09-1H4V8l8 5 8-5v5.09c.72.12 1.39.37 2 .72V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9.09c-.05-.33-.09-.66-.09-1m7-13l-8 5-8-5h16m0 9v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2z" />
            </svg>
            Compose
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
