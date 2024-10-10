"use client";
import React, { useState, useContext } from "react";
import { sendOtp, verifyOtp } from "@/services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "@/context/AuthContext"; // Import the AuthContext

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Loading state for sending OTP
  const [verifyingOtp, setVerifyingOtp] = useState<boolean>(false); // Loading state for verifying OTP
  
  // Use the login function from AuthContext
  const authContext = useContext(AuthContext);

  const handleSendOtp = async () => {
    setLoading(true); // Start loading
    try {
      const response = await sendOtp(email);
      toast.success(response.message || "OTP sent successfully!");
      setShowOtpField(true);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "An error occurred while sending OTP";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleVerifyOtp = async () => {
    setVerifyingOtp(true); // Start loading for OTP verification
    try {
      const response = await verifyOtp(email, otp);
      toast.success(`Login successful!`);
      if (authContext) {
        authContext.login(response.token); // Use the login function from the context
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "An error occurred during OTP verification";
      toast.error(errorMessage);
    } finally {
      setVerifyingOtp(false); // Stop loading for OTP verification
    }
  };

  return (
    <div className="w-full  container mx-auto rounded-2xl my-20 ">
      <form className="bg-[#1B263B] rounded-xl" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center w-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32 max-w-2xl mx-auto">
          <div className="mx-auto w-full max-w-md">
            <h2 className="mt-8 text-2xl font-bold text-center leading-9 tracking-tight text-white">
              Welcome to Ravid AI
            </h2>
            <div className="mt-10 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-100 dark:text-neutral-400"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@johndoe.com"
                    className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-input text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                  />
                </div>
              </div>

              {showOtpField && (
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium leading-6 text-gray-100 dark:text-neutral-400"
                  >
                    Enter OTP
                  </label>
                  <div className="mt-2">
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-input text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                    />
                  </div>
                </div>
              )}

              <div>
                {!showOtpField ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="bg-[#415A77] hover:bg-black/90 text-white text-sm md:text-sm transition font-medium duration-200 rounded-full px-4 py-2 flex items-center justify-center w-full"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? ( // Show loader if loading is true
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                        ></path>
                      </svg>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="bg-black hover:bg-black/90 text-white text-sm md:text-sm transition font-medium duration-200 rounded-full px-4 py-2 flex items-center justify-center w-full"
                    disabled={verifyingOtp} // Disable button while verifying OTP
                  >
                    {verifyingOtp ? ( // Show loader if verifying
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                        ></path>
                      </svg>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
