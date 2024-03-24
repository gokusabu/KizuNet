import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
 
export default function Page() {
  return <SignIn afterSignInUrl="/" appearance={{baseTheme : dark}}/>;
}