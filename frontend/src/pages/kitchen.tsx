import { Button, Flex, Group } from "@mantine/core";
import Link from "next/link";
import Navigation from "../modules/components/SidebarNav/Navigation";
import { KitchenQueueList } from "../modules/kitchenqueue";

export default function Kitchen() {
  return (
    <Flex>
      <Navigation />
      <Flex direction={"column"} p={"1rem"}>
        <KitchenQueueList />
      </Flex>
    </Flex>
  );
}