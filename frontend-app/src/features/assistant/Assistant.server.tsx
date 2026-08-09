import dynamic from "next/dynamic";

const AssistantClient = dynamic(() =>
  import("./Assistant.client").then((m) => m.default),
);

export default function AssistantServer() {
  return <AssistantClient />;
}