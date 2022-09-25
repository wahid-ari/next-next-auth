import { useEffect, useState } from "react";
import Prism from "prismjs";
import { ClipboardIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"
// import "prismjs/themes/prism-okaidia.min.css";

export default function Code({ name = "Code", code, className, lang = "javascript", testId, ...rest }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const [copy, setCopy] = useState(false)

  async function copyText() {
    try {
      await navigator.clipboard.writeText(code);
      setCopy(true)
      setTimeout(() => {
        setCopy(false)
      }, 2500)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <p className="font-semibold text-base dark:text-white mt-4 mb-4">Example {name}:</p>
      <div {...rest} className={`Code relative text-sm rounded-md ${className ? className : " "}`}>
        <button title="Copy Code" onClick={copyText} className="absolute right-0 m-3 mt-4 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-700 px-1 py-1 rounded-md transition-all">
          {copy ?
            <div className="flex items-center">
              <ClipboardIcon className="h-5 w-5 dark:text-gray-400 dark:hover:text-gray-300 transition-all" />
              <span className="pl-1 text-xs text-neutral-600 dark:text-gray-300">Copied !</span>
            </div>
            :
            <DocumentDuplicateIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-600 dark:text-gray-400 dark:hover:text-gray-300 transition-all" />
          }
        </button>
        <pre className="line-numbers scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-200 dark:scrollbar-thumb-neutral-700">
          <code data-testid={testId} className={`language-${lang}`}>{code}</code>
        </pre>
      </div>
    </>
  );
}