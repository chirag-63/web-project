import { SignIn } from "@clerk/nextjs";

export default function SigninPage(){
    return(
        <div className="flex justify-center items-center h-screen">
            <SignIn className="dark"/>
        </div>
    )
}