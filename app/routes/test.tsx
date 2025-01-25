import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  data,
  redirect,
  useFetcher,
  useLoaderData,
  type ActionFunctionArgs,
} from "react-router";
import { MotionSection } from "~/components/FramerMotion";
import type { Route } from "../+types/root";
import { debug } from "~/utils/debug";

type Errors = {
  fullNameError: string;
  phoneNumberError: string;
  emailError: string;
  messageError: string;
};

interface FormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  message: string;
}

interface FormStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export async function loader() {
  const data = {
    ENV: {
      EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
      EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
    },
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  debug;
  const formData = await request.formData();
  const templateParams = {
    from_name: formData.get("fullName"),
    reply_to: formData.get("emailAddress"),
    phone_no: formData.get("phoneNumber"),
    message: formData.get("message"),
  };

  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
      }
    );
    return data({ success: true, response });
  } catch (error) {
    console.error("Email send failed:", error);
    return data({ success: false, error }, { status: 500 });
  }
}

export default function ContactUs(_: Route.ComponentProps) {
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    error: null,
    success: false,
  });

  const [validationErrors, setValidationErrors] = useState<Partial<Errors>>({
    fullNameError: "",
    phoneNumberError: "",
    emailError: "",
    messageError: "",
  });

  useEffect(() => {
    emailjs.init(loaderData.ENV.EMAILJS_PUBLIC_KEY);
  }, [loaderData.ENV.EMAILJS_PUBLIC_KEY]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const fullName = String(formData.get("fullName"));
    const emailAddress = String(formData.get("emailAddress"));
    const phoneNumber = String(formData.get("phoneNumber"));
    const message = String(formData.get("message"));

    const errors: Partial<Errors> = {};
    if (!fullName.trim()) {
      errors.fullNameError = "Full name is required";
    }

    if (!emailAddress.includes("@")) {
      errors.emailError = "Invalid email address";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumberError = "Phone number is required";
    }

    if (!message.trim()) {
      errors.messageError = "Message cannot be empty";
    }

    setValidationErrors(errors);
    if (Object.values(errors).some((error) => error.trim() !== "")) {
      return;
    }

    const templateParams = {
      from_name: fullName,
      reply_to: emailAddress,
      email_id: emailAddress,
      phone_no: phoneNumber,
      message: message,
    };

    try {
      // const response = await emailjs.send(
      //   loaderData.ENV.EMAILJS_SERVICE_ID,
      //   loaderData.ENV.EMAILJS_TEMPLATE_ID!,
      //   templateParams
      // );
      // console.log("SUCCESS Sending EMAIL!", response.status, response.text);
      fetcher.submit(formData, { method: "post" });
    } catch (error) {
      console.error("Email send failed", error);
    }
  };

  return (
    <MotionSection>
      <div className="flex justify-center">
        <div className="md:w-3/4 lg:w-3/4 mt-4 p-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Personal Information
            </h3>
          </div>
          <fetcher.Form method="post" onSubmit={handleSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row p-4">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Your name here..."
                    onChange={handleChange}
                    // defaultValue="Devid Jhon"
                  />
                  {validationErrors?.fullNameError ? (
                    <em className="text-sm text-red-500 mt-2 block font-medium">
                      * {validationErrors.fullNameError}
                    </em>
                  ) : null}
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Your number here..."
                  onChange={handleChange}
                  // defaultValue="+990 3343 7865"
                />
                {validationErrors?.phoneNumberError ? (
                  <em className="text-sm text-red-500 mt-2 block font-medium">
                    * {validationErrors.phoneNumberError}
                  </em>
                ) : null}
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row p-4">
              <div className="w-full">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="emailAddress"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    placeholder="Your email id here..."
                    onChange={handleChange}
                  />
                  {validationErrors?.emailError ? (
                    <em className="text-sm text-red-500 mt-2 block font-medium">
                      * {validationErrors.emailError}
                    </em>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row p-4">
              <div className="w-full">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="emailAddress"
                >
                  Message
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                  <textarea
                    className="w-full rounded min-h-48 border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="message"
                    id="message"
                    placeholder="Your message here..."
                    onChange={handleChange}
                  />
                  {validationErrors?.messageError ? (
                    <em className="text-sm text-red-500 mt-2 block font-medium">
                      * {validationErrors.messageError}
                    </em>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white hover:text-red-500"
                type="submit"
              >
                Cancel
              </button>
              <button
                className="flex justify-center rounded bg-ramserv py-2 px-6 font-medium text-gray hover:bg-opacity-90 hover:bg-blue-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </MotionSection>
  );
}
