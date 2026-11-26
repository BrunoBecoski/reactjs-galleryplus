import { useParams } from "react-router";
import { Text } from "../components/text";

export function PagePhotoDetails() {
  const { id } = useParams();

  return <Text variant="heading-medium">Página detalhe da Foto: {id}</Text>;
}
