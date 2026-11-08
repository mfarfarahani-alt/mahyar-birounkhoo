"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Search,
  X,
} from "lucide-react";
import archiveData from "../exam-archive/final-exams.json";

type ArchiveFile = { title: string; file: string };
type Subject = { id: string; title: string; files: ArchiveFile[] };
type Grade = { id: string; title: string; subjects: Subject[] };
const grades = archiveData.grades as Grade[];

const monthNames: Record<string, string> = {
  khordad: "خرداد",
  shahrivar: "شهریور",
  dey: "دی",
  tir: "تیر",
  mordad: "مرداد",
};

function toPersianDigits(value: string) {
  return value.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

function readableFileTitle(filename: string) {
  const clean = filename.replace(/-\d+(?=\.pdf$)/i, "").replace(/\.pdf$/i, "");
  const dateMatch = clean.match(/(khordad|shahrivar|dey|tir|mordad)[-_ ](\d{2,4})/i);
  if (dateMatch) {
    const month = monthNames[dateMatch[1].toLowerCase()];
    const rawYear = dateMatch[2];
    const year = rawYear.length === 2 ? String(1400 + Number(rawYear)) : rawYear;
    return `${month} ${toPersianDigits(year)}`;
  }
  return clean.replace(/[-_]+/g, " ").replace(/\s+/g, " ");
}

function getField(title: string) {
  if (title.includes("انسانی") || ["تاریخ", "جغرافیا", "جغرافی", "جامعه", "فلسفه", "روانشناسی", "علوم فنون", "فنون"].some((x) => title.includes(x))) return "انسانی";
  if (title.includes("تجربی") || ["زیست", "شیمی", "زمین شناسی"].some((x) => title.includes(x))) return "تجربی";
  if (title.includes("ریاضی") || ["حسابان", "هندسه", "گسسته", "آمار"].some((x) => title.includes(x))) return "ریاضی";
  return "عمومی";
}

export default function FinalExamsClient() {
  const [activeGradeId, setActiveGradeId] = useState("11");
  const [activeSubjectId, setActiveSubjectId] = useState("all");
  const [activeField, setActiveField] = useState("همه رشته‌ها");
  const [search, setSearch] = useState("");

  const activeGrade = grades.find((grade) => grade.id === activeGradeId) ?? grades[0];
  const subjects = activeGrade.subjects;
  const fieldOptions = ["همه رشته‌ها", "عمومی", "تجربی", "ریاضی", "انسانی"];

  const visibleSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSubject = activeSubjectId === "all" || subject.id === activeSubjectId;
      const matchesField = activeField === "همه رشته‌ها" || getField(subject.title) === activeField;
      const matchesSearch = !search.trim() || subject.title.includes(search.trim()) ||
        subject.files.some((file) => readableFileTitle(file.title).includes(search.trim()));
      return matchesSubject && matchesField && matchesSearch;
    });
  }, [subjects, activeSubjectId, activeField, search]);

  const totalFiles = subjects.reduce((sum, subject) => sum + subject.files.length, 0);
  const visibleCount = visibleSubjects.reduce(
    (sum, subject) => sum + subject.files.filter((file) =>
      !search.trim() || subject.title.includes(search.trim()) || readableFileTitle(file.title).includes(search.trim())
    ).length,
    0
  );

  function selectGrade(id: string) {
    setActiveGradeId(id);
    setActiveSubjectId("all");
    setActiveField("همه رشته‌ها");
    setSearch("");
  }

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-extrabold text-amber-700">
            <BookOpen size={16} /> ابزار کنکور
          </span>
          <h1 className="mt-5 text-3xl font-black leading-relaxed text-[#0b1f3a] sm:text-4xl">
            آرشیو سؤالات امتحانات نهایی
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
            سؤالات امتحانات نهایی پایه‌های یازدهم و دوازدهم را بر اساس درس و رشته پیدا کن و فایل PDF را رایگان دریافت کن.
          </p>
        </div>

        <section className="mt-9 grid gap-4 sm:grid-cols-2" aria-label="انتخاب پایه">
          {grades.map((grade) => {
            const count = grade.subjects.reduce((sum, subject) => sum + subject.files.length, 0);
            const selected = grade.id === activeGradeId;
            return (
              <button
                key={grade.id}
                type="button"
                onClick={() => selectGrade(grade.id)}
                aria-pressed={selected}
                className={`group flex items-center justify-between rounded-2xl border p-5 text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6 ${selected ? "border-[#0b1f3a] bg-[#0b1f3a] text-white shadow-lg shadow-blue-950/10" : "border-slate-200 bg-white text-slate-800 hover:border-amber-300"}`}
              >
                <span className="flex items-center gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${selected ? "bg-white/10 text-amber-300" : "bg-amber-50 text-amber-600"}`}>
                    <GraduationCap size={25} />
                  </span>
                  <span>
                    <span className="block text-lg font-black">{grade.title}</span>
                    <span className={`mt-1 block text-xs ${selected ? "text-slate-300" : "text-slate-500"}`}>
                      {grade.subjects.length} درس · {toPersianDigits(String(count))} فایل PDF
                    </span>
                  </span>
                </span>
                <ArrowRight size={20} className={selected ? "text-amber-300" : "text-slate-400"} />
              </button>
            );
          })}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-black text-[#0b1f3a]">درس موردنظر را انتخاب کن</h2>
              <p className="mt-1 text-xs leading-6 text-slate-500">{activeGrade.title} · {toPersianDigits(String(totalFiles))} فایل در آرشیو</p>
            </div>
            <div className="relative w-full lg:max-w-xs">
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => { setSearch(event.target.value); setActiveSubjectId("all"); }}
                placeholder="جست‌وجوی درس یا سال امتحان..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-10 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
              />
              {search && <button type="button" onClick={() => setSearch("")} aria-label="پاک کردن جست‌وجو" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"><X size={16} /></button>}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {fieldOptions.map((field) => (
              <button key={field} type="button" onClick={() => { setActiveField(field); setActiveSubjectId("all"); }}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition ${activeField === field ? "border-[#0b1f3a] bg-[#0b1f3a] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"}`}>
                {field}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => setActiveSubjectId("all")}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition ${activeSubjectId === "all" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              همه درس‌ها
            </button>
            {subjects.filter((subject) => activeField === "همه رشته‌ها" || getField(subject.title) === activeField)
              .map((subject) => (
                <button key={subject.id} type="button" onClick={() => setActiveSubjectId(subject.id)}
                  className={`rounded-lg px-3 py-2 text-xs font-bold transition ${activeSubjectId === subject.id ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {subject.title}
                </button>
              ))}
          </div>

          <div className="mt-7 flex items-center justify-between border-b border-slate-100 pb-3 text-xs text-slate-500">
            <span>درس‌ها و فایل‌های قابل دریافت</span>
            <span>{toPersianDigits(String(visibleCount))} فایل</span>
          </div>

          {visibleSubjects.length === 0 ? (
            <div className="py-14 text-center text-sm text-slate-500">موردی با این مشخصات پیدا نشد. عبارت جست‌وجو یا فیلتر رشته را تغییر بده.</div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {visibleSubjects.map((subject) => (
                <article key={subject.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between gap-3 bg-slate-50 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900"><BookOpen size={18} /></span>
                      <h3 className="truncate font-black text-slate-800">{subject.title}</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500">{toPersianDigits(String(subject.files.length))} فایل</span>
                  </div>
                  <div className="divide-y divide-slate-100 px-4">
                    {subject.files.filter((file) => !search.trim() || subject.title.includes(search.trim()) || readableFileTitle(file.title).includes(search.trim())).map((file) => (
                      <div key={file.file} className="flex flex-wrap items-center justify-between gap-3 py-3">
                        <div className="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-700">
                          <FileText size={16} className="shrink-0 text-rose-500" />
                          <span>{readableFileTitle(file.title)}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <a href={file.file} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-800">مشاهده</a>
                          <a href={file.file} download className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-[11px] font-black text-white transition hover:bg-amber-600"><ArrowDownToLine size={14} /> دانلود</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
        <p className="mt-6 text-center text-xs leading-6 text-slate-400">تمام فایل‌ها با فرمت PDF ارائه شده‌اند. برای مشاهده، روی «مشاهده» و برای ذخیره فایل روی «دانلود» بزن.</p>
      </div>
    </main>
  );
}
