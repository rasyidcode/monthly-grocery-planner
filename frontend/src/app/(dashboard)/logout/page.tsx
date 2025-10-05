import { signOut } from "@/auth";

export default function Logout() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Logout</button>
    </form>
  );
}
