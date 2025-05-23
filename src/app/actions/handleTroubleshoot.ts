"use server";

import { troubleshoot, type TroubleshootInput, type TroubleshootOutput } from "@/ai/flows/troubleshooter";
import { z } from "zod";

const TroubleshootActionInputSchema = z.object({
  errorMessage: z.string().min(1, "Error message cannot be empty."),
  relevantContext: z.string().optional(),
});

export async function handleTroubleshoot(
  data: z.infer<typeof TroubleshootActionInputSchema>
): Promise<{ success: boolean; data?: TroubleshootOutput; error?: string }> {
  const validatedData = TroubleshootActionInputSchema.safeParse(data);

  if (!validatedData.success) {
    return { success: false, error: validatedData.error.flatten().fieldErrors.errorMessage?.[0] || "Invalid input." };
  }

  try {
    const input: TroubleshootInput = {
      errorMessage: validatedData.data.errorMessage,
      relevantContext: validatedData.data.relevantContext,
    };
    const result = await troubleshoot(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in troubleshoot flow:", error);
    return { success: false, error: "An unexpected error occurred while troubleshooting." };
  }
}
