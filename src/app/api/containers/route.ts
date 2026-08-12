import { NextResponse } from "next/server";
import docker from "@/lib/docker";

export async function GET() {
  try {
    // Fetch all containers from local Docker daemon
    const containers = await docker.listContainers({ all: true });

    const formattedContainers = containers.map((container) => ({
      id: container.Id.substring(0, 12),
      name: container.Names[0] ? container.Names[0].replace(/^\//, "") : container.Id.substring(0, 12),
      image: container.Image,
      state: container.State,
      status: container.Status,
      created: container.Created,
      ports: container.Ports?.map((p) => `${p.PublicPort ? `${p.PublicPort}:` : ""}${p.PrivatePort}/${p.Type}`).join(", ") || "",
    }));

    const activeCount = containers.filter((c) => c.State === "running").length;

    return NextResponse.json({
      success: true,
      online: true,
      total: containers.length,
      activeCount,
      containers: formattedContainers,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: false,
        online: false,
        activeCount: 0,
        containers: [],
        error: "Docker daemon is not running or unreachable.",
        details: errMessage,
      },
      { status: 200 }
    );
  }
}
