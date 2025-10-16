import { Router } from "expo-router";

let routerRef: Router | null = null;

export function setRouter(ref: Router) {
  routerRef = ref;
}

export function navigateToLogin() {
  if (routerRef) {
    routerRef.replace("/auth/signin"); // adjust path
  }
}
