import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Package {
    id: bigint;
    duration: string;
    order: bigint;
    tagline: string;
    days: bigint;
    name: string;
    isActive: boolean;
    inclusions: Array<string>;
    highlights: Array<string>;
    exclusions: Array<string>;
    category: string;
    nights: bigint;
    price: bigint;
    itinerary: Array<DayItem>;
    priceLabel: string;
}
export interface Enquiry {
    id: bigint;
    packageName: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
    packageId: bigint;
}
export interface DayItem {
    day: bigint;
    title: string;
    activities: Array<string>;
    description: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPackage(pkg: Package): Promise<bigint>;
    deletePackage(id: bigint): Promise<void>;
    getAllActivePackages(): Promise<Array<Package>>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPackageById(id: bigint): Promise<Package>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    reorderPackages(order: Array<bigint>): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitEnquiry(enquiry: Enquiry): Promise<bigint>;
    togglePackageActiveStatus(id: bigint): Promise<boolean>;
    updatePackage(id: bigint, pkg: Package): Promise<void>;
}
