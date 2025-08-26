import { useState } from "react";
import Sum from "./Sum";

export default function Total() {
  const [a, sumA] = useState(0);
  const [b, sumB] = useState(0);
  const [c, sumC] = useState(0);

  return (
    <div className="flex justify-center items-center flex-col gap-10 mt-20">
      <Sum val={a} onClick={sumA} />
      <Sum val={b} onClick={sumB} />
      <Sum val={c} onClick={sumC} />
      Total {a + b + c}
    </div>
  );
}
