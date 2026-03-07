// Domain types for the Cluster Efficiency Dashboard

export interface ClusterResource {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number;
  total: number;
}

export interface NamespaceResource extends ClusterResource {
  clusterId: string;
}

export type ViewMode = "cluster" | "namespace";

export type ResourceCategory = "cpu" | "gpu" | "ram" | "storage" | "network";

export interface ResourceIcon {
  category: ResourceCategory;
  label: string;
  icon: string; // SVG path or emoji fallback
}

export interface ApiResponse<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
