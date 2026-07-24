import { LucideIcon } from "lucide-react";

export interface SidebarItemType {
  title: string;
  path: string;
  icon: LucideIcon;
}

export interface SidebarSectionType {
  title?: string;
  items: SidebarItemType[];
}