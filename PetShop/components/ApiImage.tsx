import { BASE_URL } from "@/api/AxiosInstance";
import { useEffect, useState } from "react";
import { Image } from "react-native";
export default function ApiImage({
  ImageID,
  style,
}: {
  ImageID?: string;
  style?: any;
}) {
  const [image, setImage] = useState<string>(
    "https://placehold.co/100x100/EEE/31343C"
  );
  useEffect(() => {
    setImage(`${BASE_URL}/image/${ImageID}`);
  }, [ImageID]);
  return (
    <Image
      style={[style, { borderRadius: 8 }]}
      width={100}
      height={100}
      source={{ uri: image }}
      onError={() => setImage("https://placehold.co/100x100/EEE/31343C")}
    />
  );
}
