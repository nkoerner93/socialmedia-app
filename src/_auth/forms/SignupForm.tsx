import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useState } from "react";

const SignupForm = () => {
  // Loading State
  let [isLoading, setIsLoading] = useState(true);
  let accountCreated = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Set isLoading to true before submitting the form
    setIsLoading(true);

    // Simulate an asynchronous action (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Set isLoading to false after form submission
    setIsLoading(false);

    // Handle the form submission logic
    accountCreated = true;
  }

  return (
    <>
      {accountCreated ? (
        <Button className="shad-button_primary">Signed up</Button>
      ) : (
        <Form {...form}>
          <div className="sm:w-420 flex-center flex-col">
            <img src="/assets/images/logo.svg" />
            <h2 className="h3-bold md:h4-bold pt-5 sm:pt-8">
              Create a new Account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">
              To use Snapgram enter your details
            </p>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full mt-4 space-y-4 text-white"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Enter name"
                        type="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Enter username"
                        type="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Enter Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Enter password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="shad-button_primary" type="submit">
                {isLoading ? (
                  <div className="flex flex-row items-center gap-2">
                    <Loader /> Loading...
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>
        </Form>
      )}
    </>
  );
};

export default SignupForm;
