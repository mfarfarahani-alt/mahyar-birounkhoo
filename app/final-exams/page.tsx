import type { Metadata } from "next";
import FinalExamsClient from "./FinalExamsClient";

export const metadata: Metadata = {
  title: "آرشیو سؤالات امتحانات نهایی یازدهم و دوازدهم",
  description:
    "دسترسی و دانلود رایگان سؤالات امتحانات نهایی پایه‌های یازدهم و دوازدهم به تفکیک درس و رشته.",
  keywords: [
    "آرشیو سوالات نهایی",
    "سوالات امتحان نهایی یازدهم",
    "سوالات امتحان نهایی دوازدهم",
    "دانلود سوالات نهایی",
    "مهیار بیرون‌خو",
  ],
  alternates: { canonical: "/final-exams" },
  openGraph: {
    title: "آرشیو سؤالات امتحانات نهایی | مهیار بیرون‌خو",
    description:
      "سؤالات امتحانات نهایی پایه‌های یازدهم و دوازدهم، دسته‌بندی‌شده بر اساس درس.",
    url: "/final-exams",
    type: "website",
  },
};

export default function FinalExamsPage() {
  return <FinalExamsClient />;
}
