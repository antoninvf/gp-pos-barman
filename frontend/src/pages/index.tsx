import { Button, Flex, Group } from "@mantine/core";
import Link from "next/link";
import Navigation from "../modules/components/SidebarNav/Navigation";

export default function Home() {
  return (
    <Flex>
      <Navigation />
      <Flex direction={"column"} p={"1rem"}>
      </Flex>
    </Flex>
  );
}
