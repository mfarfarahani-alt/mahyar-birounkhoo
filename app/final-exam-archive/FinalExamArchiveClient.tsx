"use client";

import { useMemo, useState } from "react";
import { BookOpen, Download, FileText, GraduationCap, ExternalLink } from "lucide-react";

type Grade = 11 | 12;
type ArchiveFile = { grade: Grade; subject: string; year: string; term: string; field: string; file: string; title: string; };
const ARCHIVE_FILES: ArchiveFile[] = [
  {
    "grade": 11,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Jamee2.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "دین و زندگی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "رشته انسانی",
    "file": "Tir-05-Dini2-E.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "دین و زندگی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Tir-05-Dini2-RT.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Zaban2.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "زمین‌شناسی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Zamin.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Zist2.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "تاریخ",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Tareikh2.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "عربی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "رشته انسانی",
    "file": "Tir-05-Arabi2-E.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "فارسی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Farsi2.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "فیزیک",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "رشته ریاضی",
    "file": "Tir-05-Fizik2-R.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "تاریخ",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Tarikh2-J.pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Zaban2-J (1).pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Zist2-J.pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "عربی",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Arabi2-J (1).pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "هندسه",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Hendese2-J (1).pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 11,
    "subject": "تاریخ",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Tarikh02-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Jamee02-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "دین و زندگی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Dini02-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "دین و زندگی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-04-Dini02-RT.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-04-Zaban02.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "زمین‌شناسی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-04-Zamin03-T.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-04-Zist02.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "عربی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Arabi02-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "عربی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-04-Arabi02-RT.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "فارسی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-04-Farsi02.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "فیزیک",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-04-Fizik02-R.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "فیزیک",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-1404-Fizik3R-[www.konkur.in].pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "هندسه",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-04-Hendese02-R.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 11,
    "subject": "آمار و احتمال",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-03-Ehtemal-R.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "انسان و محیط زیست",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Mohit.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "تاریخ",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-03-Tarikh2-E.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-03-Jaamee2-E.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "حسابان",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-03-Hesaban1-R.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "دین و زندگی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-03-Dini2-RT.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "روان‌شناسی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-03-Ravan2-E.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "ریاضی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-03-Riazi2_T.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Zaban2.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "زمین‌شناسی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-03-Zamin-Rt.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Zist2.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "عربی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-03-Arabi2-E.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "عربی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-03-Arabi2-RT.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-03-Fonoon2-E.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "فارسی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Farsi2.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "فلسفه",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-03-Falsafe2-E.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "فیزیک",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-03-Fizik02-R.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "فیزیک",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-03-Fizik2-T.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "هندسه",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-03-Hendese02-R.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 11,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-01-JameiShenasi3-E.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 11,
    "subject": "جغرافیا",
    "year": "نامشخص",
    "term": "سایر",
    "field": "",
    "file": "جغرافی.pdf",
    "title": "سال و نوبت نامشخص"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Tarikh3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Joghrafi3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Hesaban3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "رشته انسانی",
    "file": "Tir-05-Dini3-E.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Riazi3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Amar3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Gosaste3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Zaban3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Zist3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "tir-05-Salamat.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Shimi3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "رشته انسانی",
    "file": "Tir-05-Arabi3-E.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "tir-05-Ejtemaei3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Fonoon3.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Falsafe2.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "رشته تجربی",
    "file": "Tir-05-Fizik3-T.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۵",
    "term": "تیر",
    "field": "",
    "file": "Tir-05-Handese03.pdf",
    "title": "تیر ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "آرایه‌های ادبی",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Arai3-J.pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Joghrafi-J.pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Hesaban2-J.pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Riazi3-J.pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Amar3-J.pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Zist3-J.pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۵",
    "term": "مرداد",
    "field": "جبرانی",
    "file": "Mordad-05-Arabi3-RT-J.pdf",
    "title": "مرداد ۱۴۰۵"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Tarikh03-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Joghrafia03-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-04-Hesaban03-R.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Dini03-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-04-Riazi03-T.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Amar03-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-04-Gosaste03-R.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-04-Zaban03.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-04-Zist03-T.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-04-Salamat03.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-04-Shimi03-RT.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Arabi03-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-04-Arabi03-RT.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-04-Ejtemae03-RT.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Fonoon03-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-04-Falsafe03-E.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-04-Fizik03-R.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-04-Fizik03-T.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۴",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-04-Hendese03-R.pdf",
    "title": "خرداد ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-04-Tarikh3-E.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-04-Joghrafi3.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته ریاضی",
    "file": "Shahrivar-04-Hesaban2-R.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-04-Dini3-E.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته تجربی",
    "file": "Shahrivar-04-Riazi3-T.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-04-Amar3-E.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته ریاضی",
    "file": "Shahrivar-04-Gosaste3-R.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-04-Zaban3.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته تجربی",
    "file": "Shahrivar-04-Zst3-T.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-04-Salamat3.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Shahrivar-04-Shimi3-RT.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-04-Arabi3-E.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Shahrivar-04-Arabi3-RT.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-04-Ejtemae3.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-04-Fonoon3-E.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-04-Falsafe2-E.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته ریاضی",
    "file": "Shahrivar-04-Fizik3-R].pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته تجربی",
    "file": "Shahrivar-04-Fizik3-T.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۴",
    "term": "شهریور",
    "field": "رشته ریاضی",
    "file": "Shahrivar-04-Hendese03-R.pdf",
    "title": "شهریور ۱۴۰۴"
  },
  {
    "grade": 12,
    "subject": "انسان و محیط زیست",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Mohit.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-03-Tarikh3-E.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Joghrafia3.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Hesaban2.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-03-Dini3-E.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Riazi3.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Amar3.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Gosaste.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Zaban3.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Zist3.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Salamat.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Shimi3.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khorada-03-Kh-Arabi3-RT.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-03-Arabi3-E.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Ejtemaei.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Fonoon3.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Falsafe2.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-03-Fizik3-R.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-03-Fizik3-T.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۳",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-03-Hendese3.pdf",
    "title": "خرداد ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-03-Tarikh3-E.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Joghrafia3.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Hesaban2.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-03-Dini3-E.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Riazi3.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Amar3.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Gosaste.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Zaban3.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Zist3.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Salamat.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Shimi3.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-03-Arabi3-E.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Dey-03-Arabi3-RT.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Ejtemaei.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Fonoon3.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Falsafe2.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "رشته ریاضی",
    "file": "Dey-03-Fizik3-R.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۳",
    "term": "دی",
    "field": "",
    "file": "Dey-03-Hendese3.pdf",
    "title": "دی ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-03-Tarikh3-E.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Joghrafia3.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Hesaban2.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-03-Dini3-E.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Riazi3.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Amar3.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Gosaste.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Zaban3.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Zist3.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Salamat.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Shimi3.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-03-Arabi3-E.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Shahrivar-03-Arabi3-RT.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Ejtemaei.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Fonoon3.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Falsafe2.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "رشته ریاضی",
    "file": "Shahrivar-03-Fizik3-R.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۳",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-03-Hendese3.pdf",
    "title": "شهریور ۱۴۰۳"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Tarikh3.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-02-Joghrafia-3E.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Hesaban2.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-02-Dini3-E.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Riazi3.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Riazi-Amar-3 (1).pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Gosaste.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Zaban3.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Zist3.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Salamat.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1402-Shimi3.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-02-Arabi3-E.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-02-Arabi3-RT.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1402-Ejtemaei.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Olom-va-fonone3.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Falsafe2.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-02-Fizik3-R.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-02-Fizik3-T.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۲",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-02-Hendese3.pdf",
    "title": "خرداد ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-02-Tarikh3-E.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "",
    "file": "Dey-02-Joghrafi3.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته ریاضی",
    "file": "Dey-02-Hesaban2-R.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-02-Dini3-E.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "",
    "file": "Dey-02-Riazi3.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-02-RiaziAmar3-E.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "",
    "file": "Dey-02-Gosaste.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "",
    "file": "Dey-02-Zaban3-En.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته تجربی",
    "file": "Dey-02-Zist3-T.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "",
    "file": "Dey-02-Salamat.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Dey-02-Shimi3-RT.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-02-Arabi-3E.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Dey-02-Arabi-3RT.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-02-OlomFonon3-E.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-02-Falsafe2-E.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته ریاضی",
    "file": "Dey-02-Fizik3-R.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "رشته تجربی",
    "file": "Dey-02-Fizik3-T.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "",
    "file": "Dey-02-Hendese3.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "هویت اجتماعی",
    "year": "۱۴۰۲",
    "term": "دی",
    "field": "",
    "file": "Dey-02-Hoviat.pdf",
    "title": "دی ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-02-Tarikh3-E.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Hesaban2.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-02-Dini3-E.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Riazi3.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Gosaste.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Zaban3.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Zist3.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Salamat_va_Behdasht.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Kh-Shimi3.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Shimii3.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-02-Arabi3-E.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Shahrivar-02-Arabi3-RT.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Shahrivar-02-Ejtemaie-RT.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Olom-va-fonone3.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Falsafe2.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "رشته ریاضی",
    "file": "Shahrivar-02-Fizik3-R.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "رشته تجربی",
    "file": "Shahrivar-02-Fizik3-T.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۲",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-02-Hendese3.pdf",
    "title": "شهریور ۱۴۰۲"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Tarikh3.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-01-JameiShenasi3-E.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Joghrafia3.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Hesaban2.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-01-Dini3-E.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Riazi3.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Riazi-Amar-3.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1401-Gosaste.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Zaban3.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Zist3.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Salamat.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Shimi3.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-01-Arabi3-E.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-01-Arabi3-RT.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Khordad-01-Ejtemaie-RT.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-01-OlomFonon3-E.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Falsafe2.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-01-Fizik3-R.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-01-Fizik3-T.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۱",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-01-Hendese3.pdf",
    "title": "خرداد ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Tarikh3.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-01-JameShenasi3E.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Joghrafia3.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Hesaban2.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-01-Dini3-E.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Riazi3.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Riazi-Amar-3.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Gosaste.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Zaban-3.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-ZIst3.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Salamat_va_Behdasht.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Shimii3.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-01-Arabi3-E.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Dey-01-Arabi3-RT.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Dey-01-Ejtemaie-RT.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Olom-va-fonone3.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Falsafe2.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "رشته ریاضی",
    "file": "Dey-01-Fizik3-R.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "رشته تجربی",
    "file": "Dey-01-Fizik3-T.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۱",
    "term": "دی",
    "field": "",
    "file": "Dey-01-Hendese3.pdf",
    "title": "دی ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-01-Tarikh3.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-01-JameShenasi3-E.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-01-Joghrafia-3E.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-01-Hesaban2.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-01-Dini3-E.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-01-Riazi3.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-01-Riazi-Amar-3.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "رشته ریاضی",
    "file": "Shahrivar-01-Gosaste-R.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-01-Zaban3.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-01-ZIst3.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Sharivar-01-Salamat.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-01-Shimii3.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-01-Arabi3-E.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Shahrivar-01-Arabi3-RT.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1401-Ejtemaei.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-01-OlomFonon3-E.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-01-Falsafe2.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "رشته ریاضی",
    "file": "Shahrivar-01-Fizik3-R.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "رشته تجربی",
    "file": "Shahrivar-01-Fizik3-T.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۱",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-01-Hendese3.pdf",
    "title": "شهریور ۱۴۰۱"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-1400-Tarikh3-E.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-1400-JameiShenasi3-E.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Joghrafia3.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Hesaban2.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-00-Dini3-E.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Riazi3.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Riazi-Amar-3.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Gosaste.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-English.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Zist3.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Salamat.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Shimi3.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Arabi3.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-1400-Arabi3E.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "khordad-1400-olumejtemaeiRT.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "رشته انسانی",
    "file": "Khordad-1400-OlomFonon3-E.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Falsafe2.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "رشته ریاضی",
    "file": "Khordad-1400-Fizik3-R.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "رشته تجربی",
    "file": "Khordad-1400-Fizik3-T.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۰",
    "term": "خرداد",
    "field": "",
    "file": "Khordad-1400-Hendese3.pdf",
    "title": "خرداد ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-00-Tarikh3.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-1400-JameShenasi3-E.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-Joghrafi3.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-Hesaban2.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-00-Dini3-E.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "ریاضی و آمار",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-Riazi-Amar-3.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-Gosaste.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-English.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-Zist3.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-Salamat.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-Shimi3.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Dey-1400-Arabi3-RT.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-1400-Arabi3E.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Dey-1400-Ejtemaei-RT.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "رشته انسانی",
    "file": "Dey-1400-OlomFonon3-E.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-Falsafe2.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "رشته ریاضی",
    "file": "Dey-1400-Fizik3-R.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "رشته تجربی",
    "file": "Dey-1400-Fizik3-T.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۰",
    "term": "دی",
    "field": "",
    "file": "Dey-1400-Hendese3.pdf",
    "title": "دی ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "تاریخ",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-1400-Tarikh3-E.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "جامعه‌شناسی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-1400-JameShenasi3-E.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "جغرافیا",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1400-Joghrafia3.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "حسابان",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1400-Hesaban2.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "دین و زندگی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-00-Dini3-E.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "ریاضی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1400-Riazi3.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "ریاضیات گسسته",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1400-Gosaste.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "زبان انگلیسی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1400-English.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "زیست‌شناسی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1400-Zist3.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "سلامت و بهداشت",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Sharivar-1400-Salamat.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "شیمی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1400-Shimi3.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "Shahrivar-1400-Arabi3-RT.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "عربی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-1400-Arabi3E.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "علوم اجتماعی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "رشته‌های ریاضی و تجربی",
    "file": "shahrivar-1400-olumejtemaeiRT.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "علوم و فنون ادبی",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "رشته انسانی",
    "file": "Shahrivar-1400-OlomFonon3-E.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "فلسفه",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1400-Falsafe2.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "رشته ریاضی",
    "file": "Shahrivar-1400-Fizik3-R.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "فیزیک",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "رشته تجربی",
    "file": "Shahrivar-1400-Fizik3-T.pdf",
    "title": "شهریور ۱۴۰۰"
  },
  {
    "grade": 12,
    "subject": "هندسه",
    "year": "۱۴۰۰",
    "term": "شهریور",
    "field": "",
    "file": "Shahrivar-1400-Hendese3.pdf",
    "title": "شهریور ۱۴۰۰"
  }
];

const GRADE_LABELS: Record<Grade, string> = { 11: "پایه یازدهم", 12: "پایه دوازدهم" };

export default function FinalExamArchiveClient() {
  const [activeGrade, setActiveGrade] = useState<Grade>(11);
  const [activeSubject, setActiveSubject] = useState("همه درس‌ها");
  const gradeFiles = useMemo(() => ARCHIVE_FILES.filter((item) => item.grade === activeGrade), [activeGrade]);
  const subjects = useMemo(() => ["همه درس‌ها", ...Array.from(new Set(gradeFiles.map((item) => item.subject)))], [gradeFiles]);
  const visibleFiles = useMemo(() => activeSubject === "همه درس‌ها" ? gradeFiles : gradeFiles.filter((item) => item.subject === activeSubject), [gradeFiles, activeSubject]);
  const groupedYears = useMemo(() => {
    const years = Array.from(new Set(visibleFiles.map((item) => item.year)));
    return years.sort((a, b) => { if (a === "نامشخص") return 1; if (b === "نامشخص") return -1; return Number(b.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))) - Number(a.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))); });
  }, [visibleFiles]);
  function changeGrade(grade: Grade) { setActiveGrade(grade); setActiveSubject("همه درس‌ها"); }

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-5 py-2 text-sm font-bold text-amber-700"><BookOpen size={16} />ابزار کنکور</span>
          <h1 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">آرشیو سوالات امتحانات نهایی</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">سوالات امتحانات نهایی پایه‌های یازدهم و دوازدهم را بر اساس درس و سال امتحانی انتخاب و فایل PDF را دریافت کنید.</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
          {([11, 12] as Grade[]).map((grade) => {
            const selected = activeGrade === grade;
            const count = ARCHIVE_FILES.filter((item) => item.grade === grade).length;
            return <button key={grade} type="button" onClick={() => changeGrade(grade)} aria-pressed={selected}
              className={`rounded-2xl border p-5 text-right transition sm:p-7 ${selected ? "border-blue-900 bg-blue-950 text-white shadow-lg shadow-blue-950/10" : "border-slate-200 bg-white text-slate-700 hover:border-amber-300"}`}>
              <div className="flex items-center justify-between gap-2"><GraduationCap size={27} className={selected ? "text-amber-400" : "text-blue-900"} />
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${selected ? "bg-white/10 text-amber-300" : "bg-slate-100 text-slate-500"}`}>{count} فایل</span></div>
              <div className="mt-4 text-xl font-black">{GRADE_LABELS[grade]}</div>
              <div className={`mt-1 text-xs ${selected ? "text-slate-300" : "text-slate-500"}`}>مشاهده سوالات امتحانات نهایی</div>
            </button>;
          })}
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><h2 className="text-xl font-black text-slate-900">سوالات {GRADE_LABELS[activeGrade]}</h2><p className="mt-1 text-sm text-slate-500">{visibleFiles.length} فایل قابل دریافت</p></div>
            <span className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">PDF · دانلود رایگان</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="فیلتر درس">
            {subjects.map((subject) => <button key={subject} type="button" onClick={() => setActiveSubject(subject)} aria-pressed={activeSubject === subject}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${activeSubject === subject ? "border-blue-900 bg-blue-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"}`}>{subject}</button>)}
          </div>
          <div className="mt-7 space-y-8">
            {groupedYears.map((year) => <section key={year}>
              <div className="mb-3 flex items-center gap-3"><h3 className="text-lg font-black text-blue-950">{year}</h3><div className="h-px flex-1 bg-slate-100" /></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {visibleFiles.filter((item) => item.year === year).map((item) => {
                  const href = `/files/final-exams/grade-${item.grade}/${encodeURIComponent(item.file)}`;
                  return <article key={`${item.file}-${item.grade}`} className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-amber-200 hover:bg-amber-50/40">
                    <div className="flex min-w-0 items-start gap-3"><div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600"><FileText size={20} /></div>
                      <div className="min-w-0"><div className="font-bold text-slate-800">{item.subject}</div><div className="mt-1 text-xs leading-6 text-slate-500">{item.title}{item.field ? ` · ${item.field}` : ""}</div></div></div>
                    <div className="flex shrink-0 items-center gap-1">
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`مشاهده ${item.subject} ${item.title}`} title="مشاهده فایل" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-800"><ExternalLink size={17} /></a>
                      <a href={href} download aria-label={`دانلود ${item.subject} ${item.title}`} title="دانلود فایل" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white transition hover:bg-amber-600"><Download size={17} /></a>
                    </div>
                  </article>;
                })}
              </div>
            </section>)}
          </div>
          {visibleFiles.length === 0 && <div className="py-12 text-center text-sm text-slate-500">در حال حاضر فایلی برای این درس ثبت نشده است.</div>}
        </section>
        <p className="mt-6 text-center text-xs leading-6 text-slate-400">فایل‌های موجود بر اساس آرشیو ارسالی شما بارگذاری شده‌اند و با اضافه شدن فایل‌های جدید، این بخش قابل تکمیل است.</p>
      </div>
    </main>
  );
}
