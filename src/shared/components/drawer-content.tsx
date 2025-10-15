import { useAuth } from "@/src/features/auth/context/AuthContex";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

export function CustomDrawerContent(props: any) {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      {/* Custom Logout button */}
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
}
