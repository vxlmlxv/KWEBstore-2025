import { z } from "zod";

export const orderFormSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해주세요")
    .min(2, "이름은 2글자 이상이어야 합니다")
    .max(5, "이름은 5글자 이하여야 합니다")
    .regex(/^[가-힣]+$/, "이름은 한글만 입력 가능합니다"),

  phone: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .regex(
      /^01[016789]-?\d{3,4}-?\d{4}$/,
      "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)"
    ),

  email: z
    .string()
    .optional()
    .refine(
      (email) => !email || z.string().email().safeParse(email).success,
      "올바른 이메일 형식이 아닙니다"
    ),

  address: z
    .string()
    .min(1, "배송지를 입력해주세요")
    .max(100, "배송지는 100자 이하로 입력해주세요"),

  paymentMethod: z.string().min(1, "결제수단을 선택해주세요"),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
