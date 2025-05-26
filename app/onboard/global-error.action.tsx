"use server";

import { DiContainer } from "@/core/di/container";
import { EmailErrorAlertTemplate } from "../_components/templates/error_alert";

export async function sendGlobalErrorAlert(error: Error) {
  const emailService = DiContainer.get("IEmailService");

  await emailService.sendEmail(
    "Acme <onboarding@resend.dev>",
    ["enzotrr@gmail.com"],
    <EmailErrorAlertTemplate error={error} />,
    "Error alert"
  );

  return;
}
