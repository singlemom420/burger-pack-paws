"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";

const schema = z.object({
  rescue_name: z.string().min(2, "Rescue name is required"),
  contact_name: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  city: z.string().optional(),
  capacity: z.string().optional(),
  needs: z.string().optional(),
  notes: z.string().optional(),
});

const initial = {
  rescue_name: "",
  contact_name: "",
  email: "",
  phone: "",
  website: "",
  instagram: "",
  city: "",
  capacity: "",
  needs: "",
  notes: "",
};

export default function PartnershipForm() {
  const [data, setData] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(null);
  const [err, setErr] = useState(null);

  const envMissing =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const canSubmit = useMemo(() => schema.safeParse(data).success && !busy, [data, busy]);

  function setField(key, value) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    if (envMissing) {
      setErr(
        "Supabase env vars are missing. Add .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setErr(parsed.error.issues?.[0]?.message || "Please check the form.");
      return;
    }

    setBusy(true);
    try {
      const { error } = await supabase.from("partnership_inquiries").insert(parsed.data);
      if (error) throw error;

      setOk("Thanks! We got your inquiry and will reach out soon.");
      setData(initial);
    } catch (e2) {
      setErr(e2?.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel">
      <div className="accentBar" />
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <div className="formGrid">
          <div>
            <label className="kicker">Rescue name</label>
            <input
              className="input"
              value={data.rescue_name}
              onChange={(e) => setField("rescue_name", e.target.value)}
              placeholder="Example: Desert Paws Rescue"
            />
          </div>
          <div>
            <label className="kicker">Contact name</label>
            <input
              className="input"
              value={data.contact_name}
              onChange={(e) => setField("contact_name", e.target.value)}
              placeholder="Your name"
            />
          </div>
        </div>

        <div className="formGrid">
          <div>
            <label className="kicker">Email</label>
            <input
              className="input"
              value={data.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="name@rescue.org"
            />
          </div>
          <div>
            <label className="kicker">Phone (optional)</label>
            <input
              className="input"
              value={data.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="(###) ###-####"
            />
          </div>
        </div>

        <div className="formGrid">
          <div>
            <label className="kicker">Website (optional)</label>
            <input
              className="input"
              value={data.website}
              onChange={(e) => setField("website", e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="kicker">Instagram (optional)</label>
            <input
              className="input"
              value={data.instagram}
              onChange={(e) => setField("instagram", e.target.value)}
              placeholder="@yourrescue"
            />
          </div>
        </div>

        <div className="formGrid">
          <div>
            <label className="kicker">City / Area (optional)</label>
            <input
              className="input"
              value={data.city}
              onChange={(e) => setField("city", e.target.value)}
              placeholder="Phoenix, Tucson, etc."
            />
          </div>
          <div>
            <label className="kicker">Current capacity (optional)</label>
            <input
              className="input"
              value={data.capacity}
              onChange={(e) => setField("capacity", e.target.value)}
              placeholder="Example: 25 dogs in foster"
            />
          </div>
        </div>

        <div>
          <label className="kicker">What do you need most right now? (optional)</label>
          <textarea
            className="input textarea"
            value={data.needs}
            onChange={(e) => setField("needs", e.target.value)}
            placeholder="Supplies, fosters, adoption event support, transport help, etc."
          />
        </div>

        <div>
          <label className="kicker">Anything else we should know? (optional)</label>
          <textarea
            className="input textarea"
            value={data.notes}
            onChange={(e) => setField("notes", e.target.value)}
            placeholder="Policies, preferred partnership months, special considerations..."
          />
        </div>

        {err ? (
          <div className="panel" style={{ padding: 12, borderColor: "rgba(255,122,24,.35)" }}>
            <strong>Fix:</strong>{" "}
            <span style={{ color: "rgba(18,16,22,.72)" }}>{err}</span>
          </div>
        ) : null}

        {ok ? (
          <div className="panel" style={{ padding: 12, borderColor: "rgba(124,58,237,.30)" }}>
            <strong>Success:</strong>{" "}
            <span style={{ color: "rgba(18,16,22,.72)" }}>{ok}</span>
          </div>
        ) : null}

        <button
          type="submit"
          className={"button " + (canSubmit ? "buttonPrimary" : "")}
          disabled={!canSubmit}
          style={{
            opacity: !canSubmit ? 0.7 : 1,
            cursor: !canSubmit ? "not-allowed" : "pointer",
          }}
        >
          {busy ? "Sending..." : "Submit inquiry"}
        </button>

        <div style={{ fontSize: 12, color: "rgba(18,16,22,.60)" }}>
          By submitting, you agree we may contact you about partnership details.
        </div>
      </form>
    </div>
  );
}
