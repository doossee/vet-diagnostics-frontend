"use client";

import { useRef, useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { apiInstance } from "@/shared/api/api-instance";
import { createToast } from "@/shared/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface ExcelImportButtonProps {
  importUrl: string;
  label?: string;
  disabled?: boolean;
}

export function ExcelDownloadButton({ importUrl, label = "Импорт из Excel", disabled }: ExcelImportButtonProps) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  function handleClick() {
    inputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await apiInstance({ url: importUrl, method: "POST", headers: { "Content-Type": "multipart/form-data" }, data: formData });
      createToast("Данные успешно импортированы", "SUCCESS");
      queryClient.invalidateQueries();
    } catch (error) {
      createToast("Ошибка при импорте файла", "WARNING");
      console.error("Import failed", error);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        onClick={handleClick}
        disabled={loading || disabled}
        size="default"
        className="mt-0! w-full bg-green-600 hover:bg-green-700 text-white"
      >
        <FileSpreadsheet className="size-4" />
        <span className="hidden md:inline-block">
          {loading ? "Загрузка..." : label}
        </span>
      </Button>
    </>
  );
}
