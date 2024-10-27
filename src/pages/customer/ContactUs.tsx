import RAForm from "../../components/form/RAForm";
import RAInput from "../../components/form/RAInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import ScrollToTopButton from "../../components/shared/ScrollToTopButton";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = (data: FieldValues) => {
    setLoading(true);
    emailjs
      .send("service_2gabbmo", "template_kxip6gc", data, "IXst6eLIBbYF_WpCt")
      .then(
        () => {
          setLoading(false);
          toast.success("email sent");
        },
        (error) => {
          setLoading(false);
          toast.error(error.message);
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen rounded-md bg-gray-100">
      <ScrollToTopButton />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>

        <RAForm
          resolver={zodResolver(contactSchema)}
          onSubmit={handleContactSubmit}
        >
          <RAInput
            type="text"
            name="name"
            label="Name"
            placeholder="John Doe"
          />
          <RAInput
            type="email"
            name="email"
            label="Email"
            placeholder="example@gmail.com"
          />
          <RAInput
            type="text"
            name="subject"
            label="Subject"
            placeholder="Subject"
          />
          <RAInput
            type="textarea"
            name="message"
            label="Message"
            placeholder="What's on your mind?"
          />
          <div className="text-center mt-6">
            <Button
              loading={loading}
              htmlType="submit"
              className="w-40 h-10"
              type="primary"
            >
              Send Message
            </Button>
          </div>
        </RAForm>
      </div>
    </div>
  );
};

export default ContactUs;
