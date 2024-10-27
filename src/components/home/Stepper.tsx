import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaDoorOpen,
  FaArrowRight,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Select a Room",
    description:
      "Browse through our available rooms and pick the one that fits your needs.",
    icon: FaDoorOpen,
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Choose Date & Time",
    description:
      "Select your preferred date and time to make sure the room is available.",
    icon: FaCalendarAlt,
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Confirm Booking",
    description: "Review your selection and confirm your booking with ease.",
    icon: FaCheckCircle,
    iconColor: "text-red-600",
  },
];

const Stepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleStepClick = (stepId: number) => {
    if (stepId !== currentStep) {
      setCurrentStep(stepId);
      setIsAnimating(true);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setIsAnimating(true);
    }
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <h2 className="text-center text-5xl font-bold text-gray-800 dark:text-white mb-10 transition-colors duration-300">
        How It <span className="text-blue-600 dark:text-blue-400">Works</span>
      </h2>
      <div className="flex justify-center mb-12 overflow-hidden">
        <div className="relative w-full max-w-4xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="relative z-10 flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className="relative flex flex-col items-center group"
              >
                <div
                  className={`w-20 h-20 flex items-center justify-center rounded-full border-4 ${
                    currentStep >= step.id
                      ? "border-blue-500 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 animate-pulse"
                      : "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  } transition-all duration-500 ease-in-out cursor-pointer transform hover:scale-110`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <step.icon
                    className={`text-3xl ${
                      isAnimating && currentStep === step.id
                        ? "animate-bounce"
                        : ""
                    }`}
                  />
                </div>
                <span
                  className={`mt-4 text-sm font-medium ${
                    currentStep >= step.id
                      ? "text-blue-600 dark:text-blue-400 flash"
                      : "text-gray-600 dark:text-gray-400"
                  } transition-colors duration-300`}
                >
                  {step.title}
                </span>
                {step.id < steps.length && (
                  <FaArrowRight
                    className={`absolute top-1/2 -right-8 transform -translate-y-1/2 text-gray-400 dark:text-gray-600 ${
                      currentStep > step.id
                        ? "text-blue-500 dark:text-blue-400"
                        : ""
                    } transition-colors duration-300`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`group text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
              currentStep === step.id
                ? "ring-4 ring-blue-500 dark:ring-blue-400 transform scale-105 animate-pulse"
                : ""
            } hover:-translate-y-2`}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="flex items-center justify-center mb-6">
              <step.icon
                className={`text-7xl ${step.iconColor} group-hover:scale-110 transition-transform duration-300`}
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={handleNextStep}
          disabled={currentStep === steps.length}
          className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            currentStep === steps.length
              ? "bg-green-500 text-white animate-pulse cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
          }`}
        >
          {currentStep === steps.length ? "Booking Complete!" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default Stepper;
