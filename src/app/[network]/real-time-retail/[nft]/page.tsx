"use client";
import { useParams, useRouter } from "next/navigation";

function NftRetail() {
  const test = useRouter();
  const param = useParams();

  test.replace(`/${param.network}/real-time-retail`);
}

export default NftRetail;
