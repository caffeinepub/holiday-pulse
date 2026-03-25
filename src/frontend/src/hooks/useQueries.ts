import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Enquiry, Package } from "../backend.d";
import { useActor } from "./useActor";

export function useActivePackages() {
  const { actor, isFetching } = useActor();
  return useQuery<Package[]>({
    queryKey: ["activePackages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllActivePackages();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllPackages() {
  const { actor, isFetching } = useActor();
  return useQuery<Package[]>({
    queryKey: ["allPackages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllActivePackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllEnquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Enquiry[]>({
    queryKey: ["enquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitEnquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (enquiry: Enquiry) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitEnquiry(enquiry);
    },
  });
}

export function useCreatePackage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pkg: Package) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPackage(pkg);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allPackages"] }),
  });
}

export function useUpdatePackage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, pkg }: { id: bigint; pkg: Package }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePackage(id, pkg);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allPackages"] }),
  });
}

export function useDeletePackage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePackage(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allPackages"] }),
  });
}

export function useTogglePackageActive() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.togglePackageActiveStatus(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allPackages"] }),
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
