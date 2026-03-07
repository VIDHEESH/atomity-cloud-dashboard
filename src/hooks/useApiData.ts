"use client";

import { useQuery } from "@tanstack/react-query";
import type { ClusterResource, NamespaceResource } from "@/types";

// Transform raw API data into cluster efficiency metrics
function transformToClusterData(rawData: Record<string, unknown>[]): ClusterResource[] {
  const clusterNames = ["Cluster A", "Cluster B", "Cluster C", "Cluster D"];
  const multipliers = [3.5, 1.6, 0.25, 0.8];

  return clusterNames.map((name, i) => {
    const raw = rawData[i] || rawData[0];
    const m = multipliers[i];
    const userId = typeof raw === "object" && raw !== null && "userId" in raw
      ? (raw as { userId: number }).userId
      : i + 1;

    const cpu = Math.round(350 * m + userId * 10);
    const ram = Math.round(200 * m + userId * 5);
    const storage = Math.round(35 * m + userId * 2);
    const network = Math.round(45 * m + userId * 3);
    const gpu = Math.round(120 * m + userId * 7);
    const total = cpu + ram + storage + network + gpu;
    const efficiency = Math.round((Math.random() * 40 + 5) * 10) / 10;

    return {
      id: `cluster-${i + 1}`,
      name,
      cpu,
      ram,
      storage,
      network,
      gpu,
      efficiency,
      total,
    };
  });
}

function transformToNamespaceData(
  rawData: Record<string, unknown>[],
  clusterId: string
): NamespaceResource[] {
  const namespaceNames = ["Namespace A", "Namespace B", "Namespace C", "Namespace D"];
  const multipliers = [3.2, 2.0, 1.0, 0.4];

  return namespaceNames.map((name, i) => {
    const raw = rawData[i + 4] || rawData[i] || rawData[0];
    const m = multipliers[i];
    const id = typeof raw === "object" && raw !== null && "id" in raw
      ? (raw as { id: number }).id
      : i + 1;

    const cpu = Math.round(380 * m + id * 3);
    const ram = Math.round(210 * m + id * 2);
    const storage = Math.round(38 * m + id);
    const network = Math.round(48 * m + id * 2);
    const gpu = Math.round(130 * m + id * 4);
    const total = cpu + ram + storage + network + gpu;
    const efficiency = Math.round((10 + i * 15 + Math.random() * 5) * 10) / 10;

    return {
      id: `ns-${i + 1}`,
      name,
      clusterId,
      cpu,
      ram,
      storage,
      network,
      gpu,
      efficiency,
      total,
    };
  });
}

// Fetch cluster data with caching via TanStack Query
export function useClusterData() {
  return useQuery<ClusterResource[]>({
    queryKey: ["cluster-efficiency"],
    queryFn: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
      if (!response.ok) throw new Error("Failed to fetch cluster data");
      const data = await response.json();
      return transformToClusterData(data);
    },
    staleTime: 5 * 60 * 1000, // Cache stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Garbage collect after 10 minutes
    refetchOnWindowFocus: false,
  });
}

// Fetch namespace data for a specific cluster
export function useNamespaceData(clusterId: string | null) {
  return useQuery<NamespaceResource[]>({
    queryKey: ["namespace-data", clusterId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${clusterId?.replace("cluster-", "") || 1}&_limit=8`
      );
      if (!response.ok) throw new Error("Failed to fetch namespace data");
      const data = await response.json();
      return transformToNamespaceData(data, clusterId || "cluster-1");
    },
    enabled: !!clusterId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
