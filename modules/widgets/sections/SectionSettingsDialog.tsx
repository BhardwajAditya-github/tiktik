"use client";

import { X, Plus, Trash2 } from "lucide-react";

import { useSectionStore } from "@/store/sectionStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SectionSettingsDialog({ open, onClose }: Props) {
  const sections = useSectionStore((s) => s.sections);
  const setSections = useSectionStore((s) => s.setSections);
  const sectionalTiming = useSectionStore((s) => s.sectionalTiming);
  const setSectionalTiming = useSectionStore((s) => s.setSectionalTiming);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40">
      <div className="w-[650px] rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">Section Settings</h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={sectionalTiming}
              onChange={(e) => setSectionalTiming(e.target.checked)}
            />
            Enable Sectional Timing
          </label>

          {sections.map((section, index) => (
            <div
              key={section.id}
              className="grid grid-cols-[1fr_140px_40px] gap-3"
            >
              <input
                className="rounded border p-2"
                value={section.name}
                onChange={(e) => {
                  const updated = [...sections];

                  updated[index] = {
                    ...updated[index],
                    name: e.target.value,
                  };

                  setSections(updated);
                }}
              />

              <input
                type="number"
                className="rounded border p-2"
                value={section.durationMinutes}
                onChange={(e) => {
                  const updated = [...sections];

                  updated[index] = {
                    ...updated[index],
                    durationMinutes: Number(e.target.value),
                  };

                  setSections(updated);
                }}
              />

              <button
                className="rounded border"
                onClick={() => {
                  setSections(sections.filter((_, i) => i !== index));
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <button
            className="flex items-center gap-2 rounded border px-3 py-2"
            onClick={() =>
              setSections([
                ...sections,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  durationMinutes: 15,
                  completed: false,
                },
              ])
            }
          >
            <Plus size={16} />
            Add Section
          </button>
        </div>
      </div>
    </div>
  );
}
