'use client';

import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import FormGroup from "@/components/common/FormGroup";
import TextInput from "@/components/common/inputs/TextInput";
import { handleKeyEnter } from "@/constants/enterKeyHandle";
import { useLogin } from "@/hooks/login/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { formData, setFormData, onSubmit, isLoading, errors } = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8 md:p-10 border border-border">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Welcome back!</h2>
          <p className="text-muted-foreground mb-8">Enter your Credentials to access your account</p>
          <form onKeyDown={handleKeyEnter(onSubmit)} className="space-y-4">
             <FormGroup errors={errors} id="userName">
                  <TextInput
                    id="userName"
                    name="userName"
                    placeholder="Ex: User Name"
                    required
                    type="text"
                    value={formData?.userName}
                    onChange={(e) =>
                      setFormData({ ...formData, userName: e.target.value })
                    }
                    data-id="email-input"
                  >
                    User Name
                  </TextInput>
                </FormGroup>
            <FormGroup errors={errors} id="email">
                  <TextInput
                      id="password"
                      name="password"
                      errors={errors}
                      placeholder="* * * * * * * * * *"
                      required
                      type={isPasswordVisible ? "text" : "password"}
                      value={formData?.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      data-id="password-input"
                    />
                </FormGroup>
            <div className="flex items-center mb-2">
              <input id="remember" type="checkbox" className="mr-2 accent-primary" />
              <label htmlFor="remember" className="text-muted-foreground text-sm">Remember for 30 days</label>
            </div>
            <PrimaryButton
              onClick={onSubmit}
              disabled={isLoading}
            > {isLoading ? "Loading..." : "Login"}
            </PrimaryButton>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-border" />
            <span className="mx-2 text-muted-foreground text-sm">or</span>
            <div className="flex-grow h-px bg-border" />
          </div>
          <div className="flex gap-2 mb-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-md py-2 bg-background text-foreground hover:bg-accent transition-colors">
              {/* <Image src="/google.svg" alt="Google" width={20} height={20} /> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" width="20" height="20">
                <path 
                  fill="currentColor" 
                  d="M488 261.8C488 403.3 381.5 512 244 512 110.1 512 0 401.9 0 265.8 0 129.7 110.1 20 244 20c58.8 0 115.3 22.4 156.4 61.5l-65.5 65.5c-24.6-23.4-60-37.5-90.9-37.5-69.5 0-126 56.5-126 126s56.5 126 126 126c62.3 0 105.1-43.2 110.9-97.2H244V261.8h244z"
                />
              </svg>
              <span className="text-sm">Sign in with Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-md py-2 bg-background text-foreground hover:bg-accent transition-colors">
              {/* <Image src="/apple.svg" alt="Apple" width={20} height={20} /> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20">
            <path 
              fill="currentColor"
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
            />
          </svg>
              <span className="text-sm">Sign in with Apple</span>
            </button>
          </div>
          <div className="text-center text-muted-foreground text-sm">
            Don&apos;t have an account? <a href="#" className="text-foreground font-medium hover:underline">Sign Up</a>
          </div>
        </div>
      </div>
      
      {/* Right: Logo Section */}
      <div className="hidden md:flex flex-1 items-center justify-center rounded-tl-3xl rounded-bl-3xl bg-primary">
        <div className="flex flex-col items-center">
         
          <div className="p-6 border-8 border-white text-center">
            <h1 className="text-6xl font-serif text-primary-foreground font-bold mb-4 tracking-wide"><span className="bg-white text-primary rounded-md px-2 py-1">DRIVER</span> HUB</h1>
            <p className="text-primary-foreground text-4xl tracking-widest font-medium">Your Chauffeur Partner</p>
          </div>
          
        </div>
      </div>
    </div>
  );
} 