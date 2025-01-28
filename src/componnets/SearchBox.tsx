import { useEffect, useRef, useState } from "react";

export default function SearchBox() {
  const [value, setValue] = useState<string>();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ref.current) {
      setValue(ref.current.value);
    }
  };

  return (
    <div
      className={
        "w-[50%] max-w-[1000px] text-3xl text-icon flex flex-col gap-4"
      }
    >
      <h2 className={"font-bold"}>Search For The Movie:</h2>
      <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
        <input
          ref={ref}
          type={"text"}
          className={
            "w-full h-16 px-6 bg-searchbg rounded-xl border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-300 ease-in-out placeholder:text-icon/40"
          }
          placeholder={"Type a movie name..."}
        />
        <button
          type={"submit"}
          className={
            "bg-accent text-background py-2 px-6 rounded-xl hover:bg-accent/80 transition"
          }
        >
          Search
        </button>
      </form>
    </div>
  );
}
