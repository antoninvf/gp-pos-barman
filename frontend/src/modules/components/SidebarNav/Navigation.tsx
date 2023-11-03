import { Flex, NavLink, Paper, Title } from "@mantine/core";
import { IconBottleFilled, IconGauge, IconToolsKitchen } from "@tabler/icons-react";
import BarmanLogo from "../BarmanLogo/BarmanLogo";
import Link from "next/link";

export default function Navigation() {
  return (
    <Paper component={Flex} shadow="lg" direction={"column"} w={"15vw"} h={"100vh"} align={"center"} bg={"white"}>
      <BarmanLogo size={3} padding={1}/>
      <NavLink
        p={"1rem"}
        label="Dashboard"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        component={Link}
        href="/"
      ></NavLink>
      <NavLink
        p={"1rem"}
        label="Kitchen"
        leftSection={<IconToolsKitchen size="1rem" stroke={1.5} />}
        component={Link}
        href="/kitchen"
      ></NavLink>
    </Paper>
  );
}