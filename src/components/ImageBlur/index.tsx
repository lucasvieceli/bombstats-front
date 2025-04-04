import { ENV_URL } from "@/util/env";
import getBase64 from "@/util/getLocalBase64";
import Image, { ImageProps } from "next/image";

type ImageBlurProps = ImageProps & {
  alt: string;
  external?: boolean;
};

async function ImageBlur({ alt, external = false, ...props }: ImageBlurProps) {
  let myBlurDataUrl: string | undefined = "";
  if (external) {
    myBlurDataUrl = await getBase64(props.src as string);
  } else {
    myBlurDataUrl = await getBase64(`${ENV_URL}${props.src}`);
  }

  return (
    <Image
      placeholder="blur"
      alt={alt}
      loading="lazy"
      quality={100}
      blurDataURL={myBlurDataUrl}
      {...props}
    />
  );
}

export default ImageBlur;
