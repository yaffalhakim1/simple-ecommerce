import Image from "next/image";

export default function Coming() {
  return (
    <div className="text-center">
      <Image
        src="/bro.png"
        width={500}
        height={500}
        alt={""}
        className="flex mx-auto"
      />
      <h1 className="text-2xl">Still under development</h1>
    </div>
  );
}
