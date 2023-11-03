import { Flex, Title } from "@mantine/core";
import { IconBottleFilled } from "@tabler/icons-react";

// prepare props
type BarmanLogoProps = {
  size: number,
  padding?: number
}

export default function BarmanLogo({ size, padding = 0 }: BarmanLogoProps) {
  return (
    <Flex align={"center"} p={padding + "rem"}>
      <IconBottleFilled size={size + "rem"} />
      <Title size={size + "rem"}>Barman</Title>
    </Flex>
  )
}