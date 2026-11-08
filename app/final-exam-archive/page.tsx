import type { Metadata } from "next";
import FinalExamArchiveClient from "./FinalExamArchiveClient";

export const metadata: Metadata = {
  title: "آرشیو سوالات امتحانات نهایی یازدهم و دوازدهم",
  description: "دانلود رایگان سوالات امتحانات نهایی پایه‌های یازدهم و دوازدهم، به تفکیک درس، سال و نوبت امتحانی.",
  keywords: ["آرشیو سوالات امتحان نهایی", "سوالات نهایی یازدهم", "سوالات نهایی دوازدهم", "دانلود سوالات امتحانات نهایی", "مهیار بیرون‌خو"],
  alternates: { canonical: "/final-exam-archive" },
  openGraph: { title: "آرشیو سوالات امتحانات نهایی | مهیار بیرون‌خو", description: "دانلود سوالات امتحانات نهایی پایه یازدهم و دوازدهم به تفکیک درس و سال.", url: "/final-exam-archive", type: "website" },
};

export default function FinalExamArchivePage() {
  return <FinalExamArchiveClient />;
}
